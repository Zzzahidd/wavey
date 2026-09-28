import React, { useRef, useState } from 'react';
import { 
  GitBranch, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  Lock, 
  Terminal, 
  ChevronLeft, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';

interface FeatureCard {
  id: string;
  icon: React.ElementType;
  title: string;
  category: string;
  desc: string;
  badge: string;
  linkText: string;
}

const FEATURES: FeatureCard[] = [
  {
    id: 'sync',
    icon: GitBranch,
    category: 'Source Control',
    title: 'Bidirectional Git & Repo Sync',
    desc: 'Deep AST codebase graph indexing with zero-lag branch sync, automated PR creation, and native review comments.',
    badge: 'Live AST Sync',
    linkText: 'Explore Git engine'
  },
  {
    id: 'planning',
    icon: Terminal,
    category: 'Orchestration',
    title: 'Deterministic Planning Gates',
    desc: 'Multi-phase architectural blueprints with approval checkpoints and invariant checks before code generation starts.',
    badge: 'Sub-agent trees',
    linkText: 'Read about planner'
  },
  {
    id: 'microvm',
    icon: Cpu,
    category: 'Runtime Sandbox',
    title: 'Isolated MicroVM Sandboxes',
    desc: 'Disposable Linux microVMs booting in under 200ms with strict CPU, memory, and outbound network isolation.',
    badge: 'Firecracker MicroVM',
    linkText: 'View sandbox spec'
  },
  {
    id: 'telemetry',
    icon: Activity,
    category: 'Observability',
    title: 'Real-Time Streaming Telemetry',
    desc: 'Sub-millisecond trace trees, per-step token consumption, and live execution diffs streamed straight to your IDE.',
    badge: 'SSE Streams',
    linkText: 'See telemetry metrics'
  },
  {
    id: 'security',
    icon: Lock,
    category: 'Sovereignty',
    title: 'Zero Data Retention Guarantee',
    desc: 'Your code never trains third-party models. Ephemeral execution layers with enterprise VPC peering.',
    badge: 'SOC2 & HIPAA',
    linkText: 'Read security whitepaper'
  },
  {
    id: 'testing',
    icon: ShieldCheck,
    category: 'Verification',
    title: 'Self-Healing Test Suites',
    desc: 'Autonomous runtime error reproduction, automated snapshot healing, and multi-tier verification before deploy.',
    badge: '99.4% Pass Rate',
    linkText: 'Inspect test runner'
  }
];

export const FeatureCarouselSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-20 bg-[#FDFDFD] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-800 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              MULTI-AGENT SYNTHESIS
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 tracking-tight leading-tight">
              Engineered for velocity without compromising quality
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-600 max-w-2xl font-normal leading-relaxed">
              Every tool and abstraction is designed to eliminate boilerplate, guarantee determinism, and accelerate full-stack delivery.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous slide"
              className={`w-10 h-10 rounded-full border border-zinc-200 bg-white flex items-center justify-center transition cursor-pointer shadow-2xs ${
                canScrollLeft ? 'text-zinc-900 hover:border-zinc-400 hover:bg-zinc-50' : 'text-zinc-300 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next slide"
              className={`w-10 h-10 rounded-full border border-zinc-200 bg-white flex items-center justify-center transition cursor-pointer shadow-2xs ${
                canScrollRight ? 'text-zinc-900 hover:border-zinc-400 hover:bg-zinc-50' : 'text-zinc-300 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-5 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="w-[300px] sm:w-[340px] shrink-0 bg-white rounded-2xl border border-zinc-200/90 p-6 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-black/20 transition-all duration-200 fernand-card snap-start cursor-pointer group"
              >
                <div>
                  {/* Icon and Category */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-zinc-900 group-hover:bg-[#111111] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider bg-zinc-100 px-2 py-0.5 rounded-md">
                      {feat.badge}
                    </span>
                  </div>

                  <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wide">
                    {feat.category}
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 mt-1 mb-2 leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-zinc-800 group-hover:text-black">
                  <span>{feat.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-black group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
