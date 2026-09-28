import React from 'react';
import { HeroInteractiveCanvas } from './HeroInteractiveCanvas';
import { OpenAIChatBox } from './OpenAIChatBox';
import { HeroDashboardPreview } from './HeroDashboardPreview';
import { 
  Presentation, 
  BarChart3, 
  FileText, 
  Mail, 
  Lightbulb,
  Sparkles
} from 'lucide-react';

interface HeroSectionProps {
  onSendMessage: (prompt: string, model: string) => void;
  isLoading?: boolean;
}

const ACTION_PILLS = [
  { id: 'slides', label: 'Create slides', icon: Presentation, prompt: 'Generate an executive keynote presentation for our AI agent developer platform' },
  { id: 'data', label: 'Analyze data', icon: BarChart3, prompt: 'Analyze database query logs, throughput benchmarks, and latency percentiles' },
  { id: 'summarize', label: 'Summarize document', icon: FileText, prompt: 'Summarize system architecture and security invariants in 4 bullet points' },
  { id: 'email', label: 'Draft email', icon: Mail, prompt: 'Draft a technical update email to engineering leads regarding our new deployment' },
  { id: 'brainstorm', label: 'Brainstorm ideas', icon: Lightbulb, prompt: 'Brainstorm 5 ambitious full-stack software applications to build with Wavey' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onSendMessage, isLoading }) => {
  return (
    <section className="relative w-full overflow-hidden">
      
      {/* =========================================================================
          TOP HERO BANNER WITH CONTINUOUS ANIMATED GRADIENT & TEXTURE
         ========================================================================= */}
      <div className="relative min-h-[460px] sm:min-h-[500px] flex flex-col items-center justify-center pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        
        {/* Animated Gradient & Texture Canvas Backdrop */}
        <HeroInteractiveCanvas />

        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Main Display Headline (Helvetica Bold Italic) */}
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl text-white font-bold tracking-tight leading-[1.12] drop-shadow-sm select-none"
            style={{ 
              fontFamily: '"Helvetica-BoldOblique", "Helvetica", -apple-system, BlinkMacSystemFont, sans-serif',
              fontStyle: 'italic',
              fontWeight: 800
            }}
          >
            The AI engine for<br className="hidden sm:inline" /> modern development
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl font-normal leading-relaxed drop-shadow-2xs">
            Bring your ideas to life with AI that can design, build, and refine your product alongside you.
          </p>

          {/* Floating OpenAI-Style Chatbox Container with Typewriter Animation */}
          <div className="w-full mt-8">
            <OpenAIChatBox onSubmit={onSendMessage} isLoading={isLoading} />
          </div>

        </div>

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
                className="group flex items-center gap-2 px-4 py-2 bg-white hover:bg-zinc-50 border border-zinc-200/90 hover:border-black/20 rounded-full shadow-2xs hover:shadow-md text-xs sm:text-sm font-medium text-zinc-700 hover:text-zinc-950 transition-all active:scale-95 cursor-pointer btn-magnetic"
              >
                <Icon className="w-4 h-4 text-zinc-500 group-hover:text-black transition-colors" />
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE HERO DASHBOARD PREVIEW (5 Cards Grid)
         ========================================================================= */}
      <div className="relative z-20 pb-16">
        <HeroDashboardPreview />
      </div>

    </section>
  );
};
