import React from 'react';
import { User } from '../lib/types';

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
    <header className="relative z-30 w-full pt-4 sm:pt-6 px-3 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      {/* Floating White Navbar Card (Exact Match to Design preview.png and user screenshot) */}
      <div className="w-full bg-white border border-zinc-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Left: Wavey Logo (Spiral Icon + Wordmark) */}
        <a href="#" className="flex items-center gap-2 select-none cursor-pointer">
          <img 
            src="/logo.svg" 
            alt="Wavey Logo" 
            className="h-7 sm:h-8 w-auto object-contain select-none"
          />
        </a>

        {/* Right: Exactly Two Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={onOpenApp}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 transition cursor-pointer text-xs sm:text-sm font-medium text-zinc-900"
              >
                <img 
                  src={user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                  alt={user.name} 
                  className="w-5 h-5 rounded-full"
                />
                <span className="truncate max-w-[120px]">{user.name}</span>
              </button>
              <button
                type="button"
                onClick={onLogout}
                className="text-xs sm:text-sm text-zinc-500 hover:text-zinc-900 transition cursor-pointer px-2"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                type="button"
                onClick={onOpenSignIn}
                className="px-5 sm:px-8 py-2 text-xs sm:text-sm font-medium text-zinc-900 bg-white hover:bg-zinc-50 border border-zinc-300 transition cursor-pointer select-none"
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={onOpenSignUp}
                className="px-5 sm:px-8 py-2 text-xs sm:text-sm font-medium text-white bg-[#5E1312] hover:bg-[#4a0f0e] transition cursor-pointer shadow-xs select-none"
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
