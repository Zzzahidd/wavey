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
    <header className="relative z-30 w-full pt-3 sm:pt-4 px-2 sm:px-4 max-w-[1240px] mx-auto">
      {/* Sleek, Compact Floating White Navbar Card (Exact Match to Design preview.png) */}
      <div className="w-full bg-white border border-zinc-200/90 shadow-[0_2px_16px_-2px_rgba(0,0,0,0.06)] px-4 sm:px-6 h-11 sm:h-12 flex items-center justify-between">
        
        {/* Left: Wavey Logo (Spiral Icon + Wordmark) */}
        <a href="#" className="flex items-center gap-2 select-none cursor-pointer">
          <img 
            src="/logo.svg" 
            alt="Wavey Logo" 
            className="h-5 sm:h-6 w-auto object-contain select-none"
          />
        </a>

        {/* Right: Exactly Two Action Buttons (#111111 CTA) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={onOpenApp}
                className="flex items-center gap-1.5 px-3 py-1 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 transition cursor-pointer text-xs font-medium text-zinc-900"
              >
                <img 
                  src={user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                  alt={user.name} 
                  className="w-4 h-4 rounded-full"
                />
                <span className="truncate max-w-[100px]">{user.name}</span>
              </button>
              <button
                type="button"
                onClick={onLogout}
                className="text-xs text-zinc-500 hover:text-zinc-900 transition cursor-pointer px-1.5"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={onOpenSignIn}
                className="px-4 sm:px-6 py-1 text-xs sm:text-[13px] font-medium text-zinc-900 bg-white hover:bg-zinc-50 border border-zinc-300 transition cursor-pointer select-none"
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={onOpenSignUp}
                className="px-4 sm:px-6 py-1 text-xs sm:text-[13px] font-medium text-white bg-[#111111] hover:bg-black transition cursor-pointer shadow-xs select-none btn-magnetic"
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
