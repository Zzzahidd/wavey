import React from 'react';
import { ArrowRight, Sparkles, Terminal, Download, ShieldCheck } from 'lucide-react';

interface CursorFinalCtaProps {
  onOpenSignUp: () => void;
  onOpenSignIn: () => void;
}

export const CursorFinalCta: React.FC<CursorFinalCtaProps> = ({ onOpenSignUp, onOpenSignIn }) => {
  return (
    <section className="py-24 bg-[#FDFDFD] border-b border-zinc-200/60">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-1.5 bg-zinc-100 rounded-3xl border border-zinc-200/90 shadow-2xs">
          <div className="bg-white rounded-[calc(1.5rem-0.375rem)] p-8 sm:p-14 text-center relative overflow-hidden border border-zinc-200/70">
            
            {/* Subtle background grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono font-medium text-zinc-900 mb-6 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
                <span>EXPERIENCE INTELLIGENT CODING</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-4">
                Build software at the speed of thought.
              </h2>

              <p className="text-sm sm:text-base text-zinc-600 font-normal mb-8 max-w-xl mx-auto leading-relaxed">
                Join hundreds of thousands of engineers writing cleaner code, resolving complex refactors, and shipping production applications with Wavey.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={onOpenSignUp}
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#111111] hover:bg-black text-white text-sm font-bold rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2 btn-magnetic"
                >
                  <Download className="w-4 h-4" />
                  <span>Download for Windows & Mac</span>
                  <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-zinc-800 text-zinc-300 rounded border border-zinc-700 ml-1">
                    Free
                  </kbd>
                </button>

                <button
                  onClick={onOpenSignUp}
                  className="w-full sm:w-auto px-6 py-3.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-sm font-semibold rounded-xl border border-zinc-200 transition cursor-pointer flex items-center justify-center gap-2 btn-magnetic"
                >
                  <Terminal className="w-4 h-4 text-zinc-600" />
                  <span>Open Web Workspace</span>
                  <ArrowRight className="w-4 h-4 text-zinc-500" />
                </button>
              </div>

              {/* Security guarantee subtext */}
              <div className="mt-8 flex items-center justify-center gap-6 text-xs text-zinc-500 font-mono">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-zinc-700" />
                  <span>SOC2 Type II Certified</span>
                </div>
                <span>•</span>
                <div>Zero Data Retention Option</div>
                <span>•</span>
                <div>No Credit Card Required</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
