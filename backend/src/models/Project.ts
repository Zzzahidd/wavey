import mongoose, { Schema, Document } from 'mongoose';

export interface IProjectFile {
  path: string;
  name: string;
  content: string;
  language: string;
}

export interface IProject extends Document {
  projectId: string;
  userId?: string;
  name: string;
  description: string;
  template: string;
  files: IProjectFile[];
  status: 'draft' | 'generating' | 'ready' | 'deployed';
  createdAt: Date;
  updatedAt: Date;
}

const ProjectFileSchema = new Schema({
  path: { type: String, required: true },
  name: { type: String, required: true },
  content: { type: String, required: true },
  language: { type: String, default: 'typescript' }
});

const ProjectSchema = new Schema(
  {
    projectId: { type: String, required: true, unique: true, index: true },
    userId: { type: String, index: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    template: { type: String, default: 'react-app' },
    files: [ProjectFileSchema],
    status: { type: String, enum: ['draft', 'generating', 'ready', 'deployed'], default: 'ready' }
  },
  { timestamps: true }
);

export const ProjectModel = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

// In-memory fallback store
export const memoryProjects: Map<string, any> = new Map();
