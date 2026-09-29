import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  FileText, 
  Cloud, 
  SlidersHorizontal, 
  CheckCircle, 
  AlertOctagon, 
  Activity, 
  DollarSign,
  Users,
  Eye,
  Check,
  X,
  Sparkles
} from 'lucide-react';
import { attachMagneticCardTilt } from '../lib/gsapUtils';

interface AuditLog {
  id: string;
  user: string;
  action: string;
  time: string;
  status: string;
}

const AUDIT_LOGS: AuditLog[] = [
  { id: '1', user: 'Marcelo C.', action: 'Rotated Salesforce production API key', time: 'Just now', status: 'Security' },
  { id: '2', user: 'Aron S.', action: 'Published Weekly Digest autonomous workflow', time: '3m ago', status: 'Workflow' },
  { id: '3', user: 'Katherine D.', action: 'Elevated Aron’s role to Workspace Admin', time: '12m ago', status: 'IAM' },
  { id: '4', user: 'Rahul B.', action: 'Provisioned Okta SAML SSO domain', time: '45m ago', status: 'Auth' },
  { id: '5', user: 'Max B.', action: 'Created new Data Analyst agent with VPC proxy', time: '2h ago', status: 'Fleet' }
];

export const GumloopEnterpriseControls: React.FC = () => {
  const [modelToggles, setModelToggles] = useState<{ [key: string]: boolean }>({
    'claude-opus': true,
    'gemini-flash': true,
    'gpt-5': true,
    'deepseek': true,
    'grok': false
  });

  const [approvalStatus, setApprovalStatus] = useState<'pending' | 'approved' | 'denied'>('pending');
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    cardsRef.current.forEach((card) => {
      if (card) {
        cleanups.push(attachMagneticCardTilt(card, { maxTilt: 3.5, scale: 1.01 }));
      }
    });
    return () => cleanups.forEach((c) => c());
  }, []);

  const toggleModel = (id: string) => {
    setModelToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="relative w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-200/80">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-zinc-950 tracking-tight leading-tight">
            Enterprise-grade controls
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            Give your IT, InfoSec, and Finance teams total governance over models, data access, audit logs, and budgets.
          </p>
        </div>

        {/* Bento Grid (All Crisp White Cards with GSAP 3D magnetic tilt) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Usage Monitoring & Budgeting */}
          <div 
            ref={(el) => { cardsRef.current[0] = el; }} 
            className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-xs flex flex-col justify-between transition-shadow hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-base text-zinc-950">Usage monitoring</h3>
                </div>
                <span className="text-[11px] bg-zinc-100 px-2 py-0.5 rounded font-medium text-zinc-600">Q1 Budget</span>
              </div>
              <p className="text-xs text-zinc-600 mb-4 leading-relaxed">
                Track organization-wide token and credit usage in real time. Set automated hard quotas to avoid surprises.
              </p>

              {/* Spend Bar Visual */}
              <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-200/80 mb-3">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-zinc-500 font-medium">Spent: $4,820 / $10,000</span>
                  <span className="font-bold text-zinc-900">48.2%</span>
                </div>
                <div className="w-full h-2 bg-zinc-200 rounded-full overflow-hidden">
                  <div className="h-full bg-zinc-900 rounded-full" style={{ width: '48.2%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-zinc-400 mt-2">
                  <span>Jan: $1.2k</span>
                  <span>Feb: $1.8k</span>
                  <span>Mar: $1.8k</span>
                  <span className="text-emerald-700 font-semibold">Under Budget</span>
                </div>
              </div>
            </div>
            <div className="text-[11px] text-zinc-500 font-medium">Auto-alerts on 80% threshold</div>
          </div>

          {/* Card 2: Audit Logging */}
          <div 
            ref={(el) => { cardsRef.current[1] = el; }} 
            className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-xs flex flex-col justify-between transition-shadow hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900">
                    <Activity className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-base text-zinc-950">Audit logging</h3>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <p className="text-xs text-zinc-600 mb-3 leading-relaxed">
                Capture immutable audit trails for every key rotation, permission change, and agent run across your tenant.
              </p>

              <div className="space-y-2">
                {AUDIT_LOGS.slice(0, 3).map((log) => (
                  <div key={log.id} className="bg-zinc-50 p-2 rounded-lg border border-zinc-200/70 text-[11px]">
                    <div className="flex justify-between text-zinc-500">
                      <strong className="text-zinc-900">{log.user}</strong>
                      <span>{log.time}</span>
                    </div>
                    <div className="text-zinc-700 truncate mt-0.5">{log.action}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-[11px] text-zinc-500 font-medium mt-3">SIEM export via Splunk / Datadog</div>
          </div>

          {/* Card 3: VPC Deployments */}
          <div 
            ref={(el) => { cardsRef.current[2] = el; }} 
            className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-xs flex flex-col justify-between transition-shadow hover:shadow-md"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900">
                  <Cloud className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-zinc-950">VPC deployments</h3>
              </div>
              <p className="text-xs text-zinc-600 mb-4 leading-relaxed">
                Deploy Wavey inside your own AWS, Azure, or Google Cloud private VPC to keep data completely inside your network.
              </p>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-200 font-medium text-zinc-800 cursor-pointer hover:bg-zinc-100 transition-colors">
                  AWS VPC
                </div>
                <div className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-200 font-medium text-zinc-800 cursor-pointer hover:bg-zinc-100 transition-colors">
                  GCP Cloud
                </div>
                <div className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-200 font-medium text-zinc-800 cursor-pointer hover:bg-zinc-100 transition-colors">
                  Azure VNet
                </div>
              </div>
            </div>
            <div className="text-[11px] text-zinc-500 font-medium mt-4">Zero outbound data exfiltration</div>
          </div>

          {/* Card 4: SAML SSO and SCIM */}
          <div 
            ref={(el) => { cardsRef.current[3] = el; }} 
            className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-xs flex flex-col justify-between transition-shadow hover:shadow-md"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900">
                  <Lock className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-zinc-950">SAML SSO & SCIM</h3>
              </div>
              <p className="text-xs text-zinc-600 mb-4 leading-relaxed">
                Streamline identity lifecycle management with Okta, Microsoft Entra ID, and Google Workspace.
              </p>

              <div className="space-y-2 text-xs">
                {['Okta Workforce Identity', 'Google Workspace SSO', 'Microsoft Azure AD'].map((idp, i) => (
                  <div key={i} className="flex items-center justify-between bg-zinc-50 p-2 rounded-lg border border-zinc-200 cursor-pointer hover:bg-zinc-100 transition-colors">
                    <span className="font-medium text-zinc-800">{idp}</span>
                    <span className="text-emerald-700 text-[10px] font-bold">Enabled</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-[11px] text-zinc-500 font-medium mt-4">Just-in-time provisioning supported</div>
          </div>

          {/* Card 5: AI Model Restrictions Switcher */}
          <div 
            ref={(el) => { cardsRef.current[4] = el; }} 
            className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-xs flex flex-col justify-between transition-shadow hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900">
                    <SlidersHorizontal className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-base text-zinc-950">AI model restrictions</h3>
                </div>
                <span className="text-[11px] text-zinc-500">IT Policy</span>
              </div>
              <p className="text-xs text-zinc-600 mb-3 leading-relaxed">
                Choose exactly which LLM vendors and reasoning models teams are permitted to invoke.
              </p>

              <div className="space-y-2 text-xs">
                {[
                  { id: 'claude-opus', name: 'Claude Opus 5.1' },
                  { id: 'gemini-flash', name: 'Gemini 3.7 Flash' },
                  { id: 'gpt-5', name: 'GPT-5.6 Sol' },
                  { id: 'deepseek', name: 'DeepSeek V4-Pro' }
                ].map((m) => (
                  <div key={m.id} className="flex items-center justify-between bg-zinc-50 p-2 rounded-lg border border-zinc-200">
                    <span className="font-medium text-zinc-800">{m.name}</span>
                    <button
                      type="button"
                      onClick={() => toggleModel(m.id)}
                      className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                        modelToggles[m.id] ? 'bg-zinc-900' : 'bg-zinc-300'
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.75 transition-transform ${
                        modelToggles[m.id] ? 'right-1' : 'left-1'
                      }`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-[11px] text-zinc-500 font-medium mt-3">Enforced at API gateway level</div>
          </div>

          {/* Card 6: Spend Caps and Approvals */}
          <div 
            ref={(el) => { cardsRef.current[5] = el; }} 
            className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-xs flex flex-col justify-between transition-shadow hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-base text-zinc-950">Spend caps & approvals</h3>
                </div>
                <span className="text-[11px] bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded font-bold">
                  Action Required
                </span>
              </div>
              <p className="text-xs text-zinc-600 mb-3 leading-relaxed">
                Require human manager authorization before executing heavy compute tasks or raising credit limits.
              </p>

              {/* Interactive Approval Request Box */}
              <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                <div className="text-xs font-semibold text-zinc-900 mb-1">Credit Increase Request</div>
                <p className="text-[11px] text-zinc-600 leading-snug">
                  Gonzalo hit the 50k token cap on Deal Reviewer agent. Requesting raise to 75k?
                </p>

                {approvalStatus === 'pending' ? (
                  <div className="flex gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() => setApprovalStatus('approved')}
                      className="flex-1 py-1.5 bg-zinc-900 text-white rounded-lg text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => setApprovalStatus('denied')}
                      className="px-3 py-1.5 bg-white border border-zinc-300 text-zinc-700 rounded-lg text-xs font-medium hover:bg-zinc-100 transition-colors cursor-pointer"
                    >
                      Deny
                    </button>
                  </div>
                ) : (
                  <div className="mt-2 text-xs font-semibold flex items-center gap-1 text-emerald-800">
                    <Check className="w-3.5 h-3.5" />
                    <span>{approvalStatus === 'approved' ? 'Approved • Cap raised to 75k' : 'Request Denied'}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-[11px] text-zinc-500 font-medium mt-3">Slack approval interactive buttons</div>
          </div>

          {/* Card 7: App Policies & Guardrails */}
          <div 
            ref={(el) => { cardsRef.current[6] = el; }} 
            className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-xs flex flex-col justify-between transition-shadow hover:shadow-md"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900">
                  <AlertOctagon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-zinc-950">App policies & guardrails</h3>
              </div>
              <p className="text-xs text-zinc-600 mb-4 leading-relaxed">
                Write plain English safety rules that block, tag, or sanitize actions before agent runs touch production.
              </p>

              <div className="space-y-2 text-xs">
                <div className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-200 font-mono text-[11px] text-zinc-800">
                  “Block all emails sent to non-company domains without explicit confirmation”
                </div>
                <div className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-200 font-mono text-[11px] text-zinc-800">
                  “Redact credit card and SSN tokens prior to model prompt submission”
                </div>
              </div>
            </div>
            <div className="text-[11px] text-zinc-500 font-medium mt-4">Pre-execution interceptor active</div>
          </div>

          {/* Card 8: MCP Client and Server Tracking */}
          <div 
            ref={(el) => { cardsRef.current[7] = el; }} 
            className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-xs flex flex-col justify-between transition-shadow hover:shadow-md"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900">
                  <Eye className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-zinc-950">MCP tool tracking</h3>
              </div>
              <p className="text-xs text-zinc-600 mb-4 leading-relaxed">
                Trace every Model Context Protocol (MCP) server tool call through one unified analytics and telemetry layer.
              </p>

              <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200 text-xs space-y-1.5">
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-zinc-600">mcp/slack:post_message</span>
                  <span className="text-emerald-700 font-bold">200 OK (84ms)</span>
                </div>
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-zinc-600">mcp/salesforce:query_deal</span>
                  <span className="text-emerald-700 font-bold">200 OK (110ms)</span>
                </div>
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-zinc-600">mcp/linear:create_issue</span>
                  <span className="text-emerald-700 font-bold">200 OK (62ms)</span>
                </div>
              </div>
            </div>
            <div className="text-[11px] text-zinc-500 font-medium mt-4">OpenTelemetry compliant</div>
          </div>

          {/* Card 9: SOC 2 & Compliance Badges */}
          <div 
            ref={(el) => { cardsRef.current[8] = el; }} 
            className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-xs flex flex-col justify-between transition-shadow hover:shadow-md"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-zinc-950">Compliance & Trust</h3>
              </div>
              <p className="text-xs text-zinc-600 mb-4 leading-relaxed">
                Independently audited security architecture guaranteed with Zero Data Retention agreements.
              </p>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                  <div className="font-bold text-xs text-zinc-900">SOC 2 Type II</div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">Audited by Schellman</div>
                </div>
                <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                  <div className="font-bold text-xs text-zinc-900">GDPR & CCPA</div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">Zero Data Retention</div>
                </div>
              </div>
            </div>
            <div className="text-[11px] text-zinc-500 font-medium mt-4">HIPAA BAA agreements available</div>
          </div>

        </div>

      </div>
    </section>
  );
};
