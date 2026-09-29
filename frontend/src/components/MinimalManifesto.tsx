import React from 'react';

export const MinimalManifesto: React.FC = () => {
  return (
    <section className="py-24 bg-[#FDFDFD] border-y border-zinc-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-zinc-700 mb-8">
          <span>THE AUTONOMOUS PHILOSOPHY</span>
        </div>

        <blockquote className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight leading-[1.25]">
          “Most AI tools are glorified autocomplete. Wavey is an autonomous engineering engine that plans, writes, tests, and verifies software alongside your team.”
        </blockquote>

        <div className="mt-8 flex items-center justify-center gap-3">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=FelixArchitect" 
            alt="David Vance" 
            className="w-10 h-10 rounded-full border border-zinc-200 shadow-xs"
          />
          <div className="text-left font-mono">
            <div className="text-xs font-bold text-zinc-900">David Vance</div>
            <div className="text-[11px] text-zinc-400">Head of Agentic Infrastructure</div>
          </div>
        </div>

      </div>
    </section>
  );
};
