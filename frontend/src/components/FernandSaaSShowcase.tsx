import React, { useState, useEffect } from 'react';
import { 
  Check, 
  GitBranch, 
  Terminal, 
  Layers, 
  ShieldCheck, 
  Play, 
  MessageSquare, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const FernandSaaSShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [refundAnimStep, setRefundAnimStep] = useState<number>(0);

  const features = [
    {
      id: 'metadata',
      title: 'Real-time AST metadata & repo indexing',
      desc: 'Instant codebase graph synchronization with live symbol resolution and dependency tracking.'
    },
    {
      id: 'diffs',
      title: 'Autonomous code synthesis & verified PR diffs',
      desc: 'Atomic multi-file edits with verified unit tests and clean pull request creation.'
    },
    {
      id: 'collab',
      title: 'Team collaboration & agent review comments',
      desc: 'Collaborate with specialized sub-agents right inside your existing code review loops.'
    },
    {
      id: 'automation',
      title: 'Automated CI/CD execution & security rules',
      desc: 'Set up deterministic trigger rules that run microVM checks on every commit.'
    }
  ];

  // Auto-cycle through the 4 tabs every 4 seconds
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isHovered, features.length]);

  // Micro animation inside tab 1 (Diffs)
  useEffect(() => {
    if (activeTab === 1) {
      setRefundAnimStep(0);
      const t1 = setTimeout(() => setRefundAnimStep(1), 800);
      const t2 = setTimeout(() => setRefundAnimStep(2), 1800);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [activeTab]);

  return (
    <section 
      className="py-24 bg-white border-t border-zinc-200/60 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-[1330px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-900 mb-4 shadow-2xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          AUTONOMOUS CORE
        </div>

        <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 tracking-tight leading-tight max-w-3xl mb-12">
          Everything you need to ship software with high velocity and zero regressions
        </h2>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: 4 Features Nav List with Progress Bar */}
          <div className="lg:col-span-5 space-y-3">
            {features.map((feat, idx) => {
              const isActive = activeTab === idx;
              return (
                <div
                  key={feat.id}
                  onClick={() => setActiveTab(idx)}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                    isActive
                      ? 'bg-zinc-50 border-zinc-300 shadow-xs ring-1 ring-black/5'
                      : 'bg-transparent border-transparent hover:bg-zinc-50/60'
                  }`}
                >
                  {/* Subtle active progress bar */}
                  {isActive && !isHovered && (
                    <div 
                      className="absolute bottom-0 left-0 h-[2px] bg-zinc-900 transition-all duration-linear"
                      style={{ width: '100%', animation: 'saasProgress 4s linear' }}
                    />
                  )}

                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono font-bold ${isActive ? 'text-zinc-900' : 'text-zinc-400'}`}>
                      0{idx + 1}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-zinc-900"></span>
                    )}
                  </div>

                  <h3 className={`text-base sm:text-lg font-bold mt-2 ${isActive ? 'text-zinc-900' : 'text-zinc-600'}`}>
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-500 mt-1.5 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: Interactive Double-Bezel Mockup Container */}
          <div className="lg:col-span-7">
            <div className="p-1.5 bg-zinc-100 rounded-3xl border border-zinc-200/90 shadow-xs">
              <div className="bg-zinc-50/70 rounded-[calc(1.5rem-0.25rem)] p-6 sm:p-8 border border-zinc-200/80 min-h-[470px] flex flex-col justify-center">
                
                {/* Tab 0: Metadata */}
                {activeTab === 0 && (
                  <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                    <div className="bg-white rounded-2xl p-5 shadow-2xs border border-zinc-200">
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-zinc-900 text-white font-bold text-xs flex items-center justify-center font-mono">
                            AC
                          </div>
                          <div>
                            <div className="text-xs font-bold text-zinc-900">Acme Enterprise Services</div>
                            <div className="text-[11px] text-zinc-500 font-mono">repo: acme/core-infrastructure</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono font-bold bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded flex items-center gap-1 border border-zinc-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          LIVE SYNC
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                          <span className="text-zinc-400 block text-[10px] uppercase font-mono">AST Nodes</span>
                          <span className="font-bold text-zinc-900 text-sm">2,840 symbols</span>
                        </div>
                        <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                          <span className="text-zinc-400 block text-[10px] uppercase font-mono">Type Invariants</span>
                          <span className="font-bold text-emerald-600 text-sm">100% strict</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 shadow-2xs border border-zinc-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="font-semibold text-zinc-900">Continuous Codebase Graph Sync</span>
                      </div>
                      <span className="font-mono text-zinc-400 text-[11px]">18ms latency</span>
                    </div>
                  </div>
                )}

                {/* Tab 1: Diffs */}
                {activeTab === 1 && (
                  <div className="bg-white rounded-2xl p-5 shadow-2xs border border-zinc-200 space-y-4 animate-in fade-in zoom-in-95 duration-300">
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                      <div className="flex items-center gap-2">
                        <GitBranch className="w-4 h-4 text-zinc-700" />
                        <span className="text-xs font-bold text-zinc-900">PR #248 — Session Token Invariants</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-900 text-white">
                        {refundAnimStep >= 2 ? 'MERGE READY' : refundAnimStep >= 1 ? 'VERIFIED' : 'ANALYZING'}
                      </span>
                    </div>

                    <div className="font-mono text-[11px] p-4 bg-zinc-950 text-zinc-200 rounded-xl space-y-1 border border-zinc-800">
                      <p className="text-zinc-500">// src/middleware/auth.ts</p>
                      <p className="text-emerald-400">+ export const authMiddleware = createAuthGuard(&#123; session: true &#125;);</p>
                      <p className="text-zinc-500">- export const legacyTokenCheck = (req) =&gt; req.headers.token;</p>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs">
                      <span className="text-emerald-600 font-semibold flex items-center gap-1.5 font-mono">
                        <Check className="w-4 h-4" /> 24/24 unit tests passed
                      </span>
                      <button className="px-3 py-1.5 bg-[#111111] hover:bg-black text-white text-[11px] font-semibold rounded-lg shadow-sm transition cursor-pointer">
                        Open Pull Request
                      </button>
                    </div>
                  </div>
                )}

                {/* Tab 2: Collab */}
                {activeTab === 2 && (
                  <div className="space-y-3 animate-in fade-in zoom-in-95 duration-300">
                    <div className="bg-white rounded-2xl p-4 shadow-2xs border border-zinc-200 flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-zinc-200 text-zinc-800 font-bold text-xs flex items-center justify-center shrink-0 font-mono">
                        DV
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-zinc-900">David Vance (Lead Architect)</span>
                          <span className="text-[10px] text-zinc-400 font-mono">1m ago</span>
                        </div>
                        <p className="text-xs text-zinc-600 mt-1">
                          @wavey-agent Please run a cryptographic audit on the new JWT token expiration policy.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 border border-zinc-300 flex items-start gap-3 shadow-xs">
                      <div className="w-9 h-9 rounded-full bg-zinc-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        ✦
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-zinc-900">Wavey Security Gate</span>
                          <span className="text-[10px] text-emerald-800 font-mono bg-emerald-100 px-1.5 py-0.2 rounded font-bold">PASSED</span>
                        </div>
                        <p className="text-xs text-zinc-600 mt-1">
                          Audited cryptographic claims against OWASP ASVS 4.0 standards. Invariant validated with 0 vulnerabilities.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Automation */}
                {activeTab === 3 && (
                  <div className="bg-white rounded-2xl p-5 shadow-2xs border border-zinc-200 space-y-3 animate-in fade-in zoom-in-95 duration-300">
                    <div className="text-xs font-bold text-zinc-900 flex items-center justify-between pb-2 border-b border-zinc-100">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-zinc-700" />
                        <span>Trigger: On Git Push to 'main'</span>
                      </div>
                      <span className="font-mono text-[10px] bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded font-bold border border-zinc-200">ACTIVE</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 flex items-center justify-between">
                        <span className="text-zinc-700">1. Spin up Firecracker MicroVM</span>
                        <span className="font-mono text-[11px] text-emerald-600 font-bold">14ms boot</span>
                      </div>
                      <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 flex items-center justify-between">
                        <span className="text-zinc-700">2. Run TypeScript strict typecheck</span>
                        <span className="font-mono text-[11px] text-emerald-600 font-bold">0 errors</span>
                      </div>
                      <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 flex items-center justify-between">
                        <span className="text-zinc-700">3. Verify AST invariants & preview build</span>
                        <span className="font-mono text-[11px] text-emerald-600 font-bold">✓ 100% Passed</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
