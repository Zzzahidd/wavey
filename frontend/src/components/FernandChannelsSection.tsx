import React, { useRef, useState, useEffect } from 'react';
import { 
  GitBranch, 
  Layers, 
  MessageSquare, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';

interface ChannelCard {
  id: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  linkText: string;
  badge: string;
}

const CHANNELS: ChannelCard[] = [
  {
    id: 'github',
    icon: GitBranch,
    badge: 'Source Control',
    title: 'GitHub & GitLab Repositories',
    desc: 'Deep AST codebase graph indexing with zero-lag branch sync, automated PR creation, and native review comments.',
    linkText: 'Explore Git engine'
  },
  {
    id: 'linear',
    icon: Layers,
    badge: 'Issue Tracking',
    title: 'Linear & Jira Backlogs',
    desc: 'Convert backlog issues directly into topological agent DAGs, automatically linking PRs to issue threads upon resolution.',
    linkText: 'Learn about issue sync'
  },
  {
    id: 'ide',
    icon: Terminal,
    badge: 'Editor Native',
    title: 'VS Code & JetBrains Sync',
    desc: 'Native editor extensions with instant inline completions, terminal integration, and real-time AST validation.',
    linkText: 'Download extension'
  },
  {
    id: 'slack',
    icon: MessageSquare,
    badge: 'Team Chat',
    title: 'Slack & Discord Channels',
    desc: 'Trigger autonomous bug investigations and architectural reviews directly from conversational team channels.',
    linkText: 'Connect chat bot'
  },
  {
    id: 'microvm',
    icon: Cpu,
    badge: 'Disposable VM',
    title: 'Firecracker MicroVM Sandboxes',
    desc: 'Disposable Linux execution sandboxes booting in under 20ms with strict CPU, memory, and network isolation.',
    linkText: 'View sandbox specs'
  },
  {
    id: 'security',
    icon: ShieldCheck,
    badge: 'Sovereignty',
    title: 'Zero Data Retention VPC',
    desc: 'Zero data retention architecture with SOC2 Type II compliance and isolated on-prem or private cloud deployments.',
    linkText: 'Read security whitepaper'
  }
];

export const FernandChannelsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }
    }, 3800);

    return () => clearInterval(interval);
  }, [isHovered]);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-20 bg-[#FDFDFD] relative overflow-hidden border-t border-zinc-200/60">
      <div className="max-w-[1330px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with clean monochrome pill tag & arrow controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-900 mb-3 shadow-2xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-900"></span>
              CHANNELS
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 tracking-tight leading-tight">
              All your developer workflows in one unified inbox
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-600 max-w-2xl font-normal leading-relaxed">
              Every channel, repository, and issue tracker connects seamlessly into Wavey's autonomous execution engine.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous channel"
              className={`w-10 h-10 rounded-full border border-zinc-200 bg-white flex items-center justify-center transition cursor-pointer shadow-2xs ${
                canScrollLeft ? 'text-zinc-900 hover:border-zinc-400 hover:bg-zinc-50' : 'text-zinc-300 cursor-not-allowed opacity-40'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next channel"
              className={`w-10 h-10 rounded-full border border-zinc-200 bg-white flex items-center justify-center transition cursor-pointer shadow-2xs ${
                canScrollRight ? 'text-zinc-900 hover:border-zinc-400 hover:bg-zinc-50' : 'text-zinc-300 cursor-not-allowed opacity-40'
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
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-5 overflow-x-auto pb-6 pt-1 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CHANNELS.map((channel) => {
            const Icon = channel.icon;
            return (
              <div
                key={channel.id}
                className="w-[280px] sm:w-[320px] shrink-0 bg-white rounded-2xl border border-zinc-200/90 p-6 flex flex-col justify-between hover:border-zinc-400 hover:shadow-md transition-all duration-300 snap-start cursor-pointer group shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 shadow-2xs group-hover:bg-[#111111] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold bg-zinc-50 px-2 py-0.5 rounded border border-zinc-200">
                      {channel.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-zinc-900 mb-2 leading-snug">
                    {channel.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {channel.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-zinc-900 group-hover:text-black transition-colors">
                  <span>{channel.linkText}</span>
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
