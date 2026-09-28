import React, { useState } from 'react';
import { User } from '../lib/types';
import { Sparkle, Terminal, Cpu, Layers, Menu, X, ArrowRight } from 'lucide-react';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FDFDFD]/90 backdrop-blur-md border-b border-zinc-200/80 transition-all">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Razor-sharp Wavey Brand Logo */}
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2 group transition-transform active:scale-95 cursor-pointer" aria-label="Wavey Home">
            <img 
              src="/logo.svg" 
              alt="Wavey Logo" 
              className="h-8 w-auto object-contain select-none"
              style={{ imageRendering: 'auto' }}
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600" aria-label="Main Navigation">
            <a 
              href="#architecture" 
              className="hover:text-zinc-950 transition-colors flex items-center gap-1.5 py-1 cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-zinc-400" />
              <span>Architecture</span>
            </a>
            <a 
              href="#intelligence" 
              className="hover:text-zinc-950 transition-colors flex items-center gap-1.5 py-1 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-zinc-400" />
              <span>Evals & Bento</span>
            </a>
            <a 
              href="#workflow" 
              className="hover:text-zinc-950 transition-colors flex items-center gap-1.5 py-1 cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-zinc-400" />
              <span>Workflow</span>
            </a>
            <a 
              href="#pricing" 
              className="hover:text-zinc-950 transition-colors flex items-center gap-1.5 py-1 cursor-pointer"
            >
              <span>Pricing</span>
            </a>
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          
          <button
            onClick={onOpenApp}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-zinc-800 bg-zinc-100 hover:bg-zinc-200/80 rounded-xl border border-zinc-200 transition-all active:scale-[0.98] cursor-pointer"
            aria-label="Launch full developer chatbox workspace"
          >
            <Sparkle className="w-3.5 h-3.5 text-zinc-900" />
            <span>Open Chatbox</span>
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenApp}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200/80 border border-zinc-200 transition cursor-pointer"
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
                className="text-xs text-zinc-500 hover:text-zinc-900 transition cursor-pointer"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={onOpenSignIn}
                className="px-4 py-2 text-sm font-medium text-zinc-800 bg-white hover:bg-zinc-50 rounded-xl border border-zinc-300 shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
              >
                Sign in
              </button>
              <button
                onClick={onOpenSignUp}
                className="px-4 py-2 text-sm font-semibold text-white bg-[#111111] hover:bg-black rounded-xl shadow-sm transition-all active:scale-[0.98] cursor-pointer btn-magnetic"
              >
                Try for free
              </button>
            </div>
          )}

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-zinc-700 hover:text-black rounded-lg border border-zinc-200 bg-white transition cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-zinc-200 px-4 py-4 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-zinc-700">
            <a 
              href="#architecture" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-50 cursor-pointer"
            >
              <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-zinc-400" /> Architecture</span>
              <ArrowRight className="w-4 h-4 text-zinc-400" />
            </a>
            <a 
              href="#intelligence" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-50 cursor-pointer"
            >
              <span className="flex items-center gap-2"><Layers className="w-4 h-4 text-zinc-400" /> Evals & Bento</span>
              <ArrowRight className="w-4 h-4 text-zinc-400" />
            </a>
            <a 
              href="#workflow" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-50 cursor-pointer"
            >
              <span className="flex items-center gap-2"><Terminal className="w-4 h-4 text-zinc-400" /> Workflow Canvas</span>
              <ArrowRight className="w-4 h-4 text-zinc-400" />
            </a>
            <a 
              href="#pricing" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-50 cursor-pointer"
            >
              <span>Pricing Plans</span>
              <ArrowRight className="w-4 h-4 text-zinc-400" />
            </a>
          </nav>

          <div className="pt-3 border-t border-zinc-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenApp();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-zinc-800 bg-zinc-100 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkle className="w-4 h-4 text-zinc-900" />
              <span>Open Chatbox Workspace</span>
            </button>
            {!user && (
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenSignIn();
                  }}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-zinc-800 bg-white border border-zinc-200 rounded-xl cursor-pointer"
                >
                  Sign in
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenSignUp();
                  }}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#111111] hover:bg-black rounded-xl cursor-pointer"
                >
                  Try for free
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </header>
  );
};
