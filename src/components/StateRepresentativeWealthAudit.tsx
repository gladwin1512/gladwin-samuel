import React, { useState, useMemo } from 'react';
import {
  Users,
  Briefcase,
  Scale,
  DollarSign,
  TrendingUp,
  MapPin,
  ChevronDown,
  Building,
  AlertTriangle
} from 'lucide-react';
import {
  STATE_MP_AUDIT_DATA,
  STATE_SUMMARY_STATS,
  SERVICE_SECTOR_BREAKDOWN
} from '../data/taxpayerPrivatizationData';
import { useLanguage } from '../i18n/LanguageContext';

interface Props {
  onOpenSources?: () => void;
}

export const StateRepresentativeWealthAudit: React.FC<Props> = ({ onOpenSources }) => {
  const { t } = useLanguage();
  const availableStates = Object.keys(STATE_MP_AUDIT_DATA);
  const [selectedState, setSelectedState] = useState<string>(availableStates[0]);
  const currentMpData = STATE_MP_AUDIT_DATA[selectedState];
  const currentStats = STATE_SUMMARY_STATS[selectedState];
  
  const [selectedMpId, setSelectedMpId] = useState<string>(currentMpData[0].id);
  const [activeTab, setActiveTab] = useState<'representation' | 'serviceSector'>('representation');

  const selectedMp = currentMpData.find((m) => m.id === selectedMpId) || currentMpData[0];

  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    setSelectedMpId(STATE_MP_AUDIT_DATA[stateName][0].id);
  };

  return (
    <section id="state-representative-audit" className="py-14 bg-[#080C10] border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#FF9933]/15 text-[#FF9933] border border-[#FF9933]/30 mb-4">
            <Scale className="w-3.5 h-3.5" />
            Representation vs. Wealth Audit & Job Squeeze
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Lawmakers: Wealth vs. Citizens Represented
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
            Examining the Lok Sabha MPs representing India's states: their declared net worth, the millions of citizens they represent, and the stark contrast with citizen incomes.
          </p>
        </div>

        {/* State Selector */}
        <div className="flex justify-center mb-10">
          <div className="relative group inline-block">
            <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 hover:border-slate-500 transition-colors shadow-lg">
              <MapPin className="w-5 h-5 text-slate-400 mr-3" />
              <select
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
                className="bg-transparent text-white font-bold text-lg focus:outline-none appearance-none pr-8 cursor-pointer"
              >
                {availableStates.map(state => (
                  <option key={state} value={state} className="bg-slate-900 text-white">
                    {state}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <ChevronDown className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 flex-wrap justify-center gap-1">
            <button
              onClick={() => setActiveTab('representation')}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'representation'
                  ? 'bg-[#FF9933] text-slate-950 shadow-md shadow-[#FF9933]/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              MP Representation & Wealth Gap
            </button>
            <button
              onClick={() => setActiveTab('serviceSector')}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'serviceSector'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-950/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              The Service Sector Trap (Why Youths Make Low Wages)
            </button>
          </div>
        </div>

        {activeTab === 'representation' ? (
          <div>
            {/* Macro Representation Summary Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Citizens Represented:
                </span>
                <span className="text-2xl font-black text-white font-mono mt-1 block">
                  ~25-30 Lakh
                </span>
                <span className="text-[11px] text-slate-500">
                  Per MP (Average)
                </span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Avg MP Declared Wealth:
                </span>
                <span className="text-2xl font-black text-[#FF9933] font-mono mt-1 block">
                  ₹{currentStats.avgWealthCr} Crore
                </span>
                <span className="text-[11px] text-slate-500">
                  {selectedState} MPs (ECI Form 26)
                </span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Avg Citizen Income:
                </span>
                <span className="text-2xl font-black text-emerald-400 font-mono mt-1 block">
                  ₹{(selectedMp.avgCitizenAnnualIncome / 100000).toFixed(2)} Lakh <span className="text-xs font-normal text-slate-400">/ yr</span>
                </span>
                <span className="text-[11px] text-slate-500">
                  State Economic Survey (Per Capita)
                </span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Wealth Gap Ratio:
                </span>
                <span className="text-2xl font-black text-rose-400 font-mono mt-1 block">
                  {selectedMp.wealthToCitizenIncomeRatio}x
                </span>
                <span className="text-[11px] text-slate-500">
                  Citizen must work {selectedMp.yearsOfWorkNeededForCitizen} yrs to match
                </span>
              </div>
            </div>

            {/* Interactive MP Selector & Detailed Comparison Dossier */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: MP Cards */}
              <div className="lg:col-span-5 space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Select {selectedState} Lok Sabha Constituency:
                </span>
                {currentMpData.map((mp) => (
                  <button
                    key={mp.id}
                    onClick={() => setSelectedMpId(mp.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                      selectedMpId === mp.id
                        ? 'bg-slate-900 border-[#FF9933] shadow-md shadow-[#FF9933]/20'
                        : 'bg-slate-950/80 border-slate-800 hover:bg-slate-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-black text-white">{mp.constituency}</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FF9933]/20 text-[#FF9933] border border-[#FF9933]/30">
                          {mp.party}
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 font-medium">
                        {mp.mpName}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Represents: {mp.votersRepresented}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-black text-[#FF9933] block">
                        ₹{mp.declaredAssetsCr} Cr
                      </span>
                      <span className="text-[10px] font-mono text-rose-400">
                        {mp.wealthToCitizenIncomeRatio}x income
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right: Deep-Dive Card for Selected MP */}
              <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FF9933]/20 text-[#FF9933] border border-[#FF9933]/40 mb-1">
                      Lok Sabha: {selectedMp.constituency}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {selectedMp.mpName}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Sworn Affidavit for Lok Sabha ({selectedMp.tenure})
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-xs font-bold text-slate-400 uppercase">Declared Net Worth:</span>
                    <div className="text-3xl font-black text-[#FF9933] font-mono">
                      ₹{selectedMp.declaredAssetsCr} Crore
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center gap-1">
                      <Users className="w-3 h-3" /> Massive Representation Disconnect
                    </span>
                    <div className="text-sm font-semibold text-white">1 MP Controls Voice For:</div>
                    <div className="text-2xl font-black text-slate-200 font-mono mt-1 mb-2">
                      {selectedMp.populationRepresented}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      While one representative controls policy for millions, their net worth shields them from inflation, healthcare collapses, and the employment crises affecting the masses.
                    </p>
                  </div>

                  <div className="bg-rose-950/20 rounded-xl p-4 border border-rose-900/30">
                    <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block mb-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> The Great Squeeze
                    </span>
                    <div className="text-sm font-semibold text-rose-100">Centuries to Match Wealth</div>
                    <div className="text-2xl font-black text-rose-400 font-mono mt-1 mb-2">
                      {selectedMp.yearsOfWorkNeededForCitizen} Years
                    </div>
                    <p className="text-[11px] text-rose-300/70 leading-relaxed">
                      An average citizen of {selectedState} earning ₹{(selectedMp.avgCitizenAnnualIncome / 100000).toFixed(2)} Lakh per year would have to work this long, saving 100% of their income, to equal this MP's declared wealth.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 mt-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3 flex items-center gap-1">
                    <Building className="w-4 h-4 text-emerald-500" /> Primary Assets Declared (Snapshot)
                  </span>
                  <ul className="space-y-2">
                    {selectedMp.primaryDeclaredAssets.map((asset, i) => (
                      <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-emerald-500 mt-1">•</span> {asset}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-[10px]">
                    <span className="text-slate-500">Source: {selectedMp.affidavitSource}</span>
                    <button onClick={onOpenSources} className="text-[#FF9933] hover:underline font-bold">
                      View Full Dossier
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-5">
                <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5" />
                  The Missing Middle
                </h3>
                <p className="text-sm text-rose-200/70 leading-relaxed">
                  While MPs amass multi-crore real estate portfolios, ordinary youth are forced out of stable manufacturing or government jobs into the precarious gig economy and informal service sector.
                </p>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                <h3 className="text-sm font-bold text-white mb-4">Why is this happening?</h3>
                <ul className="space-y-3">
                  <li className="text-xs text-slate-400 flex items-start gap-2">
                    <span className="text-rose-500 font-black">•</span>
                    <span><strong>No manufacturing growth:</strong> Despite "Make in India", manufacturing share of GDP stagnated at ~15% for a decade.</span>
                  </li>
                  <li className="text-xs text-slate-400 flex items-start gap-2">
                    <span className="text-rose-500 font-black">•</span>
                    <span><strong>Government Job Freeze:</strong> Millions of sanctioned posts remain vacant across railways, defense, and state services.</span>
                  </li>
                  <li className="text-xs text-slate-400 flex items-start gap-2">
                    <span className="text-rose-500 font-black">•</span>
                    <span><strong>Agrarian Distress:</strong> Farm incomes failed to double, pushing unskilled labor into urban construction and gig work.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
                  <span className="text-sm font-bold text-white uppercase tracking-wide">
                    Reality of the Service Sector Trap
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Data: PLFS & CMIE</span>
                </div>
                
                <div className="divide-y divide-slate-800/50">
                  {SERVICE_SECTOR_BREAKDOWN.map((sector) => (
                    <div key={sector.sector} className="p-4 sm:p-5 hover:bg-slate-800/20 transition-colors">
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                        <div className="sm:col-span-4">
                          <h4 className="text-base font-bold text-white">{sector.sector}</h4>
                          <span className="text-[10px] font-bold uppercase text-slate-500 block mt-1">
                            {sector.shareOfWorkforcePct}% of Workforce • {sector.shareOfGdpPct}% of GDP
                          </span>
                        </div>
                        
                        <div className="sm:col-span-3">
                          <div className="text-xs text-slate-400 mb-1">Average Monthly Wage</div>
                          <div className="text-lg font-black text-[#FF9933] font-mono">
                            {sector.averageMonthlyWage}
                          </div>
                        </div>

                        <div className="sm:col-span-5">
                          <div className="bg-slate-950 rounded-lg p-2.5 border border-slate-800 h-full">
                            <div className="flex items-center gap-1.5 mb-1">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                              <span className="text-[10px] font-bold text-amber-500 uppercase">
                                Job Security: {sector.jobSecurityStatus}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 leading-snug">
                              {sector.keyChallenge}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
