import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Terminal } from 'lucide-react';

interface FinalCtaBannerProps {
  onOpenSignUp: () => void;
  onOpenSignIn: () => void;
}

export const FinalCtaBanner: React.FC<FinalCtaBannerProps> = ({
  onOpenSignUp,
  onOpenSignIn
}) => {
  return (
    <section className="py-24 bg-[#FDFDFD] border-t border-zinc-200/70 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-800 mb-6 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
          <span>START BUILDING TODAY</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight">
          Ready to put autonomous software synthesis into production?
        </h2>

        <p className="mt-4 text-sm sm:text-base text-zinc-600 max-w-xl mx-auto leading-relaxed">
          Join thousands of developers and engineering teams building with Wavey. Free forever for solo builders.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onOpenSignUp}
            className="px-8 py-3 bg-[#111111] hover:bg-black text-white font-bold text-sm rounded-xl shadow-md transition active:scale-95 cursor-pointer btn-magnetic flex items-center gap-2"
          >
            <span>Start Building for Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            type="button"
            onClick={onOpenSignIn}
            className="px-6 py-3 bg-white hover:bg-zinc-50 border border-zinc-300 text-zinc-800 font-semibold text-sm rounded-xl shadow-2xs transition active:scale-95 cursor-pointer"
          >
            <span>Sign in to Account</span>
          </button>
        </div>

        {/* Micro guarantees */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 font-mono">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Zero Data Retention</span>
          <span>·</span>
          <span>No credit card required</span>
          <span>·</span>
          <span>Deploy in 60 seconds</span>
        </div>

      </div>
    </section>
  );
};
