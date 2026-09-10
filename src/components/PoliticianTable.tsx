import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, ExternalLink, ShieldCheck, ChevronDown, ChevronUp, FileSpreadsheet, Sparkles, Info } from 'lucide-react';
import { POLITICIAN_AFFIDAVITS, PoliticianAffidavit } from '../data/parallelIndiasData';

interface PoliticianTableProps {
  onOpenSources: () => void;
}

export const PoliticianTable: React.FC<PoliticianTableProps> = ({ onOpenSources }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [sortBy, setSortBy] = useState<'growthPct' | 'growthCr' | 'assets2024'>('growthPct');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // States list
  const statesList = useMemo(() => {
    const set = new Set(POLITICIAN_AFFIDAVITS.map((p) => p.state));
    return ['All', ...Array.from(set)];
  }, []);

  // Filter & sort
  const filteredData = useMemo(() => {
    return POLITICIAN_AFFIDAVITS.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.constituency.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.portfolio.toLowerCase().includes(searchTerm.toLowerCase());
      const matchState = selectedState === 'All' || p.state === selectedState;
      return matchSearch && matchState;
    }).sort((a, b) => {
      let valA = 0;
      let valB = 0;
      if (sortBy === 'growthPct') {
        valA = a.tenYearGrowthPct;
        valB = b.tenYearGrowthPct;
      } else if (sortBy === 'growthCr') {
        valA = a.tenYearGrowthCr;
        valB = b.tenYearGrowthCr;
      } else {
        valA = a.assets2024Cr;
        valB = b.assets2024Cr;
      }
      return sortOrder === 'desc' ? valB - valA : valA - valB;
    });
  }, [searchTerm, selectedState, sortBy, sortOrder]);

  const toggleSort = (field: 'growthPct' | 'growthCr' | 'assets2024') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <section id="affidavits" className="py-12 sm:py-16 bg-[#0B0F14] border-t border-orange-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-orange-500/15 text-[#FF9933] border border-orange-500/30 mb-2">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              AFFIDAVITS
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Lawmaker Declared Wealth
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              Sworn asset declarations (2014, 2019 & 2024) analyzed by ADR India.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-[#0F141C] border border-orange-500/30 rounded-xl p-2.5 self-start md:self-auto">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>ADR Re-contesting MP Ledger</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#0F141C] border border-orange-500/30 p-4 rounded-2xl mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search MP, constituency, or portfolio..."
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 font-sans"
            />
          </div>

          {/* State & Sort Controls */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <Filter className="w-3.5 h-3.5 text-orange-400" />
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-xs rounded-xl px-2.5 py-2 text-slate-200 focus:outline-none focus:border-orange-500"
              >
                {statesList.map((st) => (
                  <option key={st} value={st}>
                    {st === 'All' ? 'All States' : st}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => toggleSort('growthPct')}
                className={`px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1 ${
                  sortBy === 'growthPct'
                    ? 'bg-orange-500 text-slate-950 shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Sort: % Growth
                <ArrowUpDown className="w-3 h-3" />
              </button>
              <button
                onClick={() => toggleSort('assets2024')}
                className={`px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1 ${
                  sortBy === 'assets2024'
                    ? 'bg-orange-500 text-slate-950 shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Sort: 2024 Net Worth
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="rounded-2xl bg-[#0F141C] border border-orange-500/30 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950/90 border-b border-orange-500/20 text-slate-300 font-mono font-bold uppercase tracking-wider">
                  <th className="py-4 px-4 sm:px-6">Politician & Constituency</th>
                  <th className="py-4 px-4">2014 Declared</th>
                  <th className="py-4 px-4">2019 Declared</th>
                  <th className="py-4 px-4">2024 Declared</th>
                  <th className="py-4 px-4 text-right">10-Year Jump (₹ Cr)</th>
                  <th className="py-4 px-4 text-right">Growth %</th>
                  <th className="py-4 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredData.map((pol) => {
                  const isExpanded = expandedId === pol.id;

                  return (
                    <React.Fragment key={pol.id}>
                      <tr
                        onClick={() => setExpandedId(isExpanded ? null : pol.id)}
                        className={`hover:bg-orange-500/5 cursor-pointer transition-colors ${
                          isExpanded ? 'bg-orange-500/10' : ''
                        }`}
                      >
                        {/* Politician info */}
                        <td className="py-4 px-4 sm:px-6">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-white text-sm">
                                {pol.name}
                              </span>
                              {pol.tenYearGrowthPct >= 500 && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-orange-500/20 text-[#FF9933] border border-orange-500/40">
                                  &gt;500% Surge
                                </span>
                              )}
                            </div>
                            <p className="text-slate-400 text-xs">
                              {pol.constituency}, <span className="text-slate-300">{pol.state}</span>
                            </p>
                            <span className="text-[11px] text-slate-500 block">
                              {pol.portfolio}
                            </span>
                          </div>
                        </td>

                        {/* 2014 */}
                        <td className="py-4 px-4 font-mono text-slate-300">
                          ₹{pol.assets2014Cr.toFixed(2)} Cr
                        </td>

                        {/* 2019 */}
                        <td className="py-4 px-4 font-mono text-slate-300">
                          ₹{pol.assets2019Cr.toFixed(2)} Cr
                        </td>

                        {/* 2024 */}
                        <td className="py-4 px-4 font-mono font-extrabold text-white text-sm">
                          ₹{pol.assets2024Cr.toFixed(2)} Cr
                        </td>

                        {/* Net Growth */}
                        <td className="py-4 px-4 font-mono font-bold text-right text-[#FFB347]">
                          +₹{pol.tenYearGrowthCr.toFixed(2)} Cr
                        </td>

                        {/* Growth % */}
                        <td className="py-4 px-4 text-right">
                          <span className="inline-block px-2 py-0.5 rounded font-mono font-black text-xs bg-orange-500/20 text-[#FF9933] border border-orange-500/30">
                            +{pol.tenYearGrowthPct}%
                          </span>
                        </td>

                        {/* Action toggle */}
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedId(isExpanded ? null : pol.id);
                            }}
                            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </td>
                      </tr>

                      {/* Expanded Details Row */}
                      {isExpanded && (
                        <tr className="bg-slate-950/90 border-b border-orange-500/20">
                          <td colSpan={7} className="p-5">
                            <div className="rounded-xl bg-[#0B0F14] border border-orange-500/30 p-4 space-y-3">
                              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                                <span className="font-mono text-xs font-bold text-orange-400">
                                  AFFIDAVIT AUDIT DETAILS: {pol.name.toUpperCase()}
                                </span>
                                <span className="text-slate-400 text-xs font-mono">
                                  Source: {pol.source}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                                  <span className="text-slate-400 block text-[10px]">Total Multiplier:</span>
                                  <strong className="text-white text-base">
                                    {(pol.assets2024Cr / Math.max(0.1, pol.assets2014Cr)).toFixed(1)}x
                                  </strong>{' '}
                                  original 2014 filing
                                </div>
                                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                                  <span className="text-slate-400 block text-[10px]">10-Yr Absolute Addition:</span>
                                  <strong className="text-[#FFB347] text-base">
                                    +₹{pol.tenYearGrowthCr.toFixed(2)} Crore
                                  </strong>
                                </div>
                                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                                  <span className="text-slate-400 block text-[10px]">Asset Classification:</span>
                                  <strong className="text-emerald-400 text-sm">
                                    {pol.highlightTag || 'Movable & Real Estate'}
                                  </strong>
                                </div>
                              </div>

                              <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
                                Verified against sworn Form 26 affidavits submitted to District Election Officers in 2014, 2019, and 2024.
                                All declared figures include immovable property (commercial/residential land), bank deposits, listed equities, and precious metals.
                              </p>

                              <div className="pt-2 flex items-center justify-between text-[11px]">
                                <span className="text-slate-400 font-mono">
                                  [Citation: Association for Democratic Reforms & National Election Watch]
                                </span>
                                <button
                                  onClick={onOpenSources}
                                  className="text-orange-400 hover:text-orange-300 font-bold flex items-center gap-1"
                                >
                                  View Legal Data Footnote
                                  <ExternalLink className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table summary note */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
            <span>Showing {filteredData.length} prominent parliamentarians with cross-term filings</span>
            <span className="font-mono text-[11px] text-slate-500">
              Note: Unopposed or alternate candidates excluded where 3-term longitudinal affidavits are unavailable.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
