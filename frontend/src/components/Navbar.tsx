import React from 'react';
import { User } from '../lib/types';
import { Sparkle, Terminal, ShieldCheck, Cpu, BookOpen, Layers } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  onOpenSignIn: () => void;
  onOpenSignUp: () => void;
  onOpenApp: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenSignIn,
  onOpenSignUp,
  onOpenApp,
  onLogout
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FDFDFD]/90 backdrop-blur-md border-b border-zinc-200/80 transition-all">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Razor-sharp Wavey Brand Logo */}
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2 group transition-transform active:scale-95">
            <img 
              src="/logo.svg" 
              alt="Wavey Logo" 
              className="h-8 w-auto object-contain select-none"
              style={{ imageRendering: 'auto' }}
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600">
            <a 
              href="#architecture" 
              className="hover:text-zinc-950 transition-colors flex items-center gap-1.5 py-1"
            >
              <Cpu className="w-4 h-4 text-zinc-400" />
              Architecture
            </a>
            <a 
              href="#intelligence" 
              className="hover:text-zinc-950 transition-colors flex items-center gap-1.5 py-1"
            >
              <Layers className="w-4 h-4 text-zinc-400" />
              Evals & Bento
            </a>
            <a 
              href="#workflow" 
              className="hover:text-zinc-950 transition-colors flex items-center gap-1.5 py-1"
            >
              <Terminal className="w-4 h-4 text-zinc-400" />
              Workflow
            </a>
            <a 
              href="#pricing" 
              className="hover:text-zinc-950 transition-colors flex items-center gap-1.5 py-1"
            >
              Pricing
            </a>
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenApp}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-zinc-800 bg-zinc-100 hover:bg-zinc-200/80 rounded-lg border border-zinc-200 transition-all active:scale-[0.98]"
          >
            <Sparkle className="w-3.5 h-3.5 text-[#5E1312]" />
            <span>Open Chatbox</span>
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenApp}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200/80 border border-zinc-200 transition"
              >
                <img 
                  src={user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                  alt={user.name} 
                  className="w-5 h-5 rounded-full"
                />
                <span className="text-xs font-medium text-zinc-800 max-w-[100px] truncate">{user.name}</span>
              </button>
              <button
                onClick={onLogout}
                className="text-xs text-zinc-500 hover:text-zinc-900 transition"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenSignIn}
                className="px-4 py-2 text-sm font-medium text-zinc-800 bg-white hover:bg-zinc-50 rounded-lg border border-zinc-300 shadow-2xs transition-all active:scale-[0.98]"
              >
                Sign in
              </button>
              <button
                onClick={onOpenSignUp}
                className="px-4 py-2 text-sm font-medium text-white bg-[#5E1312] hover:bg-[#4a0f0e] rounded-lg shadow-sm transition-all active:scale-[0.98]"
              >
                Try for free
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
