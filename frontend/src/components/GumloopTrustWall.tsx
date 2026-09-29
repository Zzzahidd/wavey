import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  ArrowUpRight, 
  Zap, 
  Sparkles
} from 'lucide-react';
import { gsap } from 'gsap';
import { attachMagneticCardTilt } from '../lib/gsapUtils';

interface CompanyCase {
  id: string;
  name: string;
  category: string;
  highlight: string;
  stat: string;
  quote: string;
  author: string;
  role: string;
}

const COMPANIES: CompanyCase[] = [
  {
    id: 'gusto',
    name: 'Gusto',
    category: 'Fintech / HR',
    highlight: '$1.5M+ Additional ARR',
    stat: '44% larger deal size',
    quote: 'The partnership review agent cuts prep time from 45 min to 4 min, boosting win rate by 31%.',
    author: 'Matt Gould',
    role: 'Head of Insights & Ops'
  },
  {
    id: 'instacart',
    name: 'Instacart',
    category: 'E-commerce / Logistics',
    highlight: '100% Team AI Adoption',
    stat: '8,000+ hrs saved/mo',
    quote: 'Critical in helping all teams adopt AI without engineering bottlenecks.',
    author: 'Fidji Simo',
    role: 'CEO, Instacart'
  },
  {
    id: 'samsara',
    name: 'Samsara',
    category: 'IoT / Enterprise SaaS',
    highlight: 'Multiplayer GTM Workflows',
    stat: '3,500+ weekly runs',
    quote: 'Turned our sales and marketing teams into active builders.',
    author: 'Ryan Schwartz',
    role: 'VP Marketing Systems'
  },
  {
    id: 'moderntreasury',
    name: 'Modern Treasury',
    category: 'Payments Platform',
    highlight: 'Automated Compliance',
    stat: '99.9% ledger accuracy',
    quote: 'Our finance operations now run continuous autonomous reconciliations.',
    author: 'Josh Rider',
    role: 'Director of Ops'
  },
  {
    id: 'ramp',
    name: 'Ramp',
    category: 'Spend Management',
    highlight: 'Real-time Vendor Audits',
    stat: '6x faster review',
    quote: 'Agents triage complex contract line items in seconds.',
    author: 'Shelby Belak',
    role: 'Head of Data'
  },
  {
    id: 'brex',
    name: 'Brex',
    category: 'Corporate Finance',
    highlight: 'Global Expense Policy',
    stat: '10x team leverage',
    quote: 'Policy checks run invisibly in Slack without slowing down employees.',
    author: 'Gunnar Kozel',
    role: 'Lead Architect'
  }
];

export const GumloopTrustWall: React.FC = () => {
  const [activeCompany, setActiveCompany] = useState<CompanyCase>(COMPANIES[0]);
  const previewCardRef = useRef<HTMLDivElement>(null);
  const metricCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // 1. Attach 3D Magnetic tilt to all 4 metric cards
    const cleanups: (() => void)[] = [];
    metricCardsRef.current.forEach((card, index) => {
      if (card) {
        cleanups.push(attachMagneticCardTilt(card, { maxTilt: 6, scale: 1.015 }));
        
        // Continuous subtle float offset
        gsap.to(card, {
          y: -4,
          duration: 2.8 + index * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2
        });
      }
    });

    if (previewCardRef.current) {
      cleanups.push(attachMagneticCardTilt(previewCardRef.current, { maxTilt: 3, scale: 1.005 }));
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  const handleSelectCompany = (company: CompanyCase) => {
    setActiveCompany(company);
    if (previewCardRef.current) {
      gsap.fromTo(
        previewCardRef.current,
        { autoAlpha: 0.6, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
  };

  return (
    <section className="relative w-full bg-white border-y border-zinc-200/80 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-zinc-950 tracking-tight leading-tight">
            The agent infrastructure powering the world's most AI native companies
          </h2>
        </div>

        {/* 4 Clean Metric Cards (With GSAP Tilt & Float) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          
          <div 
            ref={(el) => (metricCardsRef.current[0] = el)}
            className="bg-white p-6 rounded-2xl border border-zinc-200/90 shadow-xs hover:shadow-md hover:border-zinc-300 transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-800 mb-4 border border-zinc-200/70 group-hover:scale-110 transition-transform">
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight">50M+</div>
              <div className="text-sm font-semibold text-zinc-900 mt-1">Tasks Automated</div>
            </div>
            <p className="text-xs text-zinc-500 mt-3">Running live across high-velocity teams</p>
          </div>

          <div 
            ref={(el) => (metricCardsRef.current[1] = el)}
            className="bg-white p-6 rounded-2xl border border-zinc-200/90 shadow-xs hover:shadow-md hover:border-zinc-300 transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-800 mb-4 border border-zinc-200/70 group-hover:scale-110 transition-transform">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight">120k+</div>
              <div className="text-sm font-semibold text-zinc-900 mt-1">Agents Deployed</div>
            </div>
            <p className="text-xs text-zinc-500 mt-3">Autonomous agents deployed worldwide</p>
          </div>

          <div 
            ref={(el) => (metricCardsRef.current[2] = el)}
            className="bg-white p-6 rounded-2xl border border-zinc-200/90 shadow-xs hover:shadow-md hover:border-zinc-300 transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-800 mb-4 border border-zinc-200/70 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight">84%</div>
              <div className="text-sm font-semibold text-zinc-900 mt-1">Cost Reduction</div>
            </div>
            <p className="text-xs text-zinc-500 mt-3">Via model router & caching optimizations</p>
          </div>

          <div 
            ref={(el) => (metricCardsRef.current[3] = el)}
            className="bg-white p-6 rounded-2xl border border-zinc-200/90 shadow-xs hover:shadow-md hover:border-zinc-300 transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-800 mb-4 border border-zinc-200/70 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight">99.99%</div>
              <div className="text-sm font-semibold text-zinc-900 mt-1">Enterprise Uptime</div>
            </div>
            <p className="text-xs text-zinc-500 mt-3">SOC 2 Type II & VPC readiness</p>
          </div>
        </div>

        {/* Company Logos Row with Interactive Focus */}
        <div 
          ref={previewCardRef}
          className="bg-white rounded-2xl border border-zinc-200/90 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Select a customer to view operational impact
            </span>
            <span className="text-xs font-medium text-zinc-600 flex items-center gap-1 cursor-pointer hover:text-black">
              Case studies & metrics <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Logo Pills */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-8">
            {COMPANIES.map((company) => {
              const isSelected = activeCompany.id === company.id;
              return (
                <button
                  key={company.id}
                  onClick={() => handleSelectCompany(company)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 border cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-950 text-white border-zinc-950 shadow-xs scale-105'
                      : 'bg-white text-zinc-700 hover:text-zinc-950 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
                  }`}
                >
                  <Building2 className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-zinc-400'}`} />
                  <span>{company.name}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Company Preview Box */}
          <div className="bg-zinc-50/80 rounded-xl p-6 border border-zinc-200/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-800 bg-zinc-200/70 px-2 py-0.5 rounded">
                  {activeCompany.name}
                </span>
                <span className="text-xs text-zinc-500">• {activeCompany.category}</span>
              </div>
              <blockquote className="text-base sm:text-lg font-medium text-zinc-900 leading-snug">
                “{activeCompany.quote}”
              </blockquote>
              <div className="mt-3 text-xs text-zinc-600 font-medium">
                <strong className="text-zinc-900">{activeCompany.author}</strong> — {activeCompany.role}
              </div>
            </div>

            <div className="flex md:flex-col items-start md:items-end justify-between border-t md:border-t-0 md:border-l border-zinc-200/80 pt-4 md:pt-0 md:pl-8 shrink-0">
              <div className="text-left md:text-right">
                <div className="text-2xl font-bold text-zinc-950">{activeCompany.highlight}</div>
                <div className="text-xs text-zinc-500 font-medium">{activeCompany.stat}</div>
              </div>
              <button 
                type="button" 
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-black underline underline-offset-4 cursor-pointer"
              >
                Read case study <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
