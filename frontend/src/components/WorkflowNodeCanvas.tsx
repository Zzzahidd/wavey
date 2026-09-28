import React, { useState } from 'react';
import { 
  GitPullRequest, 
  Cpu, 
  CheckCircle2, 
  Play, 
  Workflow, 
  Sparkles, 
  Terminal, 
  ShieldCheck, 
  Layers,
  ArrowRight,
  Database
} from 'lucide-react';

interface NodeItem {
  id: string;
  title: string;
  category: string;
  status: 'idle' | 'running' | 'completed';
  duration: string;
}

const INITIAL_NODES: NodeItem[] = [
  { id: '1', title: 'GitHub Webhook', category: 'Trigger', status: 'completed', duration: '4ms' },
  { id: '2', title: 'AST Dependency Graph', category: 'Index', status: 'completed', duration: '28ms' },
  { id: '3', title: 'Wavey AI Synthesis Agent', category: 'Engine', status: 'completed', duration: '140ms' },
  { id: '4', title: 'MicroVM Test Harness', category: 'Verification', status: 'completed', duration: '85ms' },
  { id: '5', title: 'Production Branch Deploy', category: 'Release', status: 'completed', duration: '12ms' },
];

export const WorkflowNodeCanvas: React.FC = () => {
  const [nodes, setNodes] = useState<NodeItem[]>(INITIAL_NODES);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(4);

  const handleRunWorkflow = () => {
    setIsRunning(true);
    setActiveStep(0);

    const runStep = (step: number) => {
      if (step >= nodes.length) {
        setIsRunning(false);
        setActiveStep(nodes.length - 1);
        return;
      }
      setActiveStep(step);
      setTimeout(() => {
        runStep(step + 1);
      }, 500);
    };

    runStep(0);
  };

  return (
    <section id="workflow" className="py-24 bg-[#FDFDFD] border-t border-zinc-200/80">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-800 mb-4">
            <Workflow className="w-3.5 h-3.5 text-zinc-900" />
            <span>VISUAL WORKFLOW ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight">
            Choreograph multi-agent software pipelines.
          </h2>
          <p className="mt-3 text-base text-zinc-600 leading-relaxed">
            Connect events, AST parsing, autonomous generation, and test validation in an integrated visual canvas.
          </p>
        </div>

        {/* Visual Workflow Canvas Box */}
        <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-xl p-6 sm:p-8 relative overflow-hidden fernand-card">
          
          {/* Canvas Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-100">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
              <div>
                <span className="text-sm font-bold text-zinc-900">Pipeline: Autonomous PR Synthesis & Deployment</span>
                <div className="text-xs text-zinc-400 font-mono">Total pipeline execution time: 269ms</div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRunWorkflow}
              disabled={isRunning}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition active:scale-95 btn-magnetic ${
                isRunning
                  ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                  : 'bg-[#111111] text-white hover:bg-black shadow-sm cursor-pointer'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunning ? 'Running Pipeline...' : 'Execute Pipeline'}</span>
            </button>
          </div>

          {/* Node Flow Horizontal Pipeline */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {nodes.map((node, idx) => {
              const isCurrent = activeStep === idx;
              const isPast = activeStep > idx;

              return (
                <div key={node.id} className="relative flex flex-col">
                  
                  {/* Card Container */}
                  <div 
                    onClick={() => setActiveStep(idx)}
                    className={`p-4 rounded-2xl border transition-all h-full flex flex-col justify-between cursor-pointer ${
                      isCurrent
                        ? 'bg-zinc-50 border-black shadow-md ring-2 ring-black/10'
                        : isPast
                        ? 'bg-white border-emerald-200 shadow-xs'
                        : 'bg-white/80 border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono">
                          0{idx + 1} · {node.category}
                        </span>
                        {isPast ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : isCurrent ? (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#111111] animate-ping"></div>
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-zinc-300"></span>
                        )}
                      </div>

                      <h4 className="text-xs font-bold text-zinc-900 leading-snug">
                        {node.title}
                      </h4>
                    </div>

                    <div className="mt-4 pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                      <span>Latency</span>
                      <span className="font-semibold text-zinc-800">{node.duration}</span>
                    </div>
                  </div>

                  {/* Connector Arrow for Desktop */}
                  {idx < nodes.length - 1 && (
                    <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-zinc-200 shadow-2xs items-center justify-center text-zinc-400">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          {/* Bottom Live Execution Summary */}
          <div className="mt-8 p-4 bg-zinc-50 rounded-2xl border border-zinc-200/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-zinc-700">Status: <strong>Ready for Automated Merge</strong></span>
            </div>
            <div className="text-zinc-500">
              AST Verification: <span className="text-emerald-600 font-bold">100% Invariants Preserved</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
