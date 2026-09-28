import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { UserModel, memoryUsers } from '../models/User.js';

export const authRouter = Router();

// Helper to sign JWT
function generateToken(user: { id: string; email: string; name: string }): string {
  return jwt.sign(user, config.jwtSecret, { expiresIn: '7d' });
}

// 1. Google OAuth initialization URL
authRouter.get('/google/url', (req: Request, res: Response) => {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    redirect_uri: config.googleCallbackUrl,
    client_id: config.googleClientId,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  };

  const qs = new URLSearchParams(options);
  res.json({ url: `${rootUrl}?${qs.toString()}` });
});

// 2. Google OAuth Callback / verification
authRouter.post('/google', async (req: Request, res: Response) => {
  try {
    const { email, name, avatarUrl, googleId } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: 'Email and name are required' });
    }

    let user: any = null;

    try {
      user = await UserModel.findOne({ email });
      if (!user) {
        user = await UserModel.create({
          email,
          name,
          avatarUrl: avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
          googleId: googleId || `g_${Date.now()}`,
          provider: 'google'
        });
      }
    } catch (err) {
      // Memory fallback
      if (memoryUsers.has(email)) {
        user = memoryUsers.get(email);
      } else {
        user = {
          _id: `user_${Date.now()}`,
          email,
          name,
          avatarUrl: avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
          provider: 'google',
          createdAt: new Date()
        };
        memoryUsers.set(email, user);
      }
    }

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      name: user.name
    });

    return res.json({
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
        provider: user.provider
      }
    });
  } catch (error) {
    console.error('[Google Auth Error]:', error);
    return res.status(500).json({ error: 'Authentication failed' });
  }
});

// 3. Email sign-in / sign-up
authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const userName = name || email.split('@')[0];
    let user: any = null;

    try {
      user = await UserModel.findOne({ email });
      if (!user) {
        user = await UserModel.create({
          email,
          name: userName,
          avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userName)}`,
          provider: 'email'
        });
      }
    } catch (err) {
      if (memoryUsers.has(email)) {
        user = memoryUsers.get(email);
      } else {
        user = {
          _id: `user_${Date.now()}`,
          email,
          name: userName,
          avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userName)}`,
          provider: 'email',
          createdAt: new Date()
        };
        memoryUsers.set(email, user);
      }
    }

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      name: user.name
    });

    return res.json({
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
        provider: user.provider
      }
    });
  } catch (error) {
    console.error('[Login Error]:', error);
    return res.status(500).json({ error: 'Login failed' });
  }
});

// 4. Guest / Demo user
authRouter.post('/guest', async (req: Request, res: Response) => {
  const guestId = `guest_${Math.random().toString(36).substring(2, 9)}`;
  const guestUser = {
    _id: guestId,
    email: `${guestId}@wavey.dev`,
    name: 'Guest Developer',
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${guestId}`,
    provider: 'guest',
    createdAt: new Date()
  };

  memoryUsers.set(guestUser.email, guestUser);

  const token = generateToken({
    id: guestId,
    email: guestUser.email,
    name: guestUser.name
  });

  return res.json({
    token,
    user: {
      id: guestId,
      email: guestUser.email,
      name: guestUser.name,
      avatarUrl: guestUser.avatarUrl,
      provider: 'guest'
    }
  });
});

// 5. Verify / Me
authRouter.get('/me', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as any;
    return res.json({ user: decoded });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
});
