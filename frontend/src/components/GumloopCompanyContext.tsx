import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, 
  Terminal, 
  Activity, 
  FileCode, 
  Database, 
  Check, 
  Sparkles, 
  Layers, 
  Cpu
} from 'lucide-react';
import { gsap } from 'gsap';
import { attachMagneticCardTilt } from '../lib/gsapUtils';

interface LiveActivityItem {
  id: string;
  action: string;
  agent: string;
  user: string;
  time: string;
  model: string;
  status: string;
}

const LIVE_ACTIVITIES: LiveActivityItem[] = [
  { id: '1', action: 'Drafted tailored proposal', agent: 'Proposal Builder Agent', user: 'Katherine Duh', time: '2m ago', model: 'Claude Sonnet 4.6', status: 'Completed' },
  { id: '2', action: 'Reviewed deal against criteria', agent: 'Deal Reviewer Agent', user: 'Rahul Behal', time: '9m ago', model: 'GLM-5.2', status: 'Completed' },
  { id: '3', action: 'Rolled up pipeline forecast', agent: 'Forecast Roll-up', user: 'Gonzalo Soto', time: '24m ago', model: 'Gemini 3.1 Pro', status: 'Completed' },
  { id: '4', action: 'Personalized outbound sequence', agent: 'Outbound Prospector', user: 'Marcelo C.', time: '1h ago', model: 'Claude Haiku 4.5', status: 'Completed' },
  { id: '5', action: 'Booked qualified meeting', agent: 'Meeting Scheduler', user: 'Wasay Ahmed', time: '2h ago', model: 'Gemini 3 Flash', status: 'Completed' },
  { id: '6', action: 'Logged notes and follow-ups', agent: 'Post-call Actioner', user: 'Max Brodeur-Urbas', time: '4h ago', model: 'Kimi K2.6', status: 'Completed' },
  { id: '7', action: 'Prepped brief before call', agent: 'Pre-meeting Prepper', user: 'Aron Schwartz', time: '6h ago', model: 'GPT-5.4 Mini', status: 'Completed' },
  { id: '8', action: 'Enriched account in CRM', agent: 'Research Enricher', user: 'Katherine Duh', time: '1d ago', model: 'Gemini 3 Flash', status: 'Completed' }
];

export const GumloopCompanyContext: React.FC = () => {
  const [activeSkillTab, setActiveSkillTab] = useState<'salesforce' | 'rag' | 'evals'>('salesforce');
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const sourceNodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    if (card1Ref.current) cleanups.push(attachMagneticCardTilt(card1Ref.current, { maxTilt: 4, scale: 1.008 }));
    if (card2Ref.current) cleanups.push(attachMagneticCardTilt(card2Ref.current, { maxTilt: 4, scale: 1.008 }));
    if (card3Ref.current) cleanups.push(attachMagneticCardTilt(card3Ref.current, { maxTilt: 3, scale: 1.005 }));

    // Continuous subtle floating nodes
    sourceNodesRef.current.forEach((node, i) => {
      if (node) {
        gsap.to(node, {
          y: -3,
          duration: 2.2 + (i % 3) * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.15
        });
      }
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section className="relative w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-200/80 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-zinc-950 tracking-tight leading-tight">
            Complete context on your company
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            Your company knowledge, the skills your team runs on, and live context from every tool connect into one unified company brain.
          </p>
        </div>

        {/* 3 Bento Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Card 1: Company Knowledge (col-span-12 lg:col-span-7) */}
          <div 
            ref={card1Ref}
            className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 group-hover:scale-110 transition-transform">
                  <Database className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-bold text-zinc-950">Company knowledge</h3>
              </div>
              <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
                Connect your team’s shared knowledge into a centralized, always up-to-date brain that agents and humans can query seamlessly with vector retrieval.
              </p>

              {/* Interactive Knowledge Graph Node Visualization */}
              <div className="bg-zinc-50 rounded-xl p-5 border border-zinc-200/80">
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 pb-2 border-b border-zinc-200/60">
                  <span>Synced Sources (Indexed Real-time)</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live Synced
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { name: 'Notion Wikis', docs: '4,210 pages', status: 'Updated 2m ago' },
                    { name: 'Slack Channels', docs: '85k messages', status: 'Streaming live' },
                    { name: 'Google Drive', docs: '1,420 files', status: 'Updated 10m ago' },
                    { name: 'Salesforce CRM', docs: '12k records', status: 'Webhooks active' },
                    { name: 'Linear Issues', docs: '3,890 tickets', status: 'Synced' },
                    { name: 'Postgres DB', docs: 'Warehouse read', status: 'Read replica' }
                  ].map((source, i) => (
                    <div 
                      key={i} 
                      ref={(el) => (sourceNodesRef.current[i] = el)}
                      className="bg-white p-3.5 rounded-xl border border-zinc-200 shadow-2xs hover:border-zinc-400 hover:shadow-xs transition-all cursor-pointer"
                    >
                      <div className="font-semibold text-xs text-zinc-900">{source.name}</div>
                      <div className="text-[11px] text-zinc-500 mt-0.5">{source.docs}</div>
                      <div className="text-[10px] text-zinc-400 mt-1 font-medium">{source.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
              <span>Automatic embedding pipelines & fine-grained access filtering</span>
              <span className="font-semibold text-zinc-900">Zero data retention guarantee</span>
            </div>
          </div>

          {/* Card 2: Skills Engine (col-span-12 lg:col-span-5) */}
          <div 
            ref={card2Ref}
            className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 group-hover:scale-110 transition-transform">
                  <Terminal className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-bold text-zinc-950">Skills</h3>
              </div>
              <p className="text-sm text-zinc-600 mb-5 leading-relaxed">
                Agents write their own playbooks, self-improve, and execute code in sandboxes to complete tasks the exact way your team needs.
              </p>

              {/* Skills Tab Switcher */}
              <div className="flex items-center gap-1.5 p-1 bg-zinc-100 rounded-lg border border-zinc-200/70 mb-3">
                <button
                  onClick={() => setActiveSkillTab('salesforce')}
                  className={`flex-1 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    activeSkillTab === 'salesforce' ? 'bg-white text-zinc-950 shadow-2xs' : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  SKILL.md
                </button>
                <button
                  onClick={() => setActiveSkillTab('rag')}
                  className={`flex-1 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    activeSkillTab === 'rag' ? 'bg-white text-zinc-950 shadow-2xs' : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  Sandbox.ts
                </button>
                <button
                  onClick={() => setActiveSkillTab('evals')}
                  className={`flex-1 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    activeSkillTab === 'evals' ? 'bg-white text-zinc-950 shadow-2xs' : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  Self-Evals
                </button>
              </div>

              {/* Code Snippet Container */}
              <div className="bg-zinc-900 text-zinc-100 rounded-xl p-4 font-mono text-xs overflow-x-auto shadow-inner border border-zinc-800">
                <div className="flex items-center justify-between text-zinc-400 text-[11px] mb-2 pb-2 border-b border-zinc-800">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <FileCode className="w-3.5 h-3.5 text-zinc-400" />
                    {activeSkillTab === 'salesforce' && 'skills/salesforce-architecture.md'}
                    {activeSkillTab === 'rag' && 'runtime/sandbox-executor.ts'}
                    {activeSkillTab === 'evals' && 'evals/agent-reflection.json'}
                  </span>
                  <span className="text-emerald-400">Updated just now</span>
                </div>
                {activeSkillTab === 'salesforce' && (
                  <pre className="text-zinc-300 leading-relaxed">
{`# Salesforce Architecture
## Execution Directive
1. Map Opportunity to Account ID
2. Pull last 3 Gong transcript points
3. Verify MEDDPIC compliance
4. If ARR > $50K, tag Deal Desk`}
                  </pre>
                )}
                {activeSkillTab === 'rag' && (
                  <pre className="text-zinc-300 leading-relaxed">
{`export async function runSkill(ctx) {
  const deals = await ctx.hubspot.fetch();
  return deals.filter(d => d.risk > 0.4);
}`}
                  </pre>
                )}
                {activeSkillTab === 'evals' && (
                  <pre className="text-zinc-300 leading-relaxed">
{`{
  "benchmark_score": "98.4%",
  "reflection_tuning": "Auto-optimized prompt",
  "hallucination_rate": "0.00%"
}`}
                  </pre>
                )}
              </div>
            </div>

            <div className="mt-5 text-xs text-zinc-500 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Agents learn from feedback and update their execution playbooks.</span>
            </div>
          </div>

          {/* Card 3: Live Activity Stream (col-span-12) */}
          <div 
            ref={card3Ref}
            className="lg:col-span-12 bg-white rounded-2xl sm:rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900">
                    <Activity className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-950">Live activity</h3>
                </div>
                <p className="text-sm text-zinc-600 mt-1">
                  See what apps and skills your team uses most frequently, and which agents did what, in real time.
                </p>
              </div>
            </div>

            {/* Real-time Ticker Grid of Team Member Runs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {LIVE_ACTIVITIES.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-zinc-50/80 p-4 rounded-xl border border-zinc-200/80 hover:border-zinc-400 hover:bg-white transition-all flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-1.5">
                      <span className="font-semibold text-zinc-700 group-hover:text-black">{item.user}</span>
                      <span>{item.time}</span>
                    </div>
                    <div className="text-xs font-bold text-zinc-900 line-clamp-1 group-hover:translate-x-0.5 transition-transform">{item.action}</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">{item.agent}</div>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-zinc-200/60 flex items-center justify-between text-[10px]">
                    <span className="font-medium text-zinc-600 bg-white px-1.5 py-0.5 rounded border border-zinc-200">
                      {item.model}
                    </span>
                    <span className="text-emerald-700 font-semibold">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
