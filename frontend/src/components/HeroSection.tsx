import React from 'react';
import { HeroInteractiveCanvas } from './HeroInteractiveCanvas';
import { Navbar } from './Navbar';
import { OpenAIChatBox } from './OpenAIChatBox';
import { 
  Bot, 
  Sparkles, 
  ArrowRight, 
  BarChart3, 
  FileText, 
  Mail, 
  Zap,
  TrendingUp,
  ShieldCheck,
  Layers
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
  { id: 'sales', label: 'CRM Deal Intelligence', icon: Zap, prompt: 'Analyze open Q1 CRM opportunities and highlight any at-risk stalled accounts' },
  { id: 'data', label: 'Warehouse SQL Analysis', icon: BarChart3, prompt: 'Compare month-over-month cohort retention and identify signup dropoff points' },
  { id: 'brief', label: 'Executive Meeting Prep', icon: FileText, prompt: 'Generate an executive briefing document and talking points for our upcoming partnership sync' },
  { id: 'support', label: 'Ticket Triage & Bugs', icon: Bot, prompt: 'Summarize today high-priority support escalations and draft engineering bug tickets' },
  { id: 'email', label: 'Outbound Personalization', icon: Mail, prompt: 'Source video producer candidates in SF and draft personalized outreach emails' },
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
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Hero Container */}
      <div className="relative min-h-[480px] sm:min-h-[560px] flex flex-col justify-between pt-2 sm:pt-3 pb-12 sm:pb-16 px-3 sm:px-6 lg:px-8">
        
        {/* Subtle Canvas Motion Gradient */}
        <HeroInteractiveCanvas />

        {/* 1. Floating Top Navbar */}
        <Navbar 
          user={user}
          onOpenSignIn={onOpenSignIn}
          onOpenSignUp={onOpenSignUp}
          onOpenApp={onOpenApp}
          onLogout={onLogout}
        />

        {/* 2. Hero Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center mt-6 sm:mt-12 mb-4 sm:mb-6 px-1">
          
          {/* Main Headline */}
          <h1 
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold tracking-tight leading-[1.1] sm:leading-[1.08] drop-shadow-sm select-none"
            style={{ 
              fontFamily: '"Helvetica-BoldOblique", "Helvetica", -apple-system, BlinkMacSystemFont, sans-serif',
              fontStyle: 'italic',
              fontWeight: 800
            }}
          >
            Turn ideas into production<br className="hidden sm:inline" /> ready software, fast
          </h1>

          {/* Subtitle */}
          <p className="mt-3 sm:mt-4 text-xs sm:text-base md:text-lg text-white/90 max-w-2xl font-normal leading-relaxed drop-shadow-2xs px-2">
            Describe what you want to build and let AI turn your ideas into working software. From concept to production, everything you need is right here.
          </p>

          {/* Floating Chatbox Container */}
          <div className="w-full mt-6 sm:mt-10">
            <OpenAIChatBox onSubmit={onSendMessage} isLoading={isLoading} />
          </div>

        </div>

        {/* Spacer */}
        <div className="h-2"></div>

      </div>

      {/* Suggestion Action Pills on White Surface */}
      <div className="relative z-20 -mt-6 sm:-mt-8 max-w-5xl mx-auto px-3 sm:px-4 pb-10 sm:pb-12">
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5">
          {ACTION_PILLS.map((pill) => {
            const Icon = pill.icon;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => onSendMessage(pill.prompt, 'gemini-1.5-flash')}
                className="group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white hover:bg-zinc-50 border border-zinc-200/90 hover:border-zinc-300 rounded-full shadow-2xs hover:shadow-xs text-xs sm:text-sm font-medium text-zinc-700 hover:text-zinc-950 transition-all cursor-pointer"
              >
                <Icon className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-zinc-500 group-hover:text-black transition-colors shrink-0" />
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>
      </div>

    </section>
  );
};
