import React from 'react';
import { Sparkles, Terminal, Code2 } from 'lucide-react';

export const ManifestoQuoteSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#FDFDFD] border-y border-zinc-200/70 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-800 mb-6 font-mono">
          <Code2 className="w-3.5 h-3.5 text-zinc-900" />
          <span>THE AUTONOMOUS MANIFESTO</span>
        </div>

        {/* Large Editorial Headline */}
        <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight leading-snug">
          “Most AI coding assistants are glorified autocomplete. Wavey is an autonomous architecture engine that writes, tests, typechecks, and deploys production software alongside you.”
        </blockquote>

        {/* Attribution Badge */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=FelixArchitect" 
            alt="Lead Architect" 
            className="w-10 h-10 rounded-full border border-zinc-200 shadow-2xs"
          />
          <div className="text-left font-mono">
            <div className="text-xs font-bold text-zinc-900">David Vance</div>
            <div className="text-[11px] text-zinc-400">Head of Agentic Infrastructure · Wavey Systems</div>
          </div>
        </div>

      </div>
    </section>
  );
};
