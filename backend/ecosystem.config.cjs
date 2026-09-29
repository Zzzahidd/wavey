/**
 * PM2 Ecosystem Configuration for Wavey Backend
 * Enables cluster mode load balancing across CPU cores with zero-downtime reloads.
 *
 * Run with:
 *   pm2 start ecosystem.config.cjs
 *   pm2 reload wavey-backend
 */
module.exports = {
  apps: [
    {
      name: 'wavey-backend',
      script: 'dist/index.js',
      instances: 'max', // Scale to all available CPU cores
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000
      }
    }
  ]
};
