import React from 'react';
import { GitBranch, Layers, ArrowRight } from 'lucide-react';

export const FernandTeamGrid: React.FC = () => {
  return (
    <section className="py-20 bg-[#FDFDFD] border-t border-zinc-200/60">
      <div className="max-w-[1330px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-900 mb-4 shadow-2xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-900"></span>
          ENGINEERING CULTURE
        </div>

        <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 tracking-tight leading-tight max-w-3xl mb-4">
          Built for founders and engineering teams who move fast
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 max-w-2xl leading-relaxed mb-12 font-normal">
          Eliminate repetitive context switching and empower every engineer with autonomous software synthesis.
        </p>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Logo Pair / Integration */}
          <div className="bg-white rounded-2xl border border-zinc-200/90 p-7 flex flex-col justify-between shadow-2xs hover:border-zinc-400 hover:shadow-md transition-all duration-200 cursor-pointer group">
            <div>
              <div className="bg-zinc-50 rounded-xl p-6 flex items-center justify-center gap-4 mb-6 min-h-[140px] border border-zinc-100">
                <div className="w-14 h-14 rounded-2xl bg-white border border-zinc-200 shadow-2xs flex items-center justify-center text-zinc-900 font-bold">
                  <GitBranch className="w-6 h-6 text-zinc-900" />
                </div>
                <span className="text-zinc-400 font-light text-xl">—</span>
                <div className="w-14 h-14 rounded-2xl bg-[#111111] shadow-2xs flex items-center justify-center text-white font-bold">
                  <Layers className="w-6 h-6 text-white" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-zinc-900 mb-2">
                Bi-directional Sync
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Connect your GitHub repository and Linear board in seconds. Issue comments, pull requests, and status updates sync without manual effort.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-zinc-900 group-hover:text-black">
              <span>Learn about integrations</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-black group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 2: Pricing / Honest Tier */}
          <div className="bg-white rounded-2xl border border-zinc-200/90 p-7 flex flex-col justify-between shadow-2xs hover:border-zinc-400 hover:shadow-md transition-all duration-200 cursor-pointer group">
            <div>
              <div className="bg-zinc-50 rounded-xl p-6 flex flex-col items-center justify-center mb-6 min-h-[140px] text-center border border-zinc-100">
                <span className="text-4xl font-bold text-zinc-900 tracking-tight">$0</span>
                <span className="text-xs text-zinc-500 mt-1 font-mono">Free Community Edition</span>
                <span className="mt-2 inline-block px-2.5 py-0.5 rounded-full bg-zinc-200 text-zinc-800 text-[11px] font-mono font-medium">
                  Included forever
                </span>
              </div>

              <h3 className="text-lg font-bold text-zinc-900 mb-2">
                Generous Free Tier
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Start building with full multi-agent synthesis, Firecracker microVM execution, and Git integrations on our community tier forever.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-zinc-900 group-hover:text-black">
              <span>View transparent pricing</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-black group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 3: Agent Roster */}
          <div className="bg-white rounded-2xl border border-zinc-200/90 p-7 flex flex-col justify-between shadow-2xs hover:border-zinc-400 hover:shadow-md transition-all duration-200 cursor-pointer group">
            <div>
              <div className="bg-zinc-50 rounded-xl p-4 flex flex-col gap-2 mb-6 min-h-[140px] justify-center border border-zinc-100">
                <div className="bg-white p-2.5 rounded-lg border border-zinc-200 flex items-center justify-between text-xs shadow-2xs">
                  <span className="font-semibold text-zinc-900 font-mono">Architect Agent</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-zinc-200 flex items-center justify-between text-xs shadow-2xs">
                  <span className="font-semibold text-zinc-900 font-mono">Synthesizer Agent</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-zinc-200 flex items-center justify-between text-xs shadow-2xs">
                  <span className="font-semibold text-zinc-900 font-mono">Regression Verifier</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-zinc-900 mb-2">
                Autonomous Agent Roster
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Specialized sub-agents handle architectural planning, atomic file modifications, and deterministic testing with mathematical precision.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-zinc-900 group-hover:text-black">
              <span>Explore agent team</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-black group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
