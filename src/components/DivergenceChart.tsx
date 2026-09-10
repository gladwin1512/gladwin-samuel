import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { Scale, TrendingUp, TrendingDown, Info, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';
import { DIVERGENCE_TIMELINE } from '../data/parallelIndiasData';

interface DivergenceChartProps {
  onOpenSources: () => void;
}

export const DivergenceChart: React.FC<DivergenceChartProps> = ({ onOpenSources }) => {
  const [viewMode, setViewMode] = useState<'indexed' | 'absolute'>('indexed');
  const [selectedYear, setSelectedYear] = useState<string>('2024');

  const selectedData = DIVERGENCE_TIMELINE.find((d) => d.year === selectedYear) || DIVERGENCE_TIMELINE[DIVERGENCE_TIMELINE.length - 1];

  return (
    <section id="divergence" className="py-12 sm:py-16 bg-[#0B0F14] border-t border-orange-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-orange-500/15 text-[#FF9933] border border-orange-500/30 mb-2">
              <Scale className="w-3.5 h-3.5" />
              10-YEAR TREND
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Wealth vs. Wages & Savings
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              Lawmaker asset growth compared with real rural wages and household savings.
            </p>
          </div>

          {/* Toggle controls */}
          <div className="flex items-center gap-1.5 bg-[#0F141C] p-1 rounded-xl border border-orange-500/30 self-start md:self-auto">
            <button
              onClick={() => setViewMode('indexed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'indexed'
                  ? 'bg-[#FF9933] text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Indexed (2014=100)
            </button>
            <button
              onClick={() => setViewMode('absolute')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'absolute'
                  ? 'bg-[#FF9933] text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Absolute Values
            </button>
          </div>
        </div>

        {/* Main Chart Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Chart View (8 Cols) */}
          <div className="lg:col-span-8 rounded-xl bg-[#0F141C] border border-orange-500/30 p-5 shadow-xl">
            {/* Legend */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFB347]" />
                  <span className="text-slate-200 font-bold">
                    {viewMode === 'indexed' ? 'MP Wealth Index' : 'Avg MP Wealth (₹ Cr)'}
                  </span>
                  <span className="text-[10px] font-mono text-orange-400">[ADR]</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#138808]" />
                  <span className="text-slate-200 font-bold">
                    {viewMode === 'indexed' ? 'Real Rural Wage Index' : 'Household Savings (% GDP)'}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">[RBI]</span>
                </div>
              </div>

              <button
                onClick={onOpenSources}
                className="text-xs text-slate-400 hover:text-[#FF9933] flex items-center gap-1 font-semibold"
              >
                Sources
                <Info className="w-3 h-3" />
              </button>
            </div>

            {/* Recharts Canvas */}
            <div className="h-72 sm:h-80 w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={DIVERGENCE_TIMELINE}
                  margin={{ top: 15, right: 15, left: -10, bottom: 5 }}
                  onClick={(e) => {
                    if (e && e.activeLabel) setSelectedYear(String(e.activeLabel));
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis
                    dataKey="year"
                    stroke="#64748b"
                    tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                  />
                  <YAxis
                    stroke="#64748b"
                    tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                    domain={viewMode === 'indexed' ? [80, 320] : [0, 'auto']}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-[#0B0F14] border border-orange-500/40 p-3 rounded-lg shadow-xl text-xs font-mono space-y-1.5">
                            <div className="font-bold text-white border-b border-slate-800 pb-1">
                              Year {label}
                            </div>
                            <div className="flex justify-between gap-4 text-[#FFB347]">
                              <span>MP Wealth:</span>
                              <strong>
                                {viewMode === 'indexed'
                                  ? `${payload[0]?.value}`
                                  : `₹${payload[0]?.value} Cr`}
                              </strong>
                            </div>
                            <div className="flex justify-between gap-4 text-emerald-400">
                              <span>{viewMode === 'indexed' ? 'Rural Wage:' : 'Savings:'}</span>
                              <strong>
                                {viewMode === 'indexed'
                                  ? `${payload[1]?.value}`
                                  : `${payload[1]?.value}% GDP`}
                              </strong>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />

                  {viewMode === 'indexed' ? (
                    <>
                      <ReferenceLine y={100} stroke="#475569" strokeDasharray="3 3" label={{ value: '2014 Baseline (100)', fill: '#64748b', fontSize: 10, position: 'insideTopLeft' }} />
                      <Line
                        type="monotone"
                        dataKey="mpWealthIndex"
                        name="MP Wealth Index"
                        stroke="#FFB347"
                        strokeWidth={3}
                        dot={{ r: 4, fill: '#FFB347' }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="ruralRealWageIndex"
                        name="Rural Real Wage Index"
                        stroke="#138808"
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: '#138808' }}
                        activeDot={{ r: 6 }}
                      />
                    </>
                  ) : (
                    <>
                      <Line
                        type="monotone"
                        dataKey="avgBjpMpWealthCr"
                        name="Avg MP Wealth (₹ Cr)"
                        stroke="#FFB347"
                        strokeWidth={3}
                        dot={{ r: 4, fill: '#FFB347' }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="householdSavingsPctGDP"
                        name="Household Savings (% GDP)"
                        stroke="#138808"
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: '#138808' }}
                        activeDot={{ r: 6 }}
                      />
                    </>
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Year buttons */}
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
              <span className="text-xs text-slate-400 font-medium">Select Year:</span>
              <div className="flex flex-wrap gap-1">
                {DIVERGENCE_TIMELINE.map((d) => (
                  <button
                    key={d.year}
                    onClick={() => setSelectedYear(d.year)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all ${
                      selectedYear === d.year
                        ? 'bg-orange-500 text-slate-950'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {d.year}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Clean Milestone Breakdown Card (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="rounded-xl bg-[#0F141C] border border-orange-500/30 p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">
                    Snapshot
                  </span>
                  <h3 className="text-xl font-black text-white font-mono">
                    Year {selectedData.year}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">Inflation</span>
                  <span className="text-sm font-bold text-rose-400 font-mono">
                    {selectedData.inflationCpi}%
                  </span>
                </div>
              </div>

              {/* Metric 1: Politician Wealth */}
              <div className="p-3.5 rounded-lg bg-slate-950 border border-orange-500/20">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Avg MP Declared Wealth</span>
                  <span className="font-mono text-orange-400">[ADR]</span>
                </div>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-xl font-black text-[#FFB347] font-mono">
                    ₹{selectedData.avgBjpMpWealthCr} Cr
                  </span>
                  <span className="text-xs text-slate-400">
                    ({selectedData.mpWealthIndex > 100 ? `+${selectedData.mpWealthIndex - 100}%` : 'Base'})
                  </span>
                </div>
              </div>

              {/* Metric 2: Savings */}
              <div className="p-3.5 rounded-lg bg-slate-950 border border-emerald-900/30">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Net Household Savings</span>
                  <span className="font-mono text-emerald-400">[RBI]</span>
                </div>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-xl font-black text-emerald-400 font-mono">
                    {selectedData.householdSavingsPctGDP}% of GDP
                  </span>
                  {selectedData.householdSavingsPctGDP <= 5.3 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono">
                      47-Yr Low
                    </span>
                  )}
                </div>
              </div>

              {/* Metric 3: Rural Wage */}
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Real Rural Wage</span>
                  <span className="font-mono text-slate-400">[Labour]</span>
                </div>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-xl font-black text-slate-200 font-mono">
                    ₹{selectedData.ruralDailyWageRealINR} / day
                  </span>
                  <span className="text-xs text-slate-400">
                    (+{((selectedData.ruralDailyWageRealINR / 278 - 1) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
