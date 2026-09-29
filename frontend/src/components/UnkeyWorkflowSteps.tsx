import React, { useState, useEffect } from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface StepData {
  id: string;
  name: string;
  badge: string;
  headline: string;
  subheadline: string;
  description: string;
  points: string[];
  image: string;
}

const STEPS: StepData[] = [
  {
    id: 'connect',
    name: 'Connect',
    badge: 'Step 01 // Integration',
    headline: 'Connect your repository and backlogs',
    subheadline: 'Git-based setup in 30 seconds',
    description: 'Link your GitHub or GitLab workspace with one click. Wavey indexes the entire AST dependency graph and stays continuously in sync with your team branches.',
    points: ['Automatic monorepo & multi-package discovery', 'Branch-level semantic AST indexing', 'Zero configuration required'],
    image: '/inspiration/74aa86c86d52e91753c101c44235fca6.jpg'
  },
  {
    id: 'plan',
    name: 'Plan',
    badge: 'Step 02 // Topological DAG',
    headline: 'Construct deterministic architectural plans',
    subheadline: 'Sub-agent trees with strict invariants',
    description: 'High-level requirements are parsed into structured execution DAGs. Specialized architect agents verify type invariants and edge cases before a single line is written.',
    points: ['Topological dependency ordering', 'Invariant verification gates', 'Automated rollbacks on failure'],
    image: '/inspiration/804bb9115dc8861332061b021d7a9c5f.jpg'
  },
  {
    id: 'synthesize',
    name: 'Synthesize',
    badge: 'Step 03 // Multi-File Synthesis',
    headline: 'Synthesize atomic code modifications',
    subheadline: 'Surgical multi-file AST diffs',
    description: 'Specialized coder agents apply coordinated changes across dozens of files simultaneously without hallucinating ghost APIs or broken imports.',
    points: ['Atomic AST transformations', 'Full workspace type safety', 'Clean idiomatic TypeScript & Rust'],
    image: '/inspiration/c85580faa098c4f72800eb0d8b145169.jpg'
  },
  {
    id: 'verify',
    name: 'Verify',
    badge: 'Step 04 // MicroVM Sandboxes',
    headline: 'Execute and verify in isolated MicroVMs',
    subheadline: 'Hardware isolation booting in <20ms',
    description: 'Tests and builds execute inside disposable Firecracker microVMs. Full unit test suites, integration tests, and linters run in clean ephemeral sandboxes.',
    points: ['KVM-level hardware security', '100% test pass rate enforcement', 'Zero host access or credential leak'],
    image: '/inspiration/cfb72161f37595145d9a2262cde9378d.jpg'
  },
  {
    id: 'ship',
    name: 'Ship',
    badge: 'Step 05 // Automated PR',
    headline: 'Open verified GitHub pull requests',
    subheadline: 'Automated changelogs and reviews',
    description: 'Once all verification gates pass, Wavey opens a clean pull request with detailed change summaries, linked issues, and passing test artifacts.',
    points: ['Automated PR creation on branch', 'Complete review changelog', 'Ready for team merge in 1 click'],
    image: '/inspiration/ba6920356b007489d1e608ca498d8154.jpg'
  }
];

export const UnkeyWorkflowSteps: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Auto-cycle through steps
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % STEPS.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isHovered]);

  const activeStep = STEPS[activeStepIndex];

  return (
    <section 
      className="py-24 bg-[#FDFDFD] border-b border-zinc-200/60"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-[1330px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-900 mb-4 shadow-2xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-900"></span>
          BUILD & DEPLOY
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between mb-12">
          <div className="lg:col-span-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight leading-[1.12]">
              Deploy in minutes. Roll back in seconds. Ship with confidence at any scale.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
              Autonomous infrastructure that moves with your code. Review changes in isolated microVMs, then promote the exact version you tested.
            </p>
          </div>
        </div>

        {/* 5-Step Tab Navigation Bar (Unkey style) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 border border-zinc-200 rounded-2xl overflow-hidden bg-white mb-8 shadow-2xs">
          {STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`py-4 px-3 text-center text-xs sm:text-sm font-bold transition-all duration-200 border-r border-b sm:border-b-0 border-zinc-200 last:border-r-0 cursor-pointer ${
                  isActive
                    ? 'bg-zinc-900 text-white shadow-inner'
                    : 'bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
              >
                <span>{step.name}</span>
              </button>
            );
          })}
        </div>

        {/* Split Showcase Container */}
        <div className="p-1.5 sm:p-2 bg-zinc-100 rounded-3xl border border-zinc-200/90 shadow-2xs">
          <div className="bg-white rounded-[calc(1.5rem-0.375rem)] border border-zinc-200/80 p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Context & Details */}
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                  {activeStep.badge}
                </span>

                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight leading-tight">
                  {activeStep.headline}
                </h3>

                <p className="text-sm text-zinc-500 font-mono">
                  {activeStep.subheadline}
                </p>

                <p className="text-sm text-zinc-600 leading-relaxed">
                  {activeStep.description}
                </p>

                <div className="pt-2 space-y-2 font-medium text-xs sm:text-sm text-zinc-800">
                  {activeStep.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900 shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Illustration Preview */}
              <div className="lg:col-span-6">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-200/90 shadow-sm">
                  <img 
                    src={activeStep.image} 
                    alt={activeStep.headline}
                    className="w-full h-full object-cover object-center animate-in fade-in duration-500"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
