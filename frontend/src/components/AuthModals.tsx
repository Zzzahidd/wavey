import React, { useState } from 'react';
import { X } from 'lucide-react';
import { User } from '../lib/types';
import { loginWithGoogle } from '../lib/api';

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

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      
      {/* Modal Card Container (Exact match to account create.png & sigin.png) */}
      <div className="relative w-full max-w-[380px] sm:max-w-[400px] bg-white rounded-3xl border border-zinc-200/90 shadow-[0_24px_70px_-15px_rgba(0,0,0,0.2)] p-6 sm:p-8 transform transition-transform">
        
        {/* Top-right close button in crisp rounded square box */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-lg border border-zinc-200 hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Centered Maroon Spiral Wave Logo (Matches Logo on the log in page.svg) */}
        <div className="flex justify-center mb-6 pt-2">
          <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md flex items-center justify-center bg-[#5E1312]">
            <img 
              src="/Logo on the log in page.svg" 
              alt="Wavey Logo" 
              className="w-full h-full object-cover select-none"
            />
          </div>
        </div>

        {/* Header Title & Subtitle */}
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
            {mode === 'signin' ? 'Sign in to Wavey' : 'Create your account'}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1.5 leading-normal">
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

        {/* Single Action: Continue with Google Button (Matches account create.png & sigin.png) */}
        <div className="mb-6">
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-white hover:bg-zinc-50 border border-zinc-300 rounded-2xl font-semibold text-xs sm:text-sm text-zinc-800 flex items-center justify-center gap-3 shadow-2xs transition-all active:scale-[0.98] cursor-pointer hover:border-zinc-400"
          >
            {/* Crisp Google SVG Logo */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
            <span>{isLoading ? 'Connecting to Google...' : 'Continue with Google'}</span>
          </button>
        </div>

        {/* Bottom Switch Link */}
        <div className="pt-4 border-t border-zinc-100 text-center text-xs text-zinc-500">
          {mode === 'signin' ? (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => onSwitchMode('signup')}
                className="font-bold text-zinc-900 hover:text-black hover:underline cursor-pointer ml-1"
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
                className="font-bold text-zinc-900 hover:text-black hover:underline cursor-pointer ml-1"
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
