import React from 'react';

const COMPANIES = [
  { name: 'Stripe', label: 'Stripe' },
  { name: 'OpenAI', label: 'OpenAI' },
  { name: 'Midjourney', label: 'Midjourney' },
  { name: 'Perplexity', label: 'Perplexity' },
  { name: 'Shopify', label: 'Shopify' },
  { name: 'Scale AI', label: 'Scale AI' },
  { name: 'Linear', label: 'Linear' },
];

export const CursorTrustWall: React.FC = () => {
  return (
    <section className="py-12 bg-[#FDFDFD] border-b border-zinc-200/60">
      <div className="max-w-[1330px] mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-[0.2em] mb-6">
          Accelerating code at world-class engineering teams
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 hover:opacity-100 transition-opacity duration-300">
          {COMPANIES.map((company) => (
            <div
              key={company.name}
              className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold tracking-tight text-zinc-800 select-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
              <span>{company.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
