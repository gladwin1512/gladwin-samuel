import React, { useState, useMemo } from 'react';
import {
  MapPin,
  CheckCircle2,
  XCircle,
  Search,
  Building2,
  User,
  Scale,
  FileSpreadsheet,
  AlertOctagon,
  ExternalLink,
  ChevronDown,
  RotateCcw,
  Sparkles,
  Share2,
  Check
} from 'lucide-react';
import { STATES_MANIFESTO_DATA, StateData, AreaDistrict, ManifestoPromise } from '../data/stateManifestoData';

interface StateDistrictManifestoAuditProps {
  onOpenSources: () => void;
}

export const StateDistrictManifestoAudit: React.FC<StateDistrictManifestoAuditProps> = ({ onOpenSources }) => {
  // Initial selection: Delhi (NCT) - New Delhi as requested
  const [selectedStateId, setSelectedStateId] = useState<string>('delhi');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('delhi-new-delhi');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'no' | 'yes'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // Selected State
  const currentState: StateData = useMemo(() => {
    return (
      STATES_MANIFESTO_DATA.find((s) => s.id === selectedStateId) ||
      STATES_MANIFESTO_DATA[0]
    );
  }, [selectedStateId]);

  // Selected District
  const currentDistrict: AreaDistrict = useMemo(() => {
    const district = currentState.districts.find((d) => d.id === selectedDistrictId);
    if (district) return district;
    return currentState.districts[0] || {
      id: 'default',
      name: 'All Districts',
      representativeName: 'State Representatives',
      party: 'BJP',
      tenure: '2014–Present',
      declaredWealth: '₹15 Cr (Avg)',
      criminalCases: 0,
      localPromises: [],
    };
  }, [currentState, selectedDistrictId]);

  // Handle state change
  const handleStateChange = (stateId: string) => {
    setSelectedStateId(stateId);
    const targetState = STATES_MANIFESTO_DATA.find((s) => s.id === stateId);
    if (targetState && targetState.districts.length > 0) {
      setSelectedDistrictId(targetState.districts[0].id);
    }
  };

  // Collect all promises for the selected district or state
  const promisesList: ManifestoPromise[] = useMemo(() => {
    if (currentDistrict && currentDistrict.localPromises.length > 0) {
      return currentDistrict.localPromises;
    }
    // Fallback: collect from all districts in current state
    return currentState.districts.flatMap((d) => d.localPromises);
  }, [currentDistrict, currentState]);

  // Filtered promises
  const filteredPromises = useMemo(() => {
    return promisesList.filter((p) => {
      // Status filter
      if (statusFilter === 'yes' && !p.fulfilled) return false;
      if (statusFilter === 'no' && p.fulfilled) return false;

      // Category filter
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesPromise = p.promise.toLowerCase().includes(q);
        const matchesTruth = p.groundTruth.toLowerCase().includes(q);
        const matchesYear = p.manifestoYear.toLowerCase().includes(q);
        const matchesSource = p.source.toLowerCase().includes(q);
        const matchesRep = currentDistrict.representativeName.toLowerCase().includes(q);
        const matchesArea = currentDistrict.name.toLowerCase().includes(q);
        if (!matchesPromise && !matchesTruth && !matchesYear && !matchesSource && !matchesRep && !matchesArea) {
          return false;
        }
      }

      return true;
    });
  }, [promisesList, statusFilter, categoryFilter, searchQuery, currentDistrict]);

  // Stats calculation
  const totalCount = promisesList.length;
  const noCount = promisesList.filter((p) => !p.fulfilled).length;
  const yesCount = promisesList.filter((p) => p.fulfilled).length;
  const unfulfilledPercent = totalCount > 0 ? Math.round((noCount / totalCount) * 100) : 0;

  // Categories present
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    promisesList.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, [promisesList]);

  // Copy shareable summary
  const handleCopySummary = () => {
    const text = `📊 Manifesto & Lawmaker Audit for ${currentState.name} (${currentDistrict.name}):
Lawmaker: ${currentDistrict.representativeName} (${currentDistrict.party})
Declared Assets: ${currentDistrict.declaredWealth}
Promises Tracked: ${totalCount} | Broken/Unfulfilled [NO]: ${noCount} | Fulfilled [YES]: ${yesCount}
Unfulfilled Rate: ${unfulfilledPercent}%
Fact-checked via official ECI Form 26, CAG, CPCB & parliamentary records.`;

    navigator.clipboard.writeText(text).then(() => {
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    });
  };

  return (
    <section id="manifesto-audit" className="py-12 sm:py-16 bg-[#0B0F14] border-t border-orange-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-orange-500/15 text-[#FF9933] border border-orange-500/30 mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#FF9933]" />
              29 STATES & DISTRICTS AUDIT
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              State, Area & Lawmaker Manifesto Tracker
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl">
              Select any of India's 29 states and local districts to inspect lawmaker declared wealth and verify election promises (2021, 2019, 2024) marked with <span className="text-rose-400 font-bold">NO</span> (Unfulfilled) or <span className="text-emerald-400 font-bold">YES</span> (Fulfilled).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="copy-summary-btn"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F141C] border border-slate-700 hover:border-orange-500/50 text-xs font-mono text-slate-200 transition-colors"
            >
              {copiedNotification ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied Summary!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-orange-400" />
                  <span>Share Audit Report</span>
                </>
              )}
            </button>
            <button
              id="view-sources-btn"
              onClick={onOpenSources}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/15 hover:bg-orange-500/25 text-[#FF9933] border border-orange-500/30 text-xs font-bold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Sources
            </button>
          </div>
        </div>

        {/* Quick State Select Pills (High-Interest States) */}
        <div className="mb-4">
          <span className="text-[11px] font-mono text-slate-400 block mb-1.5">
            QUICK ACCESS STATES:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'delhi', label: 'Delhi (NCT)' },
              { id: 'west-bengal', label: 'West Bengal' },
              { id: 'uttar-pradesh', label: 'Uttar Pradesh' },
              { id: 'maharashtra', label: 'Maharashtra' },
              { id: 'bihar', label: 'Bihar' },
              { id: 'karnataka', label: 'Karnataka' },
              { id: 'gujarat', label: 'Gujarat' },
              { id: 'assam', label: 'Assam' },
              { id: 'tamil-nadu', label: 'Tamil Nadu' },
              { id: 'kerala', label: 'Kerala' },
              { id: 'rajasthan', label: 'Rajasthan' },
              { id: 'jammu-kashmir-ladakh', label: 'J&K & Ladakh' },
            ].map((st) => (
              <button
                key={st.id}
                id={`quick-state-${st.id}`}
                onClick={() => handleStateChange(st.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  selectedStateId === st.id
                    ? 'bg-[#FF9933] text-slate-950 font-bold shadow-md'
                    : 'bg-[#0F141C] text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Primary Filter Control Bar */}
        <div className="p-4 rounded-xl bg-[#0F141C] border border-orange-500/30 mb-6 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* State Dropdown (All 29 States & UTs) */}
            <div>
              <label htmlFor="state-select" className="block text-[11px] font-mono text-orange-400 font-bold mb-1">
                1. SELECT STATE / UT ({STATES_MANIFESTO_DATA.length})
              </label>
              <div className="relative">
                <select
                  id="state-select"
                  value={selectedStateId}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="w-full appearance-none bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-[#FF9933] transition-colors pr-8 cursor-pointer"
                >
                  {STATES_MANIFESTO_DATA.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name} ({st.totalSeats} LS Seats)
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* District / Area Dropdown */}
            <div>
              <label htmlFor="district-select" className="block text-[11px] font-mono text-orange-400 font-bold mb-1">
                2. SELECT DISTRICT / AREA
              </label>
              <div className="relative">
                <select
                  id="district-select"
                  value={selectedDistrictId}
                  onChange={(e) => setSelectedDistrictId(e.target.value)}
                  className="w-full appearance-none bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-[#FF9933] transition-colors pr-8 cursor-pointer"
                >
                  {currentState.districts.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Fulfilment Status Filter (YES / NO / ALL) */}
            <div>
              <label htmlFor="status-filter" className="block text-[11px] font-mono text-orange-400 font-bold mb-1">
                3. PROMISE VERDICT
              </label>
              <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  id="filter-all"
                  onClick={() => setStatusFilter('all')}
                  className={`py-1 rounded text-xs font-bold transition-all ${
                    statusFilter === 'all'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  ALL
                </button>
                <button
                  id="filter-no"
                  onClick={() => setStatusFilter('no')}
                  className={`py-1 rounded text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                    statusFilter === 'no'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-rose-400 hover:text-rose-300'
                  }`}
                >
                  <XCircle className="w-3 h-3" />
                  NO ({noCount})
                </button>
                <button
                  id="filter-yes"
                  onClick={() => setStatusFilter('yes')}
                  className={`py-1 rounded text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                    statusFilter === 'yes'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-emerald-400 hover:text-emerald-300'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3" />
                  YES ({yesCount})
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div>
              <label htmlFor="search-promises" className="block text-[11px] font-mono text-orange-400 font-bold mb-1">
                4. SEARCH PROMISES / REPS
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  id="search-promises"
                  type="text"
                  placeholder="Search 'Yamuna', 'Jobs', 'MSP'..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF9933] transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sub-bar: Category Pills */}
          {availableCategories.length > 1 && (
            <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono text-slate-400 mr-1">SECTOR:</span>
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                  categoryFilter === 'all'
                    ? 'bg-slate-700 text-white font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                All Sectors
              </button>
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                    categoryFilter === cat
                      ? 'bg-orange-500/20 text-[#FF9933] border border-orange-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Overview Box: Lawmaker Info + Fulfilment Scorecard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Card 1: Selected Lawmaker & Area Details */}
          <div className="rounded-xl bg-[#0F141C] border border-orange-500/30 p-4 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-slate-800 mb-3">
                <span className="text-orange-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  Local Lawmaker Profile
                </span>
                <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30 text-[10px] font-bold">
                  {currentDistrict.party}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-black text-white">
                {currentDistrict.representativeName}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Constituency: <strong className="text-white">{currentDistrict.name}</strong>, {currentState.name}
              </p>

              <div className="mt-3 p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Declared Wealth:</span>
                  <span className="text-[#FF9933] font-bold">{currentDistrict.declaredWealth}</span>
                </div>
                {currentDistrict.wealthChangePct && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Wealth Increase:</span>
                    <span className="text-rose-400 font-bold">{currentDistrict.wealthChangePct}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Criminal Cases (ADR):</span>
                  <span className={`font-bold ${currentDistrict.criminalCases > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {currentDistrict.criminalCases} {currentDistrict.criminalCases > 0 ? 'Declared Cases' : 'No Cases'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Party Grip:</span>
                  <span className="text-slate-200">{currentDistrict.tenure}</span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>ECI Form 26 Sworn Affidavit</span>
              <span className="text-orange-400 hover:underline cursor-pointer" onClick={onOpenSources}>
                ADR Verified
              </span>
            </div>
          </div>

          {/* Card 2: State Political Context */}
          <div className="rounded-xl bg-[#0F141C] border border-slate-800 p-4 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-slate-800 mb-3">
                <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-orange-400" />
                  State Power Balance
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {currentState.totalSeats} Lok Sabha Seats
                </span>
              </div>

              <h4 className="text-base font-bold text-white">
                {currentState.name}
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {currentState.rulingStatus}
              </p>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">LS Representation</span>
                  <strong className="text-white text-sm">
                    {currentState.bjpSeats} / {currentState.totalSeats} Seats
                  </strong>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Capital</span>
                  <strong className="text-slate-200 text-sm">
                    {currentState.capital}
                  </strong>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>2014, 2019 & 2024 Records</span>
              <span>Official ECI Returns</span>
            </div>
          </div>

          {/* Card 3: Manifesto Delivery Scorecard */}
          <div className="rounded-xl bg-[#0F141C] border border-rose-500/30 p-4 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-slate-800 mb-3">
                <span className="text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <AlertOctagon className="w-3.5 h-3.5" />
                  Manifesto Delivery Scorecard
                </span>
                <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 text-[10px] font-bold font-mono">
                  {unfulfilledPercent}% BROKEN / UNFULFILLED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-1">
                <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/40 text-center">
                  <div className="flex items-center justify-center gap-1 text-rose-400 font-mono font-bold text-xs mb-0.5">
                    <XCircle className="w-3.5 h-3.5" />
                    FULFILLED: NO
                  </div>
                  <span className="text-3xl font-black text-rose-400 font-mono block">
                    {noCount}
                  </span>
                  <span className="text-[10px] text-rose-300 font-mono">
                    Broken / Incomplete
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-center">
                  <div className="flex items-center justify-center gap-1 text-emerald-400 font-mono font-bold text-xs mb-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    FULFILLED: YES
                  </div>
                  <span className="text-3xl font-black text-emerald-400 font-mono block">
                    {yesCount}
                  </span>
                  <span className="text-[10px] text-emerald-300 font-mono">
                    Delivered Pledges
                  </span>
                </div>
              </div>

              {/* Progress bar visual */}
              <div className="mt-3">
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span>Audit Verdict</span>
                  <span className="text-rose-400 font-bold">{noCount} of {totalCount} Pledges Failed</span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${totalCount > 0 ? (noCount / totalCount) * 100 : 0}%` }}
                    className="h-full bg-rose-500 transition-all"
                  />
                  <div
                    style={{ width: `${totalCount > 0 ? (yesCount / totalCount) * 100 : 0}%` }}
                    className="h-full bg-emerald-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-400 font-mono flex items-center justify-between">
              <span>Sample: 2021 & Central Pledges</span>
              <span className="text-rose-400 font-bold">Independent Fact Check</span>
            </div>
          </div>
        </div>

        {/* The List of Promises */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <span>
              DISPLAYING {filteredPromises.length} OF {promisesList.length} PROMISES FOR {currentDistrict.name.toUpperCase()} ({currentState.name.toUpperCase()})
            </span>
            {searchQuery && (
              <span className="text-orange-400 font-bold">Filtered by "{searchQuery}"</span>
            )}
          </div>

          {filteredPromises.length === 0 ? (
            <div className="p-8 rounded-xl bg-[#0F141C] border border-slate-800 text-center text-slate-400">
              <AlertOctagon className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-white">No promises match your filters</h4>
              <p className="text-xs mt-1">Try resetting the status filter or clearing your search term.</p>
              <button
                onClick={() => {
                  setStatusFilter('all');
                  setCategoryFilter('all');
                  setSearchQuery('');
                }}
                className="mt-3 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white font-bold inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredPromises.map((item) => (
                <div
                  key={item.id}
                  id={`promise-${item.id}`}
                  className={`rounded-xl bg-[#0F141C] border p-4 transition-all shadow-md ${
                    item.fulfilled
                      ? 'border-emerald-500/30 hover:border-emerald-500/50'
                      : 'border-rose-500/35 hover:border-rose-500/60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    {/* Left: Promise & Fact check */}
                    <div className="flex-1">
                      {/* Badge bar */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {/* Fulfilled Badge: YES or NO */}
                        <div
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-black font-mono tracking-wide ${
                            item.fulfilled
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                          }`}
                        >
                          {item.fulfilled ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              FULFILLED: YES
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" />
                              FULFILLED: NO
                            </>
                          )}
                        </div>

                        {/* Sector category */}
                        <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 text-[10px] font-mono">
                          {item.category}
                        </span>

                        {/* Manifesto reference */}
                        <span className="text-[11px] font-mono text-orange-400/90 font-medium">
                          {item.manifestoYear}
                        </span>
                      </div>

                      {/* Promise Title */}
                      <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                        "{item.promise}"
                      </h4>

                      {/* Ground Truth Verdict */}
                      <div className="mt-2.5 p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-1">
                          GROUND TRUTH & EMPIRICAL AUDIT:
                        </span>
                        <p className="text-xs text-slate-200 leading-relaxed">
                          {item.groundTruth}
                        </p>
                      </div>
                    </div>

                    {/* Right: Source & Citation */}
                    <div className="sm:w-56 shrink-0 flex flex-col justify-between sm:text-right border-t sm:border-t-0 sm:border-l border-slate-800 pt-2 sm:pt-0 sm:pl-3">
                      <div>
                        <span className="text-[10px] font-mono text-slate-500 block">
                          EVIDENCE SOURCE
                        </span>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[11px] font-mono text-slate-300 font-semibold">
                          {item.sourceBadge}
                        </span>
                        <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                          {item.source}
                        </p>
                      </div>

                      <div className="mt-3">
                        <button
                          onClick={onOpenSources}
                          className="inline-flex items-center gap-1 text-[11px] font-mono text-orange-400 hover:text-orange-300 hover:underline"
                        >
                          <span>Inspect Source</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Interactive Bottom Note */}
        <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-orange-400 shrink-0" />
            <span>
              All manifesto commitments verified against Gazette notifications, CAG performance audits, parliamentary replies, and CPCB environmental indices.
            </span>
          </div>
          <button
            onClick={onOpenSources}
            className="text-xs font-mono text-orange-400 hover:underline shrink-0"
          >
            Review Audit Methodology
          </button>
        </div>
      </div>
    </section>
  );
};
