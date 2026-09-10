import React, { useState } from 'react';
import {
  Plane,
  Anchor,
  Navigation,
  Building,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  ShieldAlert,
  Percent,
  Layers,
  Info,
  DollarSign
} from 'lucide-react';
import {
  PRIVATIZED_INFRASTRUCTURE_DATA,
  PRIVATIZATION_STATS
} from '../data/taxpayerPrivatizationData';

interface Props {
  onOpenSources?: () => void;
}

export const InfrastructurePrivatizationTracker: React.FC<Props> = ({ onOpenSources }) => {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [expandedAssetId, setExpandedAssetId] = useState<string | null>(null);

  const filteredAssets =
    selectedType === 'All'
      ? PRIVATIZED_INFRASTRUCTURE_DATA
      : PRIVATIZED_INFRASTRUCTURE_DATA.filter((a) => {
          if (selectedType === 'Airport') return a.type === 'Airport';
          if (selectedType === 'Port') return a.type === 'Port';
          if (selectedType === 'Highway') return a.type === 'Highway / Expressway';
          return true;
        });

  return (
    <section id="privatization-tracker" className="py-14 bg-[#0B0F14] border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30 mb-4">
            <Plane className="w-3.5 h-3.5" />
            Public Infrastructure Concession Audit
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Taxpayer-Funded Infrastructure Handed to Private Monopolies
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
            Audit of airports, deep-water ports, and national highway corridors built with <span className="text-white font-semibold">taxpayer allocations & public debt</span>, then leased on <span className="text-[#FF9933] font-semibold">50-year concessions</span> to private conglomerates who subsequently hiked user development fees and passenger tolls.
          </p>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-xs text-amber-400 font-bold uppercase mb-2">
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-4 h-4" /> Taxpayer Money Spent
              </span>
              <span className="text-[10px] text-slate-500 font-mono">AAI & NHAI</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              ₹66,495 Cr+
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Public capital invested to build runways, terminals, and road networks before private leasing.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-xs text-cyan-400 font-bold uppercase mb-2">
              <span className="flex items-center gap-1.5">
                <Plane className="w-4 h-4" /> Air Passenger Control
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Single Group</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              25.4% Share
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Over 1 in 4 air passengers and 33.1% of air cargo handled by Adani Airports across 8 hubs.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-emerald-500/30 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-xs text-emerald-400 font-bold uppercase mb-2">
              <span className="flex items-center gap-1.5">
                <Anchor className="w-4 h-4" /> National Port Throughput
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Maritime</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              24.2% Control
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Adani Ports controls nearly a quarter of all Indian commercial cargo through brownfield acquisitions.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-rose-500/30 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-xs text-rose-400 font-bold uppercase mb-2">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" /> User Fee Escalation
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Post-Handover</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              +207% Avg Hike
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Passenger User Development Fees (UDF) raised by up to 280% on travelers at privatized airports.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {['All', 'Airport', 'Port', 'Highway'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedType(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedType === cat
                    ? 'bg-[#FF9933] text-slate-950 shadow-md shadow-[#FF9933]/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'All' ? 'All Assets (10)' : `${cat}s`}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400 font-mono">
            Showing {filteredAssets.length} Publicly Funded Assets Transferred to Private Concessions
          </span>
        </div>

        {/* Assets Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredAssets.map((asset) => {
            const isExpanded = expandedAssetId === asset.id;

            return (
              <div
                key={asset.id}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold font-mono px-2 py-0.5 rounded bg-slate-800 text-[#FF9933]">
                      {asset.type === 'Airport' && <Plane className="w-3 h-3" />}
                      {asset.type === 'Port' && <Anchor className="w-3 h-3" />}
                      {asset.type === 'Highway / Expressway' && <Navigation className="w-3 h-3" />}
                      {asset.type} • {asset.state}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {asset.concessionPeriodYears}-Year Concession
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                    {asset.assetName}
                  </h3>

                  {/* 2 Stat Boxes */}
                  <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                    <div className="bg-slate-950 border border-slate-800/90 rounded-xl p-3">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Public / Taxpayer Capital Invested:
                      </span>
                      <span className="text-base font-black text-rose-400 font-mono mt-0.5 block">
                        {asset.publicMoneyLabel}
                      </span>
                    </div>

                    <div className="bg-slate-950 border border-slate-800/90 rounded-xl p-3">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Private Operator / Beneficiary:
                      </span>
                      <span className="text-xs font-bold text-amber-300 line-clamp-2 mt-0.5 block">
                        {asset.ultimateBeneficiary}
                      </span>
                    </div>
                  </div>

                  {/* User Impact Callout */}
                  <div className="bg-slate-950/70 border-l-4 border-amber-500 pl-3 py-2 pr-3 rounded-r-lg text-xs text-slate-300 mb-3">
                    <strong className="text-amber-400 font-semibold block mb-0.5">Impact on Citizens & Travelers:</strong>
                    {asset.userImpact}
                  </div>

                  {isExpanded && (
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 space-y-2 mt-3 animate-fadeIn">
                      <div>
                        <strong className="text-white">Forensic Details:</strong> {asset.details}
                      </div>
                      <div className="text-[11px] text-slate-500 border-t border-slate-800 pt-2">
                        Official Source: {asset.officialSource}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">
                    Handover: {asset.handoverYear}
                  </span>
                  <button
                    onClick={() => setExpandedAssetId(isExpanded ? null : asset.id)}
                    className="text-[#FF9933] hover:text-amber-300 font-semibold cursor-pointer"
                  >
                    {isExpanded ? 'Show Less' : 'View Public Spend & Audit Details →'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
