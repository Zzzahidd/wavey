import React, { useState } from 'react';
import { Check, Sparkles, HelpCircle, ArrowRight, ShieldCheck, Zap, Lock, Cpu, Globe } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (plan: string) => void;
}

const FAQS = [
  {
    question: "How do compute and agent credits work?",
    answer: "Every synthesis and multi-step agent workflow consumes execution units depending on the model chosen (Gemini Flash, Pro, Claude Sonnet, or GPT-4o). Fast queries on Gemini Flash consume minimal units."
  },
  {
    question: "Can I bring my own API keys?",
    answer: "Yes! On both Team and Sovereign plans, you can configure your own Google Cloud, Anthropic, or OpenAI API keys and enterprise connectors with zero markup."
  },
  {
    question: "Are my company data and codebase private?",
    answer: "Absolutely. Wavey enforces zero data retention on customer repositories, AST indices, and chat payloads. Your code is never used to train public foundation models."
  },
  {
    question: "Can I cancel or switch plans at any time?",
    answer: "Yes, you can upgrade, downgrade, or cancel your subscription at any time directly from your billing workspace. No contracts or lock-in required."
  }
];

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="relative w-full py-20 sm:py-28 bg-white border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200/80 text-xs font-semibold text-zinc-800 mb-4 select-none">
            <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
            <span>TRANSPARENT PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-950 tracking-tight leading-tight">
            Predictable compute for ambitious builders
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            Start for free, collaborate with your engineering team, or deploy sovereign agents into your private cloud.
          </p>

          {/* Billing Switcher Toggle */}
          <div className="mt-8 inline-flex items-center gap-2 p-1.5 bg-zinc-100/90 rounded-2xl border border-zinc-200 select-none">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                !isAnnual 
                  ? 'bg-white text-zinc-950 shadow-2xs' 
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Monthly billing
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                isAnnual 
                  ? 'bg-white text-zinc-950 shadow-2xs' 
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              <span>Annual billing</span>
              <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* 1. Free / Hobbyist */}
          <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-8 flex flex-col justify-between hover:border-zinc-300 transition-all shadow-2xs">
            <div>
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest font-mono">Solo Developer</div>
              <h3 className="text-2xl font-bold text-zinc-950 mt-1">Free Tier</h3>
              <p className="text-xs sm:text-sm text-zinc-500 mt-2 leading-relaxed">
                Full-featured AI development workspace for individual engineers.
              </p>

              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-black text-zinc-950">$0</span>
                <span className="text-xs sm:text-sm text-zinc-500 font-medium">/ forever</span>
              </div>

              <div className="h-px bg-zinc-100 my-6" />

              <ul className="space-y-3.5 text-xs sm:text-sm text-zinc-700">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Unlimited standard chat queries</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Gemini 2.5 Flash Kernel included</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>1 Isolated MicroVM Sandbox runtime</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Community Discord & Support</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onSelectPlan('free')}
              className="mt-8 w-full py-3 sm:py-3.5 px-4 min-h-[44px] bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold rounded-xl text-xs sm:text-sm transition active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              Get Started Free
            </button>
          </div>

          {/* 2. Team Studio (Highlighted with #111111 CTA) */}
          <div className="bg-white rounded-3xl border-2 border-black p-6 sm:p-8 flex flex-col justify-between relative shadow-xl ring-4 ring-black/5">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#111111] text-white text-[11px] font-extrabold uppercase tracking-wider px-4 py-1 rounded-full shadow-xs">
              Most Popular
            </div>

            <div>
              <div className="text-xs font-bold text-zinc-900 uppercase tracking-widest font-mono">Engineering Teams</div>
              <h3 className="text-2xl font-bold text-zinc-950 mt-1">Team Studio</h3>
              <p className="text-xs sm:text-sm text-zinc-500 mt-2 leading-relaxed">
                Autonomous multi-agent swarms with repository-wide AST indexing.
              </p>

              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-black text-zinc-950">
                  {isAnnual ? '$32' : '$39'}
                </span>
                <span className="text-xs sm:text-sm text-zinc-500 font-medium">/ seat / month</span>
              </div>

              <div className="h-px bg-zinc-100 my-6" />

              <ul className="space-y-3.5 text-xs sm:text-sm text-zinc-800 font-medium">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Unlimited Fast Agent Syntheses</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Multi-Model Engine (Gemini Pro, Claude Sonnet, GPT-4o)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Shared Skills & Company Knowledge Brain</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Slack, Teams & Gmail Connectors</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Priority 24/7 SLA Engineering Support</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onSelectPlan('team')}
              className="mt-8 w-full py-3 sm:py-3.5 px-4 min-h-[44px] bg-[#111111] hover:bg-black text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition active:scale-[0.98] cursor-pointer btn-magnetic flex items-center justify-center gap-2"
            >
              Start 14-Day Free Trial
            </button>
          </div>

          {/* 3. Sovereign Enterprise */}
          <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-8 flex flex-col justify-between hover:border-zinc-300 transition-all shadow-2xs">
            <div>
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest font-mono">Enterprise</div>
              <h3 className="text-2xl font-bold text-zinc-950 mt-1">Sovereign Cloud</h3>
              <p className="text-xs sm:text-sm text-zinc-500 mt-2 leading-relaxed">
                Dedicated on-prem or VPC deployments with zero-retention data policies.
              </p>

              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-black text-zinc-950">Custom</span>
              </div>

              <div className="h-px bg-zinc-100 my-6" />

              <ul className="space-y-3.5 text-xs sm:text-sm text-zinc-700">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Self-Hosted & VPC Deployments (AWS/GCP/Azure)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Zero Data Retention & Strict Data Boundary</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>SAML SSO, SCIM & RBAC Governance</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>SOC 2 Type II & HIPAA Compliance</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Dedicated Forward Deployed AI Engineer</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onSelectPlan('enterprise')}
              className="mt-8 w-full py-3 sm:py-3.5 px-4 min-h-[44px] bg-zinc-900 hover:bg-black text-white font-semibold rounded-xl text-xs sm:text-sm transition active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              Contact Solutions Team
            </button>
          </div>

        </div>

        {/* Enterprise Security Callout Strip */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto p-6 sm:p-8 bg-zinc-50 border border-zinc-200/90 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 shadow-2xs flex items-center justify-center text-zinc-900 shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-base font-bold text-zinc-900">Enterprise Security & Compliance Guarantee</h4>
              <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
                Every query is encrypted in transit and at rest with AES-256 and TLS 1.3.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-semibold text-zinc-700">
            <span className="px-3 py-1.5 bg-white border border-zinc-200 rounded-lg shadow-2xs">SOC 2 Type II</span>
            <span className="px-3 py-1.5 bg-white border border-zinc-200 rounded-lg shadow-2xs">GDPR Ready</span>
            <span className="px-3 py-1.5 bg-white border border-zinc-200 rounded-lg shadow-2xs">HIPAA Compatible</span>
          </div>
        </div>

        {/* Pricing FAQs */}
        <div className="mt-16 sm:mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950">Frequently asked questions</h3>
            <p className="mt-2 text-sm text-zinc-500">Everything you need to know about billing and workspace compute.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="p-6 bg-zinc-50/70 border border-zinc-200/80 rounded-2xl">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-4 h-4 text-zinc-400 mt-1 shrink-0" />
                  <div>
                    <h5 className="font-semibold text-sm sm:text-base text-zinc-900">{faq.question}</h5>
                    <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
