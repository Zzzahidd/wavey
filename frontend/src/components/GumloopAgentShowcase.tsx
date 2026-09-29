import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Bot, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Play, 
  Database, 
  FileSpreadsheet, 
  Mail, 
  MessageSquare, 
  PhoneCall, 
  Terminal, 
  Cpu, 
  RefreshCw, 
  Workflow,
  Zap,
  RotateCcw
} from 'lucide-react';
import { gsap } from 'gsap';
import { attachMagneticCardTilt } from '../lib/gsapUtils';

interface TabConfig {
  id: string;
  name: string;
  agentName: string;
  description: string;
  model: string;
  connectors: string[];
  userQuery: string;
  workedTime: string;
  pipelineTotal: string;
  weightedTotal: string;
  deals: {
    name: string;
    account: string;
    stage: string;
    amount: string;
    closeDate: string;
    probability: number;
    owner: string;
    status: 'healthy' | 'at-risk' | 'stalled';
  }[];
  watchlist: {
    deal: string;
    amount: string;
    issue: string;
  }[];
}

const TABS: TabConfig[] = [
  {
    id: 'sales',
    name: 'Sales CRM',
    agentName: 'CRM Deal Intelligence Agent',
    description: 'Manages deals, researches prospects, and keeps your CRM continuously updated.',
    model: 'Claude 4.5 Sonnet + 5 connectors',
    connectors: ['Salesforce', 'HubSpot', 'Gmail', 'Linear', 'Gong'],
    userQuery: "How's our Q1 pipeline looking? Anything at risk?",
    workedTime: 'Worked for 2 seconds',
    pipelineTotal: '$557,700',
    weightedTotal: '$321,185',
    deals: [
      { name: 'Enterprise Expansion', account: 'Meridian Health', stage: 'Negotiation', amount: '$142,000', closeDate: 'Mar 18', probability: 80, owner: 'Marcus Webb', status: 'healthy' },
      { name: 'Platform Rollout', account: 'Torchlight Systems', stage: 'Proposal Sent', amount: '$98,500', closeDate: 'Mar 24', probability: 55, owner: 'Katherine Duh', status: 'stalled' },
      { name: 'Annual Renewal + Upsell', account: 'Castleford Inc.', stage: 'Contract Review', amount: '$76,000', closeDate: 'Mar 14', probability: 90, owner: 'Priya Nair', status: 'healthy' },
      { name: 'New Logo — Fintech', account: 'Vantage Capital', stage: 'Discovery', amount: '$210,000', closeDate: 'Mar 28', probability: 25, owner: 'James Holloway', status: 'at-risk' },
      { name: 'SMB Bundle', account: 'Oaktree Retail', stage: 'Demo Scheduled', amount: '$31,200', closeDate: 'Mar 31', probability: 40, owner: 'Katherine Duh', status: 'at-risk' }
    ],
    watchlist: [
      { deal: 'Vantage Capital ($210K)', amount: '$210K', issue: 'Still in Discovery with only 17 days to close. No activity logged in 8 days.' },
      { deal: 'Torchlight Systems ($98.5K)', amount: '$98.5K', issue: 'Proposal sent 12 days ago with no response. Requires follow-up nudge.' },
      { deal: 'Oaktree Retail ($31.2K)', amount: '$31.2K', issue: 'Demo scheduled with 40% probability. Tight closing runway.' }
    ]
  },
  {
    id: 'support',
    name: 'Support Triage',
    agentName: 'Autonomous Ticket Triage Agent',
    description: 'Categorizes tickets, auto-resolves tier-1 queries, and routes escalations with context.',
    model: 'Gemini 3.7 Flash + Zendesk & Linear',
    connectors: ['Zendesk', 'Linear', 'Slack', 'Intercom', 'Postgres'],
    userQuery: 'Summarize today’s high-severity escalations and auto-draft engineering bug reports.',
    workedTime: 'Worked for 1.4 seconds',
    pipelineTotal: '48 Tickets',
    weightedTotal: '92% Auto-Resolved',
    deals: [
      { name: 'OAuth 401 Expiry Bug', account: 'Stripe Payers', stage: 'Escalated to Core Eng', amount: 'Priority P0', closeDate: 'Today', probability: 100, owner: 'Aron Schwartz', status: 'at-risk' },
      { name: 'Billing Invoice Mismatch', account: 'Acme Corp', stage: 'Auto-Resolved', amount: 'Priority P2', closeDate: '10m ago', probability: 100, owner: 'Agent Bot', status: 'healthy' },
      { name: 'SAML Metadata Sync', account: 'Globex Enterprise', stage: 'In Progress', amount: 'Priority P1', closeDate: 'Today', probability: 80, owner: 'Katherine Duh', status: 'healthy' }
    ],
    watchlist: [
      { deal: 'OAuth 401 Expiry Bug', amount: 'P0 Incident', issue: 'Affecting 14 active Enterprise SSO sessions. Eng patch deployed to staging.' },
      { deal: 'SAML Metadata Sync', amount: 'P1 Ticket', issue: 'Waiting on customer IT admin to confirm certificate thumbprint.' }
    ]
  },
  {
    id: 'data',
    name: 'Data Analyst',
    agentName: 'Enterprise SQL & Metrics Bot',
    description: 'Queries warehouse data, identifies conversion bottlenecks, and generates executive visuals.',
    model: 'GPT-5.6 Sol + Snowflake & Postgres',
    connectors: ['Snowflake', 'BigQuery', 'Postgres', 'dbt', 'Tableau'],
    userQuery: 'Compare this month’s cohort retention to previous quarter and flag anomalies.',
    workedTime: 'Worked for 3.1 seconds',
    pipelineTotal: '94.2% MoM Retention',
    weightedTotal: '+14% Expansion',
    deals: [
      { name: 'Enterprise Tier Retention', account: 'Cohort Q1-26', stage: 'Steady 98.2%', amount: '$1.8M ARR', closeDate: 'Ongoing', probability: 98, owner: 'Data Ops', status: 'healthy' },
      { name: 'Self-Serve Pro Churn', account: 'Cohort Mid-Market', stage: 'Drop at Day 14', amount: '$42K ARR', closeDate: 'Investigating', probability: 65, owner: 'Growth Team', status: 'at-risk' },
      { name: 'API Usage Surges', account: 'AI Workloads', stage: 'Up 320% WoW', amount: '$120K Consumed', closeDate: 'Active', probability: 95, owner: 'Infra Eng', status: 'healthy' }
    ],
    watchlist: [
      { deal: 'Self-Serve Pro Churn', amount: '$42K MRR', issue: 'Users dropping off at step 3 of onboarding integration setup.' }
    ]
  },
  {
    id: 'meetings',
    name: 'Meeting Prep',
    agentName: 'Executive Briefing Agent',
    description: 'Prepares detailed background briefs, talking points, and CRM histories before every call.',
    model: 'Claude 4.5 Sonnet + Granola & Calendar',
    connectors: ['Google Calendar', 'Granola', 'Salesforce', 'LinkedIn', 'PitchBook'],
    userQuery: 'Generate a 1-page briefing for my 2 PM sync with the VP of Engineering at Carta.',
    workedTime: 'Worked for 2.4 seconds',
    pipelineTotal: '6 Action Items',
    weightedTotal: '100% Prepped',
    deals: [
      { name: 'Executive Strategy Sync', account: 'Carta VP Eng', stage: 'Brief Generated', amount: 'Strategic', closeDate: 'Today 2:00 PM', probability: 90, owner: 'Marcelo C.', status: 'healthy' },
      { name: 'Security Review Committee', account: 'Ramp InfoSec', stage: 'SOC2 Deck Ready', amount: 'Enterprise', closeDate: 'Tomorrow 10 AM', probability: 85, owner: 'Wasay Ahmed', status: 'healthy' }
    ],
    watchlist: [
      { deal: 'Carta VP Eng Meeting', amount: '2:00 PM', issue: 'Key discussion point: Self-hosted VPC agent architecture & latency SLA.' }
    ]
  },
  {
    id: 'calls',
    name: 'Voice & Calls',
    agentName: 'Autonomous Real-time Voice Agent',
    description: 'Conducts interactive audio calls, qualifies inbound leads, and updates records in real time.',
    model: 'Gumball Audio Router + Twilio',
    connectors: ['Twilio', 'WebRTC', 'Salesforce', 'Slack', 'Calendar'],
    userQuery: 'Initiate outbound follow-up calls to 12 webinar attendees who requested demos.',
    workedTime: 'Worked for 4.2 seconds',
    pipelineTotal: '12 Calls Scheduled',
    weightedTotal: '8 Leads Qualified',
    deals: [
      { name: 'Lead Qualified: FinTech VP', account: 'Brex Tech Lead', stage: 'Demo Booked', amount: '$65,000', closeDate: 'Tomorrow', probability: 85, owner: 'Voice Agent', status: 'healthy' },
      { name: 'Lead Voicemail Follow-up', account: 'Acme Director', stage: 'SMS Sent', amount: '$30,000', closeDate: 'Mar 15', probability: 50, owner: 'Voice Agent', status: 'healthy' }
    ],
    watchlist: [
      { deal: 'Brex Tech Lead', amount: '$65K Deal', issue: 'Expressed strong interest in MCP connector tool tracking.' }
    ]
  }
];

const CAPABILITY_BADGES = [
  { label: 'App triggers', icon: Zap },
  { label: 'Recurring tasks', icon: RefreshCw },
  { label: '300+ Connectors', icon: Database },
  { label: 'Skills engine', icon: Terminal },
  { label: 'Artifact building', icon: Layers },
  { label: 'Image generation', icon: FileSpreadsheet },
  { label: 'Self-improvement', icon: Sparkles }
];

export const GumloopAgentShowcase: React.FC<{ onOpenSignUp?: () => void }> = ({ onOpenSignUp }) => {
  const [activeTab, setActiveTab] = useState<string>('sales');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const showcaseContainerRef = useRef<HTMLDivElement>(null);
  const tableRowsRef = useRef<(HTMLTableRowElement | null)[]>([]);
  const currentTab = TABS.find((t) => t.id === activeTab) || TABS[0];

  useEffect(() => {
    // 3D Tilt on container
    if (showcaseContainerRef.current) {
      const cleanup = attachMagneticCardTilt(showcaseContainerRef.current, { maxTilt: 3.5, scale: 1.004 });
      return cleanup;
    }
  }, []);

  // Stagger animate table rows on tab change or re-run
  const triggerSimulationAnimation = () => {
    setIsExecuting(true);
    gsap.fromTo(
      tableRowsRef.current.filter(Boolean),
      { autoAlpha: 0, x: -15 },
      {
        autoAlpha: 1,
        x: 0,
        stagger: 0.08,
        duration: 0.45,
        ease: 'power2.out',
        onComplete: () => setIsExecuting(false)
      }
    );
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setTimeout(triggerSimulationAnimation, 50);
  };

  return (
    <section className="relative w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-200/80 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-zinc-950 tracking-tight leading-tight">
            Let your experts build the agents
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            Understanding a task is the only prerequisite to automating it. Let your team who already understand the problem build the necessary agents. No learning curve involved.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex flex-wrap items-center justify-center p-1.5 bg-zinc-100/90 rounded-2xl border border-zinc-200/80 gap-1">
            {TABS.map((tab) => {
              const isSelected = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white text-zinc-950 shadow-xs font-semibold scale-105'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/50'
                  }`}
                >
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* White Interactive Agent Card Container with GSAP 3D Depth */}
        <div 
          ref={showcaseContainerRef}
          className="bg-white rounded-2xl sm:rounded-3xl border border-zinc-200 shadow-sm hover:shadow-lg transition-all overflow-hidden"
        >
          
          {/* Top Bar of the Agent Window */}
          <div className="bg-zinc-50/90 border-b border-zinc-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-900 shadow-2xs">
                <Bot className="w-5 h-5 text-zinc-800" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-zinc-900 flex items-center gap-2">
                  {currentTab.agentName}
                  <span className="text-[11px] font-normal text-zinc-500 bg-zinc-200/70 px-2 py-0.5 rounded-md">
                    {currentTab.workedTime}
                  </span>
                </h3>
                <p className="text-xs text-zinc-500">{currentTab.description}</p>
              </div>
            </div>

            {/* Model & Interactive Re-Run Button */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-zinc-200 rounded-lg text-xs font-medium text-zinc-700 shadow-2xs">
                <Cpu className="w-3.5 h-3.5 text-zinc-500" />
                {currentTab.model}
              </span>
              <button
                type="button"
                onClick={triggerSimulationAnimation}
                disabled={isExecuting}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 hover:bg-black text-white rounded-lg text-xs font-medium transition-all shadow-2xs cursor-pointer active:scale-95"
              >
                <RotateCcw className={`w-3 h-3 ${isExecuting ? 'animate-spin' : ''}`} />
                <span>Re-run Intelligence</span>
              </button>
            </div>
          </div>

          {/* Agent Simulation Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* User Request Bubble */}
            <div className="flex items-start gap-3 max-w-2xl">
              <div className="w-7 h-7 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                M
              </div>
              <div className="bg-zinc-100 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-zinc-800 font-medium border border-zinc-200/60">
                {currentTab.userQuery}
              </div>
            </div>

            {/* Agent Live Response Flow */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-zinc-100 text-zinc-900 border border-zinc-300 flex items-center justify-center text-xs font-bold shrink-0">
                <Bot className="w-4 h-4 text-zinc-800" />
              </div>
              <div className="flex-1 space-y-4">
                
                {/* Agent Execution Steps Pill */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 font-medium">
                  <span className="inline-flex items-center gap-1 bg-zinc-50 border border-zinc-200 px-2 py-1 rounded-md">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Fetched 38 open CRM deals
                  </span>
                  <span className="inline-flex items-center gap-1 bg-zinc-50 border border-zinc-200 px-2 py-1 rounded-md">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Cross-referenced activity logs
                  </span>
                  <span className="inline-flex items-center gap-1 bg-zinc-50 border border-zinc-200 px-2 py-1 rounded-md">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Generated executive summary table
                  </span>
                </div>

                {/* Structured Data Table (Interactive Hover Rows) */}
                <div className="bg-white rounded-xl border border-zinc-200 overflow-x-auto shadow-2xs">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-zinc-50/80 border-b border-zinc-200 text-zinc-500 font-medium text-[11px] uppercase tracking-wider">
                        <th className="px-4 py-3">Opportunity / Task</th>
                        <th className="px-4 py-3">Account</th>
                        <th className="px-4 py-3">Stage</th>
                        <th className="px-4 py-3">Value / Priority</th>
                        <th className="px-4 py-3">Close / ETA</th>
                        <th className="px-4 py-3">Prob.</th>
                        <th className="px-4 py-3">Owner</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 font-medium text-zinc-800">
                      {currentTab.deals.map((deal, idx) => (
                        <tr 
                          key={idx} 
                          ref={(el) => (tableRowsRef.current[idx] = el)}
                          className="hover:bg-zinc-100/70 transition-colors cursor-pointer group"
                        >
                          <td className="px-4 py-3 font-semibold text-zinc-900 flex items-center gap-2">
                            {deal.status === 'at-risk' && (
                              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                            )}
                            {deal.status === 'stalled' && (
                              <span className="w-2 h-2 rounded-full bg-zinc-400 shrink-0"></span>
                            )}
                            {deal.status === 'healthy' && (
                              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                            )}
                            <span className="group-hover:translate-x-0.5 transition-transform">{deal.name}</span>
                          </td>
                          <td className="px-4 py-3 text-zinc-600">{deal.account}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 text-xs">
                              {deal.stage}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-semibold text-zinc-950">{deal.amount}</td>
                          <td className="px-4 py-3 text-zinc-500">{deal.closeDate}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs">{deal.probability}%</span>
                              <div className="w-12 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-zinc-900 rounded-full transition-all duration-700" 
                                  style={{ width: `${deal.probability}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-zinc-500 text-xs">{deal.owner}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Watchlist & Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Summary Metric Pill */}
                  <div className="bg-zinc-50/80 rounded-xl p-4 border border-zinc-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-zinc-500 font-medium">Active Pipeline Value</div>
                      <div className="text-xl font-bold text-zinc-950">{currentTab.pipelineTotal}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-zinc-500 font-medium">Weighted Forecast</div>
                      <div className="text-xl font-bold text-zinc-950">{currentTab.weightedTotal}</div>
                    </div>
                  </div>

                  {/* At-Risk Watchlist Box */}
                  <div className="bg-zinc-50/80 rounded-xl p-4 border border-zinc-200/80">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      At-Risk Watchlist & Follow-ups
                    </div>
                    <div className="space-y-1.5">
                      {currentTab.watchlist.map((item, i) => (
                        <div key={i} className="text-xs text-zinc-700 leading-snug">
                          <strong className="text-zinc-900">{item.deal}:</strong> {item.issue}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action CTA within Agent Sandbox */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-zinc-500">
                    Want me to draft follow-ups for stalled deals or sync to your CRM?
                  </span>
                  <button 
                    onClick={onOpenSignUp}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-950 hover:bg-black text-white rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
                  >
                    <span>Execute Workflow</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Bottom Feature Capabilities Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {CAPABILITY_BADGES.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div 
                key={idx}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-white border border-zinc-200/90 rounded-full text-xs font-medium text-zinc-700 shadow-2xs hover:border-zinc-400 hover:shadow-xs transition-all cursor-pointer group"
              >
                <Icon className="w-3.5 h-3.5 text-zinc-500 group-hover:text-black transition-colors" />
                <span>{badge.label}</span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
