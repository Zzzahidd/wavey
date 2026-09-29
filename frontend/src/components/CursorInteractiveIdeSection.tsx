import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Code2, 
  Check, 
  Play, 
  GitBranch, 
  Sparkles, 
  Layers, 
  FileText,
  Search,
  CheckCircle2,
  Cpu
} from 'lucide-react';

interface TabMode {
  id: string;
  name: string;
  badge: string;
  title: string;
  desc: string;
  activeFile: string;
  diffCode: {
    added: string[];
    removed: string[];
    unchanged: string[];
  };
  terminalOutput: string[];
}

const MODES: TabMode[] = [
  {
    id: 'agent',
    name: 'Agent',
    badge: 'Autonomous Execution',
    title: 'Hand off full tasks to autonomous coding agents.',
    desc: 'The agent searches your codebase, plans multi-file edits, runs terminal commands, and resolves type errors autonomously.',
    activeFile: 'src/services/billing.ts',
    diffCode: {
      unchanged: [
        'import { stripe } from "../lib/stripe";',
        'import { db } from "../lib/database";',
        '',
        'export async function handleSubscriptionUpgrade(userId: string, planId: string) {'
      ],
      removed: [
        '-   const current = await db.query("SELECT * FROM subs WHERE user_id = $1", [userId]);',
        '-   return stripe.subscriptions.update(current.stripe_id, { plan: planId });'
      ],
      added: [
        '+   const session = await db.transaction(async (tx) => {',
        '+     const subscription = await tx.subscriptions.findUnique({ where: { userId } });',
        '+     const updated = await stripe.subscriptions.update(subscription.stripeId, { items: [{ plan: planId }] });',
        '+     return tx.subscriptions.update({ where: { userId }, data: { planId, status: "active" } });',
        '+   });',
        '+   return session;'
      ]
    },
    terminalOutput: [
      '$ pnpm test tests/billing.test.ts',
      '✓ verifySubscriptionTransaction (14ms)',
      '✓ handleWebhookReplayDefense (8ms)',
      'Test Suites: 1 passed, 1 total',
      'Tests:       12 passed, 12 total'
    ]
  },
  {
    id: 'tab',
    name: 'Tab Prediction',
    badge: 'Next-Edit Prediction',
    title: 'Predict your next edit across multiple files.',
    desc: 'Cursor predicts your cursor position and multi-line changes as you type. Press Tab to accept complex refactors instantly.',
    activeFile: 'src/types/schema.ts',
    diffCode: {
      unchanged: [
        'import { z } from "zod";',
        '',
        'export const UserProfileSchema = z.object({'
      ],
      removed: [
        '-   name: z.string(),',
        '-   email: z.string().email()'
      ],
      added: [
        '+   id: z.string().uuid(),',
        '+   name: z.string().min(2),',
        '+   email: z.string().email(),',
        '+   role: z.enum(["admin", "member", "guest"]).default("member"),',
        '+   createdAt: z.date().default(() => new Date())'
      ]
    },
    terminalOutput: [
      '$ tsc --noEmit',
      '✨ 0 type errors found across 42 files'
    ]
  },
  {
    id: 'chat',
    name: 'Codebase Chat',
    badge: 'Semantic Embeddings',
    title: 'Ask questions with deep codebase context.',
    desc: 'Reference files with @symbols, index entire repositories, and debug tricky race conditions with semantic understanding.',
    activeFile: 'src/hooks/useAgentStream.ts',
    diffCode: {
      unchanged: [
        'export function useAgentStream(sessionId: string) {',
        '  const [events, setEvents] = useState<AgentEvent[]>([]);',
        ''
      ],
      removed: [
        '-   // TODO: Add SSE reconnection logic'
      ],
      added: [
        '+   useEffect(() => {',
        '+     const sse = new EventSource(`/api/stream?sessionId=${sessionId}`);',
        '+     sse.onmessage = (e) => setEvents((prev) => [...prev, JSON.parse(e.data)]);',
        '+     return () => sse.close();',
        '+   }, [sessionId]);'
      ]
    },
    terminalOutput: [
      'Indexed 14,280 files in 420ms',
      'Semantic query: "How does the SSE reconnect policy handle backoff?"',
      'Answer verified from src/lib/sse.ts:L42-L89'
    ]
  },
  {
    id: 'composer',
    name: 'Composer',
    badge: 'Multi-File Synthesis',
    title: 'Generate and edit across your entire repo.',
    desc: 'Composer builds full features spanning frontend, backend, database migrations, and unit tests in one coordinated pass.',
    activeFile: 'src/app/api/agents/route.ts',
    diffCode: {
      unchanged: [
        'import { NextResponse } from "next/server";',
        'import { synthesizePlan } from "@/lib/engine";',
        ''
      ],
      removed: [],
      added: [
        '+ export async function POST(req: Request) {',
        '+   const { prompt, model } = await req.json();',
        '+   const plan = await synthesizePlan(prompt, model);',
        '+   return NextResponse.json({ success: true, plan });',
        '+ }'
      ]
    },
    terminalOutput: [
      'Created: src/app/api/agents/route.ts (+8 lines)',
      'Modified: src/lib/engine.ts (+24 lines)',
      'Verified: 0 lint errors, 0 broken imports'
    ]
  }
];

interface CursorInteractiveIdeSectionProps {
  onOpenSignUp?: () => void;
}

export const CursorInteractiveIdeSection: React.FC<CursorInteractiveIdeSectionProps> = ({ onOpenSignUp }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isAccepted, setIsAccepted] = useState<boolean>(false);

  // Auto-cycle through the 4 modes
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % MODES.length);
      setIsAccepted(false);
    }, 4500);

    return () => clearInterval(interval);
  }, [isHovered]);

  const currentMode = MODES[activeTab];

  return (
    <section 
      className="py-24 bg-[#FDFDFD] border-b border-zinc-200/60"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-[1330px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight leading-[1.12]">
            {currentMode.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
            {currentMode.desc}
          </p>
        </div>

        {/* Tab Selector Buttons (Cursor Mode Switcher) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6">
          {MODES.map((mode, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={mode.id}
                onClick={() => {
                  setActiveTab(idx);
                  setIsAccepted(false);
                }}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-white border-zinc-400 shadow-xs ring-1 ring-black/5'
                    : 'bg-zinc-100/70 border-zinc-200 hover:bg-white text-zinc-600'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-zinc-900' : 'text-zinc-400'}`}>
                    0{idx + 1}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    isActive ? 'bg-zinc-900 text-white' : 'bg-zinc-200 text-zinc-600'
                  }`}>
                    {mode.name}
                  </span>
                </div>
                <div className={`text-xs sm:text-sm font-bold truncate ${isActive ? 'text-zinc-900' : 'text-zinc-700'}`}>
                  {mode.badge}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Desktop IDE Chrome Container (Exact Cursor IDE window) */}
        <div className="p-1.5 sm:p-2 bg-zinc-200/80 rounded-3xl border border-zinc-300 shadow-lg">
          <div className="bg-[#111111] rounded-[calc(1.5rem-0.375rem)] border border-zinc-800 text-zinc-100 overflow-hidden shadow-2xl">
            
            {/* Window Chrome Titlebar */}
            <div className="h-9 bg-zinc-900/90 border-b border-zinc-800 px-4 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-zinc-700 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-zinc-700 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-zinc-700 inline-block"></span>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                <FileText className="w-3.5 h-3.5 text-zinc-400" />
                <span>{currentMode.activeFile}</span>
                <span className="text-[10px] bg-zinc-800 text-zinc-300 px-1.5 py-0.2 rounded">TypeScript</span>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-zinc-400 hidden sm:inline">Cursor v0.46</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
            </div>

            {/* Main IDE Window: Sidebar + Editor + Terminal */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px]">
              
              {/* Task Sidebar */}
              <div className="lg:col-span-3 bg-zinc-950/80 border-r border-zinc-800/80 p-4 space-y-4 font-mono text-xs">
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Agent Queue</span>
                  <span className="bg-zinc-800 text-zinc-300 px-1.5 py-0.2 rounded text-[10px]">3 Active</span>
                </div>

                <div className="space-y-2">
                  <div className="p-2.5 bg-zinc-900 rounded-xl border border-zinc-800">
                    <div className="flex items-center justify-between text-zinc-200 font-bold">
                      <span className="truncate">{currentMode.name} Task</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-1 flex items-center gap-1">
                      <GitBranch className="w-3 h-3 text-zinc-500" />
                      <span>feat/autonomous-synth</span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-900 opacity-60">
                    <div className="text-zinc-400 truncate">Run Typecheck & Evals</div>
                    <div className="text-[10px] text-zinc-600 mt-0.5">queued</div>
                  </div>

                  <div className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-900 opacity-60">
                    <div className="text-zinc-400 truncate">Open Pull Request</div>
                    <div className="text-[10px] text-zinc-600 mt-0.5">queued</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-900 text-[11px] text-zinc-500 space-y-1">
                  <div>Model: Claude 3.7 Sonnet</div>
                  <div>Sandbox: Firecracker VM</div>
                  <div>Pass Rate: 100%</div>
                </div>
              </div>

              {/* Code Diff Editor Area */}
              <div className="lg:col-span-9 flex flex-col justify-between bg-[#0D0D0D]">
                <div className="p-5 font-mono text-xs leading-relaxed overflow-x-auto">
                  
                  {/* Unchanged Lines */}
                  {currentMode.diffCode.unchanged.map((line, i) => (
                    <div key={`u-${i}`} className="text-zinc-400 hover:bg-zinc-900/40 px-2 py-0.5 rounded">
                      <span className="text-zinc-600 select-none mr-4 w-6 inline-block text-right">{i + 1}</span>
                      <span>{line}</span>
                    </div>
                  ))}

                  {/* Removed Lines */}
                  {!isAccepted && currentMode.diffCode.removed.map((line, i) => (
                    <div key={`r-${i}`} className="text-rose-400 bg-rose-950/20 px-2 py-0.5 rounded border-l-2 border-rose-500 my-0.5">
                      <span className="text-rose-600 select-none mr-4 w-6 inline-block text-right">-</span>
                      <span>{line}</span>
                    </div>
                  ))}

                  {/* Added Lines (With Cursor Tab Prediction Styling) */}
                  {currentMode.diffCode.added.map((line, i) => (
                    <div key={`a-${i}`} className="text-emerald-300 bg-emerald-950/30 px-2 py-0.5 rounded border-l-2 border-emerald-500 my-0.5 flex items-center justify-between">
                      <div>
                        <span className="text-emerald-600 select-none mr-4 w-6 inline-block text-right">+</span>
                        <span>{line}</span>
                      </div>
                      {i === 0 && !isAccepted && (
                        <span className="hidden sm:inline text-[10px] font-mono bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded border border-zinc-700">
                          Press Tab to Accept
                        </span>
                      )}
                    </div>
                  ))}

                </div>

                {/* Bottom Interactive Terminal Output Bar */}
                <div className="border-t border-zinc-800/80 bg-zinc-950 p-3.5 px-5 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    {currentMode.terminalOutput.map((out, idx) => (
                      <div key={idx} className={out.startsWith('✓') || out.startsWith('✨') ? 'text-emerald-400' : 'text-zinc-400'}>
                        {out}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setIsAccepted(!isAccepted)}
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition text-xs font-semibold cursor-pointer"
                    >
                      {isAccepted ? 'Reset Diff' : 'Accept Diff [Tab]'}
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
