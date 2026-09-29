import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { 
  Users, 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  Eye, 
  Play, 
  Check, 
  Sparkles, 
  Layers, 
  UserCheck
} from 'lucide-react';
import { attachMagneticCardTilt } from '../lib/gsapUtils';

interface RoleLevel {
  id: string;
  name: string;
  tagline: string;
  permissions: string[];
  description: string;
}

const ROLES: RoleLevel[] = [
  {
    id: 'owner',
    name: 'Owner',
    tagline: 'Full operational control over the agent fleet',
    permissions: [
      'Edit anything, including connectors and every trigger',
      'Decide who has access across the organization',
      'Manage billing caps, secrets, and model router settings',
      'Transfer or delete the agent safely'
    ],
    description: 'Designed for technical leads and system creators who configure and govern the agent architecture.'
  },
  {
    id: 'editor',
    name: 'Editor',
    tagline: 'Fine-tune prompts and optimize connectors',
    permissions: [
      'Modify prompt instructions and adjust response styles',
      'Attach new company skills and document playbooks',
      'Run evals and inspect test regression suites',
      'Cannot delete agents or expose sensitive master API keys'
    ],
    description: 'Ideal for domain experts and operations teams iterating on instructions and business logic.'
  },
  {
    id: 'viewer',
    name: 'Viewer',
    tagline: 'Read-only access to execution logs and architecture',
    permissions: [
      'Inspect trigger logs and live activity feeds',
      'View evaluation metrics and spend breakdowns',
      'Review connected apps and security posture',
      'Cannot modify agent configurations or run destructive actions'
    ],
    description: 'Perfect for compliance officers, auditors, and engineering leadership monitoring agent fleets.'
  },
  {
    id: 'use-only',
    name: 'Use Only',
    tagline: 'Run agents in isolated, secure chat sessions',
    permissions: [
      'Chat with the agent in Slack, Teams, or web app',
      'Trigger approved tasks and get instant answers',
      'Zero access to prompt templates or underlying secrets',
      'Isolated session memory prevents cross-user data leakage'
    ],
    description: 'Empowers every employee in the company to put AI agents to work with complete data safety.'
  }
];

export const GumloopBuiltByOne: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string>('owner');
  const currentRole = ROLES.find((r) => r.id === selectedRole) || ROLES[0];
  const containerRef = useRef<HTMLDivElement>(null);
  const permissionsListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      return attachMagneticCardTilt(containerRef.current, { maxTilt: 2.5, scale: 1.004 });
    }
  }, []);

  useEffect(() => {
    if (permissionsListRef.current) {
      gsap.fromTo(
        permissionsListRef.current.children,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.06, ease: 'power2.out' }
      );
    }
  }, [selectedRole]);

  return (
    <section className="relative w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-200/80">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-zinc-950 tracking-tight leading-tight">
            Built by one, used by all
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            One teammate builds an agent and the whole organization puts it to work, each in their own private chats and workflows.
          </p>
        </div>

        {/* Interactive White Permissions Card */}
        <div ref={containerRef} className="bg-white rounded-2xl sm:rounded-3xl border border-zinc-200 p-6 sm:p-10 shadow-xs">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Role Switcher Buttons */}
            <div className="lg:col-span-4 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                Select an Access Tier:
              </div>

              {ROLES.map((role) => {
                const isSelected = role.id === selectedRole;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`w-full p-4 rounded-xl text-left border transition-all flex items-center justify-between cursor-pointer select-none ${
                      isSelected
                        ? 'bg-zinc-950 text-white border-zinc-950 shadow-xs'
                        : 'bg-zinc-50/70 hover:bg-zinc-100/80 text-zinc-800 border-zinc-200/80'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm flex items-center gap-2">
                        {role.name}
                        {isSelected && (
                          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded text-white font-normal">
                            Active
                          </span>
                        )}
                      </div>
                      <div className={`text-xs mt-0.5 ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                        {role.tagline}
                      </div>
                    </div>
                    <UserCheck className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-zinc-400'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right: Selected Role Permissions Matrix */}
            <div className="lg:col-span-8 bg-zinc-50/70 rounded-2xl p-6 sm:p-8 border border-zinc-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-5">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-950 flex items-center gap-2">
                      <span>{currentRole.name} Access Permissions</span>
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">{currentRole.description}</p>
                  </div>
                  <span className="px-3 py-1 bg-white border border-zinc-200 rounded-lg text-xs font-semibold text-zinc-800 shadow-2xs">
                    Granular Scope
                  </span>
                </div>

                <div ref={permissionsListRef} className="space-y-3">
                  {currentRole.permissions.map((perm, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-zinc-200 shadow-2xs">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-zinc-800 leading-snug">
                        {perm}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-500">
                <span>Share at any level: one person, a functional department, or your entire domain.</span>
                <span className="font-semibold text-zinc-900">SCIM directory sync enabled</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
