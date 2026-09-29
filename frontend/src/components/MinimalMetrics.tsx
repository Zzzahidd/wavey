import React from 'react';

const METRICS = [
  {
    value: '0.00%',
    label: 'Data Retention',
    detail: 'Your proprietary codebase is never stored or used to train third-party foundation models.'
  },
  {
    value: '< 20ms',
    label: 'MicroVM Boot Latency',
    detail: 'Disposable hardware-isolated Linux execution sandboxes boot in under twenty milliseconds.'
  },
  {
    value: '99.4%',
    label: 'Deterministic Pass Rate',
    detail: 'All synthesized code passes local typecheck, lint, and regression test suites before delivery.'
  }
];

export const MinimalMetrics: React.FC = () => {
  return (
    <section className="py-24 bg-[#FDFDFD]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {METRICS.map((metric, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="text-4xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight font-mono">
                {metric.value}
              </div>
              <div className="text-sm font-bold text-zinc-800 mt-2">
                {metric.label}
              </div>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
