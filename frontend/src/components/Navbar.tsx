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
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="relative z-30 w-full pt-3 sm:pt-5 px-3 sm:px-6 max-w-[1360px] mx-auto">
      {/* Sleek, Spacious Floating White Navbar Card with High Touch Ergonomics */}
      <div className="w-full bg-white border border-zinc-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] px-4 sm:px-8 h-14 sm:h-16 rounded-2xl flex items-center justify-between transition-all">
        
        {/* Left: Wavey Logo (Spiral Icon + Wordmark) */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 select-none cursor-pointer shrink-0 group"
        >
          <img 
            src="/logo.svg" 
            alt="Wavey Logo" 
            className="h-6 sm:h-7.5 w-auto object-contain select-none group-hover:opacity-90 transition-opacity"
          />
        </a>

        {/* Center: Pointer-Clickable Section Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            type="button"
            onClick={() => scrollToSection('features')}
            className="px-3.5 py-2 text-xs sm:text-[13px] font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70 rounded-xl transition-colors cursor-pointer select-none"
          >
            Features
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('solutions')}
            className="px-3.5 py-2 text-xs sm:text-[13px] font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70 rounded-xl transition-colors cursor-pointer select-none"
          >
            Solutions
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('enterprise')}
            className="px-3.5 py-2 text-xs sm:text-[13px] font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70 rounded-xl transition-colors cursor-pointer select-none"
          >
            Enterprise
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('pricing')}
            className="px-3.5 py-2 text-xs sm:text-[13px] font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70 rounded-xl transition-colors cursor-pointer select-none"
          >
            Pricing
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('changelog')}
            className="px-3.5 py-2 text-xs sm:text-[13px] font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70 rounded-xl transition-colors cursor-pointer select-none"
          >
            Changelog
          </button>
        </nav>

        {/* Right: Action Buttons (Thumb-Friendly Touch Targets for Mobile) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={onOpenApp}
                className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 min-h-[40px] sm:min-h-[44px] bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-xl transition cursor-pointer text-xs sm:text-[13px] font-medium text-zinc-900 shadow-2xs"
              >
                <img 
                  src={user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                  alt={user.name} 
                  className="w-5 h-5 rounded-full shrink-0 object-cover"
                />
                <span className="truncate max-w-[90px] sm:max-w-[130px]">{user.name}</span>
              </button>
              <button
                type="button"
                onClick={onLogout}
                className="min-h-[40px] sm:min-h-[44px] px-2.5 sm:px-3 text-xs sm:text-[13px] text-zinc-500 hover:text-zinc-950 transition cursor-pointer flex items-center justify-center font-medium"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={onOpenSignIn}
                className="px-4 sm:px-6 py-2 sm:py-2.5 min-h-[40px] sm:min-h-[44px] text-xs sm:text-[13px] font-medium text-zinc-900 bg-white hover:bg-zinc-50 border border-zinc-300 rounded-xl transition cursor-pointer select-none flex items-center justify-center shadow-2xs"
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={onOpenSignUp}
                className="px-4 sm:px-6 py-2 sm:py-2.5 min-h-[40px] sm:min-h-[44px] text-xs sm:text-[13px] font-medium text-white bg-[#111111] hover:bg-black rounded-xl transition cursor-pointer shadow-xs select-none btn-magnetic flex items-center justify-center"
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
