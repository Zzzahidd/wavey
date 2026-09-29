import React, { useRef, useEffect } from 'react';
import { Bot, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { attachMagneticCardTilt, createContinuousFloat } from '../lib/gsapUtils';

interface GumloopFinalCtaProps {
  onOpenSignUp?: () => void;
  onOpenSignIn?: () => void;
}

export const GumloopFinalCta: React.FC<GumloopFinalCtaProps> = ({ 
  onOpenSignUp, 
  onOpenSignIn 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      return attachMagneticCardTilt(containerRef.current, { maxTilt: 2, scale: 1.005 });
    }
  }, []);

  useEffect(() => {
    if (glowRef.current) {
      const anim = createContinuousFloat(glowRef.current, { y: -15, duration: 4 });
      return () => { anim.kill(); };
    }
  }, []);

  return (
    <section className="relative w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-200/80">
      <div className="max-w-5xl mx-auto">
        
        {/* White Card Container */}
        <div 
          ref={containerRef}
          className="bg-white rounded-3xl border border-zinc-200 p-8 sm:p-14 lg:p-16 shadow-sm text-center relative overflow-hidden"
        >
          
          {/* Subtle Accent Glow */}
          <div 
            ref={glowRef}
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-zinc-100/80 rounded-full blur-3xl pointer-events-none -z-10"
          ></div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-zinc-950 tracking-tight leading-tight max-w-2xl mx-auto">
            Build your team of agents
          </h2>

          <p className="mt-4 text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Create AI agents that understand your business, work across all your tools, and autonomously take work from idea to completed outcome.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onOpenSignUp}
              className="w-full sm:w-auto px-7 py-3.5 bg-zinc-950 hover:bg-black text-white rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              type="button"
              onClick={onOpenSignIn}
              className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-300 hover:border-zinc-400 rounded-xl text-sm font-semibold transition-all shadow-2xs cursor-pointer"
            >
              Book an Enterprise Demo
            </button>
          </div>

          {/* Feature Guarantee Checks */}
          <div className="mt-10 pt-8 border-t border-zinc-100 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              14-day unrestricted trial
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              SOC 2 Type II compliant
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-600" />
              No credit card required
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
