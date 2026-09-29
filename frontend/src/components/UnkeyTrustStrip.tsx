import React from 'react';

const LOGOS = [
  { name: 'GitHub', label: 'GitHub' },
  { name: 'Linear', label: 'Linear' },
  { name: 'Vercel', label: 'Vercel' },
  { name: 'Supabase', label: 'Supabase' },
  { name: 'Mintlify', label: 'Mintlify' },
  { name: 'Cal.com', label: 'Cal.com' },
];

export const UnkeyTrustStrip: React.FC = () => {
  return (
    <section className="py-12 bg-[#FDFDFD] border-b border-zinc-200/60">
      <div className="max-w-[1330px] mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-[0.2em] mb-6">
          Powering autonomous engineering teams worldwide
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 hover:opacity-100 transition-opacity duration-300">
          {LOGOS.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold tracking-tight text-zinc-800 select-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
              <span>{logo.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
