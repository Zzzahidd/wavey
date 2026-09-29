import React, { useState } from 'react';
import { 
  GitBranch, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Layers,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

const FEATURES = [
  {
    id: 'f1',
    icon: GitBranch,
    eyebrow: 'Semantic Indexing',
    title: 'Deep Codebase Understanding',
    desc: 'Wavey constructs a full semantic AST graph of your entire repository. Reference any file, interface, or type with sub-second accuracy.',
    codeSnippet: `// Instant symbol resolution across 14,000 files
const graph = await wavey.indexGraph("./src");
const callerTree = graph.findDownstreamCallers("verifyAuth");`
  },
  {
    id: 'f2',
    icon: Terminal,
    eyebrow: 'Execution Sandboxing',
    title: 'Deterministic Tool & Terminal Execution',
    desc: 'Sub-agents run shell commands, linters, and integration tests in disposable microVMs with strict memory and CPU boundaries.',
    codeSnippet: `$ wavey sandbox execute "pnpm test"
Booting Firecracker MicroVM in 14ms...
✓ 42/42 tests passing in isolated memory`
  },
  {
    id: 'f3',
    icon: Cpu,
    eyebrow: 'Model Orchestration',
    title: 'Multi-Model Reasoning DAGs',
    desc: 'Route complex architectural planning to Claude 3.7 Sonnet, fast code generation to Gemini 2.5 Flash, and formal verification to DeepSeek R1.',
    codeSnippet: `const router = new ModelRouter({
  planner: "claude-3-7-sonnet",
  coder: "gemini-2.5-flash",
  verifier: "deepseek-r1"
});`
  },
  {
    id: 'f4',
    icon: ShieldCheck,
    eyebrow: 'Enterprise Sovereignty',
    title: 'Zero Data Retention Guarantee',
    desc: 'Your proprietary codebase never trains third-party foundation models. SOC2 Type II and HIPAA compliant with isolated VPC peering.',
    codeSnippet: `// Zero data retention invariant enforced
{
  "retention": "0_days",
  "training_allowed": false,
  "vpc_peering": "aws-us-east-1"
}`
  }
];

export const CursorFeatureGrid: React.FC = () => {
  const [mouseCoords, setMouseCoords] = useState<{ [key: string]: { x: number; y: number } }>({});

  const handleMouseMove = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseCoords((prev) => ({
      ...prev,
      [id]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }));
  };

  return (
    <section className="py-24 bg-[#FDFDFD] border-b border-zinc-200/60">
      <div className="max-w-[1330px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header without chip */}
        <div className="max-w-3xl mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight leading-[1.12]">
            Engineered for developers who demand determinism.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
            No autocomplete fluff. Wavey runs a verifiable agent pipeline directly alongside your existing toolchain.
          </p>
        </div>

        {/* 4-Quadrant Grid (Cursor style with live code blocks and mouse spotlight) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            const coords = mouseCoords[feat.id] || { x: 0, y: 0 };

            return (
              <div
                key={feat.id}
                onMouseMove={(e) => handleMouseMove(feat.id, e)}
                className="relative p-1.5 bg-zinc-100 rounded-3xl border border-zinc-200/90 shadow-2xs hover:shadow-md hover:border-zinc-300 transition-all duration-300 flex flex-col group cursor-pointer overflow-hidden"
              >
                {/* Mouse spotlight overlay */}
                <div 
                  className="absolute pointer-events-none rounded-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 -inset-px z-20"
                  style={{
                    background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(24, 24, 27, 0.05), transparent 70%)`
                  }}
                />

                <div className="bg-white rounded-[calc(1.5rem-0.375rem)] p-7 flex-1 flex flex-col justify-between border border-zinc-200/70 relative z-10">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 group-hover:bg-[#111111] group-hover:text-white transition-colors shadow-2xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider bg-zinc-50 px-2.5 py-1 rounded border border-zinc-200">
                        {feat.eyebrow}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-zinc-900 mb-2 leading-snug">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-5">
                      {feat.desc}
                    </p>
                  </div>

                  {/* Interactive Styled Code Block */}
                  <div className="p-3.5 bg-zinc-950 text-zinc-200 rounded-2xl font-mono text-xs border border-zinc-800 shadow-inner overflow-x-auto group-hover:border-zinc-700 transition-colors">
                    <pre className="text-emerald-400 text-[11px] leading-relaxed">
                      {feat.codeSnippet}
                    </pre>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
