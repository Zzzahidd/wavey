import React, { useState, useRef } from 'react';
import { Sparkles, Terminal, Command, Check, ArrowRight, Zap, Play } from 'lucide-react';

interface ShortcutAction {
  id: string;
  keys: string[];
  label: string;
  description: string;
  tag: string;
  activeSnippet: {
    command: string;
    file: string;
    input: string;
    outputLines: { type: 'context' | 'added' | 'removed' | 'info'; text: string }[];
  };
}

const SHORTCUTS: ShortcutAction[] = [
  {
    id: 'inline-edit',
    keys: ['⌘', 'K'],
    label: 'Inline Edit',
    description: 'Select any function or line of code, press ⌘K, and describe what to change in-place.',
    tag: 'Instant Refactor',
    activeSnippet: {
      command: 'Refactor to async generator with backpressure',
      file: 'src/stream/pipeline.ts',
      input: '⌘K "Convert buffer loop into AsyncIterable with bounded memory"',
      outputLines: [
        { type: 'context', text: 'export async function* processStream(source: ReadableStream) {' },
        { type: 'removed', text: '-  const buffer = await source.readAll();' },
        { type: 'added', text: '+  for await (const chunk of source) {' },
        { type: 'added', text: '+    yield await transformChunk(chunk);' },
        { type: 'context', text: '   }' },
        { type: 'context', text: '}' },
        { type: 'info', text: '✓ 12ms execution · 0 memory overhead · Verified types' }
      ]
    }
  },
  {
    id: 'composer',
    keys: ['⌘', 'I'],
    label: 'Composer Agent',
    description: 'Open full-project Composer to plan, write, and verify changes across multiple repositories.',
    tag: 'Multi-File Agent',
    activeSnippet: {
      command: 'Implement OAuth PKCE login with Redis token storage',
      file: 'src/auth/pkce.ts & 3 other files',
      input: '⌘I "Add PKCE code verifier and store state in Redis cluster"',
      outputLines: [
        { type: 'info', text: '⚡ Agent analyzed 48 files across dependency tree' },
        { type: 'added', text: '+ export async function generatePKCEChallenge() {' },
        { type: 'added', text: '+   const verifier = crypto.randomBytes(32).toString("base64url");' },
        { type: 'added', text: '+   const challenge = crypto.createHash("sha256").update(verifier).digest("base64url");' },
        { type: 'added', text: '+   await redis.set(`pkce:${verifier}`, "pending", "EX", 300);' },
        { type: 'added', text: '+   return { verifier, challenge };' },
        { type: 'context', text: '}' }
      ]
    }
  },
  {
    id: 'tab-prediction',
    keys: ['Tab'],
    label: 'Next-Action Tab',
    description: 'Cursor predicts your next cursor location and code edits before you even type.',
    tag: 'Multi-Line Prediction',
    activeSnippet: {
      command: 'Autofill error boundary & retry strategy',
      file: 'src/lib/httpClient.ts',
      input: 'Tab to accept next 4 tokens',
      outputLines: [
        { type: 'context', text: 'async function fetchWithRetry(url: string, opts: RequestInit) {' },
        { type: 'context', text: '  try {' },
        { type: 'context', text: '    return await fetch(url, opts);' },
        { type: 'added', text: '+ } catch (err: unknown) {' },
        { type: 'added', text: '+   if (isRetryable(err)) return backoffRetry(url, opts);' },
        { type: 'added', text: '+   throw normalizeApiError(err);' },
        { type: 'context', text: '  }' },
        { type: 'context', text: '}' }
      ]
    }
  },
  {
    id: 'codebase-chat',
    keys: ['⌘', 'L'],
    label: 'Codebase Chat',
    description: 'Chat with deep awareness of your symbols, types, documentation, and AST graph.',
    tag: 'Full Context Chat',
    activeSnippet: {
      command: 'Find all unhandled promise rejections in background queue',
      file: 'src/workers/dispatcher.ts',
      input: '⌘L "@workers Where could a task fail silently without logging?"',
      outputLines: [
        { type: 'info', text: '🔍 Scanned 14 workers in src/workers/' },
        { type: 'added', text: '+ // Discovered missing catch block in batchExecutor:' },
        { type: 'context', text: '  workerPool.dispatch(async (job) => {' },
        { type: 'added', text: '+   await job.run().catch((e) => telemetry.capture(e));' },
        { type: 'context', text: '  });' }
      ]
    }
  }
];

export const CursorInteractiveShortcuts: React.FC = () => {
  const [selectedShortcut, setSelectedShortcut] = useState<string>('inline-edit');
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHoveringCode, setIsHoveringCode] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const active = SHORTCUTS.find((s) => s.id === selectedShortcut) || SHORTCUTS[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <section className="py-24 bg-[#FDFDFD] border-b border-zinc-200/60 relative overflow-hidden">
      <div className="max-w-[1330px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-900 mb-4 shadow-2xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900"></span>
            MOUSE & KEYBOARD FLOW
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight leading-tight">
            Designed for engineers who move at the speed of thought.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 font-normal">
            Hover over any shortcut or move your cursor to explore live contextual code generation, in-place refactoring, and multi-file orchestrations.
          </p>
        </div>

        {/* Interactive Double-Bezel Playground Container */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative p-1.5 bg-zinc-100 rounded-3xl border border-zinc-200/90 shadow-2xs group"
        >
          {/* Mouse follow spotlight glow */}
          <div 
            className="absolute pointer-events-none rounded-3xl transition-opacity duration-300 opacity-60 group-hover:opacity-100 -inset-px"
            style={{
              background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(24, 24, 27, 0.06), transparent 60%)`
            }}
          />

          <div className="bg-white rounded-[calc(1.5rem-0.375rem)] p-6 sm:p-10 relative z-10 border border-zinc-200/70">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Interactive Shortcut Selection Pills */}
              <div className="lg:col-span-5 space-y-3">
                <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider block mb-3">
                  INTERACTIVE SHORTCUT SELECTOR
                </span>

                {SHORTCUTS.map((shortcut) => {
                  const isSelected = shortcut.id === selectedShortcut;
                  return (
                    <div
                      key={shortcut.id}
                      onMouseEnter={() => setSelectedShortcut(shortcut.id)}
                      onClick={() => setSelectedShortcut(shortcut.id)}
                      className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer text-left ${
                        isSelected
                          ? 'bg-zinc-900 text-white border-zinc-900 shadow-md translate-x-1'
                          : 'bg-zinc-50/80 hover:bg-zinc-100/90 text-zinc-900 border-zinc-200/80 hover:border-zinc-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          {shortcut.keys.map((k, i) => (
                            <kbd
                              key={i}
                              className={`px-2 py-1 text-xs font-mono font-bold rounded-lg border shadow-2xs ${
                                isSelected
                                  ? 'bg-zinc-800 text-white border-zinc-700'
                                  : 'bg-white text-zinc-800 border-zinc-200'
                              }`}
                            >
                              {k}
                            </kbd>
                          ))}
                          <span className="text-xs font-semibold ml-2">{shortcut.label}</span>
                        </div>
                        <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-200/70 text-zinc-600'
                        }`}>
                          {shortcut.tag}
                        </span>
                      </div>
                      <p className={`text-xs leading-relaxed ${isSelected ? 'text-zinc-300' : 'text-zinc-600'}`}>
                        {shortcut.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Live Mouse-Reactive Code Editor & Output */}
              <div className="lg:col-span-7">
                <div 
                  onMouseEnter={() => setIsHoveringCode(true)}
                  onMouseLeave={() => setIsHoveringCode(false)}
                  className="rounded-2xl bg-[#111111] text-zinc-200 border border-zinc-800 shadow-xl overflow-hidden transition-all duration-300"
                >
                  
                  {/* Editor Window Bar */}
                  <div className="px-4 py-3 bg-[#18181b] border-b border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
                      </div>
                      <span className="text-zinc-500 mx-1">|</span>
                      <span className="text-zinc-300 font-semibold">{active.activeSnippet.file}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="text-zinc-400 text-[11px]">Live Engine</span>
                    </div>
                  </div>

                  {/* Prompt Command Pill */}
                  <div className="px-5 py-3.5 bg-zinc-900/90 border-b border-zinc-800/80 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 truncate">
                      <Zap className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span className="font-semibold text-white">{active.activeSnippet.input}</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 shrink-0 bg-zinc-800 px-2 py-0.5 rounded">
                      ENTER TO RUN
                    </span>
                  </div>

                  {/* Code Body with dynamic line highlighting on mouse hover */}
                  <div className="p-5 sm:p-6 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto space-y-1">
                    {active.activeSnippet.outputLines.map((line, idx) => {
                      if (line.type === 'added') {
                        return (
                          <div 
                            key={idx}
                            className="bg-emerald-950/40 text-emerald-300 px-3 py-1 rounded border-l-2 border-emerald-500 hover:bg-emerald-900/50 transition-colors flex items-center gap-3"
                          >
                            <span className="text-zinc-600 select-none w-4 text-right text-[11px]">{idx + 1}</span>
                            <span className="font-medium">{line.text}</span>
                          </div>
                        );
                      }
                      if (line.type === 'removed') {
                        return (
                          <div 
                            key={idx}
                            className="bg-red-950/30 text-red-300 px-3 py-1 rounded border-l-2 border-red-500 hover:bg-red-900/40 transition-colors line-through opacity-80 flex items-center gap-3"
                          >
                            <span className="text-zinc-600 select-none w-4 text-right text-[11px]">{idx + 1}</span>
                            <span>{line.text}</span>
                          </div>
                        );
                      }
                      if (line.type === 'info') {
                        return (
                          <div 
                            key={idx}
                            className="text-zinc-400 text-[11px] pt-3 mt-3 border-t border-zinc-800 flex items-center gap-2 font-sans font-medium"
                          >
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{line.text}</span>
                          </div>
                        );
                      }
                      return (
                        <div 
                          key={idx}
                          className="text-zinc-400 px-3 py-0.5 hover:text-zinc-200 hover:bg-zinc-800/40 rounded transition-colors flex items-center gap-3"
                        >
                          <span className="text-zinc-600 select-none w-4 text-right text-[11px]">{idx + 1}</span>
                          <span>{line.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Interactive Status Footer */}
                  <div className="px-5 py-3 bg-[#0d0d0d] border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>Move cursor across cards to preview actions</span>
                    <span className="text-zinc-400">Press <kbd className="text-zinc-200 bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700">Tab</kbd> to accept</span>
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
