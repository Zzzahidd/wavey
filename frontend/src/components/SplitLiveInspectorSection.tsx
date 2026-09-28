import React, { useState } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  Terminal, 
  ChevronRight, 
  Copy, 
  Check, 
  Code2,
  Play
} from 'lucide-react';

interface TelemetryRow {
  id: string;
  method: 'POST' | 'GET' | 'EXEC';
  path: string;
  status: number;
  duration: string;
  tokens: string;
  summary: string;
  payload: Record<string, any>;
}

const TELEMETRY_ROWS: TelemetryRow[] = [
  {
    id: 'req-1',
    method: 'POST',
    path: '/api/v1/agents/synthesize',
    status: 200,
    duration: '18ms',
    tokens: '248 tok',
    summary: 'Multi-agent plan generated with 4 sub-tasks & 2 verification gates',
    payload: {
      agentId: "agent-architect-09",
      intent: "Refactor auth middleware to use session cookies",
      steps: [
        { phase: "analyze_ast", status: "completed", duration_ms: 4 },
        { phase: "draft_diff", status: "completed", duration_ms: 8 },
        { phase: "verify_invariants", status: "passed", assertions: 14 }
      ],
      cost_usd: 0.00049,
      sandbox: "microvm-us-west-2"
    }
  },
  {
    id: 'req-2',
    method: 'GET',
    path: '/api/v1/sandbox/microvm-diff',
    status: 200,
    duration: '12ms',
    tokens: '412 tok',
    summary: 'AST diff verified: 3 files changed (+48, -12 lines)',
    payload: {
      files: [
        "src/middleware/auth.ts",
        "src/lib/session.ts",
        "tests/auth.test.ts"
      ],
      typeErrors: 0,
      lintErrors: 0,
      testSuiteRun: "passing (24/24 tests)"
    }
  },
  {
    id: 'req-3',
    method: 'POST',
    path: '/api/v1/eval/deterministic-check',
    status: 200,
    duration: '24ms',
    tokens: '180 tok',
    summary: 'Nightly eval pass rate at 99.4% across 1,420 synthetic test cases',
    payload: {
      evalSuiteId: "nightly-core-v2",
      scenariosEvaluated: 1420,
      passRate: "99.43%",
      regressionDetected: false,
      p95LatencyMs: 64
    }
  },
  {
    id: 'req-4',
    method: 'EXEC',
    path: '/api/v1/git/autonomous-pr',
    status: 200,
    duration: '31ms',
    tokens: '94 tok',
    summary: 'Autonomous PR #412 created on branch feat/session-auth',
    payload: {
      prNumber: 412,
      branch: "feat/session-auth",
      target: "main",
      status: "ready_for_review",
      checksPassed: true
    }
  }
];

export const SplitLiveInspectorSection: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<TelemetryRow>(TELEMETRY_ROWS[0]);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section className="py-20 bg-zinc-50/60 border-y border-zinc-200/70">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Context & Capabilities */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-800 mb-4 shadow-2xs w-fit">
              <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
              REAL-TIME TELEMETRY
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 tracking-tight leading-tight">
              Inspect every agent decision in sub-millisecond fidelity
            </h2>

            <p className="mt-4 text-sm sm:text-base text-zinc-600 font-normal leading-relaxed">
              Wavey logs every planning tree, tool invocation, token count, and sandbox diff into an immutable audit stream. Never debug opaque AI black boxes again.
            </p>

            {/* Feature Checklist */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-zinc-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Deterministic replay & time-travel debugging for every session</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-zinc-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Granular token usage, cost accounting, and latency percentiles</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-zinc-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Isolated sandbox telemetry with zero external network leakage</span>
              </div>
            </div>

            {/* Live endpoint pill */}
            <div className="mt-8 p-3 bg-white rounded-2xl border border-zinc-200 shadow-2xs flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-700">
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  LIVE SSE
                </span>
                <span>wss://telemetry.wavey.dev/v1/stream</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                Connected
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Live Telemetry Inspector */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-zinc-200/90 shadow-md p-5 sm:p-6 fernand-card">
            
            {/* Inspector Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-800">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-zinc-900">Execution Telemetry Stream</span>
                <span className="text-[10px] font-mono bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded">4 events / sec</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>p99: 34ms</span>
              </div>
            </div>

            {/* Telemetry Log Rows */}
            <div className="mt-4 space-y-2">
              {TELEMETRY_ROWS.map((row) => (
                <div
                  key={row.id}
                  onClick={() => setSelectedRow(row)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedRow.id === row.id
                      ? 'bg-zinc-100/90 border-zinc-400/80 shadow-xs'
                      : 'bg-zinc-50/60 border-zinc-100 hover:bg-zinc-100/60 hover:border-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                      row.method === 'POST' ? 'bg-cyan-100 text-cyan-800' :
                      row.method === 'GET' ? 'bg-emerald-100 text-emerald-800' :
                      'bg-indigo-100 text-indigo-800'
                    }`}>
                      {row.method}
                    </span>
                    <span className="font-mono text-xs font-semibold text-zinc-800 truncate">
                      {row.path}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono shrink-0">
                    <span className="text-emerald-700 font-bold">{row.status}</span>
                    <span className="text-zinc-400">{row.duration}</span>
                    <span className="text-zinc-500 bg-white px-2 py-0.5 rounded border border-zinc-200 text-[10px]">
                      {row.tokens}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Active Row Payload Viewer */}
            <div className="mt-5 p-4 bg-zinc-950 rounded-2xl text-zinc-200 font-mono text-xs border border-zinc-800 relative">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-zinc-400 text-[11px]">
                <span className="flex items-center gap-1.5 font-sans font-medium text-zinc-300">
                  <Code2 className="w-3.5 h-3.5 text-zinc-400" />
                  Payload: {selectedRow.path}
                </span>
                <button
                  onClick={handleCopy}
                  className="hover:text-white transition flex items-center gap-1 cursor-pointer"
                  title="Copy JSON"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 text-[10px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Copy JSON</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-3 text-[11px] leading-relaxed overflow-x-auto max-h-48 scrollbar-none">
                <pre className="text-emerald-400">
                  {JSON.stringify(selectedRow.payload, null, 2)}
                </pre>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
