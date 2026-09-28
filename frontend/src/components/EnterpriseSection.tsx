import React from 'react';
import { ShieldCheck, Lock, Server, CheckCircle2, FileCheck, ArrowRight } from 'lucide-react';

export const EnterpriseSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#FDFDFD] border-t border-zinc-200/80">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-800 mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#5E1312]" />
            <span>SOVEREIGN ENTERPRISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight">
            Security & data sovereignty at scale.
          </h2>
          <p className="mt-3 text-base text-zinc-600 leading-relaxed">
            Your proprietary codebase never trains public models. Isolated execution with zero data retention.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          <div className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm hover:border-zinc-300 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-zinc-100 flex items-center justify-center text-[#5E1312] mb-6">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-900">Zero Data Retention</h3>
            <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
              Requests and AST code structures are processed in ephemeral memory and discarded immediately after generation.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>SOC2 Type II Certified</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm hover:border-zinc-300 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-zinc-100 flex items-center justify-center text-[#5E1312] mb-6">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-900">Sovereign VPC Deploy</h3>
            <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
              Deploy Wavey kernel instances directly inside your AWS, GCP, or Azure Virtual Private Cloud with custom VPC peering.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>Air-Gapped & HIPAA Ready</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm hover:border-zinc-300 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-zinc-100 flex items-center justify-center text-[#5E1312] mb-6">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-900">Deterministic Invariants</h3>
            <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
              Automated lint, security CVE scans, and typecheck verifiers run automatically before code proposals are created.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>Zero-CVE Guarantee</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
