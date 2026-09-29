import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  timestamp: string;
  toolCalls?: Array<{
    name: string;
    args: any;
    result?: any;
    status: 'pending' | 'running' | 'completed' | 'failed';
  }>;
  codeBlocks?: Array<{
    filename: string;
    language: string;
    code: string;
  }>;
}

export interface ISession {
  sessionId: string;
  userId?: string;
  title: string;
  messages: IMessage[];
  aiModel?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type SessionDocument = Document & ISession;

const MessageSchema = new Schema({
  id: { type: String, required: true },
  role: { type: String, enum: ['user', 'assistant', 'system', 'tool'], required: true },
  content: { type: String, required: true },
  timestamp: { type: String, required: true },
  toolCalls: { type: Array, default: [] },
  codeBlocks: { type: Array, default: [] }
});

const SessionSchema = new Schema(
  {
    sessionId: { type: String, required: true, unique: true, index: true },
    userId: { type: String, index: true },
    title: { type: String, default: 'New chat' },
    messages: [MessageSchema],
    aiModel: { type: String, default: 'gemini-2.5-flash' }
  },
  { timestamps: true }
);

export const SessionModel = mongoose.models.Session || mongoose.model<SessionDocument>('Session', SessionSchema);

// In-memory fallback store
export const memorySessions: Map<string, any> = new Map();
