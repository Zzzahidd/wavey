import { Router, Request, Response } from 'express';
import { generateProjectFiles } from '../services/gemini.js';
import { ProjectModel, memoryProjects } from '../models/Project.js';
import { apiCache, clearApiCache } from '../middleware/cache.js';

export const projectsRouter = Router();

// Generate new software application
projectsRouter.post('/generate', async (req: Request, res: Response) => {
  const { prompt, template = 'react' } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const result = await generateProjectFiles(prompt, template);
    const projectId = `proj_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    const projectData = {
      projectId,
      name: result.name || 'Wavey App',
      description: result.description || prompt,
      template,
      files: result.files || [],
      status: 'ready' as const
    };

    try {
      await ProjectModel.create(projectData);
    } catch {
      memoryProjects.set(projectId, projectData);
    }

    // Invalidate project list cache
    clearApiCache('/api/projects');

    res.json({ project: projectData });
  } catch (err) {
    console.error('[Project Gen Route Error]:', err);
    res.status(500).json({ error: (err as Error).message });
  }
});

// List projects (cached for 60 seconds)
projectsRouter.get('/', apiCache(60), async (req: Request, res: Response) => {
  try {
    let projects: any[] = [];
    try {
      projects = await ProjectModel.find().sort({ updatedAt: -1 }).limit(10);
    } catch {
      projects = Array.from(memoryProjects.values());
    }
    res.json({ projects });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});
