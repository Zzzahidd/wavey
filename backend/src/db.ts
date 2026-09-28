import mongoose from 'mongoose';
import { config } from './config.js';

let isConnected = false;

export async function connectDB(): Promise<void> {
  if (isConnected) {
    return;
  }

  if (!config.mongoUri) {
    console.warn('[DB] No MONGODB_URI configured. Running in in-memory fallback mode.');
    return;
  }

  try {
    console.log('[DB] Connecting to MongoDB...');
    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    isConnected = true;
    console.log('[DB] Successfully connected to MongoDB database');
  } catch (error) {
    console.warn('[DB] MongoDB connection warning:', (error as Error).message);
    console.warn('[DB] Running with in-memory persistence fallback for uninterrupted developer experience.');
  }
}

export function isDbConnected(): boolean {
  return isConnected && mongoose.connection.readyState === 1;
}
