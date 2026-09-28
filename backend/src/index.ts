import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config.js';
import { connectDB, isDbConnected } from './db.js';
import { authRouter } from './routes/auth.js';
import { chatRouter } from './routes/chat.js';
import { sessionsRouter } from './routes/sessions.js';
import { projectsRouter } from './routes/projects.js';

const app = express();

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
    config.frontendUrl
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP, please try again later.' }
});

app.use('/api/', apiLimiter);

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'Wavey AI Engine Backend',
    version: '1.0.0',
    database: isDbConnected() ? 'connected' : 'fallback-memory',
    timestamp: new Date().toISOString()
  });
});

// Register API Routes
app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/projects', projectsRouter);

// Central Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[Unhandled Server Error]:', err.stack || err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: config.isDev ? err.message : 'An unexpected error occurred.'
  });
});

// Start Server
async function startServer() {
  await connectDB();

  app.listen(config.port, () => {
    console.log(`===========================================`);
    console.log(`🌊 Wavey AI Backend running on port ${config.port}`);
    console.log(`🚀 Health check: http://localhost:${config.port}/api/health`);
    console.log(`===========================================`);
  });
}

startServer().catch(err => {
  console.error('Fatal Server Start Error:', err);
});
