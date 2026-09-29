import { Request, Response, NextFunction } from 'express';

interface CacheEntry {
  body: any;
  contentType: string;
  expiresAt: number;
}

const cacheStore = new Map<string, CacheEntry>();

/**
 * In-memory response cache middleware for high-traffic read operations.
 * @param durationSeconds Number of seconds to cache the response
 */
export function apiCache(durationSeconds: number = 60) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    // Include auth user ID in key if present to prevent cross-user caching
    const authHeader = req.headers.authorization || '';
    const cacheKey = `${req.originalUrl || req.url}_${authHeader}`;
    const cached = cacheStore.get(cacheKey);

    if (cached && cached.expiresAt > Date.now()) {
      res.setHeader('X-Cache', 'HIT');
      res.setHeader('Cache-Control', `public, max-age=${durationSeconds}`);
      if (cached.contentType) {
        res.setHeader('Content-Type', cached.contentType);
      }
      return res.send(cached.body);
    }

    res.setHeader('X-Cache', 'MISS');

    // Intercept res.send / res.json
    const originalSend = res.send.bind(res);
    res.send = function (body: any) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const contentType = res.getHeader('Content-Type') as string || 'application/json';
        cacheStore.set(cacheKey, {
          body,
          contentType,
          expiresAt: Date.now() + durationSeconds * 1000
        });
      }
      return originalSend(body);
    };

    next();
  };
}

/**
 * Clear cache entries matching a prefix or clear all
 */
export function clearApiCache(prefix?: string) {
  if (!prefix) {
    cacheStore.clear();
    return;
  }
  for (const key of cacheStore.keys()) {
    if (key.startsWith(prefix)) {
      cacheStore.delete(key);
    }
  }
}
