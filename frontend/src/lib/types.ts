export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  provider: 'google' | 'email' | 'guest';
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface Session {
  sessionId: string;
  title: string;
  messages: Message[];
  model?: string;
  updatedAt: string;
}

export interface ProjectFile {
  path: string;
  name: string;
  content: string;
  language: string;
}

export interface GeneratedProject {
  projectId: string;
  name: string;
  description: string;
  template: string;
  files: ProjectFile[];
  status: 'draft' | 'generating' | 'ready' | 'deployed';
}
