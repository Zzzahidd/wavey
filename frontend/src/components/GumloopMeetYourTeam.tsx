import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { 
  MessageSquare, 
  Mail, 
  Send, 
  Hash, 
  Users, 
  CornerDownRight, 
  CheckCheck, 
  Search, 
  Inbox, 
  Star, 
  Clock, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  Bot 
} from 'lucide-react';
import { attachMagneticCardTilt } from '../lib/gsapUtils';

export const GumloopMeetYourTeam: React.FC = () => {
  const [platform, setPlatform] = useState<'slack' | 'teams' | 'gmail'>('slack');
  const containerRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      return attachMagneticCardTilt(containerRef.current, { maxTilt: 2.5, scale: 1.004 });
    }
  }, []);

  useEffect(() => {
    if (feedRef.current) {
      gsap.fromTo(
        feedRef.current.children,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
      );
    }
  }, [platform]);

  return (
    <section id="solutions" className="relative w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-200/80">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-zinc-950 tracking-tight leading-tight">
            Meet your team where they work
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            Bring AI agents directly into the channels, messages, and inboxes your team lives in every day.
          </p>
        </div>

        {/* 3 Platform Switcher Pills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            type="button"
            onClick={() => setPlatform('slack')}
            className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-4 cursor-pointer select-none ${
              platform === 'slack'
                ? 'bg-zinc-950 text-white border-zinc-950 shadow-md'
                : 'bg-white text-zinc-700 hover:text-zinc-950 border-zinc-200 hover:border-zinc-300'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 ${platform === 'slack' ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-800'}`}>
              #
            </div>
            <div>
              <div className="font-semibold text-sm">Slack</div>
              <div className={`text-xs ${platform === 'slack' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                @mention an agent in any channel or thread
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setPlatform('teams')}
            className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-4 cursor-pointer select-none ${
              platform === 'teams'
                ? 'bg-zinc-950 text-white border-zinc-950 shadow-md'
                : 'bg-white text-zinc-700 hover:text-zinc-950 border-zinc-200 hover:border-zinc-300'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 ${platform === 'teams' ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-800'}`}>
              T
            </div>
            <div>
              <div className="font-semibold text-sm">Microsoft Teams</div>
              <div className={`text-xs ${platform === 'teams' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                Bring agents into your chats and channels
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setPlatform('gmail')}
            className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-4 cursor-pointer select-none ${
              platform === 'gmail'
                ? 'bg-zinc-950 text-white border-zinc-950 shadow-md'
                : 'bg-white text-zinc-700 hover:text-zinc-950 border-zinc-200 hover:border-zinc-300'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 ${platform === 'gmail' ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-800'}`}>
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm">Gmail</div>
              <div className={`text-xs ${platform === 'gmail' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                Let agents draft and triage right in your inbox
              </div>
            </div>
          </button>
        </div>

        {/* White Interactive Interface Simulator */}
        <div ref={containerRef} className="bg-white rounded-2xl sm:rounded-3xl border border-zinc-200 shadow-sm overflow-hidden transition-shadow">
          
          {/* SLACK INTERACTIVE SIMULATION */}
          {platform === 'slack' && (
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
              
              {/* Slack Sidebar */}
              <div className="md:col-span-4 bg-zinc-900 text-zinc-300 p-5 border-r border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-4">
                    <span className="font-bold text-white text-sm">Acme Engineering Workspace</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-2">GTM Channels</div>
                      <div className="space-y-1">
                        <div className="px-2.5 py-1.5 rounded-lg bg-zinc-800 text-white font-medium flex items-center gap-2 cursor-pointer">
                          <Hash className="w-3.5 h-3.5 text-zinc-400" />
                          <span>data-analysis</span>
                        </div>
                        <div className="px-2.5 py-1.5 rounded-lg text-zinc-400 hover:text-white flex items-center gap-2 cursor-pointer transition-colors">
                          <Hash className="w-3.5 h-3.5 text-zinc-500" />
                          <span>sales-discussion</span>
                        </div>
                        <div className="px-2.5 py-1.5 rounded-lg text-zinc-400 hover:text-white flex items-center gap-2 cursor-pointer transition-colors">
                          <Hash className="w-3.5 h-3.5 text-zinc-500" />
                          <span>pipeline-reviews</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-2">Active Agents</div>
                      <div className="space-y-1">
                        <div className="px-2.5 py-1 text-zinc-300 flex items-center gap-2 cursor-pointer">
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          <span>@Databot</span>
                        </div>
                        <div className="px-2.5 py-1 text-zinc-300 flex items-center gap-2 cursor-pointer">
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          <span>@DealReviewer</span>
                        </div>
                        <div className="px-2.5 py-1 text-zinc-300 flex items-center gap-2 cursor-pointer">
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          <span>@SupportAgent</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 text-[11px] text-zinc-500 flex items-center justify-between">
                  <span>Connected via Gumloop App</span>
                  <span className="text-emerald-400 font-medium">Online</span>
                </div>
              </div>

              {/* Slack Channel Chat Feed */}
              <div className="md:col-span-8 p-6 flex flex-col justify-between bg-white">
                <div ref={feedRef} className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-zinc-500" />
                      <span className="font-bold text-sm text-zinc-900">data-analysis</span>
                      <span className="text-xs text-zinc-400">| Sales & Growth analytics</span>
                    </div>
                    <span className="text-xs text-zinc-400">32 members</span>
                  </div>

                  {/* Message 1 */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                      M
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-zinc-900">Max Brodeur</span>
                        <span className="text-zinc-400">3:12 PM</span>
                      </div>
                      <p className="text-sm text-zinc-800 mt-1">
                        <span className="bg-zinc-100 text-zinc-900 px-1.5 py-0.5 rounded font-medium">@Databot</span> Compare this month's closed-won sales to the same period last year.
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-0.5 bg-zinc-100 text-xs rounded-full border border-zinc-200 cursor-pointer">2 replies</span>
                        <span className="px-2 py-0.5 bg-zinc-100 text-xs rounded-full border border-zinc-200 cursor-pointer">1 reaction</span>
                      </div>
                    </div>
                  </div>

                  {/* Agent Reply */}
                  <div className="flex items-start gap-3 pl-6 border-l-2 border-zinc-200">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-300 text-zinc-900 font-bold flex items-center justify-center text-xs shrink-0">
                      <Bot className="w-4 h-4 text-zinc-800" />
                    </div>
                    <div className="flex-1 bg-zinc-50 p-4 rounded-xl border border-zinc-200">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-zinc-900">Databot (Gumloop Agent)</span>
                        <span className="text-zinc-400">3:12 PM</span>
                      </div>
                      <p className="text-xs text-zinc-700 leading-relaxed">
                        Here is the YoY performance comparison pulled from Salesforce & Stripe:
                      </p>
                      <div className="mt-2 text-xs font-mono bg-white p-2.5 rounded-lg border border-zinc-200 text-zinc-800">
                        • <strong>March 2026:</strong> $482,000 across 18 deals (+34% YoY)<br />
                        • <strong>March 2025:</strong> $360,000 across 14 deals<br />
                        • <strong>Avg Deal Velocity:</strong> 19 days (down from 28 days)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slack Input Box */}
                <div className="mt-6 pt-3 border-t border-zinc-100">
                  <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5">
                    <input 
                      type="text" 
                      readOnly 
                      value="Reply in #data-analysis or ask @Databot..." 
                      className="bg-transparent text-xs text-zinc-500 flex-1 outline-none cursor-text"
                    />
                    <button type="button" aria-label="Send" className="cursor-pointer">
                      <Send className="w-4 h-4 text-zinc-400 hover:text-zinc-700 transition-colors" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TEAMS INTERACTIVE SIMULATION */}
          {platform === 'teams' && (
            <div className="p-6 sm:p-8 bg-white min-h-[460px] flex flex-col justify-between">
              <div ref={feedRef} className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-zinc-900 text-white font-bold flex items-center justify-center text-sm">
                      T
                    </div>
                    <div>
                      <div className="font-bold text-sm text-zinc-900">Executive Revenue Ops Channel</div>
                      <div className="text-xs text-zinc-500">Microsoft Teams Connected Agent</div>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-emerald-50 text-emerald-800 font-semibold rounded-md border border-emerald-200">
                    Bot Active
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
                    <div className="text-xs font-bold text-zinc-900 mb-1">Gabriela (VP Sales) asked:</div>
                    <p className="text-sm text-zinc-800">Who are the top 3 most active accounts at risk this quarter?</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-2xs">
                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
                      <span>Gumloop Revenue Agent:</span>
                    </div>
                    <div className="text-xs text-zinc-700 space-y-1 leading-relaxed">
                      <div>1. <strong>Vantage Capital:</strong> $210K deal in Discovery, no logged contact in 8 days.</div>
                      <div>2. <strong>Torchlight Systems:</strong> $98.5K proposal sent 12 days ago without review.</div>
                      <div>3. <strong>Oaktree Retail:</strong> $31.2K SMB deal needing closing confirmation before March 31.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-zinc-500 pt-4 border-t border-zinc-100 flex items-center justify-between">
                <span>Direct 2-way sync with Microsoft 365, Teams & Outlook</span>
                <span className="font-semibold text-zinc-900">Zero latency streaming</span>
              </div>
            </div>
          )}

          {/* GMAIL INTERACTIVE SIMULATION */}
          {platform === 'gmail' && (
            <div className="p-6 sm:p-8 bg-white min-h-[460px] flex flex-col justify-between">
              <div ref={feedRef} className="space-y-5">
                
                {/* Gmail Header */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-zinc-900">Sourcing video producers (SF, B2B)</div>
                      <div className="text-xs text-zinc-500">Inbox • 24 messages</div>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 font-medium">
                    2 Drafts Created
                  </span>
                </div>

                {/* Email Thread */}
                <div className="space-y-3 text-xs">
                  <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-200">
                    <div className="flex items-center justify-between text-zinc-500 mb-1">
                      <strong className="text-zinc-900">Aron Schwartz</strong>
                      <span>2:34 PM</span>
                    </div>
                    <p className="text-zinc-800">
                      We're looking for video producers in the San Francisco area with B2B SaaS experience. Can you source leads and update Ashby?
                    </p>
                  </div>

                  <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-200">
                    <div className="flex items-center justify-between text-zinc-500 mb-1">
                      <strong className="text-zinc-900">Gumloop Agent &lt;agent@gumloop.ai&gt;</strong>
                      <span>2:35 PM</span>
                    </div>
                    <div className="text-zinc-800 space-y-1">
                      <div>Found 4 matches in SF with B2B experience. All added to Ashby pipeline:</div>
                      <div className="font-mono text-[11px] bg-white p-2 rounded border border-zinc-200 mt-1">
                        • Maya Tran: Freelance, 6 yrs SaaS video<br />
                        • Tess Holloway: Recently left Salesforce studio<br />
                        • Nate Fuentes: B2B studio founder<br />
                        • Ryan Park: Contract, 12+ enterprise SaaS clients
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200 text-emerald-900">
                    <div className="flex items-center justify-between mb-1">
                      <strong>Done! Drafts for Tess and Maya are ready in your Gmail drafts.</strong>
                      <span className="text-xs text-emerald-700 font-bold">Auto-Triage Ready</span>
                    </div>
                    <p className="text-xs text-emerald-800">Personalized outreach crafted with portfolio citations and calendly links.</p>
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                <span>Runs securely on OAuth tokens without storing email contents.</span>
                <button type="button" className="font-semibold text-zinc-950 hover:underline cursor-pointer">
                  Configure Gmail Connector
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
