import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  GitFork, 
  TerminalSquare, 
  ShieldCheck, 
  CheckCircle, 
  Code, 
  Sparkles, 
  Zap, 
  ArrowRight,
  Database,
  Workflow
} from 'lucide-react';

const ARCHITECTURE_LAYERS = [
  {
    id: 'org',
    category: 'ORGANIZATIONS',
    title: 'Workspace & Access Governance',
    desc: 'Fine-grained policy controls, sovereign data residency, and enterprise SSO.',
    metrics: '4,000+ teams managed',
    codeSample: `// Organization Policy Engine\nexport const securityPolicy = {\n  dataResidency: "eu-west-1",\n  zeroDataRetention: true,\n  mcpSandboxing: "isolated-firewall"\n};`
  },
  {
    id: 'ops',
    category: 'OPERATIONS',
    title: 'Autonomous Execution Pipeline',
    desc: 'Orchestrates multi-agent tasks, task planning, and parallel dependency resolution.',
    metrics: '99.98% pipeline uptime',
    codeSample: `// Agentic Task Planner\nconst plan = await wavey.planner.synthesize({\n  goal: "Build authentication and Stripe checkout",\n  concurrency: 4,\n  invariants: ["strict-typecheck", "unit-tests"]\n});`
  },
  {
    id: 'infra',
    category: 'INFRASTRUCTURE',
    title: 'Isolated Agentic Sandbox',
    desc: 'Disposable microVMs with dedicated CPU, memory limits, and zero host access.',
    metrics: '< 18ms sandbox boot time',
    codeSample: `// MicroVM Sandbox Runtime\nconst runtime = await sandbox.spawn({\n  image: "node:22-alpine",\n  memoryLimit: "1024MB",\n  networkAllowlist: ["api.stripe.com", "github.com"]\n});`
  },
  {
    id: 'models',
    category: 'SYSTEMS & MODELS',
    title: 'Multi-Model Routing Kernel',
    desc: 'Dynamically routes reasoning, code completion, and refactoring to the optimal model.',
    metrics: '32ms avg time-to-first-token',
    codeSample: `// Dynamic Model Routing\nconst model = router.select({\n  taskType: "ast-refactor",\n  preferredEngine: "gemini-2.5-pro",\n  fallback: "claude-3-7-sonnet"\n});`
  }
];

export const AgentArchitectureSection: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState(ARCHITECTURE_LAYERS[1]);

  return (
    <section id="architecture" className="py-24 bg-[#FDFDFD] border-t border-zinc-200/80 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-800 mb-4">
            <Cpu className="w-3.5 h-3.5 text-zinc-900" />
            <span>ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight">
            People. Platforms. Systems.
          </h2>
          <p className="mt-3 text-base text-zinc-600 leading-relaxed">
            A layered, deterministic execution stack engineered for high-assurance software synthesis.
          </p>
        </div>

        {/* Interactive Architecture Stack Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive Layer Cards */}
          <div className="lg:col-span-6 space-y-4">
            {ARCHITECTURE_LAYERS.map((layer, idx) => {
              const isSelected = selectedLayer.id === layer.id;
              return (
                <div
                  key={layer.id}
                  onClick={() => setSelectedLayer(layer)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-black shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/10'
                      : 'bg-white/70 border-zinc-200 hover:border-zinc-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-bold tracking-widest text-zinc-700 uppercase font-mono">
                      {layer.category}
                    </div>
                    <span className="text-xs font-semibold text-zinc-400 font-mono">0{idx + 1}</span>
                  </div>
                  
                  <h3 className="text-base font-bold text-zinc-900 mt-1">
                    {layer.title}
                  </h3>
                  
                  <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                    {layer.desc}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-zinc-100">
                    <span className="font-semibold text-emerald-600 font-mono">{layer.metrics}</span>
                    <span className="text-zinc-900 font-bold flex items-center gap-1 hover:underline">
                      Inspect Stack <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Live Interactive Code & Pipeline Telemetry Window */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-zinc-200/90 shadow-xl p-6 relative overflow-hidden fernand-card">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80"></div>
                </div>
                <span className="text-xs font-mono text-zinc-500 ml-2">wavey-kernel://{selectedLayer.id}-spec</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-mono">
                Active Layer
              </span>
            </div>

            {/* Code view */}
            <div className="mt-4 bg-zinc-950 text-zinc-200 p-4 rounded-2xl font-mono text-xs leading-relaxed overflow-x-auto shadow-inner">
              <div className="text-zinc-500 mb-2 select-none">// Specification: {selectedLayer.title}</div>
              <pre className="text-zinc-100">{selectedLayer.codeSample}</pre>
            </div>

            {/* Real-time telemetry badges */}
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                <div className="text-[10px] text-zinc-400 uppercase font-semibold font-mono">Latency</div>
                <div className="text-base font-bold text-zinc-900 mt-0.5">24ms</div>
              </div>
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                <div className="text-[10px] text-zinc-400 uppercase font-semibold font-mono">AST Integrity</div>
                <div className="text-base font-bold text-emerald-600 mt-0.5">100%</div>
              </div>
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                <div className="text-[10px] text-zinc-400 uppercase font-semibold font-mono">Verification</div>
                <div className="text-base font-bold text-zinc-900 mt-0.5">Passed</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
