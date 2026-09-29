import React, { useRef, useEffect } from 'react';
import { Sparkles, ArrowUpRight, Building2, Quote } from 'lucide-react';
import { attachMagneticCardTilt, createContinuousFloat } from '../lib/gsapUtils';

interface TestimonialItem {
  id: string;
  company: string;
  category: string;
  metric: string;
  quote: string;
  author: string;
  role: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'gusto',
    company: 'Gusto',
    category: 'Fintech & Payroll',
    metric: '$1.5M+ Additional ARR in 3 months',
    quote: 'The partnership review agent cuts prep time from 30–45 minutes per customer to under five minutes, and it results in a 31% higher win rate and 44% larger deals.',
    author: 'Matt Gould',
    role: 'Head of Insights and Operations, Gusto'
  },
  {
    id: 'instacart',
    company: 'Instacart',
    category: 'Retail & Delivery',
    metric: '100% Non-Technical AI Adoption',
    quote: 'Gumloop has been critical in helping all teams at Instacart — including those without technical skills — adopt AI and automate their workflows, which has greatly improved our operational efficiency.',
    author: 'Fidji Simo',
    role: 'CEO, Instacart'
  },
  {
    id: 'samsara',
    company: 'Samsara',
    category: 'Connected Operations SaaS',
    metric: 'Thousands of Engineering Hours Saved',
    quote: 'Gumloop turned our sales and marketing teams into builders, and saved us thousands of hours of manual work.',
    author: 'Ryan Schwartz',
    role: 'VP, Marketing Systems & Intelligence, Samsara'
  },
  {
    id: 'moderntreasury',
    company: 'Modern Treasury',
    category: 'Payment Infrastructure',
    metric: '99.9% Automated Compliance',
    quote: 'Our enterprise finance operations now run continuous autonomous reconciliations across millions of transactions with zero human delay.',
    author: 'Josh Rider',
    role: 'Director of Business Systems, Modern Treasury'
  }
];

export const GumloopTestimonials: React.FC = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    cardsRef.current.forEach((card) => {
      if (card) {
        cleanups.push(attachMagneticCardTilt(card, { maxTilt: 3.5, scale: 1.01 }));
      }
    });
    return () => cleanups.forEach((c) => c());
  }, []);

  return (
    <section className="relative w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-200/80">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-zinc-950 tracking-tight leading-tight">
            In agents, they trust
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            See how world-class enterprise teams use autonomous agent fleets to drive measurable revenue growth and operational leverage.
          </p>
        </div>

        {/* 2x2 Grid of High-Impact White Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div 
              key={t.id} 
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-xs hover:border-zinc-300 transition-all flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm sm:text-base text-zinc-950 bg-zinc-100 px-3 py-1 rounded-lg border border-zinc-200">
                      {t.company}
                    </span>
                    <span className="text-xs text-zinc-400">• {t.category}</span>
                  </div>
                  <button type="button" className="text-xs font-semibold text-zinc-700 hover:text-black flex items-center gap-1 cursor-pointer">
                    Read more <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="inline-block px-3 py-1 rounded-md bg-zinc-900 text-white text-xs font-bold mb-4 shadow-2xs">
                  {t.metric}
                </div>

                <blockquote className="text-base sm:text-lg font-medium text-zinc-900 leading-relaxed">
                  “{t.quote}”
                </blockquote>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-zinc-950">{t.author}</div>
                  <div className="text-zinc-500">{t.role}</div>
                </div>
                <Sparkles className="w-4 h-4 text-zinc-400" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
