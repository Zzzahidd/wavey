import React from 'react';
import { 
  Workflow, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Terminal,
  Cpu,
  ArrowRight
} from 'lucide-react';

const CORE_VALUES = [
  {
    id: 'synthesis',
    title: 'Multi-Agent Synthesis',
    subtitle: 'Edits 20+ interrelated repository files atomically in one coherent pass.',
    latency: '42ms parse',
    icon: Workflow
  },
  {
    id: 'evals',
    title: 'Deterministic Evals',
    subtitle: 'Passes automated typecheck & regression suites before proposing code diffs.',
    latency: '92.3% pass rate',
    icon: CheckCircle2
  },
  {
    id: 'sandboxes',
    title: 'Isolated MicroVMs',
    subtitle: 'Executes tests and builds in disposable, sandboxed execution environments.',
    latency: '< 18ms boot',
    icon: ShieldCheck
  },
  {
    id: 'streaming',
    title: 'Real-Time Streaming',
    subtitle: 'Direct SSE token streaming with Gemini 2.5 Pro and Claude 3.7 Sonnet engines.',
    latency: '32ms TTFT',
    icon: Zap
  },
  {
    id: 'sovereignty',
    title: 'Zero Data Retention',
    subtitle: 'Proprietary code is never stored or used to train public foundation models.',
    latency: 'SOC2 Type II',
    icon: Cpu
  }
];

export const CoreValueGrid: React.FC = () => {
  return (
    <section className="py-20 bg-[#FDFDFD]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-800 mb-3 font-mono">
            <span>ENGINEERING PRINCIPLES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight">
            Built from first principles for mission-critical software.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl">
            A deterministic developer engine that turns natural language intent into verified, production-ready codebases.
          </p>
        </div>

        {/* 5-Column Feature Grid (Matching Fernand Section 2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CORE_VALUES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-5 bg-white rounded-3xl border border-zinc-200/90 shadow-2xs hover:shadow-md hover:border-black/20 transition-all duration-200 flex flex-col justify-between fernand-card cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-800 group-hover:bg-[#111111] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-zinc-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-zinc-900 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>Metric</span>
                  <span className="font-semibold text-zinc-800 group-hover:text-black transition-colors">{item.latency}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
