import React, { useState, useEffect } from 'react';
import { User } from './lib/types';
import { getStoredUser, clearAuthToken } from './lib/api';
import { HeroSection } from './components/HeroSection';
import { GumloopTrustWall } from './components/GumloopTrustWall';
import { GumloopAgentShowcase } from './components/GumloopAgentShowcase';
import { GumloopCompanyContext } from './components/GumloopCompanyContext';
import { GumloopMeetYourTeam } from './components/GumloopMeetYourTeam';
import { GumloopBuiltByOne } from './components/GumloopBuiltByOne';
import { GumloopOptimizeSection } from './components/GumloopOptimizeSection';
import { GumloopEnterpriseControls } from './components/GumloopEnterpriseControls';
import { GumloopTestimonials } from './components/GumloopTestimonials';
import { GumloopRecentlyShipped } from './components/GumloopRecentlyShipped';
import { GumloopFinalCta } from './components/GumloopFinalCta';
import { GumloopFooter } from './components/GumloopFooter';
import { AuthModals } from './components/AuthModals';
import { FullChatboxWorkspace } from './components/FullChatboxWorkspace';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'signin' | 'signup' }>({
    isOpen: false,
    mode: 'signin'
  });
  const [pendingPrompt, setPendingPrompt] = useState<string>('');

  useEffect(() => {
    // 1. Check URL query params for Google OAuth callback tokens
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('auth_token');
    const urlUser = params.get('auth_user');

    if (urlToken && urlUser) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(urlUser));
        localStorage.setItem('wavey_auth_token', urlToken);
        localStorage.setItem('wavey_user', JSON.stringify(parsedUser));
        setUser(parsedUser);
        setViewMode('app');
        // Clean URL params without reload
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      } catch (e) {
        console.error('Failed to parse auth user from URL:', e);
      }
    }

    // 2. Check stored authenticated user: if user exists, go straight to chat app
    const stored = getStoredUser();
    if (stored) {
      setUser(stored);
      setViewMode('app');
    }
  }, []);

  const handleHeroSendMessage = (prompt: string, _model: string) => {
    setPendingPrompt(prompt);
    if (!user) {
      // Require user to sign in or create an account first
      setAuthModal({ isOpen: true, mode: 'signup' });
    } else {
      // User is authenticated, enter chat workspace directly
      setViewMode('app');
    }
  };

  const handleAuthSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    setAuthModal({ isOpen: false, mode: 'signin' });
    setViewMode('app');
  };

  const handleLogout = () => {
    clearAuthToken();
    setUser(null);
    setViewMode('landing');
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white flex flex-col justify-between">
      
      {/* View Switcher: Dedicated Chatbox Workspace vs Marketing Landing Page */}
      {viewMode === 'app' ? (
        <FullChatboxWorkspace
          user={user}
          onBackToHome={() => {
            setPendingPrompt('');
            setViewMode('landing');
          }}
          onLogout={handleLogout}
          onOpenSignIn={() => setAuthModal({ isOpen: true, mode: 'signin' })}
          onOpenSignUp={() => setAuthModal({ isOpen: true, mode: 'signup' })}
          initialPrompt={pendingPrompt}
        />
      ) : (
        <>
          {/* Gumloop.com Completely Redesigned Landing Page Flow */}
          <main className="flex-1">
            
            {/* 1. Hero Section: "Build, share, optimize & control agents" */}
            <HeroSection 
              onSendMessage={handleHeroSendMessage}
              user={user}
              onOpenSignIn={() => setAuthModal({ isOpen: true, mode: 'signin' })}
              onOpenSignUp={() => setAuthModal({ isOpen: true, mode: 'signup' })}
              onOpenApp={() => setViewMode('app')}
              onLogout={handleLogout}
            />

            {/* 2. Enterprise Trust Wall & Metric Ticker */}
            <GumloopTrustWall />

            {/* 3. "Let your experts build the agents" (Interactive Agent Runner) */}
            <GumloopAgentShowcase onOpenSignUp={() => setAuthModal({ isOpen: true, mode: 'signup' })} />

            {/* 4. "Complete context on your company" (Company Knowledge Brain, Skills, Live Activity) */}
            <GumloopCompanyContext />

            {/* 5. "Collaborate: Meet your team where they work" (Slack, Teams, Gmail) */}
            <GumloopMeetYourTeam />

            {/* 6. "Built by one, used by all" (Granular Roles & Access Control) */}
            <GumloopBuiltByOne />

            {/* 7. "Optimize Your Agents" (Cost Reduction Calculator, Self-Improvement, Evals) */}
            <GumloopOptimizeSection />

            {/* 8. "Enterprise-grade controls" (9-Card Bento Grid) */}
            <GumloopEnterpriseControls />

            {/* 9. "In agents, they trust" (Customer Case Studies) */}
            <GumloopTestimonials />

            {/* 10. "Recently shipped" (Horizontal Changelog Timeline) */}
            <GumloopRecentlyShipped />

            {/* 11. "Build your team of agents" (Final High-Conversion CTA) */}
            <GumloopFinalCta 
              onOpenSignUp={() => setAuthModal({ isOpen: true, mode: 'signup' })}
              onOpenSignIn={() => setAuthModal({ isOpen: true, mode: 'signin' })}
            />
          </main>

          {/* 12. Modern Multi-Column Footer */}
          <GumloopFooter />
        </>
      )}

      {/* Auth Modals */}
      <AuthModals
        isOpen={authModal.isOpen}
        mode={authModal.mode}
        onClose={() => setAuthModal({ isOpen: false, mode: 'signin' })}
        onSuccess={handleAuthSuccess}
        onSwitchMode={(mode) => setAuthModal({ isOpen: true, mode })}
      />

    </div>
  );
}
