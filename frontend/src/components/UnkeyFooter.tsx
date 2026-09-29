import React from 'react';

export const UnkeyFooter: React.FC = () => {
  return (
    <footer className="bg-[#FDFDFD] text-zinc-600 py-16 font-sans">
      <div className="max-w-[1330px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-zinc-200/80">
          
          {/* Brand & Status */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#111111] flex items-center justify-center text-white font-black text-xs font-mono">
                W
              </div>
              <span className="text-zinc-900 font-bold text-base tracking-tight">Wavey</span>
            </div>

            <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
              The autonomous AI engine for engineering teams. Write, test, and deploy deterministic software directly from your terminal or chat.
            </p>

            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-[11px] font-mono text-zinc-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>All systems operational</span>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-mono">Product</h4>
            <ul className="space-y-2 text-xs text-zinc-500">
              <li><a href="#control-plane" className="hover:text-zinc-900 transition">Control Plane</a></li>
              <li><a href="#build-deploy" className="hover:text-zinc-900 transition">Build & Deploy</a></li>
              <li><a href="#microvm" className="hover:text-zinc-900 transition">Firecracker Sandboxes</a></li>
              <li><a href="#docs" className="hover:text-zinc-900 transition">Documentation</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-mono">Resources</h4>
            <ul className="space-y-2 text-xs text-zinc-500">
              <li><a href="#changelog" className="hover:text-zinc-900 transition">Changelog</a></li>
              <li><a href="#security" className="hover:text-zinc-900 transition">Security & Privacy</a></li>
              <li><a href="#pricing" className="hover:text-zinc-900 transition">Pricing Comparison</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 transition">GitHub</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-mono">Company</h4>
            <ul className="space-y-2 text-xs text-zinc-500">
              <li><a href="#about" className="hover:text-zinc-900 transition">About</a></li>
              <li><a href="#careers" className="hover:text-zinc-900 transition">Careers</a></li>
              <li><a href="#blog" className="hover:text-zinc-900 transition">Engineering Blog</a></li>
              <li><a href="#contact" className="hover:text-zinc-900 transition">Contact</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-400">
          <div>
            © {new Date().getFullYear()} Wavey Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-zinc-700 transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-zinc-700 transition">Terms of Service</a>
            <a href="#security" className="hover:text-zinc-700 transition">Security Invariants</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
