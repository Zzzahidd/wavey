import React, { useState, useRef } from 'react';
import { Network, GitGraph, FileCode, Check, Cpu, ShieldCheck, Activity, Layers, ArrowRight } from 'lucide-react';

interface GraphNode {
  id: string;
  name: string;
  category: 'Router' | 'Auth' | 'AI Engine' | 'Database' | 'Worker';
  x: number; // percentage
  y: number; // percentage
  file: string;
  symbols: string[];
  imports: string[];
  latency: string;
  status: 'synced' | 'indexing' | 'verified';
}

const NODES: GraphNode[] = [
  {
    id: 'routes-chat',
    name: 'routes/chat.ts',
    category: 'Router',
    x: 18,
    y: 28,
    file: 'backend/src/routes/chat.ts',
    symbols: ['handleStreamMessage()', 'validateSessionGuard()', 'dispatchAgentJob()'],
    imports: ['services/gemini.ts', 'models/Session.ts', 'middleware/auth.ts'],
    latency: '1.2ms',
    status: 'synced'
  },
  {
    id: 'auth-guard',
    name: 'middleware/auth.ts',
    category: 'Auth',
    x: 50,
    y: 18,
    file: 'backend/src/middleware/auth.ts',
    symbols: ['verifyJwtSession()', 'extractBearerToken()', 'enforceRole()'],
    imports: ['config.ts', 'models/User.ts'],
    latency: '0.4ms',
    status: 'verified'
  },
  {
    id: 'ai-engine',
    name: 'services/gemini.ts',
    category: 'AI Engine',
    x: 82,
    y: 35,
    file: 'backend/src/services/gemini.ts',
    symbols: ['streamModelResponse()', 'executeToolCallingDAG()', 'formatMultiModal()'],
    imports: ['@google/genai', 'config.ts', 'tools/executor.ts'],
    latency: '8.4ms',
    status: 'synced'
  },
  {
    id: 'models-session',
    name: 'models/Session.ts',
    category: 'Database',
    x: 32,
    y: 72,
    file: 'backend/src/models/Session.ts',
    symbols: ['SessionSchema', 'findActiveByUserId()', 'appendMessageAtomic()'],
    imports: ['mongoose', 'types/chat.ts'],
    latency: '2.1ms',
    status: 'verified'
  },
  {
    id: 'worker-pool',
    name: 'workers/sandbox.ts',
    category: 'Worker',
    x: 68,
    y: 78,
    file: 'backend/src/workers/sandbox.ts',
    symbols: ['spawnMicroVM()', 'executeBashIsolated()', 'collectArtifacts()'],
    imports: ['child_process', 'fs/promises'],
    latency: '4.8ms',
    status: 'verified'
  }
];

export const CursorInteractiveGraphSection: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('routes-chat');
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeNode = NODES.find((n) => n.id === activeNodeId) || NODES[0];

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
            NEURAL REPOSITORY GRAPH
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight leading-tight">
            Instant semantic indexing across your entire dependency graph.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 font-normal">
            Move your mouse over the graph to inspect AST relationships, verified type safety, and real-time execution bounds.
          </p>
        </div>

        {/* Double-Bezel Interactive Graph Container */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative p-1.5 bg-zinc-100 rounded-3xl border border-zinc-200/90 shadow-2xs group"
        >
          {/* Spotlight Effect following mouse */}
          <div 
            className="absolute pointer-events-none rounded-3xl transition-opacity duration-300 opacity-60 group-hover:opacity-100 -inset-px"
            style={{
              background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(24, 24, 27, 0.05), transparent 60%)`
            }}
          />

          <div className="bg-white rounded-[calc(1.5rem-0.375rem)] p-6 sm:p-8 relative z-10 border border-zinc-200/70">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left 8 Cols: Interactive SVG Dependency Network */}
              <div className="lg:col-span-8 bg-[#0d0d0d] rounded-2xl p-6 sm:p-8 border border-zinc-800 relative min-h-[440px] flex flex-col justify-between overflow-hidden shadow-inner">
                
                {/* Background Grid Lines */}
                <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

                {/* Top Interactive Graph HUD */}
                <div className="relative z-10 flex items-center justify-between text-xs font-mono text-zinc-400 pb-4 border-b border-zinc-800/80">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-zinc-200 font-bold">5 Nodes Indexed</span>
                    <span className="text-zinc-600">|</span>
                    <span className="text-zinc-400">AST Depth: 4 Levels</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-3 text-[11px] text-zinc-500">
                    <span>Click any node to inspect</span>
                  </div>
                </div>

                {/* Center SVG Edge Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                  {/* Connection lines between nodes */}
                  <line x1="18%" y1="28%" x2="50%" y2="18%" stroke="#3f3f46" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-60" />
                  <line x1="50%" y1="18%" x2="82%" y2="35%" stroke="#3f3f46" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-60" />
                  <line x1="18%" y1="28%" x2="32%" y2="72%" stroke="#3f3f46" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-60" />
                  <line x1="32%" y1="72%" x2="68%" y2="78%" stroke="#3f3f46" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-60" />
                  <line x1="82%" y1="35%" x2="68%" y2="78%" stroke="#3f3f46" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-60" />
                  <line x1="18%" y1="28%" x2="82%" y2="35%" stroke="#27272a" strokeWidth="1" strokeDasharray="2 2" className="opacity-30" />
                </svg>

                {/* Graph Node Badges placed absolutely */}
                <div className="relative z-10 w-full h-full min-h-[300px]">
                  {NODES.map((node) => {
                    const isSelected = node.id === activeNodeId;
                    const isHovered = node.id === hoveredNode;

                    return (
                      <div
                        key={node.id}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        onMouseEnter={() => {
                          setHoveredNode(node.id);
                          setActiveNodeId(node.id);
                        }}
                        onMouseLeave={() => setHoveredNode(null)}
                        onClick={() => setActiveNodeId(node.id)}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                          isSelected || isHovered ? 'scale-110 z-30' : 'scale-100 z-10'
                        }`}
                      >
                        <div className={`px-3 py-2 rounded-xl border font-mono text-xs shadow-lg transition-all flex items-center gap-2 ${
                          isSelected
                            ? 'bg-zinc-900 border-zinc-400 text-white ring-2 ring-zinc-500/50 shadow-emerald-950/40'
                            : 'bg-[#18181b] border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${
                            isSelected ? 'bg-emerald-400' : 'bg-zinc-500'
                          }`} />
                          <span className="font-semibold">{node.name}</span>
                          <span className="text-[10px] text-zinc-400 bg-zinc-800/80 px-1.5 py-0.5 rounded border border-zinc-700">
                            {node.latency}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Canvas Telemetry */}
                <div className="relative z-10 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Real-time AST sync: 0 memory leaks</span>
                  </div>
                  <div className="text-zinc-500">
                    Active: <span className="text-zinc-300 font-semibold">{activeNode.file}</span>
                  </div>
                </div>

              </div>

              {/* Right 4 Cols: Live Node Inspector Panel */}
              <div className="lg:col-span-4 bg-zinc-50/80 rounded-2xl p-6 border border-zinc-200/80 flex flex-col justify-between">
                <div>
                  
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider">
                      MODULE INSPECTOR
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-zinc-200/80 text-[10px] font-mono font-bold text-zinc-800">
                      {activeNode.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-zinc-900 tracking-tight mb-1">
                    {activeNode.name}
                  </h3>
                  <p className="text-xs font-mono text-zinc-500 mb-5 break-all">
                    {activeNode.file}
                  </p>

                  {/* Exported Symbols */}
                  <div className="mb-5">
                    <span className="text-[11px] font-mono font-bold text-zinc-600 uppercase tracking-wider block mb-2">
                      Exported Symbols ({activeNode.symbols.length})
                    </span>
                    <div className="space-y-1.5">
                      {activeNode.symbols.map((sym, idx) => (
                        <div 
                          key={idx} 
                          className="px-2.5 py-1.5 rounded-lg bg-white border border-zinc-200 text-xs font-mono text-zinc-800 flex items-center gap-2 shadow-2xs"
                        >
                          <span className="text-zinc-400 font-semibold">&fnof;</span>
                          <span className="truncate">{sym}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Direct Dependencies */}
                  <div className="mb-5">
                    <span className="text-[11px] font-mono font-bold text-zinc-600 uppercase tracking-wider block mb-2">
                      Resolved Imports
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeNode.imports.map((imp, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-zinc-200/60 rounded text-[11px] font-mono text-zinc-700"
                        >
                          {imp}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Bottom Verification Status */}
                <div className="pt-4 border-t border-zinc-200/80">
                  <div className="p-3 bg-white rounded-xl border border-zinc-200 shadow-2xs flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-medium text-zinc-800">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Type Checked</span>
                    </div>
                    <span className="text-xs font-mono text-zinc-500 font-bold">{activeNode.latency}</span>
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
