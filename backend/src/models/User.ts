import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  avatarUrl?: string;
  googleId?: string;
  provider: 'google' | 'email' | 'guest';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    avatarUrl: { type: String },
    googleId: { type: String, sparse: true, index: true },
    provider: { type: String, enum: ['google', 'email', 'guest'], default: 'google' }
  },
  { timestamps: true }
);

export const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

// In-memory fallback store
export const memoryUsers: Map<string, any> = new Map();
