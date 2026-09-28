import React, { useState } from 'react';
import { 
  GitPullRequest, 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  FolderKanban,
  FileCode2,
  Workflow
} from 'lucide-react';

export const FeatureTrioShowcase: React.FC = () => {
  const [activeCheck, setActiveCheck] = useState<number>(2);

  return (
    <section className="py-24 bg-[#FDFDFD]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-800 mb-3 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
            <span>CORE WORKFLOWS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight">
            How autonomous software gets built.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
            From initial prompt specification to multi-file synthesis and automated regression verification.
          </p>
        </div>

        {/* 3-Card Minimalist Trio Grid (Matching Fernand Section 4) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Autonomous Planning */}
          <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-sm p-6 sm:p-7 flex flex-col justify-between fernand-card cursor-pointer">
            <div>
              {/* Top Interactive UI Preview Box */}
              <div className="p-4 bg-zinc-50/90 rounded-2xl border border-zinc-200/80 mb-6 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 mb-3">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase">Agent Task DAG</span>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">3 of 3 ready</span>
                </div>

                <div className="space-y-2">
                  {[
                    { label: 'Parse AST & schema invariants', status: '✓ done', time: '14ms' },
                    { label: 'Synthesize route controllers & DB', status: '✓ done', time: '48ms' },
                    { label: 'Compile Next.js client & preview', status: '✓ done', time: '22ms' },
                  ].map((task, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-white border border-zinc-200/70 shadow-2xs">
                      <span className="text-zinc-700 font-medium text-[11px] truncate">{task.label}</span>
                      <span className="text-emerald-600 font-bold text-[10px] shrink-0 ml-2">{task.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-lg font-bold text-zinc-900">
                Deterministic Task Planning
              </h3>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                Breaks complex user goals into acyclic dependency graphs, executing parallel steps across multiple specialized subagents.
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-zinc-900">
              <span>Inspect Planner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Real-time Quality Gates */}
          <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-sm p-6 sm:p-7 flex flex-col justify-between fernand-card cursor-pointer">
            <div>
              {/* Top Interactive UI Preview Box */}
              <div className="p-4 bg-zinc-50/90 rounded-2xl border border-zinc-200/80 mb-6 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 mb-3">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase">Quality Invariants</span>
                  <span className="text-[10px] text-zinc-500 font-bold">92.3% pass</span>
                </div>

                <div className="space-y-2">
                  <div className="p-2 rounded-xl bg-white border border-zinc-200/70 shadow-2xs flex items-center justify-between">
                    <span className="text-zinc-700 text-[11px]">Typecheck Strictness</span>
                    <span className="text-emerald-600 font-bold text-[11px]">0 errors</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-zinc-200/70 shadow-2xs flex items-center justify-between">
                    <span className="text-zinc-700 text-[11px]">Nightly Regression</span>
                    <span className="text-emerald-600 font-bold text-[11px]">288 / 312</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-zinc-200/70 shadow-2xs flex items-center justify-between">
                    <span className="text-zinc-700 text-[11px]">Security CVE Scan</span>
                    <span className="text-emerald-600 font-bold text-[11px]">Clean (0 CVE)</span>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-zinc-900">
                Automated Verification Gates
              </h3>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                Before proposing a pull request, Wavey executes unit suites, lint rules, and type checks in a sandboxed microVM container.
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-zinc-900">
              <span>View Evals Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Multi-Tool Context Badges */}
          <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-sm p-6 sm:p-7 flex flex-col justify-between fernand-card cursor-pointer">
            <div>
              {/* Top Interactive UI Preview Box */}
              <div className="p-4 bg-zinc-50/90 rounded-2xl border border-zinc-200/80 mb-6 font-sans text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 mb-3">
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Context Integrations</span>
                  <span className="text-[10px] text-cyan-700 font-bold bg-cyan-50 px-1.5 py-0.5 rounded font-mono">Live Sync</span>
                </div>

                <div className="space-y-1.5 font-sans">
                  <div className="flex items-center gap-2 p-1.5 bg-white rounded-lg border border-zinc-200/70 text-[11px]">
                    <span className="w-4 h-4 rounded bg-orange-500 text-white font-bold flex items-center justify-center text-[9px]">H</span>
                    <span className="truncate text-zinc-700">HubSpot · Acme Deal Pipeline</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 bg-white rounded-lg border border-zinc-200/70 text-[11px]">
                    <span className="w-4 h-4 rounded bg-red-500 text-white font-bold flex items-center justify-center text-[9px]">G</span>
                    <span className="truncate text-zinc-700">Gmail · Recent Technical Threads</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 bg-white rounded-lg border border-zinc-200/70 text-[11px]">
                    <span className="w-4 h-4 rounded bg-amber-500 text-white font-bold flex items-center justify-center text-[9px]">D</span>
                    <span className="truncate text-zinc-700">Drive · Architecture Specs v3.pdf</span>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-zinc-900">
                Real-World Context Ingestion
              </h3>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                Connect external databases, CRM records, and technical documentation so agents synthesize code with full organizational context.
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-zinc-900">
              <span>Explore Connectors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
