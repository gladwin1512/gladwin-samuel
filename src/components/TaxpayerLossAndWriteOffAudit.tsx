import React, { useState } from 'react';
import {
  AlertOctagon,
  TrendingDown,
  Building,
  ShieldAlert,
  FileSpreadsheet,
  ArrowDownRight,
  Landmark,
  Scale,
  Users,
  Info,
  DollarSign,
  HelpCircle,
  BarChart3
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { TAXPAYER_LOSS_RECORDS, TAX_COLLECTION_SHIFT_TREND } from '../data/taxpayerPrivatizationData';

interface Props {
  onOpenSources?: () => void;
}

export const TaxpayerLossAndWriteOffAudit: React.FC<Props> = ({ onOpenSources }) => {
  const [selectedRecordId, setSelectedRecordId] = useState<string>(TAXPAYER_LOSS_RECORDS[0].id);

  const selectedRecord = TAXPAYER_LOSS_RECORDS.find((r) => r.id === selectedRecordId) || TAXPAYER_LOSS_RECORDS[0];

  return (
    <section id="taxpayer-loss" className="py-14 bg-[#0B0F14] border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30 mb-4">
            <AlertOctagon className="w-3.5 h-3.5" />
            Empirical Forensic Audit: Public Exchequer Losses
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Much Taxpayer Money Was Lost & Written Off?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
            Detailed ledger of <span className="text-rose-400 font-bold">₹15.3 Lakh Crore</span> in corporate bad loan write-offs, <span className="text-amber-400 font-bold">₹1.84 Lakh Crore/year</span> in corporate tax cuts, and the structural tax shift forcing common citizens to pay more direct tax than every corporation in India combined.
          </p>
        </div>

        {/* 4 Big Impact Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900/90 border border-rose-500/30 rounded-xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-rose-400 font-bold uppercase mb-2">
              <span className="flex items-center gap-1.5">
                <Landmark className="w-4 h-4" /> Corporate Loan Write-Offs
              </span>
              <span className="text-[10px] text-slate-500 font-mono">RBI 2014-24</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              ₹15.3 Lakh Cr
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Written off by commercial banks; recovery rate under IBC has averaged just <strong className="text-rose-400">13.8%</strong> (an ~86% loss).
            </p>
          </div>

          <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-amber-400 font-bold uppercase mb-2">
              <span className="flex items-center gap-1.5">
                <Building className="w-4 h-4" /> Corporate Tax Rate Cut
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Since 2019</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              ₹1.84 Lakh Cr <span className="text-xs font-normal text-slate-400">/ yr</span>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Annual revenue forgone by the exchequer after standard corporate tax was slashed from <strong className="text-amber-400">30% to 22%</strong>.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-cyan-400 font-bold uppercase mb-2">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4" /> Citizen vs Corporate Shift
              </span>
              <span className="text-[10px] text-slate-500 font-mono">FY 2023-24</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              53.3% vs 46.7%
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Salaried citizens paid <strong className="text-cyan-400">₹10.45 Lakh Cr</strong> in income tax, surpassing all corporate taxes (<strong className="text-slate-200">₹9.22 Lakh Cr</strong>).
            </p>
          </div>

          <div className="bg-slate-900/90 border border-purple-500/30 rounded-xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-purple-400 font-bold uppercase mb-2">
              <span className="flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" /> Top Bank Frauds & Fugitives
              </span>
              <span className="text-[10px] text-slate-500 font-mono">CBI / ED</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              ₹1.45 Lakh Cr+
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Unrecovered funds from ABG Shipyard, DHFL, Nirav Modi, Mehul Choksi, Vijay Mallya, and Sterling Biotech.
            </p>
          </div>
        </div>

        {/* Interactive Comparison Tabs & Forensic Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          {/* Left: Tab Selector */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Select Forensic Case File:
            </span>
            {TAXPAYER_LOSS_RECORDS.map((rec) => (
              <button
                key={rec.id}
                onClick={() => setSelectedRecordId(rec.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedRecordId === rec.id
                    ? 'bg-slate-900 border-[#FF9933] shadow-md shadow-[#FF9933]/20'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-[#FF9933]">
                    {rec.category}
                  </span>
                  <span className="text-xs font-mono font-black text-white">
                    {rec.amountLabel}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-200 line-clamp-2">
                  {rec.title}
                </div>
              </button>
            ))}
          </div>

          {/* Right: Detailed Dossier for Selected Case */}
          <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-[#FF9933] uppercase tracking-wider">
                  {selectedRecord.category} Dossier ({selectedRecord.yearRange})
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                  {selectedRecord.title}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-400 uppercase">Estimated Loss / Forgone:</span>
                <div className="text-2xl font-black text-rose-400 font-mono">
                  {selectedRecord.amountLabel}
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <div className="font-bold text-slate-300 uppercase tracking-wider text-xs mb-1">
                  Official Audit Finding:
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {selectedRecord.description}
                </p>
              </div>

              <div className="bg-rose-950/30 border border-rose-500/30 rounded-xl p-4">
                <div className="font-bold text-rose-300 uppercase tracking-wider text-xs mb-1 flex items-center gap-1.5">
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
                  Impact on Citizen Exchequers & Public Debt:
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {selectedRecord.consequences}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 text-xs text-slate-400">
                <div>
                  <strong className="text-slate-300">Official Citation:</strong> {selectedRecord.officialSource}
                </div>
                <div className="font-mono text-slate-500">
                  Ref: {selectedRecord.sourceDoc}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Great Tax Shift Chart: Personal Income Tax Surpasses Corporate Tax */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#FF9933]" />
                <h3 className="text-lg font-bold text-white">
                  The Great Direct Tax Shift: Citizens vs. Corporations (2014 – 2024)
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Tax Collections in Lakh Crores ₹. Personal income tax surged by 292% while corporate tax grew at half that rate following concessions.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-3 h-3 rounded-sm bg-cyan-500 inline-block" /> Personal Income Tax (Citizens)
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block" /> Corporate Tax (All Companies)
              </span>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={TAX_COLLECTION_SHIFT_TREND} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="year" stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} unit=" L.Cr" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '0.75rem' }}
                  formatter={(val: any) => [`₹${val} Lakh Crore`, '']}
                />
                <Legend />
                <Bar dataKey="corporateTax" name="Corporate Tax Collection (₹ L.Cr)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="personalIncomeTax" name="Personal Income Tax Collection (₹ L.Cr)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>
              <strong>Key Finding:</strong> In FY 2023-24, salaried citizens contributed <strong className="text-cyan-400">₹10.45 Lakh Crore</strong>, while all corporate giants paid <strong className="text-amber-400">₹9.22 Lakh Crore</strong>.
            </span>
            <button
              onClick={onOpenSources}
              className="text-[#FF9933] hover:underline font-semibold cursor-pointer"
            >
              Verify with Ministry of Finance Budget Receipts →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
