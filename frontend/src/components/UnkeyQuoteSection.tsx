import React from 'react';

export const UnkeyQuoteSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#FDFDFD] border-b border-zinc-200/60 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <blockquote className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight leading-snug">
          “Wavey transformed our release cycle from an unpredictable 4-day ordeal into a clean, 20-minute autonomous pipeline. It’s the first AI tool our principal engineers truly rely on.”
        </blockquote>

        <div className="mt-8 flex items-center justify-center gap-3.5">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=FelixArchitect" 
            alt="David Vance" 
            className="w-12 h-12 rounded-full border border-zinc-200 shadow-2xs"
          />
          <div className="text-left font-sans">
            <div className="text-sm font-bold text-zinc-900">David Vance</div>
            <div className="text-xs text-zinc-500">Head of Engineering · Wavey Systems</div>
          </div>
        </div>

      </div>
    </section>
  );
};
