import React, { useState, useEffect } from 'react';
import { User } from './lib/types';
import { getStoredUser, clearAuthToken } from './lib/api';
import { HeroSection } from './components/HeroSection';
import { TrustEcosystemStrip } from './components/TrustEcosystemStrip';
import { FeatureCarouselSection } from './components/FeatureCarouselSection';
import { SplitLiveInspectorSection } from './components/SplitLiveInspectorSection';
import { CoreValueGrid } from './components/CoreValueGrid';
import { ManifestoQuoteSection } from './components/ManifestoQuoteSection';
import { FeatureTrioShowcase } from './components/FeatureTrioShowcase';
import { WorkspaceDeepDiveSection } from './components/WorkspaceDeepDiveSection';
import { DeveloperIntelligenceBento } from './components/DeveloperIntelligenceBento';
import { CapabilitiesMatrix } from './components/CapabilitiesMatrix';
import { EnterpriseSection } from './components/EnterpriseSection';
import { PricingSection } from './components/PricingSection';
import { FinalCtaBanner } from './components/FinalCtaBanner';
import { DeveloperFooter } from './components/DeveloperFooter';
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
    const stored = getStoredUser();
    if (stored) {
      setUser(stored);
    }
  }, []);

  const handleHeroSendMessage = (prompt: string, model: string) => {
    setPendingPrompt(prompt);
    // Open the full chatbox workspace with the prompt preloaded and executed
    setViewMode('app');
  };

  const handleAuthSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    setAuthModal({ isOpen: false, mode: 'signin' });
    // Automatically transition to the workspace when user creates account or signs in
    setViewMode('app');
  };

  const handleLogout = () => {
    clearAuthToken();
    setUser(null);
    setViewMode('landing');
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 font-sans selection:bg-[#111111] selection:text-white flex flex-col justify-between">
      
      {/* View Switcher: Dedicated Chatbox Workspace vs Marketing Landing Page */}
      {viewMode === 'app' ? (
        <FullChatboxWorkspace
          user={user}
          onBackToHome={() => {
            setPendingPrompt('');
            setViewMode('landing');
          }}
          onLogout={handleLogout}
          initialPrompt={pendingPrompt}
        />
      ) : (
        <>
          {/* Main Fernand-Inspired Minimalist Landing Page Flow */}
          <main className="flex-1">
            {/* 1. Hero Section (with floating compact Navbar, animated gradient, chatbox, 5 preview cards) */}
            <HeroSection 
              onSendMessage={handleHeroSendMessage}
              user={user}
              onOpenSignIn={() => setAuthModal({ isOpen: true, mode: 'signin' })}
              onOpenSignUp={() => setAuthModal({ isOpen: true, mode: 'signup' })}
              onOpenApp={() => setViewMode('app')}
              onLogout={handleLogout}
            />

            {/* 2. Developer Ecosystem Logo Strip */}
            <TrustEcosystemStrip />

            {/* 3. Fernand-style Horizontal Feature Carousel */}
            <FeatureCarouselSection />

            {/* 4. Fernand-style Real-Time Telemetry & Payload Inspector */}
            <SplitLiveInspectorSection />

            {/* 5. Core Values 5-Card Horizontal Grid */}
            <CoreValueGrid />

            {/* 6. Editorial Manifesto Quote Block */}
            <ManifestoQuoteSection />

            {/* 7. 3-Card Workflow Showcase */}
            <FeatureTrioShowcase />

            {/* 8. Interactive Workspace Deep-Dive Simulation */}
            <WorkspaceDeepDiveSection />

            {/* 9. Developer Intelligence Bento (Evals, Cost, Sandbox, CLI Terminal) */}
            <DeveloperIntelligenceBento />

            {/* 10. Benchmarks & Capability Comparison Matrix */}
            <CapabilitiesMatrix />

            {/* 11. Sovereign Enterprise Security */}
            <EnterpriseSection />

            {/* 12. Pricing Tiers */}
            <PricingSection onSelectPlan={() => setAuthModal({ isOpen: true, mode: 'signup' })} />

            {/* 13. Final Conversion CTA Banner */}
            <FinalCtaBanner 
              onOpenSignUp={() => setAuthModal({ isOpen: true, mode: 'signup' })}
              onOpenSignIn={() => setAuthModal({ isOpen: true, mode: 'signin' })}
            />
          </main>

          {/* 14. High-End Agency Developer Footer */}
          <DeveloperFooter />
        </>
      )}

      {/* Auth Modals (Sign In & Create Account matching screenshot with centered favicon.png) */}
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
