import React, { useState, useEffect, useRef } from 'react';
import { 
  TrendingDown, 
  Sparkles, 
  CheckCircle2, 
  DollarSign
} from 'lucide-react';
import { gsap } from 'gsap';
import { attachMagneticCardTilt } from '../lib/gsapUtils';

export const GumloopOptimizeSection: React.FC = () => {
  const [taskVolume, setTaskVolume] = useState<number>(50000);
  const [activeCycleStep, setActiveCycleStep] = useState<number>(0);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const cycleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const legacyCost = Math.round(taskVolume * 0.42);
  const optimizedCost = Math.round(taskVolume * 0.071);
  const savings = legacyCost - optimizedCost;

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    if (card1Ref.current) cleanups.push(attachMagneticCardTilt(card1Ref.current, { maxTilt: 4, scale: 1.008 }));
    if (card2Ref.current) cleanups.push(attachMagneticCardTilt(card2Ref.current, { maxTilt: 4, scale: 1.008 }));
    if (card3Ref.current) cleanups.push(attachMagneticCardTilt(card3Ref.current, { maxTilt: 3, scale: 1.005 }));

    // Continuous auto-cycle for Execute -> Reflect -> Learn
    cycleIntervalRef.current = setInterval(() => {
      setActiveCycleStep((prev) => (prev + 1) % 3);
    }, 2800);

    return () => {
      cleanups.forEach((fn) => fn());
      if (cycleIntervalRef.current) clearInterval(cycleIntervalRef.current);
    };
  }, []);

  const handleStepClick = (index: number) => {
    setActiveCycleStep(index);
    if (cycleIntervalRef.current) {
      clearInterval(cycleIntervalRef.current);
      cycleIntervalRef.current = setInterval(() => {
        setActiveCycleStep((prev) => (prev + 1) % 3);
      }, 2800);
    }
  };

  return (
    <section className="relative w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-200/80 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-zinc-950 tracking-tight leading-tight">
            Optimize Your Agents
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            Slash enterprise inference costs and continuously boost accuracy with autonomous model routing, self-reflection, and built-in evals.
          </p>
        </div>

        {/* 3 White Bento Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Card 1: Cost Reduction & Model Router Calculator (col-span-12 lg:col-span-7) */}
          <div 
            ref={card1Ref}
            className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 group-hover:scale-110 transition-transform">
                    <TrendingDown className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-950">Cost reduction per task</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                  -83% Average
                </span>
              </div>

              <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
                Run on open-source and specialized small models automatically with full control, zero provider lock-in, and aggressive prompt caching.
              </p>

              {/* Interactive Cost Calculator */}
              <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-200/80 mb-6">
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-700 mb-2">
                  <span>Monthly Autonomous Tasks: {taskVolume.toLocaleString()}</span>
                  <span className="text-emerald-700 font-bold">Save ${(savings).toLocaleString()}/mo</span>
                </div>

                <input 
                  type="range" 
                  min="5000" 
                  max="250000" 
                  step="5000"
                  value={taskVolume}
                  onChange={(e) => setTaskVolume(Number(e.target.value))}
                  className="w-full accent-zinc-900 h-2 bg-zinc-200 rounded-lg cursor-pointer"
                />

                <div className="grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-zinc-200/60">
                  <div className="bg-white p-3.5 rounded-xl border border-zinc-200 text-center">
                    <div className="text-[11px] text-zinc-500 font-medium">Standard Cloud LLMs</div>
                    <div className="text-xl sm:text-2xl font-bold text-zinc-400 line-through mt-0.5">
                      ${(legacyCost).toLocaleString()}
                    </div>
                    <div className="text-[10px] text-zinc-400">$0.42 avg / task</div>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-zinc-900 text-center shadow-2xs">
                    <div className="text-[11px] text-emerald-700 font-bold">Gumloop Model Router</div>
                    <div className="text-xl sm:text-2xl font-bold text-zinc-950 mt-0.5">
                      ${(optimizedCost).toLocaleString()}
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold">$0.071 avg / task</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
              <span>Dynamic routing chooses the cheapest model that passes evals</span>
              <span className="font-semibold text-zinc-900">Zero latency impact</span>
            </div>
          </div>

          {/* Card 2: Self-Improving Agents Cycle with Continuous Step Pulsing (col-span-12 lg:col-span-5) */}
          <div 
            ref={card2Ref}
            className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-bold text-zinc-950">Self-improving agents</h3>
              </div>
              <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
                Agents reflect on their own runs and improve over time, self-tuning instructions and context without manual engineering.
              </p>

              {/* Visual 3-Stage Step Loop with Active Indicator */}
              <div className="space-y-3">
                {[
                  { step: 1, name: 'Execute', desc: 'Agent runs tools and produces structured outcome' },
                  { step: 2, name: 'Reflect', desc: 'Evaluates token cost, precision, and tool correctness' },
                  { step: 3, name: 'Learn', desc: 'Commits updated playbooks into SKILL.md repository' }
                ].map((item, idx) => {
                  const isActive = activeCycleStep === idx;
                  return (
                    <div 
                      key={idx}
                      onClick={() => handleStepClick(idx)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                        isActive 
                          ? 'bg-zinc-950 text-white border-zinc-950 shadow-xs scale-102' 
                          : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-900 border-zinc-200/80'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center transition-colors ${
                        isActive ? 'bg-white text-zinc-950' : 'bg-zinc-900 text-white'
                      }`}>
                        {item.step}
                      </div>
                      <div>
                        <div className={`font-semibold text-xs ${isActive ? 'text-white' : 'text-zinc-900'}`}>{item.name}</div>
                        <div className={`text-[11px] ${isActive ? 'text-zinc-300' : 'text-zinc-500'}`}>{item.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
              <span>Automatic prompt compaction</span>
              <span className="text-emerald-700 font-semibold">Continuous self-tuning</span>
            </div>
          </div>

          {/* Card 3: Evals Built In (col-span-12) */}
          <div 
            ref={card3Ref}
            className="lg:col-span-12 bg-white rounded-2xl sm:rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-950">Evals built in</h3>
                </div>
                <p className="text-sm text-zinc-600 mt-1">
                  Built-in evals let you measure quality, catch regressions before production, and deploy improvements with confidence.
                </p>
              </div>
              <span className="px-3 py-1 bg-zinc-100 border border-zinc-200 rounded-lg text-xs font-semibold text-zinc-800 self-start sm:self-auto">
                100+ Prebuilt Benchmark Suites
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Factual Accuracy Score', score: '99.4%', desc: 'Zero hallucinations flagged' },
                { title: 'Tool Call Precision', score: '99.8%', desc: '0 schema mismatch errors' },
                { title: 'Execution Latency (P95)', score: '420 ms', desc: '3.2x faster than raw LLM' },
                { title: 'Regression Catch Rate', score: '100%', desc: 'Automated CI/CD gatekeeper' }
              ].map((m, i) => (
                <div 
                  key={i}
                  className="bg-zinc-50/80 p-4 rounded-xl border border-zinc-200/80 hover:border-zinc-400 hover:bg-white transition-all cursor-pointer group"
                >
                  <div className="text-xs text-zinc-500 font-medium">{m.title}</div>
                  <div className="text-2xl font-bold text-zinc-950 mt-1 group-hover:scale-105 transition-transform origin-left">{m.score}</div>
                  <div className="text-[11px] text-emerald-700 font-medium mt-1">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
