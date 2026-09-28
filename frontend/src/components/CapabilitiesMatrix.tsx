import React from 'react';
import { Check, X, Zap, Shield, GitBranch, Cpu, Terminal, Sparkles } from 'lucide-react';

const COMPARISON_ROWS = [
  {
    feature: 'Autonomous Multi-File Synthesis',
    desc: 'Edits 20+ interrelated files atomically in a single pass',
    wavey: true,
    cursor: true,
    copilot: false,
    replit: false,
  },
  {
    feature: 'Deterministic AST & Type Verification',
    desc: 'Zero compilation errors before showing diffs to the developer',
    wavey: true,
    cursor: false,
    copilot: false,
    replit: false,
  },
  {
    feature: 'MicroVM Sandbox Isolated Test Execution',
    desc: 'Runs test harness in isolated disposable container',
    wavey: true,
    cursor: false,
    copilot: false,
    replit: true,
  },
  {
    feature: 'Multi-Model Routing (Gemini / Claude / GPT)',
    desc: 'Selects the fastest and most cost-effective reasoning kernel',
    wavey: true,
    cursor: true,
    copilot: false,
    replit: false,
  },
  {
    feature: 'Zero Data Retention & Sovereign Cloud',
    desc: 'No code training, complete enterprise data isolation',
    wavey: true,
    cursor: false,
    copilot: false,
    replit: false,
  },
];

export const CapabilitiesMatrix: React.FC = () => {
  return (
    <section className="py-24 bg-[#FDFDFD] border-t border-zinc-200/80">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-800 mb-4">
            <Zap className="w-3.5 h-3.5 text-[#5E1312]" />
            <span>BENCHMARKS & CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight">
            Engineered beyond legacy code autocompletes.
          </h2>
          <p className="mt-3 text-base text-zinc-600 leading-relaxed">
            Compare Wavey’s autonomous agent pipeline against conventional editor extensions.
          </p>
        </div>

        {/* Comparison Table Card */}
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-xl overflow-hidden max-w-5xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/70 text-xs text-zinc-500 font-mono">
                  <th className="py-4 px-6 font-semibold">CAPABILITY</th>
                  <th className="py-4 px-4 font-bold text-[#5E1312] text-center bg-[#5E1312]/5">WAVEY</th>
                  <th className="py-4 px-4 font-semibold text-center text-zinc-700">CURSOR</th>
                  <th className="py-4 px-4 font-semibold text-center text-zinc-700">COPILOT</th>
                  <th className="py-4 px-4 font-semibold text-center text-zinc-700">REPLIT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-xs">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature} className="hover:bg-zinc-50/60 transition">
                    <td className="py-4 px-6">
                      <div className="font-bold text-zinc-900 text-sm">{row.feature}</div>
                      <div className="text-zinc-500 text-[11px] mt-0.5">{row.desc}</div>
                    </td>
                    <td className="py-4 px-4 text-center bg-[#5E1312]/5 font-bold">
                      <div className="flex justify-center">
                        <span className="w-6 h-6 rounded-full bg-[#5E1312] text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center">
                        {row.cursor ? (
                          <span className="w-5 h-5 rounded-full bg-zinc-100 text-zinc-700 flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </span>
                        ) : (
                          <span className="w-5 h-5 rounded-full bg-zinc-50 text-zinc-300 flex items-center justify-center">
                            <X className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center">
                        {row.copilot ? (
                          <span className="w-5 h-5 rounded-full bg-zinc-100 text-zinc-700 flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </span>
                        ) : (
                          <span className="w-5 h-5 rounded-full bg-zinc-50 text-zinc-300 flex items-center justify-center">
                            <X className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center">
                        {row.replit ? (
                          <span className="w-5 h-5 rounded-full bg-zinc-100 text-zinc-700 flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </span>
                        ) : (
                          <span className="w-5 h-5 rounded-full bg-zinc-50 text-zinc-300 flex items-center justify-center">
                            <X className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
