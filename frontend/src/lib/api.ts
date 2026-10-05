import { User, Session, GeneratedProject } from './types';

const API_BASE = (import.meta as any).env?.VITE_API_URL 
  ? `${(import.meta as any).env.VITE_API_URL.replace(/\/$/, '')}/api` 
  : '/api';

export function getAuthToken(): string | null {
  return localStorage.getItem('wavey_auth_token');
}

export function setAuthToken(token: string): void {
  localStorage.setItem('wavey_auth_token', token);
}

export function clearAuthToken(): void {
  localStorage.removeItem('wavey_auth_token');
  localStorage.removeItem('wavey_user');
}

export function getStoredUser(): User | null {
  const token = getAuthToken();
  const userStr = localStorage.getItem('wavey_user');
  if (!token || !userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export function setStoredUser(user: User): void {
  localStorage.setItem('wavey_user', JSON.stringify(user));
}

// 1. Auth API
export async function initiateGoogleLogin(): Promise<void> {
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  try {
    const res = await fetch(`${API_BASE}/auth/google/url?state=${encodeURIComponent(currentOrigin)}`);
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
      return;
    }
  } catch (err) {
    console.error('Failed to get Google Auth URL from API:', err);
  }
  // Direct Google OAuth URL fallback with select_account
  const clientId = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID || '1040533108814-an91hmbhfqeu8c2jk6el04bl5k4eq41p.apps.googleusercontent.com';
  const callbackUrl = encodeURIComponent('http://localhost:3000/api/auth/google/callback');
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${callbackUrl}&state=${encodeURIComponent(currentOrigin)}&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&prompt=select_account%20consent&access_type=offline`;
}

export async function loginWithGoogle(mockPayload?: { email: string; name: string; avatarUrl?: string }): Promise<{ token: string; user: User }> {
  const payload = mockPayload || {
    email: 'developer@wavey.dev',
    name: 'Wavey Developer',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=WaveyDev'
  };

  const res = await fetch(`${API_BASE}/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error('Google authentication failed');
  }

  const data = await res.json();
  setAuthToken(data.token);
  setStoredUser(data.user);
  return data;
}

export async function loginWithEmail(email: string, name?: string): Promise<{ token: string; user: User }> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name })
  });

  if (!res.ok) {
    throw new Error('Email login failed');
  }

  const data = await res.json();
  setAuthToken(data.token);
  setStoredUser(data.user);
  return data;
}

export async function loginGuest(): Promise<{ token: string; user: User }> {
  const res = await fetch(`${API_BASE}/auth/guest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!res.ok) {
    throw new Error('Guest login failed');
  }

  const data = await res.json();
  setAuthToken(data.token);
  setStoredUser(data.user);
  return data;
}

// 2. Chat API (Streaming SSE)
export async function streamChat(
  prompt: string,
  sessionId: string,
  history: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> = [],
  model: string = 'gemini-2.5-flash',
  onToken: (token: string) => void,
  onComplete: (fullResponse: string) => void,
  onError: (error: Error) => void
): Promise<void> {
  try {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken() || ''}`
      },
      body: JSON.stringify({ prompt, sessionId, history, model })
    });

    if (!res.ok) {
      throw new Error(`Chat request failed with status: ${res.status}`);
    }

    const reader = res.body?.getReader();
    if (!reader) {
      throw new Error('Readable stream not supported in response');
    }

    const decoder = new TextDecoder();
    let accumulated = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.text) {
              accumulated += data.text;
              onToken(data.text);
            }
            if (data.done) {
              onComplete(data.fullResponse || accumulated);
              return;
            }
            if (data.error) {
              throw new Error(data.error);
            }
          } catch (e) {
            // Partial JSON chunk ignored
          }
        }
      }
    }

    onComplete(accumulated);
  } catch (err) {
    onError(err as Error);
  }
}

// 3. Sessions API
export async function fetchSessions(): Promise<Session[]> {
  try {
    const res = await fetch(`${API_BASE}/sessions`, {
      headers: { Authorization: `Bearer ${getAuthToken() || ''}` }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.sessions || [];
  } catch {
    return [];
  }
}

export async function createSession(title: string, model: string = 'gemini-2.5-flash'): Promise<Session> {
  const res = await fetch(`${API_BASE}/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken() || ''}`
    },
    body: JSON.stringify({ title, model })
  });
  const data = await res.json();
  return data.session;
}

export async function fetchSessionById(id: string): Promise<Session | null> {
  try {
    const res = await fetch(`${API_BASE}/sessions/${id}`, {
      headers: { Authorization: `Bearer ${getAuthToken() || ''}` }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.session || null;
  } catch {
    return null;
  }
}

export async function deleteSession(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/sessions/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getAuthToken() || ''}` }
    });
    return res.ok;
  } catch {
    return false;
  }
}

// 4. Projects API
export async function generateProject(prompt: string, template: string = 'react'): Promise<GeneratedProject> {
  const res = await fetch(`${API_BASE}/projects/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken() || ''}`
    },
    body: JSON.stringify({ prompt, template })
  });

  if (!res.ok) {
    throw new Error('Project generation failed');
  }

  const data = await res.json();
  return data.project;
}
