import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Flame,
  UserX,
  CreditCard,
  Building,
  Scale,
  DollarSign,
  ArrowUpRight,
  Info,
  ShieldAlert,
  BarChart3,
  Percent
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
  CartesianGrid,
  Area
} from 'recharts';
import { ALL_STATES_TERRITORIES } from '../data/manifestoData';
import { useLanguage } from '../i18n/LanguageContext';

interface Props {
  onOpenSources?: () => void;
}

// 10-Year National Macro Divergence Data (2014 to 2024)
const NATIONAL_DIVERGENCE_CHART_DATA = [
  { year: '2014', mpAvgWealthCr: 5.38, citizenSavingsGdpPct: 7.4, lpgPrice: 410, fuelExcisePetrol: 9.48 },
  { year: '2016', mpAvgWealthCr: 7.92, citizenSavingsGdpPct: 7.9, lpgPrice: 466, fuelExcisePetrol: 21.48 },
  { year: '2018', mpAvgWealthCr: 10.45, citizenSavingsGdpPct: 7.6, lpgPrice: 509, fuelExcisePetrol: 19.48 },
  { year: '2020', mpAvgWealthCr: 13.84, citizenSavingsGdpPct: 11.5, lpgPrice: 594, fuelExcisePetrol: 32.98 },
  { year: '2022', mpAvgWealthCr: 16.92, citizenSavingsGdpPct: 7.3, lpgPrice: 1053, fuelExcisePetrol: 27.90 },
  { year: '2024', mpAvgWealthCr: 20.72, citizenSavingsGdpPct: 5.2, lpgPrice: 903, fuelExcisePetrol: 19.90 },
];

export const PoliticianWealthSqueeze: React.FC<Props> = ({ onOpenSources }) => {
  const { t } = useLanguage();
  const [selectedStateId, setSelectedStateId] = useState<string>('national');
  const [activeMetricView, setActiveMetricView] = useState<'wealthVsSavings' | 'householdPrices'>('wealthVsSavings');

  const currentState = useMemo(() => {
    if (selectedStateId === 'national') return null;
    return ALL_STATES_TERRITORIES.find((s) => s.id === selectedStateId) || null;
  }, [selectedStateId]);

  return (
    <section id="divergence" className="py-14 bg-[#0B0F14] border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#FF9933]/15 text-[#FF9933] border border-[#FF9933]/30 mb-4">
            <Scale className="w-3.5 h-3.5" />
            {t('module3_tag')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('module3_title')}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
            {t('module3_sub')}
          </p>
        </div>

        {/* State Selector & Perspective Toggle */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* View Selector Dropdown */}
            <div className="w-full sm:w-80">
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
                Select Territory for Squeeze Audit:
              </label>
              <select
                value={selectedStateId}
                onChange={(e) => setSelectedStateId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-[#FF9933]"
              >
                <option value="national">🇮🇳 All-India National Benchmark</option>
                {ALL_STATES_TERRITORIES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.type === 'Union Territory' ? 'UT' : s.region}) — Avg Jump +{s.mpMlaAssetGrowthPct}%
                  </option>
                ))}
              </select>
            </div>

            {/* Metric Toggle Tabs */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setActiveMetricView('wealthVsSavings')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                  activeMetricView === 'wealthVsSavings'
                    ? 'bg-[#FF9933] text-slate-950 shadow-md shadow-[#FF9933]/20'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                Lawmaker Wealth vs. Savings Drop
              </button>
              <button
                onClick={() => setActiveMetricView('householdPrices')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                  activeMetricView === 'householdPrices'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-950/40'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                LPG & Fuel Excise Burden
              </button>
            </div>
          </div>
        </div>

        {/* Territory Specific Squeeze Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Card 1: Declared Lawmaker Asset Growth */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
              <span className="uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#FF9933]" /> Lawmaker Asset Growth
              </span>
              <span className="text-[11px] text-slate-500">ADR Affidavits</span>
            </div>
            <div className="mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#FF9933] font-mono">
                +{currentState ? currentState.mpMlaAssetGrowthPct : 285}%
              </span>
              <p className="text-xs text-slate-300 mt-1">
                {currentState
                  ? `Average declared wealth jump among re-contesting BJP MPs/MLAs in ${currentState.name} (2014-2024)`
                  : 'Average declared wealth surge of re-contesting Lok Sabha MPs between 2014 and 2024'}
              </p>
            </div>
            {currentState?.topLawmakerSample && (
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs">
                <span className="text-slate-400">Sample Candidate:</span>
                <p className="text-slate-200 font-bold mt-0.5">
                  {currentState.topLawmakerSample.name} ({currentState.topLawmakerSample.constituency})
                </p>
                <div className="flex items-center justify-between mt-1 text-[11px] font-mono text-slate-400">
                  <span>Current: ₹{currentState.topLawmakerSample.currentWealthCr} Cr</span>
                  <span className="text-[#FF9933] font-bold">+{currentState.topLawmakerSample.wealthJumpPct}% Growth</span>
                </div>
              </div>
            )}
          </div>

          {/* Card 2: Youth Unemployment Rate */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
              <span className="uppercase tracking-wider flex items-center gap-1.5">
                <UserX className="w-4 h-4 text-rose-400" /> Youth Unemployment
              </span>
              <span className="text-[11px] text-slate-500">PLFS / MoSPI</span>
            </div>
            <div className="mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-rose-400 font-mono">
                {currentState ? currentState.youthUnemploymentRatePct : 23.8}%
              </span>
              <p className="text-xs text-slate-300 mt-1">
                {currentState
                  ? `Unemployment rate among youth (aged 15-29 with graduate or higher qualification) in ${currentState.name}`
                  : 'National educated youth unemployment (MoSPI PLFS 2023-24 & ILO India Employment Report 2024)'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
              <span className="text-slate-300 font-medium">Informal Sector Ratio:</span>
              <p className="mt-0.5 text-slate-300 text-[11px]">
                Over 83% of India's unemployed workforce is comprised of youth holding secondary or higher degrees.
              </p>
            </div>
          </div>

          {/* Card 3: Essential Cost of Living Spike */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
              <span className="uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" /> LPG Cylinder Inflation
              </span>
              <span className="text-[11px] text-slate-500">PPAC / MoPNG</span>
            </div>
            <div className="mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">
                +{currentState ? currentState.lpgCylinderPriceHikePct : 120}%
              </span>
              <p className="text-xs text-slate-300 mt-1">
                {currentState
                  ? `Domestic 14.2kg LPG cylinder price rise in ${currentState.name} from ₹410 (2014) to ₹903–₹1,100+`
                  : 'National weighted average increase in domestic 14.2kg LPG cylinders (subsidies curtailed)'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
              <span className="text-slate-300 font-medium">Household Savings Rate (RBI):</span>
              <p className="mt-0.5 text-rose-400 text-[11px] font-bold">
                Plunged to 5.2% of GDP in 2023 — a 50-year historic low (down from 11.5% in 2020).
              </p>
            </div>
          </div>
        </div>

        {/* Visual Comparison Chart (Recharts) */}
        <div className="bg-slate-900/95 border border-slate-800 rounded-xl p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#FF9933]" />
                {activeMetricView === 'wealthVsSavings'
                  ? 'Re-contesting MPs Average Wealth (₹ Crore) vs. Net Household Financial Savings (% of GDP)'
                  : 'Essential Cost Trends: Domestic LPG Price (₹) vs. Central Fuel Excise Duty on Petrol (₹/Litre)'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Verifiable 10-year trend data from Election Commission affidavits, Reserve Bank of India, and PPAC.
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded bg-slate-950 text-slate-400 border border-slate-800 self-start sm:self-auto font-mono">
              2014 – 2024 Audit
            </span>
          </div>

          <div className="h-80 w-full">
            {activeMetricView === 'wealthVsSavings' ? (
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={NATIONAL_DIVERGENCE_CHART_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis
                    yAxisId="left"
                    stroke="#FF9933"
                    tick={{ fill: '#FF9933', fontSize: 12 }}
                    unit=" Cr"
                    domain={[0, 25]}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#ef4444"
                    tick={{ fill: '#ef4444', fontSize: 12 }}
                    unit="%"
                    domain={[0, 14]}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                    formatter={(value: any, name: any) => {
                      if (name === 'MP Avg Wealth') return [`₹${value} Crore`, name];
                      if (name === 'Household Savings') return [`${value}% of GDP`, name];
                      return [value, name];
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                  <Bar
                    yAxisId="left"
                    dataKey="mpAvgWealthCr"
                    name="MP Avg Wealth"
                    fill="#FF9933"
                    radius={[4, 4, 0, 0]}
                    barSize={32}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="citizenSavingsGdpPct"
                    name="Household Savings"
                    stroke="#ef4444"
                    strokeWidth={3}
                    dot={{ fill: '#ef4444', r: 5 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={NATIONAL_DIVERGENCE_CHART_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis
                    yAxisId="left"
                    stroke="#f59e0b"
                    tick={{ fill: '#f59e0b', fontSize: 12 }}
                    unit=" ₹"
                    domain={[0, 1200]}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#38bdf8"
                    tick={{ fill: '#38bdf8', fontSize: 12 }}
                    unit=" ₹/L"
                    domain={[0, 40]}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                    formatter={(value: any, name: any) => {
                      if (name === 'Domestic LPG Cylinder Price') return [`₹${value}`, name];
                      if (name === 'Central Excise Duty on Petrol') return [`₹${value}/Litre`, name];
                      return [value, name];
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="lpgPrice"
                    name="Domestic LPG Cylinder Price"
                    fill="#f59e0b"
                    fillOpacity={0.2}
                    stroke="#f59e0b"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="fuelExcisePetrol"
                    name="Central Excise Duty on Petrol"
                    stroke="#38bdf8"
                    strokeWidth={3}
                    dot={{ fill: '#38bdf8', r: 5 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Chart Insight Footer */}
          <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>
              💡 <strong>Key Fact:</strong> Between 2014 and 2024, re-contesting lawmaker assets surged by ~285%, while household financial savings collapsed to a 50-year low of 5.2% of GDP (RBI Bulletin).
            </span>
            {onOpenSources && (
              <button
                onClick={onOpenSources}
                className="text-[#FF9933] hover:underline font-semibold shrink-0"
              >
                Inspect RBI & ADR Datasets →
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
