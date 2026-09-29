import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface FernandPricingSectionProps {
  onSelectPlan: () => void;
}

export const FernandPricingSection: React.FC<FernandPricingSectionProps> = ({ onSelectPlan }) => {
  return (
    <section className="py-20 bg-[#FDFDFD] border-t border-zinc-200/60">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Pill & Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-900 mb-4 shadow-2xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900"></span>
            HONEST PRICING
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 tracking-tight leading-tight">
            Transparent pricing without hidden seat taxes
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600">
            Start free with full community features or scale with dedicated enterprise isolation.
          </p>
        </div>

        {/* 2-Column Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Free Tier */}
          <div className="rounded-3xl border border-zinc-300 bg-white p-8 shadow-xs flex flex-col justify-between ring-1 ring-black/5">
            <div>
              <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-2">
                COMMUNITY EDITION
              </span>
              
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-bold text-zinc-900 tracking-tight">$0</span>
                <span className="text-xs text-zinc-500 font-normal">/ month forever</span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6 pb-6 border-b border-zinc-100">
                Everything you need to write, test, and deploy software autonomously with community sub-agents.
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-zinc-800 font-medium">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-zinc-900 shrink-0" />
                  <span>Unlimited local AST repo indexing</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-zinc-900 shrink-0" />
                  <span>Disposable Firecracker microVM sandboxes</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-zinc-900 shrink-0" />
                  <span>Bi-directional GitHub & Linear integration</span>
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
                className="w-full py-3 bg-[#111111] hover:bg-black text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2 btn-magnetic"
              >
                <span>Get started free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Enterprise / Team Tier */}
          <div className="rounded-3xl border border-zinc-200/90 bg-white p-8 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                TEAM & ENTERPRISE
              </span>
              
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-bold text-zinc-900 tracking-tight">$29</span>
                <span className="text-xs text-zinc-500 font-normal">/ developer / mo</span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6 pb-6 border-b border-zinc-100">
                Dedicated infrastructure, VPC peering, priority foundation models, and custom SLAs.
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-zinc-800 font-medium">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-zinc-900 shrink-0" />
                  <span>Everything in Community tier</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-zinc-900 shrink-0" />
                  <span>Zero Data Retention VPC guarantee</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-zinc-900 shrink-0" />
                  <span>Dedicated custom LLM provider routing</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-zinc-900 shrink-0" />
                  <span>SOC2 Type II & HIPAA compliance docs</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6">
              <button
                onClick={onSelectPlan}
                className="w-full py-3 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-900 text-xs sm:text-sm font-semibold rounded-xl shadow-2xs transition cursor-pointer flex items-center justify-center gap-2 btn-magnetic"
              >
                <span>Talk to enterprise team</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
