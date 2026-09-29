import { Router, Request, Response } from 'express';
import { streamGeminiChat } from '../services/gemini.js';
import { SessionModel, memorySessions } from '../models/Session.js';
import { clearApiCache } from '../middleware/cache.js';

export const chatRouter = Router();

chatRouter.post('/', async (req: Request, res: Response) => {
  const { prompt, sessionId = 'default-session', history = [], model = 'gemini-2.5-flash' } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  // Set SSE Headers for real-time streaming
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  let fullResponse = '';

  try {
    const stream = streamGeminiChat(prompt, history, model);

    for await (const chunk of stream) {
      fullResponse += chunk;
      res.write(`data: ${JSON.stringify({ text: chunk, done: false })}\n\n`);
    }

    // Save user & assistant messages to session
    const userMsg = {
      id: `msg_${Date.now()}_u`,
      role: 'user' as const,
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const assistantMsg = {
      id: `msg_${Date.now()}_a`,
      role: 'assistant' as const,
      content: fullResponse,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    try {
      let session = await SessionModel.findOne({ sessionId });
      if (!session) {
        session = await SessionModel.create({
          sessionId,
          title: prompt.slice(0, 30),
          messages: [userMsg, assistantMsg],
          model
        });
      } else {
        session.messages.push(userMsg as any, assistantMsg as any);
        await session.save();
      }
    } catch (err) {
      // Memory store fallback
      const existing = memorySessions.get(sessionId) || {
        sessionId,
        title: prompt.slice(0, 30),
        messages: [],
        model
      };
      existing.messages.push(userMsg, assistantMsg);
      memorySessions.set(sessionId, existing);
    }

    // Invalidate sessions cache
    clearApiCache('/api/sessions');

    res.write(`data: ${JSON.stringify({ text: '', done: true, fullResponse })}\n\n`);
    res.end();
  } catch (error) {
    console.error('[Chat Route Error]:', error);
    res.write(`data: ${JSON.stringify({ error: (error as Error).message, done: true })}\n\n`);
    res.end();
  }
});
