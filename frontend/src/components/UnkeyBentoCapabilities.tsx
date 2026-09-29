import React from 'react';
import { ArrowRight } from 'lucide-react';

export const UnkeyBentoCapabilities: React.FC = () => {
  return (
    <section className="py-24 bg-[#FDFDFD] border-b border-zinc-200/60">
      <div className="max-w-[1330px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-900 mb-4 shadow-2xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-900"></span>
          SECURITY & SOVEREIGNTY
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight leading-[1.12] max-w-3xl mb-4">
          Enterprise security and complete execution determinism.
        </h2>
        <p className="text-base sm:text-lg text-zinc-600 max-w-2xl leading-relaxed mb-14 font-normal">
          Designed for regulated enterprises and high-scale software teams who refuse to compromise on security.
        </p>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="p-1.5 bg-zinc-100 rounded-3xl border border-zinc-200/90 shadow-2xs hover:shadow-md hover:border-zinc-300 transition-all duration-300 flex flex-col group cursor-pointer">
            <div className="bg-white rounded-[calc(1.5rem-0.375rem)] p-6 flex-1 flex flex-col justify-between border border-zinc-200/70">
              <div>
                <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden bg-zinc-50 border border-zinc-200/80 mb-6">
                  <img 
                    src="/inspiration/96f16a0d3761eb0e65d21e9fd92f3044.jpg" 
                    alt="Zero Data Retention"
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  01 // Sovereignty
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-2">
                  Zero Data Retention Guarantee
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Your proprietary code is never retained or used to train third-party foundation models. Ephemeral execution environments with dedicated VPC peering.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-zinc-900 group-hover:text-black">
                <span>Read security invariants</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-black group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-1.5 bg-zinc-100 rounded-3xl border border-zinc-200/90 shadow-2xs hover:shadow-md hover:border-zinc-300 transition-all duration-300 flex flex-col group cursor-pointer">
            <div className="bg-white rounded-[calc(1.5rem-0.375rem)] p-6 flex-1 flex flex-col justify-between border border-zinc-200/70">
              <div>
                <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden bg-zinc-50 border border-zinc-200/80 mb-6">
                  <img 
                    src="/inspiration/9907f5351febc8c5d91ee7a8d09f255d.jpg" 
                    alt="Real-Time Telemetry"
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  02 // Observability
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-2">
                  Sub-Millisecond Trace Streams
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Full execution graph telemetry streamed directly over Server-Sent Events. Understand every token consumption, latency percentile, and planning decision.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-zinc-900 group-hover:text-black">
                <span>View telemetry specs</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-black group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-1.5 bg-zinc-100 rounded-3xl border border-zinc-200/90 shadow-2xs hover:shadow-md hover:border-zinc-300 transition-all duration-300 flex flex-col group cursor-pointer">
            <div className="bg-white rounded-[calc(1.5rem-0.375rem)] p-6 flex-1 flex flex-col justify-between border border-zinc-200/70">
              <div>
                <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden bg-zinc-50 border border-zinc-200/80 mb-6">
                  <img 
                    src="/inspiration/e6d19ee6634091a468fdac5ef50be64b.jpg" 
                    alt="Self-Healing Evals"
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  03 // Verification
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-2">
                  Self-Healing Regression Suites
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Autonomous reproduction of compiler errors and regression tests. Code changes are verified through deterministic test fixtures before delivery.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-zinc-900 group-hover:text-black">
                <span>Explore eval engine</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-black group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
