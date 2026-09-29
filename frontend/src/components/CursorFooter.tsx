import React from 'react';
import { Sparkles, Github, Twitter, Disc as Discord } from 'lucide-react';

export const CursorFooter: React.FC = () => {
  return (
    <footer className="bg-[#FDFDFD] border-t border-zinc-200/80 pt-16 pb-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-zinc-200/60">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold text-base shadow-xs">
                W
              </div>
              <span className="font-bold text-lg tracking-tight text-zinc-900">Wavey</span>
            </div>
            
            <p className="text-xs sm:text-sm text-zinc-500 max-w-sm leading-relaxed">
              The AI-first code editor and development environment built for high-throughput software teams.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white border border-zinc-200 text-[11px] font-mono font-medium text-zinc-700 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Systems Operational</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-zinc-900 uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-600">
              <li><a href="#features" className="hover:text-zinc-950 transition">Agent Workspace</a></li>
              <li><a href="#tab" className="hover:text-zinc-950 transition">Tab Predictions</a></li>
              <li><a href="#composer" className="hover:text-zinc-950 transition">Multi-file Composer</a></li>
              <li><a href="#pricing" className="hover:text-zinc-950 transition">Pricing Plans</a></li>
              <li><a href="#enterprise" className="hover:text-zinc-950 transition">Enterprise Security</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-zinc-900 uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-600">
              <li><a href="#" className="hover:text-zinc-950 transition">Documentation</a></li>
              <li><a href="#" className="hover:text-zinc-950 transition">Changelog</a></li>
              <li><a href="#" className="hover:text-zinc-950 transition">Community Hub</a></li>
              <li><a href="#" className="hover:text-zinc-950 transition">CLI Reference</a></li>
              <li><a href="#" className="hover:text-zinc-950 transition">API Documentation</a></li>
            </ul>
          </div>

          {/* Company & Legal Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-zinc-900 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-600">
              <li><a href="#" className="hover:text-zinc-950 transition">About Us</a></li>
              <li><a href="#" className="hover:text-zinc-950 transition">Careers</a></li>
              <li><a href="#" className="hover:text-zinc-950 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-zinc-950 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-zinc-950 transition">Security & Trust</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} Wavey AI, Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-zinc-900 transition" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-zinc-900 transition" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-zinc-900 transition" aria-label="Discord">
              <Discord className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
