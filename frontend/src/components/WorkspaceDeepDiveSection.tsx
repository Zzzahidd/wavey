import React, { useState } from 'react';
import { 
  Sparkles, 
  Terminal, 
  Cpu, 
  Workflow, 
  CheckCircle2, 
  FileCode2, 
  GitPullRequest, 
  Activity, 
  Play, 
  RotateCw,
  ChevronRight,
  ShieldCheck,
  Zap,
  Layers
} from 'lucide-react';

const WORKSPACE_TABS = [
  { id: 'synthesis', label: '1. Prompt Synthesis', icon: Sparkles, desc: 'Transforms natural language intent into verified multi-file architecture.' },
  { id: 'ast', label: '2. AST Dependency Graph', icon: Layers, desc: 'Maps cross-module dependencies and types before writing a single character.' },
  { id: 'sandbox', label: '3. MicroVM Sandbox', icon: ShieldCheck, desc: 'Executes tests in disposable Linux microVM containers with zero host access.' },
  { id: 'pr', label: '4. Automated PR Merge', icon: GitPullRequest, desc: 'Creates clean, formatted Git commits with descriptive changelogs.' },
  { id: 'telemetry', label: '5. Production Telemetry', icon: Activity, desc: 'Real-time observability into model cost, token latency, and error suppression.' },
];

export const WorkspaceDeepDiveSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('synthesis');

  return (
    <section className="py-24 bg-[#FDFDFD] border-t border-zinc-200/70">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-800 mb-3 font-mono">
            <Workflow className="w-3.5 h-3.5 text-zinc-900" />
            <span>INTERACTIVE WORKSPACE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight">
            The autonomous developer cockpit.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
            Experience end-to-end software synthesis in a single unified interface.
          </p>
        </div>

        {/* Large Central White Double-Bezel Workspace Preview */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-zinc-200/90 shadow-xl p-5 sm:p-8 fernand-card">
          
          {/* Top Window Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-zinc-300"></span>
              <span className="w-3 h-3 rounded-full bg-zinc-300"></span>
              <span className="w-3 h-3 rounded-full bg-zinc-300"></span>
              <span className="text-xs font-mono text-zinc-400 ml-2">wavey://workspace/active-session</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Kernel: Gemini 2.5 Pro (32ms)
              </span>
            </div>
          </div>

          {/* Main Simulation Viewport (Changes based on active tab) */}
          <div className="my-6 min-h-[280px] bg-zinc-50 rounded-2xl border border-zinc-200/80 p-5 sm:p-6 font-mono text-xs flex flex-col justify-between shadow-inner">
            
            {activeTab === 'synthesis' && (
              <div>
                <div className="text-zinc-500 text-[11px] pb-2 border-b border-zinc-200 flex items-center justify-between">
                  <span>PROMPT EXECUTION STREAM</span>
                  <span className="text-emerald-600 font-bold">● Streaming Tokens</span>
                </div>
                <div className="mt-4 space-y-2 text-zinc-800 leading-relaxed">
                  <p className="text-zinc-500">// User prompt: "Build an Antigravity AI IDE with multi-agent orchestration"</p>
                  <p className="text-emerald-700 font-bold">✓ Initializing kernel architecture with strict TypeScript invariants...</p>
                  <p className="text-zinc-700">Created 4 workspace controllers: <span className="bg-white px-1.5 py-0.5 rounded border border-zinc-300 font-semibold">routes/agents.ts</span>, <span className="bg-white px-1.5 py-0.5 rounded border border-zinc-300 font-semibold">models/Session.ts</span>, <span className="bg-white px-1.5 py-0.5 rounded border border-zinc-300 font-semibold">sandbox/runner.ts</span></p>
                  <p className="text-zinc-600">Generated SSE streaming endpoint with full abort controller support.</p>
                </div>
              </div>
            )}

            {activeTab === 'ast' && (
              <div>
                <div className="text-zinc-500 text-[11px] pb-2 border-b border-zinc-200 flex items-center justify-between">
                  <span>AST DEPENDENCY GRAPH ANALYSIS</span>
                  <span className="text-cyan-700 font-bold">14 nodes indexed</span>
                </div>
                <div className="mt-4 space-y-2 text-zinc-800">
                  <p className="text-zinc-500">// Dependency resolution: wavey-kernel → prisma → express</p>
                  <p className="text-cyan-700 font-bold">✓ 0 circular imports detected across workspace</p>
                  <p className="text-zinc-700">Calculated symbol graph: 28 exported functions, 14 domain types, 0 unused variables.</p>
                  <p className="text-emerald-600 font-bold">✓ Type safety verification: Strict (0 compilation errors)</p>
                </div>
              </div>
            )}

            {activeTab === 'sandbox' && (
              <div>
                <div className="text-zinc-500 text-[11px] pb-2 border-b border-zinc-200 flex items-center justify-between">
                  <span>MICROVM ISOLATED TEST HARNESS</span>
                  <span className="text-emerald-600 font-bold">✓ All tests passing</span>
                </div>
                <div className="mt-4 space-y-2 text-zinc-800">
                  <p className="text-zinc-500">// Container ID: vm_88b49a · Memory: 24.2MB / 1024MB</p>
                  <p className="text-emerald-600 font-bold">✓ PASS test/auth.test.ts (14 tests passed in 180ms)</p>
                  <p className="text-emerald-600 font-bold">✓ PASS test/chat-stream.test.ts (8 tests passed in 95ms)</p>
                  <p className="text-emerald-600 font-bold">✓ PASS test/evals.test.ts (20 tests passed in 310ms)</p>
                  <p className="text-zinc-600 mt-2">Test suite execution finished in 0.585s. 0 memory leaks.</p>
                </div>
              </div>
            )}

            {activeTab === 'pr' && (
              <div>
                <div className="text-zinc-500 text-[11px] pb-2 border-b border-zinc-200 flex items-center justify-between">
                  <span>PULL REQUEST AUTOMATION</span>
                  <span className="text-indigo-700 font-bold">PR #412 Ready</span>
                </div>
                <div className="mt-4 space-y-2 text-zinc-800">
                  <p className="text-zinc-500">// Branch: feature/autonomous-ide-engine → main</p>
                  <p className="text-zinc-900 font-bold">Title: feat: implement autonomous IDE workflow with streaming telemetry</p>
                  <p className="text-zinc-600">Diff summary: +482 lines / -12 lines across 5 files.</p>
                  <p className="text-emerald-600 font-bold">✓ CI/CD status: Green. Ready for automated squash and merge.</p>
                </div>
              </div>
            )}

            {activeTab === 'telemetry' && (
              <div>
                <div className="text-zinc-500 text-[11px] pb-2 border-b border-zinc-200 flex items-center justify-between">
                  <span>LIVE MODEL OBSERVABILITY</span>
                  <span className="text-emerald-600 font-bold">99.99% reliability</span>
                </div>
                <div className="mt-4 space-y-2 text-zinc-800">
                  <p className="text-zinc-500">// Telemetry window: last 60 minutes</p>
                  <p className="text-zinc-900 font-bold">Tokens processed: 1.84M in / 0.71M out ($3.68 total cost)</p>
                  <p className="text-emerald-600 font-bold">✓ Cache hit ratio: 62.4% ($0.46 saved per 100k requests)</p>
                  <p className="text-zinc-600">P99 Time to First Token: 38ms (Gemini 2.5 Flash Kernel).</p>
                </div>
              </div>
            )}

            {/* Viewport Bottom Bar */}
            <div className="mt-4 pt-3 border-t border-zinc-200 flex items-center justify-between text-[11px] text-zinc-500">
              <span>Status: <strong className="text-zinc-900">Deterministic Engine Active</strong></span>
              <span>Latency: <strong className="text-emerald-600">24ms</strong></span>
            </div>

          </div>

          {/* 5 Bottom Interactive Tab Switchers */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
            {WORKSPACE_TABS.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-3 rounded-2xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-100 border border-zinc-300 shadow-2xs'
                      : 'bg-white hover:bg-zinc-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-zinc-400'}`} />
                    <span className={`text-xs font-bold ${isSelected ? 'text-zinc-900' : 'text-zinc-600'}`}>
                      {tab.label}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-snug line-clamp-2">
                    {tab.desc}
                  </p>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
