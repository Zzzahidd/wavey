import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, ArrowRight, Sparkles } from 'lucide-react';
import { User } from '../lib/types';
import { loginWithGoogle, loginWithEmail, loginGuest } from '../lib/api';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'signin' | 'signup';
  onClose: () => void;
  onSuccess: (user: User) => void;
  onSwitchMode: (newMode: 'signin' | 'signup') => void;
}

export const AuthModals: React.FC<AuthModalProps> = ({
  isOpen,
  mode,
  onClose,
  onSuccess,
  onSwitchMode
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { user } = await loginWithGoogle();
      onSuccess(user);
      onClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const { user } = await loginWithEmail(email, name);
      onSuccess(user);
      onClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { user } = await loginGuest();
      onSuccess(user);
      onClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      
      {/* Modal Card Container (Matches account create.png & sigin.png) */}
      <div className="relative w-full max-w-[400px] bg-white rounded-3xl border border-zinc-200/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.18)] p-6 sm:p-8 transform transition-transform">
        
        {/* Top-right close button in rounded box */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-lg border border-zinc-200/90 hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 transition"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Centered Dark Maroon Wavey Badge */}
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-2xl bg-[#5E1312] flex items-center justify-center shadow-md p-2">
            <img 
              src="/Logo on the log in page.svg" 
              alt="Wavey Badge" 
              className="w-full h-full object-contain filter brightness-0 invert"
            />
          </div>
        </div>

        {/* Header Title & Subtitle */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
            {mode === 'signin' ? 'Sign in to Wavey' : 'Create your account'}
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            {mode === 'signin' 
              ? 'Welcome back! Please sign in to continue' 
              : 'Welcome! Please fill in the details to get started.'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium text-center">
            {error}
          </div>
        )}

        {/* 1. Continue with Google Button */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={isLoading}
          className="w-full py-2.5 px-4 bg-white hover:bg-zinc-50 border border-zinc-300 rounded-xl font-semibold text-xs text-zinc-800 flex items-center justify-center gap-2.5 shadow-2xs transition-all active:scale-[0.98]"
        >
          {/* Google SVG G Icon */}
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="border-t border-zinc-200 w-full"></div>
          <span className="bg-white px-2 text-[10px] text-zinc-400 font-mono uppercase tracking-wider relative">
            or with email
          </span>
        </div>

        {/* Email form */}
        <form onSubmit={handleEmailSubmit} className="space-y-3">
          {mode === 'signup' && (
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-400 transition"
              />
            </div>
          )}

          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-400 transition"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-[#5E1312] hover:bg-[#4a0f0e] text-white font-bold rounded-xl text-xs shadow-sm transition active:scale-[0.98]"
          >
            {isLoading ? 'Processing...' : mode === 'signin' ? 'Sign in' : 'Create Account'}
          </button>
        </form>

        {/* Instant Guest Mode Access Button */}
        <button
          type="button"
          onClick={handleGuestLogin}
          className="mt-3 w-full py-2 text-[11px] font-semibold text-zinc-500 hover:text-zinc-900 bg-zinc-50 hover:bg-zinc-100 rounded-xl border border-zinc-200/80 transition flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-3 h-3 text-[#5E1312]" />
          <span>Instant One-Click Guest Access</span>
        </button>

        {/* Bottom Switch Link */}
        <div className="mt-5 pt-4 border-t border-zinc-100 text-center text-xs text-zinc-500">
          {mode === 'signin' ? (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => onSwitchMode('signup')}
                className="font-bold text-[#5E1312] hover:underline"
              >
                Sign up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => onSwitchMode('signin')}
                className="font-bold text-[#5E1312] hover:underline"
              >
                Sign in
              </button>
            </span>
          )}
        </div>

      </div>

    </div>
  );
};
