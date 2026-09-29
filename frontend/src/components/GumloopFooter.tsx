import React from 'react';
import { Bot, ArrowUpRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const GumloopFooter: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-zinc-200/90 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-zinc-600">
      <div className="max-w-6xl mx-auto">
        
        {/* Main 5-Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-zinc-950 font-bold text-lg tracking-tight">
              <div className="w-7 h-7 rounded-lg bg-zinc-950 text-white flex items-center justify-center text-xs font-bold">
                W
              </div>
              <span>Wavey</span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
              The multiplayer AI agent builder. Empower anyone at your company to build autonomous workflows with any AI model while IT maintains strict governance.
            </p>
          </div>

          {/* Col 1: Use Cases */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-3">Use Cases</div>
            <ul className="space-y-2 text-xs">
              <li><a href="#sales" className="hover:text-zinc-950 transition-colors">Sales & CRM Ops</a></li>
              <li><a href="#support" className="hover:text-zinc-950 transition-colors">Support Triage</a></li>
              <li><a href="#data" className="hover:text-zinc-950 transition-colors">Data Engineering</a></li>
              <li><a href="#meetings" className="hover:text-zinc-950 transition-colors">Meeting Briefings</a></li>
              <li><a href="#voice" className="hover:text-zinc-950 transition-colors">Voice & Calls</a></li>
            </ul>
          </div>

          {/* Col 2: Popular */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-3">Popular Agents</div>
            <ul className="space-y-2 text-xs">
              <li><a href="#deal-reviewer" className="hover:text-zinc-950 transition-colors">Deal Reviewer</a></li>
              <li><a href="#proposal-builder" className="hover:text-zinc-950 transition-colors">Proposal Builder</a></li>
              <li><a href="#sql-bot" className="hover:text-zinc-950 transition-colors">Warehouse SQL Bot</a></li>
              <li><a href="#ticket-triage" className="hover:text-zinc-950 transition-colors">Linear/Zendesk Triage</a></li>
              <li><a href="#prepper" className="hover:text-zinc-950 transition-colors">Pre-Meeting Prepper</a></li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-3">Resources</div>
            <ul className="space-y-2 text-xs">
              <li><a href="#docs" className="hover:text-zinc-950 transition-colors">Documentation</a></li>
              <li><a href="#changelog" className="hover:text-zinc-950 transition-colors">Changelog</a></li>
              <li><a href="#router" className="hover:text-zinc-950 transition-colors">Model Router</a></li>
              <li><a href="#connectors" className="hover:text-zinc-950 transition-colors">300+ Connectors</a></li>
              <li><a href="#status" className="hover:text-zinc-950 transition-colors">System Status</a></li>
            </ul>
          </div>

          {/* Col 4: Company */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-3">Company</div>
            <ul className="space-y-2 text-xs">
              <li><a href="#about" className="hover:text-zinc-950 transition-colors">About Us</a></li>
              <li><a href="#series-b" className="hover:text-zinc-950 transition-colors font-medium text-zinc-900">Series B ($50M)</a></li>
              <li><a href="#careers" className="hover:text-zinc-950 transition-colors">Careers (Hiring!)</a></li>
              <li><a href="#security" className="hover:text-zinc-950 transition-colors">Security & Trust</a></li>
              <li><a href="#contact" className="hover:text-zinc-950 transition-colors">Contact Sales</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-8 border-t border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} Wavey Technologies Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-zinc-950 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-zinc-950 transition-colors">Terms of Service</a>
            <a href="#dpa" className="hover:text-zinc-950 transition-colors">Data Processing Addendum</a>
            <a href="#security" className="hover:text-zinc-950 transition-colors">SOC 2 Report</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
