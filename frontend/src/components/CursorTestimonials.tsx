import React from 'react';

const TESTIMONIALS = [
  {
    quote: "Wavey is easily the most impactful developer tool I've used in the last decade. It refactors 20 files at once and never breaks my build.",
    author: "Andrej V.",
    title: "AI Researcher & Founding Engineer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AndrejDev"
  },
  {
    quote: "Our engineering velocity tripled within our first sprint. The deterministic sandboxing gives our security team total peace of mind.",
    author: "Diana H.",
    title: "VP of Engineering, Scale",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DianaEng"
  },
  {
    quote: "Being able to run autonomous PR workflows directly from chat with verified type safety is simply transformative for our team.",
    author: "Marcus T.",
    title: "Principal Infrastructure Lead",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MarcusLead"
  }
];

export const CursorTestimonials: React.FC = () => {
  return (
    <section className="py-24 bg-[#FDFDFD] border-b border-zinc-200/60">
      <div className="max-w-[1330px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-900 mb-4 shadow-2xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900"></span>
            ENGINEERING ENDORSEMENTS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight leading-tight">
            Loved by developers building the future.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="p-1.5 bg-zinc-100 rounded-3xl border border-zinc-200/90 shadow-2xs hover:shadow-md hover:border-zinc-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="bg-white rounded-[calc(1.5rem-0.375rem)] p-7 flex-1 flex flex-col justify-between border border-zinc-200/70">
                <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-normal mb-8">
                  “{item.quote}”
                </p>

                <div className="flex items-center gap-3.5 pt-4 border-t border-zinc-100">
                  <img 
                    src={item.avatar} 
                    alt={item.author}
                    className="w-10 h-10 rounded-full border border-zinc-200 shadow-2xs"
                  />
                  <div>
                    <div className="text-xs font-bold text-zinc-900">{item.author}</div>
                    <div className="text-[11px] text-zinc-500 font-mono">{item.title}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
