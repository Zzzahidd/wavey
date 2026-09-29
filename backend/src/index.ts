import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { config } from './config.js';
import { connectDB, isDbConnected } from './db.js';
import { authRouter } from './routes/auth.js';
import { chatRouter } from './routes/chat.js';
import { sessionsRouter } from './routes/sessions.js';
import { projectsRouter } from './routes/projects.js';

const app = express();

// Trust reverse proxy for load balancers (Cloudflare, Nginx, AWS ALB)
app.set('trust proxy', 1);

// HTTP Response Compression (Gzip / Brotli)
app.use(compression({
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:3000',
      'https://wavey-two.vercel.app',
      'https://wavey.ai',
      config.frontendUrl
    ];

    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    return callback(null, true); // Allow all valid web clients
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Global Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP, please try again later.' }
});

app.use('/api/', apiLimiter);

// Health Check with Process Metrics
app.get('/api/health', (req: Request, res: Response) => {
  const memoryUsage = process.memoryUsage();
  res.setHeader('Cache-Control', 'no-store');
  res.json({
    status: 'ok',
    app: 'Wavey AI Engine Backend',
    version: '1.0.0',
    database: isDbConnected() ? 'connected' : 'fallback-memory',
    uptime: Math.floor(process.uptime()),
    memory: {
      rssMb: Math.round(memoryUsage.rss / 1024 / 1024),
      heapUsedMb: Math.round(memoryUsage.heapUsed / 1024 / 1024),
    },
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    app: 'Wavey AI Engine Backend',
    version: '1.0.0',
    documentation: 'https://wavey.ai',
    healthCheck: '/api/health'
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

// Start Server & Lifecycle Management
let primaryServer: any;
let secondaryServer: any;

async function startServer() {
  await connectDB();

  primaryServer = app.listen(config.port, () => {
    console.log(`===========================================`);
    console.log(`🌊 Wavey AI Backend running on port ${config.port}`);
    console.log(`🚀 Health check: http://localhost:${config.port}/api/health`);
    console.log(`===========================================`);
  });

  const secondaryPort = config.port === 3000 ? 5000 : 3000;
  try {
    secondaryServer = app.listen(secondaryPort, () => {
      console.log(`🌊 Dual-port OAuth bridge active on port ${secondaryPort}`);
    });
    secondaryServer.on('error', () => {
      // Silently ignore if secondary port is occupied
    });
  } catch {
    // Ignore
  }
}

// Graceful Shutdown
function handleShutdown(signal: string) {
  console.log(`\n[Server] Received ${signal}. Starting graceful shutdown...`);
  if (primaryServer) {
    primaryServer.close(() => {
      console.log('[Server] Closed primary HTTP server.');
    });
  }
  if (secondaryServer) {
    secondaryServer.close(() => {
      console.log('[Server] Closed secondary HTTP server.');
    });
  }
  setTimeout(() => {
    process.exit(0);
  }, 1000);
}

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

startServer().catch(err => {
  console.error('Fatal Server Start Error:', err);
});
