import React from 'react';

interface FernandScenicFooterProps {
  onOpenSignUp: () => void;
  onOpenSignIn: () => void;
}

export const FernandScenicFooter: React.FC<FernandScenicFooterProps> = ({
  onOpenSignUp,
  onOpenSignIn
}) => {
  return (
    <section className="relative bg-[#FDFDFD] py-24 border-t border-zinc-200/60 overflow-hidden text-center">
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h2 className="text-3xl sm:text-5xl font-bold text-zinc-900 tracking-tight leading-tight">
          Ready to build autonomous software?
        </h2>

        <p className="mt-4 text-sm sm:text-base text-zinc-600 max-w-xl mx-auto leading-relaxed font-normal">
          Join thousands of developers shipping verified code without context-switching fatigue.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={onOpenSignUp}
            className="px-6 py-3 bg-[#111111] hover:bg-black text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition cursor-pointer flex items-center gap-2 btn-magnetic"
          >
            <span>Start for free</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-zinc-800 text-zinc-300 rounded border border-zinc-700">R</kbd>
          </button>

          <button
            onClick={onOpenSignIn}
            className="px-5 py-3 bg-white hover:bg-zinc-50 border border-zinc-300 text-zinc-900 font-semibold text-xs sm:text-sm rounded-xl shadow-2xs transition cursor-pointer btn-magnetic"
          >
            Sign in to workspace
          </button>
        </div>

        <p className="mt-6 text-xs text-zinc-400 font-normal font-mono">
          Instant setup · No credit card required · Free community edition
        </p>

      </div>
    </section>
  );
};
