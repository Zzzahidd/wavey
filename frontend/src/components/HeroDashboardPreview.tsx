import React, { useState } from 'react';
import { 
  Code2, 
  GitPullRequest, 
  GitBranch, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  Activity, 
  Cpu, 
  FileCode2, 
  Smartphone, 
  ArrowUpRight, 
  TrendingUp, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Play,
  RotateCw,
  Home,
  ShoppingBag,
  Users,
  Settings,
  Wifi,
  Battery,
  Signal,
  Copy,
  Check
} from 'lucide-react';

export const HeroDashboardPreview: React.FC = () => {
  // Card 1: Coding Insights State
  const [activeRepoPill, setActiveRepoPill] = useState<number>(882);
  const [activeQualityTab, setActiveQualityTab] = useState<'Architecture' | 'Security' | 'Performance'>('Architecture');

  // Card 2: Telemetry Radar State
  const [radarTarget, setRadarTarget] = useState({ name: 'Ocean Beach Hub', lat: '37.7749° N', lng: '122.4194° W', score: '82%', distance: '2.4 km' });

  // Card 3: AI Analytics State
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState<'1h' | '24h' | '7d'>('1h');

  // Card 4: Prompt Diff State
  const [diffVersion, setDiffVersion] = useState<'v14' | 'v15'>('v14');
  const [isCopied, setIsCopied] = useState(false);

  // Card 5: Mobile App Sandbox State
  const [mobileTab, setMobileTab] = useState<'home' | 'shop' | 'users' | 'settings'>('home');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutToast, setCheckoutToast] = useState<string | null>(null);

  const handleCopyPrompt = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCheckoutSim = () => {
    setIsCheckingOut(true);
    setCheckoutToast('Processing Apple Pay checkout...');
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutToast('✓ Transaction verified ($1,043.00)');
      setTimeout(() => setCheckoutToast(null), 3000);
    }, 900);
  };

  return (
    <div className="w-full max-w-[1360px] mx-auto mt-8 px-2 sm:px-4">
      
      {/* 2-Column Responsive Grid matching Design Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* =========================================================================
            CARD 1: CODING / DEVELOPMENT INSIGHTS (7 Columns)
           ========================================================================= */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-zinc-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 sm:p-6 flex flex-col justify-between fernand-card">
          
          <div>
            {/* Card 1 Top Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-800">
                  <Code2 className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-zinc-900">Coding</span>
                <span className="text-xs text-zinc-400">·</span>
                <span className="text-xs font-medium text-zinc-500">Development Insights</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
                <button 
                  onClick={() => setActiveQualityTab(activeQualityTab === 'Architecture' ? 'Security' : 'Architecture')}
                  className="hover:text-zinc-900 cursor-pointer transition font-medium"
                >
                  Mode: {activeQualityTab}
                </button>
                <span className="text-zinc-300">·</span>
                <span className="text-zinc-900 font-bold flex items-center gap-0.5 cursor-pointer hover:underline">
                  Ocean Stack <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* Metric Stats Row (4 Stats) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4">
              <div className="p-3 bg-zinc-50/80 hover:bg-zinc-100/80 rounded-2xl border border-zinc-100 transition cursor-pointer">
                <div className="text-[11px] font-medium text-zinc-500">Total Commits</div>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-xl font-bold text-zinc-900">46</span>
                  <span className="text-[11px] font-semibold text-emerald-600">↑ 12%</span>
                </div>
              </div>

              <div className="p-3 bg-zinc-50/80 hover:bg-zinc-100/80 rounded-2xl border border-zinc-100 transition cursor-pointer">
                <div className="text-[11px] font-medium text-zinc-500">Active Branches</div>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-xl font-bold text-zinc-900">18</span>
                  <span className="text-[11px] font-semibold text-emerald-600">↑ 8%</span>
                </div>
              </div>

              <div className="p-3 bg-zinc-50/80 hover:bg-zinc-100/80 rounded-2xl border border-zinc-100 transition cursor-pointer">
                <div className="text-[11px] font-medium text-zinc-500">PRs Merged</div>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-xl font-bold text-zinc-900">73</span>
                  <span className="text-[11px] font-semibold text-emerald-600">↑ 24%</span>
                </div>
              </div>

              <div className="p-3 bg-zinc-50/80 hover:bg-zinc-100/80 rounded-2xl border border-zinc-100 transition cursor-pointer">
                <div className="text-[11px] font-medium text-zinc-500">Deployment Time</div>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-xl font-bold text-zinc-900">6.3h</span>
                  <span className="text-[11px] font-semibold text-emerald-600">↑ 5s</span>
                </div>
              </div>
            </div>

            {/* Sub Split: Left Quality Gauge vs Right Pull Request Activity */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
              
              {/* Left Quality Gauge */}
              <div className="md:col-span-5 flex flex-col justify-between border-r border-zinc-100 pr-0 md:pr-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-black text-emerald-600 tracking-tight">85%</span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      ↑ 12% <span className="text-zinc-400 font-normal">vs. 68%</span>
                    </span>
                  </div>
                  <div className="text-xs font-bold text-zinc-900 mt-1">Code Quality Benchmark</div>
                  <div className="text-[11px] text-zinc-500">Clean Code & Type Safety</div>

                  {/* Micro layers */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs py-1.5 px-2 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-zinc-300 transition cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-sm bg-cyan-500"></span>
                        <span className="font-semibold text-zinc-800">Frontend</span>
                      </div>
                      <span className="text-zinc-500 text-[11px]">Clean Architecture · +350</span>
                    </div>

                    <div className="flex items-center justify-between text-xs py-1.5 px-2 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-zinc-300 transition cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-sm bg-emerald-500"></span>
                        <span className="font-semibold text-zinc-800">Backend</span>
                      </div>
                      <span className="text-zinc-500 text-[11px]">API Optimization · +210</span>
                    </div>

                    <div className="flex items-center justify-between text-xs py-1.5 px-2 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-zinc-300 transition cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-sm bg-indigo-500"></span>
                        <span className="font-semibold text-zinc-800">DevOps</span>
                      </div>
                      <span className="text-zinc-500 text-[11px]">Docker + K8s · +128</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-zinc-600">
                  <span className="cursor-pointer hover:text-black">&lt;/&gt; Code Reports</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                </div>
              </div>

              {/* Right Pull Request Activity Area */}
              <div className="md:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-700">Pull Request Activity</span>
                    <span className="text-[11px] text-zinc-400 font-mono">Continuous Stream</span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-bold text-zinc-900">3,126 PRs</span>
                    <span className="text-xs font-bold text-emerald-600">↑ 18%</span>
                  </div>

                  {/* SVG Activity Curve */}
                  <div className="h-20 w-full mt-2 relative">
                    <svg className="w-full h-full" viewBox="0 0 300 70" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="prGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0 50 Q 50 40, 90 48 T 170 30 T 230 18 T 300 12 L 300 70 L 0 70 Z"
                        fill="url(#prGrad)"
                      />
                      <path
                        d="M 0 50 Q 50 40, 90 48 T 170 30 T 230 18 T 300 12"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2.5"
                      />
                    </svg>
                    <div className="flex justify-between text-[10px] text-zinc-400 mt-1 px-1">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>

                  {/* PRs by Repository circular badges */}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-zinc-500">PRs by Repository</span>
                    <div className="flex items-center gap-1.5">
                      {[882, 640, 432, 317].map((count, idx) => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setActiveRepoPill(count)}
                          className={`w-7 h-7 rounded-full text-[10px] font-bold flex items-center justify-center transition cursor-pointer ${
                            activeRepoPill === count
                              ? idx === 0 ? 'bg-cyan-100 text-cyan-800 ring-1 ring-cyan-300' :
                                idx === 1 ? 'bg-rose-100 text-rose-800 ring-1 ring-rose-300' :
                                'bg-[#111111] text-white shadow-xs'
                              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                          }`}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Micro activity logs */}
                  <div className="mt-2 space-y-1 text-[11px]">
                    <div className="flex items-center justify-between py-1 text-zinc-600 border-t border-zinc-100">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                        ui-components · 4h ago
                      </span>
                      <span className="font-semibold text-emerald-600">+128</span>
                    </div>
                    <div className="flex items-center justify-between py-1 text-zinc-600 border-t border-zinc-100">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        api-service · 6h ago
                      </span>
                      <span className="font-semibold text-emerald-600">+54</span>
                    </div>
                  </div>

                </div>

                {/* Action Badges Footer */}
                <div className="mt-3 pt-2 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-700 flex items-center gap-1 cursor-pointer hover:underline">▲ Code</span>
                    <span className="text-cyan-700 flex items-center gap-1 cursor-pointer hover:underline">▲ Build</span>
                    <span className="text-indigo-700 flex items-center gap-1 cursor-pointer hover:underline">◫ Deploy</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* =========================================================================
            CARD 2: REAL-TIME TELEMETRY / LOCATION MAP (5 Columns)
           ========================================================================= */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-zinc-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 sm:p-6 flex flex-col justify-between fernand-card relative overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100 z-10">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-zinc-700" />
              <span className="text-xs font-semibold text-zinc-900">Location Telemetry</span>
              <span className="text-xs text-zinc-500 truncate">{radarTarget.name}</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
          </div>

          {/* Interactive Radar & Map Area */}
          <div 
            onClick={() => {
              setRadarTarget({
                name: 'Mission District Edge',
                lat: '37.7599° N',
                lng: '122.4148° W',
                score: '94%',
                distance: '1.2 km'
              });
            }}
            className="my-4 h-56 relative bg-zinc-50/70 rounded-2xl border border-zinc-100 overflow-hidden flex items-center justify-center cursor-pointer group"
            title="Click to relocate radar telemetry scan"
          >
            {/* Grid coordinate lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"></div>

            {/* Radar Scan Rings */}
            <div className="absolute w-44 h-44 rounded-full border border-zinc-200 animate-pulse-ring"></div>
            <div className="absolute w-28 h-28 rounded-full border border-zinc-300"></div>
            <div className="absolute w-12 h-12 rounded-full border border-black/20 bg-black/5"></div>

            {/* Rotating Radar Sweeper */}
            <div className="absolute w-44 h-44 rounded-full animate-radar origin-center pointer-events-none">
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent to-black/10 transform origin-right"></div>
            </div>

            {/* Telemetry Node Points */}
            <div className="absolute top-8 right-12 flex items-center gap-1 bg-white/95 px-2 py-0.5 rounded-full border border-zinc-200 shadow-2xs text-[10px] font-bold text-zinc-700 group-hover:scale-105 transition">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
              14k tok/s
            </div>

            <div className="absolute bottom-12 right-8 flex items-center gap-1 bg-white/95 px-2 py-0.5 rounded-full border border-zinc-200 shadow-2xs text-[10px] font-bold text-zinc-700 group-hover:scale-105 transition">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              18k reqs
            </div>

            <div className="absolute center flex flex-col items-center z-10">
              <div className="w-4 h-4 rounded-full bg-[#111111] border-2 border-white shadow-md"></div>
              <span className="text-[9px] font-bold text-zinc-800 bg-white/95 px-1.5 py-0.5 rounded shadow mt-1 border border-zinc-200">
                Low Latency · {radarTarget.score}
              </span>
            </div>

            {/* Warning / Target Tag */}
            <div className="absolute bottom-3 left-3 bg-white/95 border border-zinc-200 p-2 rounded-xl shadow-xs flex items-center gap-2 max-w-[210px]">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <div className="text-[10px] font-bold text-zinc-900 leading-tight">{radarTarget.name}</div>
                <div className="text-[9px] text-zinc-500 font-mono">{radarTarget.lat}, {radarTarget.lng}</div>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-medium text-zinc-500 z-10">
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Active Sweep · 6h ago
            </span>
            <button 
              onClick={() => setRadarTarget({ name: 'Ocean Beach Hub', lat: '37.7749° N', lng: '122.4194° W', score: '82%', distance: '2.4 km' })}
              className="hover:text-zinc-900 cursor-pointer flex items-center gap-0.5 font-semibold text-zinc-700"
            >
              Reset Target <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Row 2: Analytics, Prompt Diff, Mobile Preview (3 Columns Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
        
        {/* =========================================================================
            CARD 3: AI DEVELOPMENT ANALYTICS (4 Columns)
           ========================================================================= */}
        <div className="md:col-span-4 bg-white rounded-3xl border border-zinc-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 sm:p-6 flex flex-col justify-between fernand-card">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-zinc-800" />
                <span className="text-xs font-semibold text-zinc-900">AI · Development Analytics</span>
              </div>
              <div className="flex items-center gap-1 bg-zinc-100 p-0.5 rounded-lg border border-zinc-200">
                {(['1h', '24h', '7d'] as const).map(tf => (
                  <button
                    key={tf}
                    onClick={() => setAnalyticsTimeframe(tf)}
                    className={`px-2 py-0.5 text-[10px] font-semibold rounded transition cursor-pointer ${
                      analyticsTimeframe === tf ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <div className="text-xs text-zinc-500 font-medium">Token throughput</div>
              <div className="text-[11px] text-zinc-400">in / out · per minute · {analyticsTimeframe}</div>
              
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-zinc-900 tracking-tight">
                  {analyticsTimeframe === '1h' ? '48.2k' : analyticsTimeframe === '24h' ? '1.42M' : '9.85M'}
                </span>
                <span className="text-xs font-bold text-zinc-500">tok/min</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full ml-auto">
                  peak 71.4k at 14:35
                </span>
              </div>
            </div>

            {/* Stepped Throughput Waveform */}
            <div className="h-20 w-full mt-3 relative">
              <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
                <path
                  d="M 0 45 L 20 45 L 20 40 L 50 40 L 50 25 L 80 25 L 80 15 L 110 15 L 110 30 L 140 30 L 140 20 L 170 20 L 170 35 L 200 35 L 200 60 L 0 60 Z"
                  fill="rgba(16, 185, 129, 0.12)"
                />
                <path
                  d="M 0 45 L 20 45 L 20 40 L 50 40 L 50 25 L 80 25 L 80 15 L 110 15 L 110 30 L 140 30 L 140 20 L 170 20 L 170 35 L 200 35"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                />
              </svg>
              <div className="flex justify-between text-[9px] text-zinc-400 mt-1">
                <span>14:00</span>
                <span>14:15</span>
                <span>14:30</span>
                <span>14:45</span>
                <span>NOW</span>
              </div>
            </div>

            {/* Token breakdown table */}
            <div className="mt-4 space-y-2 pt-2 border-t border-zinc-100 text-xs">
              <div className="flex items-center justify-between text-zinc-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-emerald-500"></span>
                  input tokens
                </span>
                <span className="font-semibold text-zinc-800">1.84M · $3.68</span>
              </div>
              <div className="flex items-center justify-between text-zinc-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-indigo-500"></span>
                  output tokens
                </span>
                <span className="font-semibold text-zinc-800">0.71M · $7.10</span>
              </div>
              <div className="flex items-center justify-between text-zinc-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-zinc-400"></span>
                  cached (hit 62%)
                </span>
                <span className="font-semibold text-zinc-800">0.92M · $0.46</span>
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================================
            CARD 4: AI PROMPT DIFF (4 Columns)
           ========================================================================= */}
        <div className="md:col-span-4 bg-white rounded-3xl border border-zinc-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 sm:p-6 flex flex-col justify-between fernand-card font-mono">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 font-sans">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-zinc-800" />
                <span className="text-xs font-semibold text-zinc-900">AI · Prompt diff</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setDiffVersion(diffVersion === 'v14' ? 'v15' : 'v14')}
                  className="text-[10px] bg-zinc-100 hover:bg-zinc-200 text-zinc-800 px-2 py-0.5 rounded-full font-mono font-medium transition cursor-pointer"
                >
                  system · {diffVersion}
                </button>
                <button
                  onClick={handleCopyPrompt}
                  className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-zinc-800 transition cursor-pointer"
                  title="Copy Prompt"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between font-sans">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-emerald-600">+2/-1 lines</span>
                <span className="text-xs text-zinc-400">+12 tokens</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full font-medium">system prompt</span>
              </div>
            </div>

            {/* Syntax Code Block Diff */}
            <div className="mt-3 p-3 bg-zinc-950 text-zinc-200 rounded-2xl text-[11px] leading-relaxed overflow-x-auto shadow-inner">
              <div className="text-zinc-500 select-none">@@ -12,5 +12,6 @@</div>
              <div className="text-zinc-400">12   You are a support triage agent.</div>
              <div className="text-rose-400 bg-rose-950/40 -mx-3 px-3">13 - Answer from memory when unsure.</div>
              <div className="text-emerald-400 bg-emerald-950/40 -mx-3 px-3 font-semibold">14 + Cite a KB article per claim.</div>
              <div className="text-emerald-400 bg-emerald-950/40 -mx-3 px-3 font-semibold">15 + If no article matches, say so.</div>
              <div className="text-zinc-400">16   Keep replies under 120 words.</div>
              <div className="text-zinc-400">17   Always end with next steps.</div>
              <div className="text-zinc-400">18   Never quote a refund amount.</div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500 font-sans">
              <span>tokens 136 → 148</span>
              <span>temp 0.20</span>
            </div>

          </div>
        </div>

        {/* =========================================================================
            CARD 5: MOBILE APP SANDBOX (LemonSqueezy iOS - 4 Columns - ZERO EMOJIS)
           ========================================================================= */}
        <div className="md:col-span-4 bg-white rounded-3xl border border-zinc-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 sm:p-5 flex flex-col justify-between fernand-card">
          <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200/80 shadow-2xs">
            
            {/* Mobile Status Bar - Vector SVGs (ZERO EMOJIS) */}
            <div className="flex justify-between items-center text-[11px] font-bold text-zinc-800 pb-2">
              <span>9:41</span>
              <div className="flex items-center gap-1.5 text-zinc-700">
                <Signal className="w-3 h-3 stroke-[2.5]" />
                <Wifi className="w-3 h-3 stroke-[2.5]" />
                <Battery className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </div>

            {/* App title & filters */}
            <div className="mt-1">
              <div className="text-xs font-bold text-zinc-900">LemonSqueezy iOS</div>
              <div className="flex items-center gap-1.5 mt-1 text-[9px] text-zinc-600">
                <span className="bg-white px-2 py-0.5 rounded border border-zinc-200 cursor-pointer hover:border-zinc-400">Last 7 days ⌄</span>
                <span className="bg-white px-2 py-0.5 rounded border border-zinc-200 cursor-pointer hover:border-zinc-400">Daily ⌄</span>
                <span className="bg-white px-2 py-0.5 rounded border border-zinc-200 cursor-pointer hover:border-zinc-400">All Products ⌄</span>
              </div>
            </div>

            {/* Total revenue */}
            <div className="mt-3">
              <div className="text-[10px] text-zinc-400">Total Revenue</div>
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-black text-zinc-900">$1,985.00</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  ↑ 230%
                </span>
              </div>
            </div>

            {/* Micro curve */}
            <div className="h-10 w-full mt-1">
              <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                <path
                  d="M 0 25 Q 30 5, 60 20 T 100 8"
                  fill="none"
                  stroke="#18181b"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Breakdown bars */}
            <div className="mt-2 space-y-1.5 text-[9px]">
              <div 
                onClick={handleCheckoutSim}
                className="flex justify-between items-center text-zinc-700 hover:text-black cursor-pointer transition"
              >
                <span>Lemon Launch Pack (7 orders)</span>
                <span className="font-bold text-zinc-900">$1,043.00</span>
              </div>
              <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#111111] h-full rounded-full" style={{ width: '52.9%' }}></div>
              </div>

              <div className="flex justify-between items-center text-zinc-700">
                <span>Creator Analytics Kit (6 orders)</span>
                <span className="font-bold text-zinc-900">$474.00</span>
              </div>
              <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-zinc-700 h-full rounded-full" style={{ width: '23.9%' }}></div>
              </div>
            </div>

            {checkoutToast && (
              <div className="mt-2 p-1.5 bg-emerald-50 border border-emerald-200 rounded text-[10px] font-semibold text-emerald-800 text-center">
                {checkoutToast}
              </div>
            )}

            {/* Mobile Tab bar */}
            <div className="mt-3 pt-2 border-t border-zinc-200 flex justify-around text-zinc-500">
              <button 
                onClick={() => setMobileTab('home')}
                className={`p-1 transition cursor-pointer ${mobileTab === 'home' ? 'text-zinc-900 font-bold' : 'text-zinc-400 hover:text-zinc-600'}`}
              >
                <Home className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setMobileTab('shop')}
                className={`p-1 transition cursor-pointer ${mobileTab === 'shop' ? 'text-zinc-900 font-bold' : 'text-zinc-400 hover:text-zinc-600'}`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setMobileTab('users')}
                className={`p-1 transition cursor-pointer ${mobileTab === 'users' ? 'text-zinc-900 font-bold' : 'text-zinc-400 hover:text-zinc-600'}`}
              >
                <Users className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setMobileTab('settings')}
                className={`p-1 transition cursor-pointer ${mobileTab === 'settings' ? 'text-zinc-900 font-bold' : 'text-zinc-400 hover:text-zinc-600'}`}
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
