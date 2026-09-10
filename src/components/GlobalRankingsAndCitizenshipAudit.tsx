import React, { useState, useMemo } from 'react';
import {
  Globe,
  Plane,
  AlertTriangle,
  Award,
  Users,
  Building,
  TrendingDown,
  TrendingUp,
  FileText,
  ExternalLink,
  ShieldAlert,
  HeartPulse,
  Scale,
  Compass,
  ArrowUpRight,
  Info,
  Clock,
  DollarSign
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';
import {
  CITIZENSHIP_RENUNCIATION_ANNUAL,
  CITIZENSHIP_EXODUS_SUMMARY,
  PASSPORT_MOBILITY_AUDIT,
  UN_WHO_GLOBAL_INDICES
} from '../data/globalRankingsData';
import { useLanguage } from '../i18n/LanguageContext';

interface Props {
  onOpenSources?: () => void;
}

export const GlobalRankingsAndCitizenshipAudit: React.FC<Props> = ({ onOpenSources }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'indices' | 'citizenship' | 'passport'>('indices');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<number>(2022);

  const categories = ['All', 'Human Development & Hunger', 'Health & Environment', 'Democracy & Freedom', 'Gender & Society'];

  const filteredIndices = useMemo(() => {
    if (categoryFilter === 'All') return UN_WHO_GLOBAL_INDICES;
    return UN_WHO_GLOBAL_INDICES.filter((item) => item.category === categoryFilter);
  }, [categoryFilter]);

  const selectedYearData = useMemo(() => {
    return (
      CITIZENSHIP_RENUNCIATION_ANNUAL.find((y) => y.year === selectedYear) ||
      CITIZENSHIP_RENUNCIATION_ANNUAL[CITIZENSHIP_RENUNCIATION_ANNUAL.length - 2]
    );
  }, [selectedYear]);

  // Chart data formatted
  const chartData = useMemo(() => {
    return CITIZENSHIP_RENUNCIATION_ANNUAL.map((item) => ({
      year: item.year.toString(),
      count: item.count,
      displayCount: (item.count / 100000).toFixed(2) + ' Lakh',
      isPeak: item.year === 2022
    }));
  }, []);

  return (
    <section id="global-rankings-audit" className="py-14 bg-[#090D13] border-b border-slate-800/80 relative">
      {/* Background glow subtle */}
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-orange-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/25 mb-4">
            <Globe className="w-3.5 h-3.5" />
            UN, WHO & GLOBAL MOBILITY AUDIT (2014–2024)
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Global Standing & The Great Citizenship Exodus
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
            The empirical contrast: While political rhetoric claims India is "Vishwaguru" and the world queues for Indian visas, official UN, WHO, and Ministry of External Affairs records show historic drops in human indices, severe visa wait times, and over 18.5 Lakh citizens surrendering Indian citizenship.
          </p>
        </div>

        {/* 4 Macro Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {/* Card 1: Citizenship Renunciation */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Passports Surrendered (MEA)
              </span>
              <Plane className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              18.5+ Lakh
            </div>
            <div className="text-xs text-rose-400 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +74.4% increase (Peak: 2022)
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Official records tabled in Parliament: ~600 Indians renounce citizenship every single day.
            </p>
          </div>

          {/* Card 2: Henley Passport Rank */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Henley Passport Index
              </span>
              <Compass className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
              82nd <span className="text-xs text-slate-400 font-normal">/ 199 Passports</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Only 58 visa-free destinations (0 in G7/OECD)
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Indian citizens endure up to 450–600+ day wait times for Western tourist/business visas.
            </p>
          </div>

          {/* Card 3: Global Hunger & Child Wasting */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Global Hunger Index (UN FAO)
              </span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-rose-400 font-mono">
              105th <span className="text-xs text-slate-400 font-normal">/ 127 Countries</span>
            </div>
            <div className="text-xs text-rose-300/80 mt-1">
              Category: "Serious" Hunger (Score 27.3)
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              India has the world's highest child wasting rate (acute malnutrition) at 18.7%.
            </p>
          </div>

          {/* Card 4: WHO Health Spending & OOPE */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                WHO Health Expenditure
              </span>
              <HeartPulse className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              1.35% <span className="text-xs text-slate-400 font-normal">of GDP (vs 5% WHO standard)</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              48.2% Out-of-Pocket Medical Burden
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Over 5.5 Crore (55 Million) citizens pushed below the poverty line every year due to medical debt.
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 flex-wrap justify-center gap-1">
            <button
              onClick={() => setActiveTab('indices')}
              className={`px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'indices'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-4 h-4" />
              UN, WHO & Multilateral Indices
            </button>
            <button
              onClick={() => setActiveTab('citizenship')}
              className={`px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'citizenship'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-900/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Plane className="w-4 h-4" />
              Citizenship Exodus (Parliament Data)
            </button>
            <button
              onClick={() => setActiveTab('passport')}
              className={`px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'passport'
                  ? 'bg-[#FF9933] text-slate-950 shadow-md shadow-[#FF9933]/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-4 h-4" />
              Passport Rank & Visa Reality
            </button>
          </div>
        </div>

        {/* =================================================================== */}
        {/* TAB 1: UN, WHO & MULTILATERAL INDICES */}
        {/* =================================================================== */}
        {activeTab === 'indices' && (
          <div>
            {/* Category Filter Pills */}
            <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
              <div className="flex items-center gap-1.5 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      categoryFilter === cat
                        ? 'bg-slate-800 text-white border border-slate-600'
                        : 'bg-slate-950/60 text-slate-400 border border-slate-800/80 hover:text-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="text-xs text-slate-500 font-mono">
                Showing {filteredIndices.length} Accredited International Reports
              </div>
            </div>

            {/* Grid of Global Indices */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredIndices.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between shadow-lg"
                >
                  <div>
                    {/* Card Top: Badges */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-950/70 text-blue-400 border border-blue-800/50 mb-1">
                          {item.unWhoAffiliation}
                        </span>
                        <h3 className="text-lg font-bold text-white leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {item.publishingBody}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">
                          Latest Rank
                        </span>
                        <span className="text-xl font-black font-mono text-[#FF9933]">
                          {item.latestRank}
                        </span>
                        {item.rank2014 && (
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            2014: <span className="font-mono text-slate-300">{item.rank2014}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Relative Percentile Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                        <span>Top 10% (Best)</span>
                        <span className="text-rose-400 font-bold">
                          India in Bottom {Math.round(100 - item.percentileRank)}% of World
                        </span>
                        <span>Bottom 10% (Worst)</span>
                      </div>
                      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-rose-500"
                          style={{ width: `${Math.min(100, Math.max(10, item.percentileRank))}%` }}
                        />
                      </div>
                    </div>

                    {/* Key Findings */}
                    <div className="bg-slate-950/80 rounded-lg p-3.5 border border-slate-800/80 mb-3">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-400" />
                        Empirical Reality & Findings:
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.keyFinding}
                      </p>
                    </div>

                    {/* Comparison with Neighbors */}
                    <div className="text-xs text-slate-400 mb-3 flex items-start gap-1.5">
                      <span className="text-blue-400 font-bold shrink-0">Regional Benchmark:</span>
                      <span>{item.comparisonWithNeighbors}</span>
                    </div>
                  </div>

                  {/* Card Bottom: Official Report Source */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 truncate max-w-[80%]" title={item.officialReportDoc}>
                      📄 <span className="text-slate-300">{item.officialReportDoc}</span>
                    </span>
                    <button
                      onClick={onOpenSources}
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-0.5 font-bold shrink-0 ml-2"
                    >
                      Audit Ref <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 2: CITIZENSHIP EXODUS (PARLIAMENT DATA) */}
        {/* =================================================================== */}
        {activeTab === 'citizenship' && (
          <div className="space-y-8">
            {/* Context Hero Banner */}
            <div className="bg-gradient-to-r from-rose-950/30 via-slate-900 to-slate-900 border border-rose-500/20 rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30 mb-3">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Official Ministry of External Affairs (MEA) Parliamentary Record
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Over 1.85 Million (18.5 Lakh) Indians Have Given Up Citizenship
                </h3>
                <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                  In official written replies in the Lok Sabha and Rajya Sabha (Question No. 1133, 441 & 1384), External Affairs Minister Dr. S. Jaishankar disclosed that citizenship renunciations accelerated drastically over the last decade, hitting an all-time high of <strong className="text-rose-400">2,25,620 in 2022</strong>.
                </p>
              </div>

              {/* Quick Stat Pill Highlights */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">10-Year Parliamentary Tally</span>
                  <span className="text-xl sm:text-2xl font-black text-white font-mono">{CITIZENSHIP_EXODUS_SUMMARY.allTimeDecadeEstimate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Peak Single Year</span>
                  <span className="text-xl sm:text-2xl font-black text-rose-400 font-mono">{CITIZENSHIP_EXODUS_SUMMARY.peakYear}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Daily Exit Velocity</span>
                  <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">~600 People / Day</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">HNI Millionaire Outflow</span>
                  <span className="text-xl sm:text-2xl font-black text-blue-400 font-mono">6,500+ / Year</span>
                </div>
              </div>
            </div>

            {/* Interactive Bar Chart: Year-by-Year Renunciations */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-rose-400" />
                    Year-by-Year Indian Citizenship Renunciations (2014–2023)
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Click any bar or year to inspect the exact Lok Sabha/Rajya Sabha citation & historical context.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400">
                  <span>Source: MEA Lok Sabha Q.1133 & Q.562</span>
                </div>
              </div>

              {/* Chart Container */}
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis
                      dataKey="year"
                      stroke="#94a3b8"
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                      axisLine={{ stroke: '#334155' }}
                    />
                    <YAxis
                      stroke="#94a3b8"
                      tick={{ fill: '#94a3b8', fontSize: 11 }}
                      axisLine={{ stroke: '#334155' }}
                      tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-950 border border-slate-700 p-3 rounded-lg shadow-2xl text-xs">
                              <span className="font-bold text-white block mb-1">Year {data.year}</span>
                              <span className="font-mono text-rose-400 font-bold text-base block">
                                {data.count.toLocaleString('en-IN')} Citizens
                              </span>
                              <span className="text-[10px] text-slate-400">
                                ({data.displayCount})
                              </span>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar
                      dataKey="count"
                      radius={[6, 6, 0, 0]}
                      onClick={(entry) => setSelectedYear(parseInt(entry.year))}
                      cursor="pointer"
                    >
                      {chartData.map((entry) => (
                        <Cell
                          key={entry.year}
                          fill={
                            parseInt(entry.year) === selectedYear
                              ? '#FF9933'
                              : entry.isPeak
                              ? '#f43f5e'
                              : '#3b82f6'
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Year Selector Buttons for Quick Exploration */}
              <div className="flex items-center justify-center flex-wrap gap-1.5 mt-4 pt-4 border-t border-slate-800">
                {CITIZENSHIP_RENUNCIATION_ANNUAL.map((item) => (
                  <button
                    key={item.year}
                    onClick={() => setSelectedYear(item.year)}
                    className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
                      selectedYear === item.year
                        ? 'bg-[#FF9933] text-slate-950 shadow-md'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {item.year}
                  </button>
                ))}
              </div>

              {/* Selected Year Detail Panel */}
              <div className="mt-6 bg-slate-950 rounded-xl p-4 sm:p-5 border border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-white font-mono">
                      {selectedYearData.year} Dossier
                    </span>
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 text-xs font-mono font-bold">
                      {selectedYearData.count.toLocaleString('en-IN')} Citizens Surrendered Passports
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    Source: {selectedYearData.sourceQuestion}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Historical Context:</strong> {selectedYearData.keyContext}
                </p>
              </div>
            </div>

            {/* Two Deep Dives: Millionaire Exodus + "Dunki" Irregular Migration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Millionaire Wealth Flight */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    <DollarSign className="w-3.5 h-3.5" />
                    Capital & Wealth Flight
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">Henley Wealth Migration</span>
                </div>
                <h4 className="text-xl font-black text-white">
                  The Millionaire Exodus: 2nd Highest in the World
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  According to the <em>Henley Private Wealth Migration Report</em>, India loses <strong>4,300 to 6,500 High-Net-Worth Individuals (HNWIs)</strong> every year. India ranks second globally only to China in the net flight of millionaires.
                </p>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">2022 HNWIs Exited:</span>
                    <span className="font-mono font-bold text-rose-400">7,500 Millionaires</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">2023 HNWIs Exited:</span>
                    <span className="font-mono font-bold text-rose-400">6,500 Millionaires</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Primary Reasons Cited:</span>
                    <span className="text-slate-300 font-medium">Aggressive tax notices, poor urban air/water, children's global higher education, ease of doing business abroad.</span>
                  </div>
                </div>
              </div>

              {/* Irregular "Dunki" Border Encounters */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Youth Desperation & "Dunki" Routes
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">U.S. CBP Official Data</span>
                </div>
                <h4 className="text-xl font-black text-white">
                  96,917 Undocumented Indian Migrants at US Border (FY 2023)
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  U.S. Customs and Border Protection (CBP) recorded a staggering 60-fold increase in undocumented Indian citizens apprehended at borders between 2014 and 2023, risking death through dangerous jungles and paying ₹30–50 Lakh to human cartels.
                </p>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">FY 2020 CBP Encounters:</span>
                    <span className="font-mono font-bold text-slate-300">19,883</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">FY 2022 CBP Encounters:</span>
                    <span className="font-mono font-bold text-slate-300">63,927</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">FY 2023 CBP Encounters:</span>
                    <span className="font-mono font-bold text-rose-400">96,917 (All-time Record)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 pt-1">
                    Driven primarily by rural distress, chronic youth unemployment, and paper leaks across Punjab, Haryana, and Gujarat.
                  </p>
                </div>
              </div>
            </div>

            {/* Top Destinations Table */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" />
                Where Do Renounced Citizens Go? (Top Countries by Passport Acquisition)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {CITIZENSHIP_EXODUS_SUMMARY.topDestinations.map((dest) => (
                  <div key={dest.country} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-white block">{dest.country}</span>
                    <span className="text-lg font-black text-[#FF9933] font-mono mt-1 block">{dest.share}</span>
                    <span className="text-[10px] text-slate-500 block">{dest.annualAvg}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 3: PASSPORT RANK & VISA REALITY */}
        {/* =================================================================== */}
        {activeTab === 'passport' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Passport Mobility Metrics */}
              <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-[#FF9933] border border-amber-500/30 mb-2">
                    <Compass className="w-3.5 h-3.5" />
                    Henley Passport Index 2024 Audit
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    Indian Passport Mobility Reality
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Evaluating global access, reciprocal visa agreements, and consular wait times.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Global Passport Rank (2024)
                    </span>
                    <div className="text-3xl font-black text-[#FF9933] font-mono mt-1">
                      82nd <span className="text-sm font-normal text-slate-400">out of 199 passports</span>
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Pre-2014 Rank: 76th (Mobility stagnant relative to global peers like Singapore, UAE, Malaysia)
                    </span>
                  </div>

                  <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Visa-Free / Visa-on-Arrival Access
                    </span>
                    <div className="text-3xl font-black text-white font-mono mt-1">
                      58 Countries
                    </div>
                    <span className="text-[11px] text-rose-400 font-semibold mt-1 block">
                      Zero (0) Developed Economies (US, UK, EU, Japan, Canada all require strict visas)
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1.5">
                      Mostly limited to small island nations (Fiji, Mauritius, Dominica, Vanuatu) and neighboring territories.
                    </p>
                  </div>

                  <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Schengen (Europe) Rejection Rate
                    </span>
                    <div className="text-2xl font-black text-rose-400 font-mono mt-1">
                      18.3% Rejected
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Over ₹110 Crore lost by Indian citizens annually on non-refundable European visa fees alone.
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Rhetoric vs Reality Breakdown on Consular Queues */}
              <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
                <div className="border-b border-slate-800 pb-4">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block mb-1">
                    Political Claim vs. Ground Experience
                  </span>
                  <h3 className="text-xl font-black text-white">
                    "The World Standing in Line for Indian Visas" vs. 500-Day Citizen Queues
                  </h3>
                </div>

                {/* Comparison Blocks */}
                <div className="space-y-4">
                  <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        The Rhetoric
                      </span>
                      <span className="text-xs text-slate-400 font-medium">Public Address & Political Rallies</span>
                    </div>
                    <p className="text-xs text-slate-200 italic leading-relaxed">
                      "A time will come when people around the world will stand in long queues outside Indian embassies pleading for visas to come and work in India."
                    </p>
                  </div>

                  <div className="bg-rose-950/20 rounded-xl p-4 border border-rose-900/40">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        The Ground Reality
                      </span>
                      <span className="text-xs text-rose-300/80 font-medium">Consular Data & Embassy Records (2022–2024)</span>
                    </div>
                    <ul className="text-xs text-slate-300 space-y-2 mt-2">
                      <li className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold">•</span>
                        <span><strong>US Visa Appointment Crisis:</strong> Indian passport holders faced wait times of 450 to 600+ days for B1/B2 tourist and business visa appointments at consulates in New Delhi, Mumbai, and Hyderabad — the highest delays in the world.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold">•</span>
                        <span><strong>Lack of Reciprocal Deals:</strong> Despite dozens of bilateral foreign trips by the Prime Minister, India has secured zero reciprocal visa-free agreements with any G7, OECD, or developed economic powerhouse.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold">•</span>
                        <span><strong>Appointment Black Market:</strong> Middle-class families and students routinely pay private agents tens of thousands of rupees just to secure automated bot booking slots for Schengen and US consular interviews.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">
                        Source Reference: U.S. State Dept Bureau of Consular Affairs & Henley & Partners
                      </span>
                      <button
                        onClick={onOpenSources}
                        className="text-[#FF9933] hover:underline font-bold flex items-center gap-1"
                      >
                        Inspect Official Dossier <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
