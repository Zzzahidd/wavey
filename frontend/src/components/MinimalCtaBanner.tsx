import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface MinimalCtaBannerProps {
  onOpenSignUp: () => void;
  onOpenSignIn: () => void;
}

export const MinimalCtaBanner: React.FC<MinimalCtaBannerProps> = ({
  onOpenSignUp,
  onOpenSignIn
}) => {
  return (
    <section className="py-24 bg-[#111111] text-white relative overflow-hidden">
      
      {/* Subtle Ambient Radial Highlight */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255, 255, 255, 0.4), transparent)'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.12]">
          Build faster with deterministic AI agents.
        </h2>

        <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-xl mx-auto font-normal leading-relaxed">
          Join engineering teams shipping verified software with Wavey. Zero configuration required to start.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenSignUp}
            className="group px-6 py-3 bg-white text-zinc-950 font-bold text-sm rounded-full shadow-lg hover:bg-zinc-100 transition-all duration-200 flex items-center gap-3 cursor-pointer active:scale-[0.98]"
          >
            <span>Start building free</span>
            <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="w-3.5 h-3.5 text-zinc-950" />
            </div>
          </button>

          <button
            onClick={onOpenSignIn}
            className="px-6 py-3 rounded-full border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 font-semibold text-sm transition-all duration-200 cursor-pointer"
          >
            Sign in to workspace
          </button>
        </div>

        <p className="mt-6 text-[11px] font-mono text-zinc-500">
          No credit card required · Free community tier · SOC2 Type II certified
        </p>

      </div>
    </section>
  );
};
