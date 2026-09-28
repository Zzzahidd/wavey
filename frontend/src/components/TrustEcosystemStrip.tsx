import React from 'react';
import { 
  GitBranch, 
  Terminal, 
  Cpu, 
  Database, 
  Layers, 
  ShieldCheck, 
  Workflow, 
  Sparkles 
} from 'lucide-react';

const ECOSYSTEM_TOOLS = [
  { name: 'GitHub', desc: 'Pull Requests & Repos', icon: GitBranch },
  { name: 'VS Code & JetBrains', desc: 'Native AST Sync', icon: Terminal },
  { name: 'Linear', desc: 'Issue Orchestration', icon: Layers },
  { name: 'Vercel & AWS', desc: 'Continuous Deploy', icon: Cpu },
  { name: 'Supabase & Mongo', desc: 'Zero-Leak Database', icon: Database },
  { name: 'Docker & MicroVMs', desc: 'Isolated Sandbox', icon: ShieldCheck },
];

export const TrustEcosystemStrip: React.FC = () => {
  return (
    <section className="py-12 bg-[#FDFDFD] border-y border-zinc-200/70">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <p className="text-center text-xs font-mono font-medium text-zinc-400 uppercase tracking-widest mb-8">
          INTEGRATED SEAMLESSLY WITH YOUR PRODUCTION DEVELOPER STACK
        </p>

        {/* 6-Column Minimalist Ecosystem Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
          {ECOSYSTEM_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.name}
                className="p-3.5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs hover:border-black/20 hover:shadow-md transition-all duration-200 flex flex-col items-center text-center cursor-pointer fernand-card group"
              >
                <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-800 group-hover:bg-[#111111] group-hover:text-white transition-colors mb-2">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-zinc-900 leading-tight">{tool.name}</span>
                <span className="text-[10px] text-zinc-400 font-mono mt-0.5">{tool.desc}</span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
