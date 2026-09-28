import React, { useState } from 'react';
import { Check, Zap, Sparkles, Shield, ArrowRight } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (plan: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 bg-[#FDFDFD] border-t border-zinc-200/80">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-800 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
            <span>PRICING TIERS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight">
            Predictable compute for ambitious builders.
          </h2>
          <p className="mt-3 text-base text-zinc-600 leading-relaxed">
            Start free, scale into autonomous swarms, or deploy into sovereign private clouds.
          </p>

          {/* Billing Switch */}
          <div className="mt-8 inline-flex items-center gap-3 p-1 bg-zinc-100 rounded-full border border-zinc-200">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition cursor-pointer ${
                !isAnnual ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              Monthly billing
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition flex items-center gap-1.5 cursor-pointer ${
                isAnnual ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <span>Annual billing</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* 1. Solo Developer */}
          <div className="bg-white rounded-3xl border border-zinc-200/90 p-8 flex flex-col justify-between hover:border-zinc-300 transition-all shadow-sm fernand-card">
            <div>
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-mono">Hobbyist / Solo</div>
              <h3 className="text-xl font-bold text-zinc-900 mt-1">Solo Developer</h3>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                Full-featured autonomous agent workspace for individual developers.
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-black text-zinc-900">$0</span>
                <span className="text-xs text-zinc-500 font-medium">/ forever</span>
              </div>

              <ul className="mt-8 space-y-3 text-xs text-zinc-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>50 Fast Agent Syntheses / month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Gemini 2.5 Flash & Pro Kernel</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>1 Isolated MicroVM Sandbox</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Community Discord Access</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onSelectPlan('solo')}
              className="mt-8 w-full py-2.5 px-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold rounded-xl text-xs transition active:scale-[0.98] cursor-pointer"
            >
              Get Started Free
            </button>
          </div>

          {/* 2. Team Studio (Highlighted with #111111 CTA) */}
          <div className="bg-white rounded-3xl border-2 border-black p-8 flex flex-col justify-between relative shadow-xl ring-4 ring-black/5 fernand-card">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#111111] text-white text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-xs">
              Most Popular
            </div>

            <div>
              <div className="text-xs font-bold text-zinc-800 uppercase tracking-widest font-mono">Engineering Teams</div>
              <h3 className="text-xl font-bold text-zinc-900 mt-1">Team Studio</h3>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                Autonomous multi-agent swarms with repository-wide AST indexing.
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-black text-zinc-900">
                  {isAnnual ? '$32' : '$39'}
                </span>
                <span className="text-xs text-zinc-500 font-medium">/ seat / month</span>
              </div>

              <ul className="mt-8 space-y-3 text-xs text-zinc-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Unlimited Fast Agent Requests</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Multi-Model Engine (Gemini, Claude, GPT-4.5)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Automated Evals & Nightly Regressions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>10 Parallel MicroVM Sandboxes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Priority 24/7 SLA Support</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onSelectPlan('team')}
              className="mt-8 w-full py-3 px-4 bg-[#111111] hover:bg-black text-white font-bold rounded-xl text-xs shadow-md transition active:scale-[0.98] cursor-pointer btn-magnetic"
            >
              Start 14-Day Free Trial
            </button>
          </div>

          {/* 3. Sovereign Enterprise */}
          <div className="bg-white rounded-3xl border border-zinc-200/90 p-8 flex flex-col justify-between hover:border-zinc-300 transition-all shadow-sm fernand-card">
            <div>
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-mono">Enterprise</div>
              <h3 className="text-xl font-bold text-zinc-900 mt-1">Sovereign Cloud</h3>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                Dedicated on-prem or VPC deployments with zero-retention data policies.
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-3xl font-black text-zinc-900">Custom</span>
              </div>

              <ul className="mt-8 space-y-3 text-xs text-zinc-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Self-Hosted & VPC Deployments</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Zero Data Retention Guarantee</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Custom Fine-Tuned Model Weights</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>SOC2 Type II & HIPAA Compliance</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Dedicated Forward Deployed Engineer</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onSelectPlan('enterprise')}
              className="mt-8 w-full py-2.5 px-4 bg-zinc-900 hover:bg-black text-white font-semibold rounded-xl text-xs transition active:scale-[0.98] cursor-pointer"
            >
              Contact Solutions Team
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
