import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Code2, 
  Copy, 
  Check, 
  ArrowRight
} from 'lucide-react';

interface EventItem {
  id: string;
  method: 'POST' | 'GET' | 'EXEC';
  path: string;
  status: number;
  duration: string;
  payload: Record<string, any>;
}

const EVENTS: EventItem[] = [
  {
    id: 'e1',
    method: 'POST',
    path: '/api/v1/agents/synthesize',
    status: 200,
    duration: '18ms',
    payload: {
      agent: "architect-09",
      target: "src/auth/session.ts",
      action: "refactor_session_store",
      invariants: "verified",
      diffLines: { added: 24, removed: 6 },
      microvm: "fcracker-us-east-1"
    }
  },
  {
    id: 'e2',
    method: 'GET',
    path: '/api/v1/sandbox/verify-ast',
    status: 200,
    duration: '12ms',
    payload: {
      typeErrors: 0,
      lintPassed: true,
      assertions: 32,
      regressionFound: false,
      latencyMs: 12
    }
  },
  {
    id: 'e3',
    method: 'EXEC',
    path: '/api/v1/git/pull-request',
    status: 200,
    duration: '28ms',
    payload: {
      prNumber: 312,
      branch: "feat/session-invariants",
      status: "ready_to_merge",
      reviewers: ["wavey-verifier-bot"]
    }
  }
];

export const FernandDataInspector: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Auto-cycle live events
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % EVENTS.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered]);

  const selectedEvent = EVENTS[selectedIndex];

  const handleCopy = () => {
    navigator.clipboard?.writeText(JSON.stringify(selectedEvent.payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      className="py-20 bg-[#FDFDFD] border-t border-zinc-200/60"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-[1330px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Fernand Endpoint Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-mono text-zinc-900 shadow-2xs">
              <span className="px-2 py-0.5 rounded bg-zinc-900 text-white font-bold text-[10px]">
                LIVE API
              </span>
              <span>POST /api/v1/events</span>
              <div className="flex items-center gap-1 pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 tracking-tight leading-tight">
              Real-time audit telemetry directly in your pipeline
            </h2>

            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
              Every agent execution, microVM diff, and Git action emits structured events over WebSockets and Server-Sent Events. Complete observability with zero opacity.
            </p>

            <div className="pt-3">
              <a 
                href="#docs" 
                className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 hover:text-black group"
              >
                <span>Explore API Documentation</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-black group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

          </div>

          {/* Right Column: Live Mockup Log */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-zinc-200/90 shadow-2xs p-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-zinc-800" />
                <span className="text-xs font-bold text-zinc-900">Execution Stream</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium flex items-center gap-1 border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Connected · 24ms p99
              </span>
            </div>

            {/* Event rows */}
            <div className="mt-4 space-y-2">
              {EVENTS.map((item, idx) => {
                const isActive = selectedIndex === idx;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedIndex(idx)}
                    className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-zinc-100/80 border-zinc-400 shadow-2xs'
                        : 'bg-white border-zinc-200/60 hover:bg-zinc-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-200 text-zinc-800">
                        {item.method}
                      </span>
                      <span className="font-mono text-xs font-semibold text-zinc-900">
                        {item.path}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono">
                      <span className="text-emerald-600 font-bold">{item.status}</span>
                      <span className="text-zinc-400 text-[11px]">{item.duration}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Payload Viewer */}
            <div className="mt-4 p-4 bg-zinc-950 rounded-xl text-zinc-200 font-mono text-xs border border-zinc-800">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-[11px] text-zinc-400">
                <span className="flex items-center gap-1.5 text-zinc-300 font-sans">
                  <Code2 className="w-3.5 h-3.5" />
                  Payload: {selectedEvent.path}
                </span>
                <button
                  onClick={handleCopy}
                  className="hover:text-white transition flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="text-[10px]">{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <pre className="mt-2.5 text-emerald-400 text-[11px] overflow-x-auto leading-relaxed">
                {JSON.stringify(selectedEvent.payload, null, 2)}
              </pre>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
