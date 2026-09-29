import React from 'react';

export const MinimalFooter: React.FC = () => {
  return (
    <footer className="bg-[#0A0A0A] text-zinc-400 py-16 border-t border-zinc-900 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-zinc-900">
          
          {/* Brand & Status Column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-zinc-950 font-black text-xs font-mono">
                W
              </div>
              <span className="text-white font-bold text-base tracking-tight">Wavey</span>
            </div>

            <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
              The autonomous AI engine for engineering teams. Deterministic software synthesis, verified AST diffs, and hardware-isolated sandboxes.
            </p>

            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>All systems operational</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">Product</div>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-white transition">PR Synthesis</a></li>
              <li><a href="#features" className="hover:text-white transition">MicroVM Sandbox</a></li>
              <li><a href="#features" className="hover:text-white transition">Multi-Agent DAG</a></li>
              <li><a href="#docs" className="hover:text-white transition">Documentation</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">Resources</div>
            <ul className="space-y-2 text-xs">
              <li><a href="#changelog" className="hover:text-white transition">Changelog</a></li>
              <li><a href="#security" className="hover:text-white transition">Security & Privacy</a></li>
              <li><a href="#benchmarks" className="hover:text-white transition">Evals & Benchmarks</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">GitHub</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">Company</div>
            <ul className="space-y-2 text-xs">
              <li><a href="#about" className="hover:text-white transition">About</a></li>
              <li><a href="#careers" className="hover:text-white transition">Careers</a></li>
              <li><a href="#blog" className="hover:text-white transition">Engineering Blog</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-600">
          <div>
            © {new Date().getFullYear()} Wavey Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-zinc-400 transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-zinc-400 transition">Terms of Service</a>
            <a href="#security" className="hover:text-zinc-400 transition">Security Invariants</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
