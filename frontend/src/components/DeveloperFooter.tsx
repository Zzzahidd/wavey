import React, { useState, useEffect } from 'react';
import { ArrowRight, Github, Twitter, Linkedin, MessageSquare, ShieldCheck, Activity } from 'lucide-react';

export const DeveloperFooter: React.FC = () => {
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-zinc-950 text-zinc-100 pt-16 pb-8 border-t border-zinc-900 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 3-Column Layout (Inspired by footer inspiration.jfif) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-zinc-800/80">
          
          {/* Column 1: Left CTA (5 Cols) */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-zinc-400 uppercase border border-zinc-800 px-2.5 py-1 rounded">
                GET STARTED
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-4 leading-tight">
                Unlock growth with<br />better workflows.
              </h3>

              <a
                href="#pricing"
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-white text-zinc-950 font-bold text-xs rounded-xl hover:bg-zinc-200 transition active:scale-95 shadow-md cursor-pointer btn-magnetic"
              >
                <span>Book Free Strategy Call</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-4 border-t border-zinc-900 text-zinc-400">
              <div>
                <div className="text-[10px] text-zinc-500 uppercase">Mail</div>
                <div className="text-zinc-300 font-semibold mt-0.5">hi@wavey.dev</div>
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 uppercase">Support</div>
                <div className="text-zinc-300 font-semibold mt-0.5">24/7 Enterprise SLA</div>
              </div>
            </div>
          </div>

          {/* Column 2: Center 3D Wireframe & Local Time (4 Cols) */}
          <div className="md:col-span-4 flex flex-col justify-between items-center text-center p-4 border-y md:border-y-0 md:border-x border-zinc-900">
            <div className="text-xs font-mono text-zinc-400">
              <span className="text-zinc-500 text-[10px] uppercase block">LOCAL TIME</span>
              <span className="text-zinc-200 font-bold">{localTime || '10:56:45'} · UTC-7</span>
            </div>

            {/* Geometric SVG Wireframe Monogram */}
            <div className="my-6 relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full text-zinc-700 animate-spin" style={{ animationDuration: '30s' }} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" />
                <line x1="50" y1="10" x2="50" y2="90" />
                <line x1="10" y1="30" x2="90" y2="70" />
                <line x1="10" y1="70" x2="90" y2="30" />
                <circle cx="50" cy="50" r="14" fill="#111111" fillOpacity="0.8" stroke="#333333" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="text-[11px] font-mono text-zinc-500">
              © 2026 WAVEY TECHNOLOGIES INC.<br />
              ALL RIGHTS RESERVED
            </div>
          </div>

          {/* Column 3: Right Navigation & Socials (3 Cols) */}
          <div className="md:col-span-3 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-3">
                SOCIALS
              </div>
              <div className="flex items-center gap-3 text-zinc-400">
                <a href="#" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:text-white hover:border-zinc-700 transition cursor-pointer" aria-label="GitHub">
                  <Github className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:text-white hover:border-zinc-700 transition cursor-pointer" aria-label="Twitter">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:text-white hover:border-zinc-700 transition cursor-pointer" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:text-white hover:border-zinc-700 transition cursor-pointer" aria-label="Discord">
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-2">
                NAVIGATION
              </div>
              <ul className="space-y-1.5 text-xs text-zinc-400">
                <li><a href="#architecture" className="hover:text-white transition cursor-pointer">Architecture Overview</a></li>
                <li><a href="#intelligence" className="hover:text-white transition cursor-pointer">Evals & Nightly Regressions</a></li>
                <li><a href="#workflow" className="hover:text-white transition cursor-pointer">Visual Workflow Canvas</a></li>
                <li><a href="#pricing" className="hover:text-white transition cursor-pointer">Pricing & Sovereign VPC</a></li>
                <li className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] pt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Systems Operational (99.99%)
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Luminous Branded Glowing Strip */}
        <div className="mt-8 rounded-2xl overflow-hidden relative border border-zinc-800 shadow-2xl">
          <div 
            className="w-full py-8 px-6 sm:px-10 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #18181b 0%, #09090b 35%, #0f172a 75%, #064e3b 100%)'
            }}
          >
            {/* Ambient shimmer */}
            <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-gradient-drift"></div>

            {/* Wordmark */}
            <div className="relative z-10 flex items-center gap-3">
              <img src="/logo.svg" alt="Wavey Logo" className="h-7 w-auto filter brightness-0 invert" />
            </div>

            {/* Tagline */}
            <div className="relative z-10 text-[11px] font-mono tracking-widest text-white/90 uppercase border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              PUT AI TO WORK WHERE IT MATTERS.
            </div>
          </div>
        </div>

        {/* Bottom Micro Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between text-[11px] text-zinc-500 font-mono">
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-zinc-300 transition cursor-pointer">PRIVACY POLICY</a>
            <span>·</span>
            <a href="#" className="hover:text-zinc-300 transition cursor-pointer">TERMS OF SERVICE</a>
            <span>·</span>
            <a href="#" className="hover:text-zinc-300 transition cursor-pointer">SECURITY DISCLOSURE</a>
          </div>
          <div>
            BUILT WITH PRECISION FOR AMBITIOUS DEVELOPERS
          </div>
        </div>

      </div>
    </footer>
  );
};
