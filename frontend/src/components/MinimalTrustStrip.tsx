import React from 'react';

const ECOSYSTEM_LOGOS = [
  { name: 'GitHub', label: 'GitHub' },
  { name: 'Linear', label: 'Linear' },
  { name: 'Vercel', label: 'Vercel' },
  { name: 'Supabase', label: 'Supabase' },
  { name: 'Cloudflare', label: 'Cloudflare' },
  { name: 'Docker', label: 'Docker' },
];

export const MinimalTrustStrip: React.FC = () => {
  return (
    <section className="py-14 bg-[#FDFDFD] border-b border-zinc-100/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-medium mb-8">
          Trusted by autonomous engineering teams across the stack
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60 hover:opacity-100 transition-opacity duration-300">
          {ECOSYSTEM_LOGOS.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold tracking-tight text-zinc-800 select-none"
            >
              <span className="w-2 h-2 rounded-full bg-zinc-300"></span>
              <span>{logo.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
