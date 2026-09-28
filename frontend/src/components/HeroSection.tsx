import React, { useState } from 'react';
import { HeroInteractiveCanvas } from './HeroInteractiveCanvas';
import { Navbar } from './Navbar';
import { OpenAIChatBox } from './OpenAIChatBox';
import { HeroDashboardPreview } from './HeroDashboardPreview';
import { 
  Presentation, 
  BarChart3, 
  FileText, 
  Mail, 
  Lightbulb,
  Sparkles,
  Play,
  X,
  CheckCircle2,
  ChevronDown,
  MessageSquare
} from 'lucide-react';
import { User } from '../lib/types';

interface HeroSectionProps {
  onSendMessage: (prompt: string, model: string) => void;
  isLoading?: boolean;
  user: User | null;
  onOpenSignIn: () => void;
  onOpenSignUp: () => void;
  onOpenApp: () => void;
  onLogout: () => void;
}

const ACTION_PILLS = [
  { id: 'slides', label: 'Create slides', icon: Presentation, prompt: 'Generate an executive keynote presentation for our AI agent developer platform' },
  { id: 'data', label: 'Analyze data', icon: BarChart3, prompt: 'Analyze database query logs, throughput benchmarks, and latency percentiles' },
  { id: 'summarize', label: 'Summarize document', icon: FileText, prompt: 'Summarize system architecture and security invariants in 4 bullet points' },
  { id: 'email', label: 'Draft email', icon: Mail, prompt: 'Draft a technical update email to engineering leads regarding our new deployment' },
  { id: 'brainstorm', label: 'Brainstorm ideas', icon: Lightbulb, prompt: 'Brainstorm 5 ambitious full-stack software applications to build with Wavey' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onSendMessage, 
  isLoading,
  user,
  onOpenSignIn,
  onOpenSignUp,
  onOpenApp,
  onLogout
}) => {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <section className="relative w-full overflow-hidden">
      
      {/* =========================================================================
          TOP HERO BANNER WITH CONTINUOUS ANIMATED GRADIENT & TEXTURE
         ========================================================================= */}
      <div className="relative min-h-[500px] sm:min-h-[540px] flex flex-col justify-between pt-2 pb-16 px-3 sm:px-6 lg:px-8">
        
        {/* Animated Gradient & Texture Canvas Backdrop */}
        <HeroInteractiveCanvas />

        {/* 1. Exact Top Floating White Navbar */}
        <Navbar 
          user={user}
          onOpenSignIn={onOpenSignIn}
          onOpenSignUp={onOpenSignUp}
          onOpenApp={onOpenApp}
          onLogout={onLogout}
        />

        {/* 2. Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center mt-6 sm:mt-8 mb-4">
          
          {/* Main Display Headline (Helvetica Bold Italic) */}
          <h1 
            className="text-3xl sm:text-5xl md:text-6xl text-white font-bold tracking-tight leading-[1.12] drop-shadow-sm select-none"
            style={{ 
              fontFamily: '"Helvetica-BoldOblique", "Helvetica", -apple-system, BlinkMacSystemFont, sans-serif',
              fontStyle: 'italic',
              fontWeight: 800
            }}
          >
            The autonomous AI engine for<br className="hidden sm:inline" /> engineering teams
          </h1>

          {/* Subtitle */}
          <p className="mt-3 text-sm sm:text-base text-white/90 max-w-2xl font-normal leading-relaxed drop-shadow-2xs">
            Write code, plan architecture, review PRs, and run autonomous workflows. Deploy deterministic full-stack systems directly from your terminal or chat.
          </p>

          {/* Fernand-style Hero CTAs Row */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={user ? onOpenApp : onOpenSignUp}
              className="px-5 py-2.5 bg-[#111111] hover:bg-black text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer btn-magnetic"
            >
              <span>Start for free</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-zinc-800 text-zinc-300 rounded border border-zinc-700">R</kbd>
            </button>

            <button
              onClick={() => setShowDemoModal(true)}
              className="px-4 py-2.5 bg-white/95 hover:bg-white border border-white/80 text-zinc-900 font-semibold text-xs sm:text-sm rounded-xl shadow-2xs transition flex items-center gap-2 cursor-pointer btn-magnetic"
            >
              <span>Book a demo</span>
              <span className="flex items-center gap-1 text-[11px] text-zinc-500 font-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                2 slots today
              </span>
            </button>

            <button
              onClick={() => onSendMessage('Explain Wavey autonomous agent architecture and deterministic sandbox', 'gemini-1.5-flash')}
              className="text-white/80 hover:text-white text-xs font-medium flex items-center gap-1 transition cursor-pointer px-2 py-1"
            >
              <span>✦ Set up with your AI agent</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Floating OpenAI-Style Chatbox Container with Typewriter Animation */}
          <div className="w-full mt-6 sm:mt-7">
            <OpenAIChatBox onSubmit={onSendMessage} isLoading={isLoading} />
          </div>

        </div>

        {/* Spacer to balance bottom */}
        <div className="h-2"></div>

      </div>

      {/* =========================================================================
          SUGGESTION ACTION PILLS (On Clean #FDFDFD Surface with Magnetic Hover)
         ========================================================================= */}
      <div className="relative z-20 -mt-8 max-w-5xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {ACTION_PILLS.map((pill) => {
            const Icon = pill.icon;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => onSendMessage(pill.prompt, 'gemini-1.5-flash')}
                className="group flex items-center gap-2 px-4 py-2 bg-white hover:bg-zinc-50 border border-zinc-200/90 hover:border-black/20 rounded-full shadow-2xs hover:shadow-md text-xs sm:text-sm font-medium text-zinc-700 hover:text-zinc-950 transition-all cursor-pointer btn-magnetic"
              >
                <Icon className="w-4 h-4 text-zinc-500 group-hover:text-black transition-colors" />
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE HERO DASHBOARD PREVIEW (5 Cards Grid with Fernand Demo Pill)
         ========================================================================= */}
      <div className="relative z-20 pb-16">
        <HeroDashboardPreview />

        {/* Floating Fernand-style 'Watch a 2 minute demo' Pill Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowDemoModal(true)}
            className="px-5 py-2.5 bg-white hover:bg-zinc-50 border border-zinc-300 rounded-full shadow-md text-xs sm:text-sm font-semibold text-zinc-800 flex items-center gap-2 transition cursor-pointer hover:border-zinc-400"
          >
            <Play className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            <span>Watch a 2 minute demo</span>
          </button>
        </div>

        {/* Floating Fernand-style Help Bubble on Bottom Right */}
        <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-3 bg-white/95 backdrop-blur-md p-3 pr-4 rounded-2xl border border-zinc-200/90 shadow-lg text-xs text-zinc-700 max-w-xs">
          <div className="w-8 h-8 rounded-xl bg-zinc-900 text-white flex items-center justify-center shrink-0">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-zinc-900 text-[11px]">Ready to build?</div>
            <div className="text-[10px] text-zinc-500">We'll help you migrate from Cursor for free ✦</div>
          </div>
        </div>
      </div>

      {/* Interactive 2-Minute Demo Walkthrough Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-zinc-200 max-w-2xl w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-800 rounded-full hover:bg-zinc-100 transition cursor-pointer"
              aria-label="Close demo modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-xs font-bold font-mono">
                INTERACTIVE DEMO
              </span>
              <span className="text-xs text-zinc-500 font-medium">Wavey Autonomous Engine Overview</span>
            </div>

            <h3 className="text-xl font-bold text-zinc-900">
              Deterministic Software Synthesis in Action
            </h3>

            <div className="mt-4 space-y-3 text-xs sm:text-sm text-zinc-600">
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-900 block">1. Natural Language to Sub-Agent Trees</strong>
                  Wavey decomposes high-level feature requirements into topological planning DAGs with strict dependency ordering.
                </div>
              </div>

              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-900 block">2. Firecracker MicroVM Sandboxing</strong>
                  Code is executed and verified inside disposable MicroVMs with strict memory and CPU isolation.
                </div>
              </div>

              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-900 block">3. Autonomous PR Creation & Verification</strong>
                  Generates verified AST diffs, runs test suites, and opens clean GitHub pull requests without manual intervention.
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-zinc-100">
              <button
                onClick={() => setShowDemoModal(false)}
                className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowDemoModal(false);
                  user ? onOpenApp() : onOpenSignUp();
                }}
                className="px-5 py-2 bg-[#111111] hover:bg-black text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

