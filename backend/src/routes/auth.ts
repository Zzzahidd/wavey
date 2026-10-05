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
  const redirectUri = (req.query.redirect_uri as string) || config.googleCallbackUrl;
  const state = (req.query.state as string) || (req.headers.referer ? new URL(req.headers.referer).origin : '');
  const options: Record<string, string> = {
    redirect_uri: redirectUri,
    client_id: config.googleClientId,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'select_account consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  };

  if (state) {
    options.state = state;
  }

  const qs = new URLSearchParams(options);
  res.json({ url: `${rootUrl}?${qs.toString()}` });
});

// Helper to exchange Google auth code with candidate redirect URIs
async function exchangeGoogleCode(code: string, candidateUris: string[]) {
  const uniqueUris = Array.from(new Set(candidateUris.filter(Boolean)));
  let lastError: any = null;

  for (const uri of uniqueUris) {
    try {
      const res = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code,
          client_id: config.googleClientId,
          client_secret: config.googleClientSecret,
          redirect_uri: uri,
          grant_type: 'authorization_code',
        })
      });
      const data = (await res.json()) as any;
      if (res.ok && data?.access_token) {
        return data;
      }
      lastError = data;
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError;
}

// 2. Google OAuth Callback / verification
authRouter.get('/google/callback', async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const state = req.query.state as string;

  let targetFrontendUrl = config.frontendUrl;
  if (state && (state.startsWith('http://') || state.startsWith('https://'))) {
    targetFrontendUrl = state.replace(/\/$/, '');
  } else if (req.headers.referer) {
    try {
      targetFrontendUrl = new URL(req.headers.referer).origin;
    } catch {}
  }

  if (!code) {
    return res.redirect(`${targetFrontendUrl}/?error=no_code`);
  }

  try {
    const host = req.get('host') || `localhost:${config.port}`;
    const protocol = req.protocol || 'http';
    const currentCallbackUrl = `${protocol}://${host}/api/auth/google/callback`;

    const candidateUris = [
      currentCallbackUrl,
      config.googleCallbackUrl,
      'http://localhost:5000/api/auth/google/callback',
      'http://localhost:3000/api/auth/google/callback',
      'http://localhost:5173/api/auth/google/callback'
    ];

    const tokenData = await exchangeGoogleCode(code, candidateUris);
    if (!tokenData?.access_token) {
      console.error('[Google Token Exchange Error]:', tokenData);
      return res.redirect(`${targetFrontendUrl}/?error=token_failed`);
    }

    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    });
    const googleProfile = (await userRes.json()) as any;

    const email = googleProfile.email;
    const name = googleProfile.name || googleProfile.given_name || email.split('@')[0];
    const avatarUrl = googleProfile.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
    const googleId = googleProfile.id;

    let user: any = null;
    try {
      user = await UserModel.findOne({ email });
      if (!user) {
        user = await UserModel.create({
          email,
          name,
          avatarUrl,
          googleId,
          provider: 'google'
        });
      } else {
        user.name = name;
        user.avatarUrl = avatarUrl;
        user.googleId = googleId;
        await user.save();
      }
    } catch (err) {
      user = {
        _id: `user_${Date.now()}`,
        email,
        name,
        avatarUrl,
        googleId,
        provider: 'google'
      };
      memoryUsers.set(email, user);
    }

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      name: user.name
    });

    const userParam = encodeURIComponent(JSON.stringify({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      provider: 'google'
    }));

    return res.redirect(`${targetFrontendUrl}/?auth_token=${token}&auth_user=${userParam}`);
  } catch (error) {
    console.error('[Google Callback Exception]:', error);
    return res.redirect(`${targetFrontendUrl}/?error=auth_exception`);
  }
});

// 3. Direct Google Post Auth (if token received directly)
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
