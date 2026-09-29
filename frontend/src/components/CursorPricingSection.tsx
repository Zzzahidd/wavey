import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface CursorPricingSectionProps {
  onSelectPlan: () => void;
}

export const CursorPricingSection: React.FC<CursorPricingSectionProps> = ({ onSelectPlan }) => {
  const [mouseCoords, setMouseCoords] = useState<{ [key: string]: { x: number; y: number } }>({});

  const handleMouseMove = (tier: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseCoords((prev) => ({
      ...prev,
      [tier]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }));
  };

  return (
    <section className="py-24 bg-[#FDFDFD] border-b border-zinc-200/60">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header without chip */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight leading-tight">
            Simple, predictable pricing for developers and teams.
          </h2>
          <p className="mt-3 text-base text-zinc-600 font-normal">
            Start building for free or unlock unlimited multi-agent reasoning and dedicated microVM quotas.
          </p>
        </div>

        {/* 3 Pricing Cards Grid with mouse spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Hobby ($0) */}
          <div 
            onMouseMove={(e) => handleMouseMove('hobby', e)}
            className="relative p-1.5 bg-zinc-100 rounded-3xl border border-zinc-200/90 shadow-2xs flex flex-col justify-between group overflow-hidden"
          >
            {/* Spotlight */}
            <div 
              className="absolute pointer-events-none rounded-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 -inset-px z-20"
              style={{
                background: `radial-gradient(400px circle at ${mouseCoords.hobby?.x || 0}px ${mouseCoords.hobby?.y || 0}px, rgba(24, 24, 27, 0.05), transparent 70%)`
              }}
            />

            <div className="bg-white rounded-[calc(1.5rem-0.375rem)] p-7 flex-1 flex flex-col justify-between border border-zinc-200/70 relative z-10">
              <div>
                <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-2">
                  HOBBY
                </span>
                
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-zinc-900">$0</span>
                  <span className="text-xs text-zinc-500">/ month forever</span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 mb-6 pb-6 border-b border-zinc-100 leading-relaxed">
                  For individual developers getting started with AI agent coding.
                </p>

                <div className="space-y-3 text-xs sm:text-sm text-zinc-800 font-medium">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-zinc-900 shrink-0" />
                    <span>2,000 monthly agent completions</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-zinc-900 shrink-0" />
                    <span>Local AST semantic graph index</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-zinc-900 shrink-0" />
                    <span>Community Discord support</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6">
                <button
                  onClick={onSelectPlan}
                  className="w-full py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs sm:text-sm font-semibold rounded-xl transition cursor-pointer flex items-center justify-center gap-2 btn-magnetic"
                >
                  <span>Start with Hobby</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Pro ($20) — Featured Card */}
          <div 
            onMouseMove={(e) => handleMouseMove('pro', e)}
            className="relative p-1.5 bg-zinc-900 rounded-3xl border border-zinc-900 shadow-md flex flex-col justify-between group overflow-hidden"
          >
            {/* Spotlight */}
            <div 
              className="absolute pointer-events-none rounded-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 -inset-px z-20"
              style={{
                background: `radial-gradient(400px circle at ${mouseCoords.pro?.x || 0}px ${mouseCoords.pro?.y || 0}px, rgba(255, 255, 255, 0.1), transparent 70%)`
              }}
            />

            <div className="bg-[#111111] text-white rounded-[calc(1.5rem-0.375rem)] p-7 flex-1 flex flex-col justify-between border border-zinc-800 relative z-10">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    PRO · POPULAR
                  </span>
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-mono font-bold text-zinc-300">
                    Unlimited
                  </span>
                </div>
                
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-white">$20</span>
                  <span className="text-xs text-zinc-400">/ month</span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 mb-6 pb-6 border-b border-zinc-800 leading-relaxed">
                  Unlimited fast completions, priority models, and multi-file composer.
                </p>

                <div className="space-y-3 text-xs sm:text-sm text-zinc-200 font-medium">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Unlimited fast Tab completions</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>500 fast multi-agent requests/mo</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Claude 3.7 Sonnet & Gemini 2.5 Pro</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Unlimited multi-file Composer diffs</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6">
                <button
                  onClick={onSelectPlan}
                  className="w-full py-3 bg-white hover:bg-zinc-100 text-zinc-950 text-xs sm:text-sm font-bold rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2 btn-magnetic"
                >
                  <span>Upgrade to Pro</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Business / Enterprise ($40) */}
          <div 
            onMouseMove={(e) => handleMouseMove('business', e)}
            className="relative p-1.5 bg-zinc-100 rounded-3xl border border-zinc-200/90 shadow-2xs flex flex-col justify-between group overflow-hidden"
          >
            {/* Spotlight */}
            <div 
              className="absolute pointer-events-none rounded-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 -inset-px z-20"
              style={{
                background: `radial-gradient(400px circle at ${mouseCoords.business?.x || 0}px ${mouseCoords.business?.y || 0}px, rgba(24, 24, 27, 0.05), transparent 70%)`
              }}
            />

            <div className="bg-white rounded-[calc(1.5rem-0.375rem)] p-7 flex-1 flex flex-col justify-between border border-zinc-200/70 relative z-10">
              <div>
                <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-2">
                  BUSINESS
                </span>
                
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-zinc-900">$40</span>
                  <span className="text-xs text-zinc-500">/ user / month</span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 mb-6 pb-6 border-b border-zinc-100 leading-relaxed">
                  For teams requiring centralized billing, admin control, and zero data retention.
                </p>

                <div className="space-y-3 text-xs sm:text-sm text-zinc-800 font-medium">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-zinc-900 shrink-0" />
                    <span>Everything in Pro tier</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-zinc-900 shrink-0" />
                    <span>Zero Data Retention Privacy policy</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-zinc-900 shrink-0" />
                    <span>Centralized admin console & SSO</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-zinc-900 shrink-0" />
                    <span>Dedicated Firecracker sandboxes</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6">
                <button
                  onClick={onSelectPlan}
                  className="w-full py-3 bg-[#111111] hover:bg-black text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2 btn-magnetic"
                >
                  <span>Start Business Trial</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
