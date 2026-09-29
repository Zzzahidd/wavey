import { Router, Request, Response } from 'express';
import { SessionModel, memorySessions } from '../models/Session.js';
import { apiCache, clearApiCache } from '../middleware/cache.js';

export const sessionsRouter = Router();

// List sessions (cached for 15s)
sessionsRouter.get('/', apiCache(15), async (req: Request, res: Response) => {
  try {
    let sessions: any[] = [];
    try {
      // Purge any stale 'New Session' documents
      await SessionModel.deleteMany({ title: 'New Session' });
      sessions = await SessionModel.find({ title: { $ne: 'New Session' } }).sort({ updatedAt: -1 }).limit(20);
    } catch {
      // Clean memory sessions
      for (const [id, s] of memorySessions.entries()) {
        if (s.title === 'New Session') {
          memorySessions.delete(id);
        }
      }
      sessions = Array.from(memorySessions.values()).filter(s => s.title !== 'New Session');
    }

    if (sessions.length === 0) {
      return res.json({ sessions: [] });
    }

    res.json({ sessions });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Create new session
sessionsRouter.post('/', async (req: Request, res: Response) => {
  const { title = 'New chat', model = 'gemini-2.5-flash' } = req.body;
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  try {
    const session = await SessionModel.create({
      sessionId,
      title,
      messages: [],
      aiModel: model
    });
    clearApiCache('/api/sessions');
    res.json({ session });
  } catch (err) {
    const session = {
      sessionId,
      title,
      messages: [],
      aiModel: model,
      updatedAt: new Date().toISOString()
    };
    memorySessions.set(sessionId, session);
    clearApiCache('/api/sessions');
    res.json({ session });
  }
});

// Get session by id
sessionsRouter.get('/:id', apiCache(15), async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  try {
    let session = await SessionModel.findOne({ sessionId: id });
    if (!session) {
      session = memorySessions.get(id);
    }
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json({ session });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Delete session
sessionsRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  try {
    await SessionModel.deleteOne({ sessionId: id });
    memorySessions.delete(id);
    clearApiCache('/api/sessions');
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});
