import React, { useState, useEffect } from 'react';
import { User } from './lib/types';
import { getStoredUser, clearAuthToken } from './lib/api';
import { HeroSection } from './components/HeroSection';
import { AgentArchitectureSection } from './components/AgentArchitectureSection';
import { DeveloperIntelligenceBento } from './components/DeveloperIntelligenceBento';
import { WorkflowNodeCanvas } from './components/WorkflowNodeCanvas';
import { CapabilitiesMatrix } from './components/CapabilitiesMatrix';
import { EnterpriseSection } from './components/EnterpriseSection';
import { PricingSection } from './components/PricingSection';
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
          {/* Main Landing Page Content */}
          <main className="flex-1">
            {/* 1. Hero Section (With embedded floating Navbar matching Design preview.png) */}
            <HeroSection 
              onSendMessage={handleHeroSendMessage}
              user={user}
              onOpenSignIn={() => setAuthModal({ isOpen: true, mode: 'signin' })}
              onOpenSignUp={() => setAuthModal({ isOpen: true, mode: 'signup' })}
              onOpenApp={() => setViewMode('app')}
              onLogout={handleLogout}
            />

            {/* 2. Architecture Stack */}
            <AgentArchitectureSection />

            {/* 3. Developer Intelligence Bento (White Double-Bezel Cards from Inspirations) */}
            <DeveloperIntelligenceBento />

            {/* 4. Visual Workflow Canvas */}
            <WorkflowNodeCanvas />

            {/* 5. Benchmarks & Capability Matrix */}
            <CapabilitiesMatrix />

            {/* 6. Sovereign Enterprise Security */}
            <EnterpriseSection />

            {/* 7. Pricing Tiers */}
            <PricingSection onSelectPlan={() => setAuthModal({ isOpen: true, mode: 'signup' })} />
          </main>

          {/* 8. High-End Footer */}
          <DeveloperFooter />
        </>
      )}

      {/* Auth Modals (Sign In & Create Account matching screenshots with favicon.png centered logo) */}
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
