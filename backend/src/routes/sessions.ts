import { Router, Request, Response } from 'express';
import { SessionModel, memorySessions } from '../models/Session.js';

export const sessionsRouter = Router();

// List sessions
sessionsRouter.get('/', async (req: Request, res: Response) => {
  try {
    let sessions: any[] = [];
    try {
      sessions = await SessionModel.find().sort({ updatedAt: -1 }).limit(20);
    } catch {
      sessions = Array.from(memorySessions.values());
    }

    if (sessions.length === 0) {
      // Return initial demo sessions matching screenshot
      const defaultSessions = [
        {
          sessionId: 'session-acme-prep',
          title: 'Prep for Acme call tomorrow',
          updatedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
          messages: [
            {
              id: 'm1',
              role: 'user',
              content: 'Prep me for my Acme call tomorrow',
              timestamp: '2h ago'
            },
            {
              id: 'm2',
              role: 'assistant',
              content: `### Briefing for tomorrow's Acme call\n\nI have gathered context across your integrated tools:\n\n- **HubSpot** · Fetch Acme deal record — Negotiation stage, \$84k ARR\n- **Gmail** · Search recent Acme threads — 4 emails this week\n- **Google Calendar** · Tomorrow 2 PM — 'Acme: Contract Review' with Eunice, Oleg, Derek\n- **Google Drive** · Found 'Acme Proposal v3.pdf' shared by Sarah, last edited Mar 14\n\n#### Recommended Discussion Points:\n1. Lock in seat tiers for engineering & design pods.\n2. Review SOC2 compliance attachment & security sign-off.\n3. Finalize custom SLA turnaround for enterprise support.`,
              timestamp: '2h ago'
            }
          ]
        },
        {
          sessionId: 'session-notion-deal',
          title: 'Follow up with Notion deal',
          updatedAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
          messages: []
        },
        {
          sessionId: 'session-figma-strategy',
          title: 'Renewal strategy for Figma',
          updatedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
          messages: []
        }
      ];
      return res.json({ sessions: defaultSessions });
    }

    res.json({ sessions });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Create new session
sessionsRouter.post('/', async (req: Request, res: Response) => {
  const { title = 'New Session', model = 'gemini-1.5-flash' } = req.body;
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  try {
    const session = await SessionModel.create({
      sessionId,
      title,
      messages: [],
      aiModel: model
    });
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
    res.json({ session });
  }
});

// Get session by id
sessionsRouter.get('/:id', async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  try {
    let session = await SessionModel.findOne({ sessionId: id });
    if (!session) {
      session = memorySessions.get(id);
    }
    if (!session && id === 'session-acme-prep') {
      return res.json({
        sessionId: 'session-acme-prep',
        title: 'Prep for Acme call tomorrow',
        messages: [
          {
            id: 'm1',
            role: 'user',
            content: 'Prep me for my Acme call tomorrow',
            timestamp: '2h ago'
          },
          {
            id: 'm2',
            role: 'assistant',
            content: `### Briefing for tomorrow's Acme call\n\nI have gathered context across your integrated tools:\n\n- **HubSpot** · Fetch Acme deal record — Negotiation stage, \$84k ARR\n- **Gmail** · Search recent Acme threads — 4 emails this week\n- **Google Calendar** · Tomorrow 2 PM — 'Acme: Contract Review' with Eunice, Oleg, Derek\n- **Google Drive** · Found 'Acme Proposal v3.pdf' shared by Sarah, last edited Mar 14\n\n#### Recommended Discussion Points:\n1. Lock in seat tiers for engineering & design pods.\n2. Review SOC2 compliance attachment & security sign-off.\n3. Finalize custom SLA turnaround for enterprise support.`,
            timestamp: '2h ago'
          }
        ]
      });
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
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});
