import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Sliders, 
  Terminal, 
  Play, 
  RotateCw, 
  Cpu, 
  Sparkles, 
  ShieldCheck, 
  TrendingDown, 
  TrendingUp, 
  FileCode, 
  Check, 
  ArrowUpRight,
  GitCommit,
  Flame
} from 'lucide-react';

export const DeveloperIntelligenceBento: React.FC = () => {
  // Card A: Evals State
  const [evalTab, setEvalTab] = useState<'Summary' | 'Cases' | 'Diff'>('Summary');
  const [isPromoted, setIsPromoted] = useState(false);
  const [casesCount, setCasesCount] = useState(312);

  // Card B: Cost & Error Rate Threshold Slider
  const [alertThreshold, setAlertThreshold] = useState<number>(2.0);

  // Card C: Live Code Sandbox Editor Tab
  const [activeCodeFile, setActiveCodeFile] = useState<'App.tsx' | 'agent.config.ts' | 'schema.prisma'>('App.tsx');
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [sandboxOutput, setSandboxOutput] = useState('Sandbox initialized. Ready to execute.');

  // Card D: Model Switcher
  const [selectedBenchmarkModel, setSelectedBenchmarkModel] = useState<'gemini' | 'claude' | 'antigravity'>('gemini');

  // Card E: Terminal Agent
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    '$ wavey agents:init --stack=react-node-mongo',
    '✓ Synthesized AST for 14 workspace files in 42ms',
    '✓ Passed 28 typecheck invariants with 0 errors',
    '● Continuous agent loop active on port 5173'
  ]);
  const [terminalInput, setTerminalInput] = useState('');

  const handlePromote = () => {
    setIsPromoted(true);
    setTimeout(() => setIsPromoted(false), 3000);
  };

  const handleRunCode = () => {
    setIsRunningCode(true);
    setSandboxOutput('Executing in isolated microVM sandbox...');
    setTimeout(() => {
      setIsRunningCode(false);
      setSandboxOutput('✓ Component compiled successfully. Rendered 1 view in 12ms. 0 memory leaks.');
    }, 800);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    const cmd = terminalInput.trim();
    setTerminalHistory(prev => [
      ...prev,
      `$ ${cmd}`,
      cmd === 'test' ? '✓ 42/42 unit & integration tests passed in 1.2s' :
      cmd === 'build' ? '✓ Production build bundle completed in 2.4s (gzip: 42.1kb)' :
      cmd === 'deploy' ? '🚀 Deployed live preview to https://wavey.preview.dev/b489' :
      cmd === 'git' ? 'On branch main. Changes committed locally: "feat: add autonomous synthesis"' :
      `✓ Executed: ${cmd}`
    ]);
    setTerminalInput('');
  };

  return (
    <section id="intelligence" className="py-24 bg-[#FDFDFD] border-t border-zinc-200/80">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-800 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#5E1312]" />
            <span>DEVELOPER INTELLIGENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight">
            Evals, telemetry & autonomous sandboxes.
          </h2>
          <p className="mt-3 text-base text-zinc-600 leading-relaxed">
            Engineered with deep observability and high-density developer ergonomics.
          </p>
        </div>

        {/* =========================================================================
            BENTO GRID (Inspired by cards inspiration in white double-bezel format)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* =======================================================================
              CARD 1: EVAL · NIGHTLY REGRESSION RUNNER (7 Columns)
             ======================================================================= */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 flex flex-col justify-between hover:border-zinc-300 transition-all">
            
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-800 border border-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-[#5E1312]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900">Eval · nightly-regression</h3>
                    <div className="text-[11px] text-zinc-500 font-mono">v15 candidate vs v14 production · {casesCount} cases</div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl border border-zinc-200">
                  {(['Summary', 'Cases', 'Diff'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setEvalTab(tab)}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                        evalTab === tab ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-500 hover:text-zinc-900'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pass Rate & 14 Runs Sparkline */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 py-4 items-center">
                <div className="sm:col-span-5">
                  <div className="text-[11px] font-semibold text-zinc-500 uppercase">Pass rate</div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black text-zinc-900 tracking-tight">92.3%</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      +2.6 pt
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs mt-2 text-zinc-600">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> 288 Passed</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500"></span> 19 Failed</span>
                  </div>
                </div>

                <div className="sm:col-span-7">
                  <div className="flex justify-between text-[11px] text-zinc-500 font-medium mb-1">
                    <span>Pass rate · last 14 runs</span>
                    <span className="text-zinc-400">threshold 90%</span>
                  </div>
                  <div className="h-14 w-full relative bg-zinc-50 rounded-xl p-2 border border-zinc-100">
                    <svg className="w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
                      <path
                        d="M 0 30 L 15 28 L 30 25 L 45 27 L 60 20 L 75 22 L 90 18 L 105 16 L 120 19 L 135 14 L 150 12 L 165 15 L 180 8 L 200 6"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2.5"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Evaluator List */}
              <div className="space-y-2 mt-2 font-mono text-xs">
                {[
                  { name: 'refund_policy_judge', type: 'LLM judge', pass: 97, change: '+1.2', changeColor: 'text-emerald-600' },
                  { name: 'tone_and_empathy', type: 'LLM judge', pass: 94, change: '+3.8', changeColor: 'text-emerald-600' },
                  { name: 'no_pii_leak', type: 'Regex', pass: 100, change: '—', changeColor: 'text-zinc-400' },
                  { name: 'escalation_correct', type: 'Human label', pass: 88, change: '+4.1', changeColor: 'text-emerald-600' },
                  { name: 'latency_under_3s', type: 'Metric', pass: 83, change: '-1.6', changeColor: 'text-rose-600' },
                ].map(evaluator => (
                  <div key={evaluator.name} className="flex items-center justify-between p-2 rounded-xl bg-zinc-50 border border-zinc-100 hover:bg-zinc-100/70 transition">
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-800 font-medium">{evaluator.name}</span>
                      <span className="text-[10px] font-sans px-2 py-0.5 rounded bg-zinc-200/80 text-zinc-700 font-semibold">
                        {evaluator.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Bar */}
                      <div className="w-24 bg-zinc-200 h-2 rounded-full overflow-hidden hidden sm:block">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${evaluator.pass}%` }}></div>
                      </div>
                      <span className="font-bold text-zinc-900 w-10 text-right">{evaluator.pass}%</span>
                      <span className={`font-bold w-8 text-right ${evaluator.changeColor}`}>{evaluator.change}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Actions Footer */}
            <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
              <div className="text-xs text-zinc-500 font-medium">
                Ran 03:10 · 4m 12s · $1.84
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => alert('Viewing 19 failed test traces in isolated log inspector.')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-zinc-800 bg-zinc-100 hover:bg-zinc-200 rounded-xl border border-zinc-200 transition"
                >
                  Open Failed Cases
                </button>
                <button
                  onClick={handlePromote}
                  className={`px-4 py-1.5 text-xs font-bold rounded-xl transition ${
                    isPromoted ? 'bg-emerald-600 text-white' : 'bg-[#5E1312] text-white hover:opacity-90 shadow-sm'
                  }`}
                >
                  {isPromoted ? '✓ Promoted v15' : 'Promote v15'}
                </button>
              </div>
            </div>

          </div>

          {/* =======================================================================
              CARD 2: LLM COST & TOOL ERROR RATE (5 Columns)
             ======================================================================= */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Top Sub-Card: LLM Cost */}
            <div className="bg-white rounded-3xl border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 hover:border-zinc-300 transition-all">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <span className="text-xs font-bold text-zinc-900">LLM cost · By model</span>
                <span className="text-[11px] text-zinc-400 font-mono">last 7 days</span>
              </div>

              <div className="flex items-baseline justify-between mt-3">
                <span className="text-2xl font-black text-zinc-900">$2,184</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  -9% vs prior week
                </span>
              </div>

              {/* Bar breakdown */}
              <div className="space-y-2 mt-3 text-xs font-mono">
                <div className="flex justify-between items-center text-zinc-600">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-[#5E1312]"></span>
                    triage-l · v14
                  </span>
                  <span className="font-bold text-zinc-800">$1,410</span>
                </div>
                <div className="flex justify-between items-center text-zinc-600">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-zinc-600"></span>
                    triage-s · fallback
                  </span>
                  <span className="font-bold text-zinc-800">$620</span>
                </div>
                <div className="flex justify-between items-center text-zinc-600">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-zinc-300"></span>
                    judge · evals
                  </span>
                  <span className="font-bold text-zinc-800">$154</span>
                </div>
              </div>
            </div>

            {/* Bottom Sub-Card: Tool Error Rate with Interactive Slider */}
            <div className="bg-white rounded-3xl border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 hover:border-zinc-300 transition-all">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-zinc-700" />
                  <span className="text-xs font-bold text-zinc-900">Tool error rate</span>
                </div>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                  1 alert · 14:35
                </span>
              </div>

              <div className="flex items-baseline justify-between mt-3">
                <span className="text-2xl font-black text-zinc-900">0.8%</span>
                <span className="text-xs font-medium text-zinc-500">
                  Alert threshold: <strong className="text-zinc-900">{alertThreshold}%</strong>
                </span>
              </div>

              {/* Interactive threshold slider */}
              <div className="mt-3">
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
                  value={alertThreshold}
                  onChange={(e) => setAlertThreshold(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#5E1312]"
                />
              </div>

              <div className="space-y-1.5 mt-3 text-xs font-mono">
                <div className="flex justify-between text-zinc-600">
                  <span>crm.lookup · timeout</span>
                  <span className="font-bold text-rose-600">2.9%</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>kb.search</span>
                  <span className="font-bold text-emerald-600">0.3%</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* =========================================================================
            ROW 2: LIVE INTERACTIVE CODE SANDBOX & TERMINAL AGENT
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          
          {/* =======================================================================
              CARD 3: LIVE CODE SANDBOX & COMPONENT SYNTHESIZER (7 Columns)
             ======================================================================= */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 hover:border-zinc-300 transition-all">
            
            {/* Header & File Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-[#5E1312]" />
                <span className="text-xs font-bold text-zinc-900">Code Synthesis Sandbox</span>
              </div>

              <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl border border-zinc-200">
                {(['App.tsx', 'agent.config.ts', 'schema.prisma'] as const).map(file => (
                  <button
                    key={file}
                    onClick={() => setActiveCodeFile(file)}
                    className={`px-2.5 py-1 text-xs font-mono rounded-lg transition ${
                      activeCodeFile === file ? 'bg-white text-zinc-900 font-bold shadow-2xs' : 'text-zinc-500 hover:text-zinc-800'
                    }`}
                  >
                    {file}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Content */}
            <div className="mt-3 p-4 bg-zinc-950 text-zinc-200 rounded-2xl font-mono text-xs leading-relaxed overflow-x-auto shadow-inner">
              {activeCodeFile === 'App.tsx' && (
                <pre>{`import React, { useState } from 'react';\nimport { createSoftwareAgent } from '@wavey/core';\n\nexport default function App() {\n  const [status, setStatus] = useState('idle');\n\n  const handleBuild = async () => {\n    setStatus('synthesizing');\n    const agent = await createSoftwareAgent({ model: 'gemini-2.5-pro' });\n    await agent.generateFullStackApp({\n      goal: 'Build collaborative AI coding environment',\n      deployTarget: 'vercel'\n    });\n    setStatus('ready');\n  };\n\n  return (\n    <div className="p-6 bg-[#FDFDFD] rounded-2xl border border-zinc-200">\n      <h1 className="text-lg font-bold">Wavey Autonomous App</h1>\n      <button onClick={handleBuild} className="mt-4 px-4 py-2 bg-[#5E1312] text-white rounded-lg">\n        {status === 'synthesizing' ? 'Building...' : 'Launch Agent'}\n      </button>\n    </div>\n  );\n}`}</pre>
              )}
              {activeCodeFile === 'agent.config.ts' && (
                <pre>{`export default defineAgentConfig({\n  name: 'Wavey Autonomous Architect',\n  invariants: {\n    typeSafety: 'strict',\n    testThreshold: 0.95,\n    securityScan: 'zero-cve'\n  },\n  tools: ['git', 'monaco', 'terminal', 'mcp-database']\n});`}</pre>
              )}
              {activeCodeFile === 'schema.prisma' && (
                <pre>{`model SoftwareProject {\n  id          String   @id @default(uuid())\n  title       String\n  codeTree    Json\n  authorId    String\n  createdAt   DateTime @default(now())\n  verified    Boolean  @default(true)\n}`}</pre>
              )}
            </div>

            {/* Execution Sandbox Output Pane */}
            <div className="mt-3 p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{sandboxOutput}</span>
              </div>
              <button
                onClick={handleRunCode}
                disabled={isRunningCode}
                className="px-3 py-1.5 bg-zinc-900 text-white hover:bg-zinc-800 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition active:scale-95"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{isRunningCode ? 'Compiling...' : 'Run Simulation'}</span>
              </button>
            </div>

          </div>

          {/* =======================================================================
              CARD 4: AUTONOMOUS AGENT TERMINAL (5 Columns)
             ======================================================================= */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 flex flex-col justify-between hover:border-zinc-300 transition-all font-mono">
            
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-zinc-800" />
                  <span className="text-xs font-bold text-zinc-900 font-sans">Wavey CLI & Agent Terminal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-zinc-400">pnpm · node 24</span>
                </div>
              </div>

              {/* Terminal Log Output Window */}
              <div className="mt-3 p-3.5 bg-zinc-950 text-zinc-300 rounded-2xl text-[11px] leading-relaxed h-52 overflow-y-auto space-y-1 shadow-inner">
                {terminalHistory.map((line, idx) => (
                  <div key={idx} className={line.startsWith('$') ? 'text-zinc-400 font-bold' : line.startsWith('✓') ? 'text-emerald-400' : line.startsWith('🚀') ? 'text-cyan-300' : 'text-zinc-200'}>
                    {line}
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Terminal Prompt Input Form */}
            <form onSubmit={handleTerminalSubmit} className="mt-3 flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="type: test, build, deploy, or git..."
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-6 pr-3 py-1.5 text-xs text-zinc-900 outline-none focus:border-zinc-400 transition"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#5E1312] text-white rounded-xl text-xs font-semibold hover:opacity-90 transition active:scale-95"
              >
                Send
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
};
