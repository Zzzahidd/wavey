import React from 'react';

const CARDS = [
  {
    id: 'c1',
    eyebrow: 'Codebase Graph',
    title: 'Faster to ship.',
    desc: 'Go from natural language intent to verified AST pull requests in minutes. Test safely, promote when ready, roll back if needed.',
    img: '/inspiration/1279cb7b23a59d59017b7b133eb75900.jpg'
  },
  {
    id: 'c2',
    eyebrow: 'MicroVM Sandbox',
    title: 'Safer by default.',
    desc: 'Execute untrusted code inside hardware-isolated Firecracker microVMs with strict memory, CPU, and zero network leak policies.',
    img: '/inspiration/20bc2636c7232e133485770747b92179.jpg'
  },
  {
    id: 'c3',
    eyebrow: 'Topological DAG',
    title: 'Simpler to run.',
    desc: 'One unified autonomous platform for architectural planning, code synthesis, test execution, and GitHub pull request creation.',
    img: '/inspiration/5c2b6f444c4d92b9710d0495fbf5ba5e.jpg'
  },
  {
    id: 'c4',
    eyebrow: 'Audit Telemetry',
    title: 'Visible from day one.',
    desc: 'Every token logged, every AST diff verified, and every tool execution tracked over real-time Server-Sent Events.',
    img: '/inspiration/946ba08df3ef897e77d0abbfdc799cf2.jpg'
  }
];

export const UnkeyControlPlaneGrid: React.FC = () => {
  return (
    <section className="py-24 bg-[#FDFDFD] border-b border-zinc-200/60">
      <div className="max-w-[1330px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-900 mb-4 shadow-2xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900"></span>
            UNIFIED PLATFORM
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight leading-[1.12]">
            Unify your autonomous engineering stack with a single control plane.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
            Stop assembling your developer AI stack piece by piece. Wavey unifies codebase indexing, sub-agent planning trees, hardware-isolated sandboxes, and verified PR workflows.
          </p>
        </div>

        {/* 4-Card Interlocking Grid (Unkey layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CARDS.map((card) => (
            <div
              key={card.id}
              className="p-1.5 bg-zinc-100 rounded-3xl border border-zinc-200/90 shadow-2xs hover:shadow-md hover:border-zinc-300 transition-all duration-300 flex flex-col group cursor-pointer"
            >
              <div className="bg-white rounded-[calc(1.5rem-0.375rem)] p-5 flex-1 flex flex-col justify-between border border-zinc-200/70">
                <div>
                  <div className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                    {card.eyebrow}
                  </div>

                  {/* Illustration Container */}
                  <div className="relative aspect-[320/210] w-full rounded-xl overflow-hidden bg-zinc-50 border border-zinc-200/80 mb-5">
                    <img 
                      src={card.img} 
                      alt={card.title}
                      className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-zinc-900 mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
