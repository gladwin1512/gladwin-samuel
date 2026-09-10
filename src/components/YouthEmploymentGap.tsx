import React from 'react';
import { GraduationCap, FileX2, Briefcase, AlertTriangle, TrendingDown, CheckCircle, ExternalLink, ShieldAlert } from 'lucide-react';
import { YOUTH_EMPLOYMENT_DATA } from '../data/parallelIndiasData';

interface YouthEmploymentGapProps {
  onOpenSources: () => void;
}

export const YouthEmploymentGap: React.FC<YouthEmploymentGapProps> = ({ onOpenSources }) => {
  return (
    <section id="jobs" className="py-12 sm:py-16 bg-[#0B0F14] border-t border-orange-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              JOBS & EXAMS
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Jobs Promise vs. Exam Reality
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              2 crore promised jobs/yr vs actual additions and 48+ recruitment paper cancellations.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-[#0F141C] border border-orange-500/30 rounded-xl p-2.5 self-start md:self-auto">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>ILO India Employment Report 2024</span>
          </div>
        </div>

        {/* Contrast Showcase: Promise vs Reality */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Card A: Target */}
          <div className="rounded-xl bg-[#0F141C] border border-orange-500/30 p-5 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2 mb-3">
                <span className="font-bold text-orange-400 uppercase">2014 Commitment</span>
                <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30">
                  Target
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-400 block font-medium">Promised Creation:</span>
                <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                  2 Crore
                  <span className="text-sm text-slate-400 font-sans font-normal"> / Year</span>
                </span>
              </div>

              <div className="mt-3 p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1 text-slate-300 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">10-Year Target:</span>
                  <strong className="text-white">20 Crore Jobs</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Area:</span>
                  <strong className="text-slate-200">Formal Manufacturing</strong>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Manifesto Pledge</span>
              <span>2014 Target</span>
            </div>
          </div>

          {/* Card B: Delivery */}
          <div className="rounded-xl bg-[#0F141C] border border-rose-500/30 p-5 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2 mb-3">
                <span className="font-bold text-rose-400 uppercase">Decade Outcome</span>
                <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30">
                  Actual
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-400 block font-medium">Formal Manufacturing Added:</span>
                <span className="text-3xl sm:text-4xl font-black text-rose-400 font-mono">
                  &lt; 1.2 Crore
                  <span className="text-sm text-slate-400 font-sans font-normal"> in 10 Yrs</span>
                </span>
              </div>

              <div className="mt-3 p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1 text-slate-300 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Mfg Share in GDP:</span>
                  <strong className="text-rose-400">Fell from 16.3% to ~13%</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Youth in Unemployed:</span>
                  <strong className="text-white">82.9% of all jobless</strong>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span className="text-rose-400 font-semibold">[ILO / MoSPI 2024]</span>
              <button onClick={onOpenSources} className="text-orange-400 hover:underline">
                Sources
              </button>
            </div>
          </div>
        </div>

        {/* 4 Metric Callout Blocks */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {YOUTH_EMPLOYMENT_DATA.keyMetrics.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-[#0F141C] border border-orange-500/25 p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-orange-400 font-bold mb-1">
                  <span>METRIC #{idx + 1}</span>
                  <span>[{item.badge}]</span>
                </div>
                <span className="text-2xl sm:text-3xl font-black text-white font-mono block">
                  {item.metric}
                </span>
                <h4 className="text-xs font-bold text-slate-200 mt-1">{item.label}</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">{item.subtext}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Paper Leak Crisis Dossier */}
        <div className="mt-6 rounded-xl bg-[#0F141C] border border-rose-500/30 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/40 shrink-0">
                <FileX2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Exam Paper Leak Ledger
                </h3>
                <p className="text-xs text-slate-400">
                  48+ major recruitment exams canceled, impacting 3.4+ crore candidates.
                </p>
              </div>
            </div>
            <span className="text-sm font-black text-rose-400 font-mono">3.4+ Cr Candidates</span>
          </div>

          {/* 3 affected exams */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-rose-400 font-mono font-bold block mb-1">NEET-UG & UGC-NET (2024)</span>
              <p className="text-slate-300 text-[11px]">
                CBI probe into question paper leaks led to cancellation of UGC-NET and Supreme Court scrutiny.
              </p>
              <span className="mt-2 block text-[10px] font-mono text-slate-500">33 Lakh+ Aspirants</span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-rose-400 font-mono font-bold block mb-1">UP Police Constable (2024)</span>
              <p className="text-slate-300 text-[11px]">
                60,244 vacancies canceled within days after papers leaked online, causing statewide protests.
              </p>
              <span className="mt-2 block text-[10px] font-mono text-slate-500">48.1 Lakh+ Candidates</span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-rose-400 font-mono font-bold block mb-1">BPSC & Rajasthan REET</span>
              <p className="text-slate-300 text-[11px]">
                Systematic leaks in teacher eligibility and civil service exams disrupted multi-year preparation.
              </p>
              <span className="mt-2 block text-[10px] font-mono text-slate-500">35 Lakh+ Candidates</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
