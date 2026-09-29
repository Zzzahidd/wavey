import React, { useRef, useEffect } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, ArrowUpRight, Clock, Flame } from 'lucide-react';
import { attachMagneticCardTilt } from '../lib/gsapUtils';

interface ShippedItem {
  id: string;
  title: string;
  description: string;
  date: string;
  tag: string;
}

const RECENTLY_SHIPPED: ShippedItem[] = [
  {
    id: '1',
    title: 'Password-Protected Artifacts',
    description: 'You can now set a custom password on generated artifacts and dashboards to securely share them with external clients.',
    date: 'Sep 24, 2026',
    tag: 'Security'
  },
  {
    id: '2',
    title: 'Faster, Cheaper Agent Tasks',
    description: 'Autonomous agent tasks launch with zero cold-start latency and multi-step reasoning workflows cost 40% fewer credits.',
    date: 'Sep 24, 2026',
    tag: 'Performance'
  },
  {
    id: '3',
    title: 'Talk to Your Agents (Real-Time Voice)',
    description: 'Start an ultra-low latency voice call with any agent or Gumball to prep for meetings or kick off tasks hands-free.',
    date: 'Sep 23, 2026',
    tag: 'Audio AI'
  },
  {
    id: '4',
    title: 'Revamped Visual Agent Builder',
    description: 'Instructions, connectors, skills, triggers, and role access are now unified into a frictionless live canvas.',
    date: 'Sep 18, 2026',
    tag: 'Studio'
  },
  {
    id: '5',
    title: 'Model Router in API, SDK & CLI',
    description: 'Programmatically query the Model Router from your own backend to automatically select the optimal LLM per task.',
    date: 'Sep 17, 2026',
    tag: 'Developer'
  },
  {
    id: '6',
    title: 'GPT-6 Astra & Gemini 3.8 Flash',
    description: 'Next-gen reasoning models now live across all agent fleets with multi-step validation and tool auto-retry.',
    date: 'Sep 8, 2026',
    tag: 'Models'
  },
  {
    id: '7',
    title: 'Subagents Run in Background',
    description: 'Keep chatting with your primary agent while isolated worker subagents execute long-running tasks in parallel.',
    date: 'Sep 2, 2026',
    tag: 'Architecture'
  }
];

export const GumloopRecentlyShipped: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    cardsRef.current.forEach((card) => {
      if (card) {
        cleanups.push(attachMagneticCardTilt(card, { maxTilt: 3, scale: 1.01 }));
      }
    });
    return () => cleanups.forEach((c) => c());
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-200/80">
      <div className="max-w-6xl mx-auto">
        
        {/* Header with Changelog Link & Navigation Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <a 
              href="#changelog" 
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-950 uppercase tracking-wider mb-2 group transition-colors cursor-pointer"
            >
              <span>See what’s new</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-950 tracking-tight leading-tight">
              Recently shipped
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-9 h-9 rounded-full bg-white border border-zinc-200 hover:border-zinc-300 flex items-center justify-center text-zinc-700 hover:text-black shadow-2xs transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-9 h-9 rounded-full bg-white border border-zinc-200 hover:border-zinc-300 flex items-center justify-center text-zinc-700 hover:text-black shadow-2xs transition-all cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Timeline Rail */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 pt-2 scrollbar-none scroll-smooth snap-x"
        >
          {RECENTLY_SHIPPED.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="w-[300px] sm:w-[320px] shrink-0 bg-white rounded-2xl p-6 border border-zinc-200 shadow-xs hover:border-zinc-300 transition-all flex flex-col justify-between snap-start cursor-pointer select-none"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="px-2.5 py-0.5 bg-zinc-100 text-zinc-800 rounded-md font-semibold text-[11px] border border-zinc-200">
                    {item.tag}
                  </span>
                  <span className="text-zinc-400 font-medium text-[11px]">{item.date}</span>
                </div>
                <h3 className="font-bold text-base text-zinc-950 leading-snug mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500 font-medium">
                <span>Shipped to production</span>
                <span className="text-emerald-700 font-semibold">Live</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
