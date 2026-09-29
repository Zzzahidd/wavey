import React, { useState } from 'react';
import { 
  GitBranch, 
  Terminal, 
  ShieldCheck, 
  Check, 
  Copy, 
  Play, 
  CheckCircle2, 
  ArrowRight,
  Code2,
  Cpu,
  Layers
} from 'lucide-react';

interface TabItem {
  id: string;
  number: string;
  tag: string;
  title: string;
  description: string;
}

const TABS: TabItem[] = [
  {
    id: 'pr-synthesis',
    number: '01',
    tag: 'Autonomous PR Engine',
    title: 'From natural language to verified AST pull requests',
    description: 'Wavey analyzes your complete repository graph, generates surgical AST edits across multiple files, runs automated test suites, and opens clean GitHub pull requests without hallucination.'
  },
  {
    id: 'microvm-sandbox',
    number: '02',
    tag: 'Hardware Isolation',
    title: 'Disposable Firecracker MicroVM sandboxes in <20ms',
    description: 'Every code execution, lint check, and integration test runs inside a disposable microVM with dedicated kernel boundaries, zero host access, and strict network isolation.'
  },
  {
    id: 'multi-agent-dag',
    number: '03',
    tag: 'Topological DAGs',
    title: 'Multi-agent orchestration with invariant verification',
    description: 'Complex software initiatives are decomposed into topological dependency graphs. Specialized planner, coder, and verifier agents collaborate deterministically.'
  }
];

export const MinimalFeatureShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('pr-synthesis');
  const [copied, setCopied] = useState<boolean>(false);
  const [testRunning, setTestRunning] = useState<boolean>(false);
  const [testsPassed, setTestsPassed] = useState<boolean>(true);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunTests = () => {
    setTestRunning(true);
    setTestsPassed(false);
    setTimeout(() => {
      setTestRunning(false);
      setTestsPassed(true);
    }, 900);
  };

  return (
    <section className="py-24 bg-[#FDFDFD]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-[11px] font-mono font-medium text-zinc-800 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>SYSTEM CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight leading-[1.15]">
            Engineered for developers who demand determinism.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
            No autocomplete fluff. Wavey runs a verifiable agent pipeline directly alongside your existing toolchain.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-white border-zinc-300 shadow-sm ring-1 ring-black/5'
                    : 'bg-zinc-50/70 border-zinc-200/70 hover:bg-white hover:border-zinc-300 text-zinc-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-xs font-bold ${isActive ? 'text-zinc-900' : 'text-zinc-400'}`}>
                    {tab.number}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    isActive ? 'bg-zinc-900 text-white' : 'bg-zinc-200/80 text-zinc-600'
                  }`}>
                    {tab.tag}
                  </span>
                </div>
                <h3 className={`text-sm font-semibold leading-snug ${isActive ? 'text-zinc-900' : 'text-zinc-700'}`}>
                  {tab.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Double-Bezel Showcase Container */}
        <div className="p-1.5 sm:p-2 bg-zinc-100 rounded-[2rem] border border-zinc-200/80 shadow-xs">
          <div className="bg-white rounded-[calc(2rem-0.375rem)] border border-zinc-200/90 p-6 sm:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
            
            {activeTab === 'pr-synthesis' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                    01 // Automated Git Workflow
                  </span>
                  <h4 className="text-xl sm:text-2xl font-bold text-zinc-900 leading-tight">
                    Atomic multi-file edits with verified AST diffs
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    Wavey doesn't guess syntax. It constructs an abstract syntax tree of your workspace, verifies imports, typechecks all downstream references, and packages changes into an atomic commit.
                  </p>

                  <div className="pt-2 flex flex-col gap-2 font-mono text-xs text-zinc-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero hallucinated dependencies or ghost APIs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Automatic regression tests generated for each patch</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>One-click GitHub pull request with changelog</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-zinc-950 rounded-2xl p-4 sm:p-5 text-zinc-100 font-mono text-xs border border-zinc-800 shadow-lg overflow-hidden">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-[11px] text-zinc-400">
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-zinc-300 font-semibold">pr/feat-jwt-session-auth</span>
                      <span className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded text-[10px]">Verified</span>
                    </div>
                    <button
                      onClick={() => handleCopy('git fetch && git checkout pr/feat-jwt-session-auth')}
                      className="hover:text-white transition flex items-center gap-1 cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span className="text-[10px]">{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="mt-3 space-y-1 text-[11px] leading-relaxed">
                    <p className="text-zinc-500">// src/middleware/session.ts</p>
                    <p className="text-emerald-400">+ export async function verifySessionToken(token: string): Promise&lt;Session&gt; &#123;</p>
                    <p className="text-emerald-400">+   const payload = await jwtVerify(token, SECRET_KEY, &#123; algorithms: ['HS256'] &#125;);</p>
                    <p className="text-emerald-400">+   return sessionSchema.parse(payload);</p>
                    <p className="text-emerald-400">+ &#125;</p>
                    <p className="text-rose-400">- export function legacyCheck(req: any) &#123; return req.cookies.auth; &#125;</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px]">
                    <span className="text-zinc-400 font-mono">3 files modified · 0 type errors</span>
                    <button
                      onClick={handleRunTests}
                      disabled={testRunning}
                      className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Play className={`w-3 h-3 ${testRunning ? 'animate-spin' : 'text-emerald-400'}`} />
                      <span>{testRunning ? 'Running tests...' : testsPassed ? '✓ 24/24 Passing' : 'Run tests'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'microvm-sandbox' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                    02 // Firecracker Isolation
                  </span>
                  <h4 className="text-xl sm:text-2xl font-bold text-zinc-900 leading-tight">
                    MicroVM execution environments booting in 18ms
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    Never run untrusted AI-generated code on your host machine or shared containers. Every execution runs within a hardware-isolated Firecracker microVM that is discarded immediately after verification.
                  </p>

                  <div className="pt-2 flex flex-col gap-2 font-mono text-xs text-zinc-700">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>KVM-level hardware virtualization security</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Strict memory, CPU, and disk quota enforcement</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero external network leaks or credential exposure</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-zinc-950 rounded-2xl p-4 sm:p-5 text-zinc-100 font-mono text-xs border border-zinc-800 shadow-lg">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-[11px] text-zinc-400">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-zinc-300 font-semibold">Firecracker MicroVM Manager</span>
                    </div>
                    <span className="text-emerald-400 font-bold text-[10px]">ACTIVE · 18ms boot</span>
                  </div>

                  <div className="mt-3 space-y-2 text-[11px] leading-relaxed">
                    <div className="p-2.5 bg-zinc-900 rounded-xl border border-zinc-800">
                      <span className="text-zinc-400">VM-ID: </span>
                      <span className="text-cyan-300">fcracker-vm-9941a</span>
                      <div className="mt-1 flex items-center justify-between text-zinc-500 text-[10px]">
                        <span>vCPU: 2 Cores</span>
                        <span>Memory: 512 MB</span>
                        <span>State: Ephemeral</span>
                      </div>
                    </div>
                    <div className="p-2.5 bg-zinc-900 rounded-xl border border-zinc-800">
                      <span className="text-zinc-400">Status: </span>
                      <span className="text-emerald-400">Test suite executed with 0 exits and clean tear-down.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'multi-agent-dag' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                    03 // Topological Trees
                  </span>
                  <h4 className="text-xl sm:text-2xl font-bold text-zinc-900 leading-tight">
                    Structured sub-agent DAGs with invariant checks
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    Large tasks aren't dumped into a single prompt. Wavey creates a topological execution DAG where individual agents solve, verify, and pass typed results to downstream workers.
                  </p>

                  <div className="pt-2 flex flex-col gap-2 font-mono text-xs text-zinc-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Strict dependency resolution before step execution</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Automatic rollbacks if verification invariants fail</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Deterministic replay for any previous execution</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-zinc-950 rounded-2xl p-4 sm:p-5 text-zinc-100 font-mono text-xs border border-zinc-800 shadow-lg">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-[11px] text-zinc-400">
                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="text-zinc-300 font-semibold">Topological Plan DAG</span>
                    </div>
                    <span className="text-indigo-400 text-[10px]">3/3 NODES RESOLVED</span>
                  </div>

                  <div className="mt-3 space-y-2 text-[11px]">
                    <div className="p-2.5 bg-zinc-900/90 rounded-xl border border-zinc-800 flex items-center justify-between">
                      <span className="text-zinc-300">Node A: Schema Definition & AST Validator</span>
                      <span className="text-emerald-400 font-bold">✓ PASSED</span>
                    </div>
                    <div className="p-2.5 bg-zinc-900/90 rounded-xl border border-zinc-800 flex items-center justify-between">
                      <span className="text-zinc-300">Node B: Migration Generator & Typecheck</span>
                      <span className="text-emerald-400 font-bold">✓ PASSED</span>
                    </div>
                    <div className="p-2.5 bg-zinc-900/90 rounded-xl border border-zinc-800 flex items-center justify-between">
                      <span className="text-zinc-300">Node C: End-to-End Test Suite Run</span>
                      <span className="text-emerald-400 font-bold">✓ PASSED</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
