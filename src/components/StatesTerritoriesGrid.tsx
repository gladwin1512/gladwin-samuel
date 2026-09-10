import React, { useState, useMemo, useEffect } from 'react';
import {
  MapPin,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  UserX,
  Flame,
  FileCheck2,
  Building2,
  Trophy,
  ArrowUpDown,
  Maximize2,
  Minimize2,
  SlidersHorizontal,
  Layers
} from 'lucide-react';
import { StateTerritoryAudit, ManifestoStatus, ManifestoCategory } from '../types';
import { ALL_STATES_TERRITORIES } from '../data/manifestoData';
import { useLanguage } from '../i18n/LanguageContext';

export const StatesTerritoriesGrid: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<ManifestoStatus | 'ALL'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<ManifestoCategory | 'ALL'>('ALL');
  const [selectedStateId, setSelectedStateId] = useState<string>('ALL');
  const [expandedPromiseId, setExpandedPromiseId] = useState<string | null>(null);
  // Set of state IDs that are brought out (expanded). Defaults to EMPTY so front page is compact/minimized!
  const [expandedStateIds, setExpandedStateIds] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'name' | 'unemployment' | 'assetGrowth' | 'seats'>('name');

  // Filtered & Sorted States
  const filteredStates = useMemo(() => {
    return ALL_STATES_TERRITORIES.filter((state) => {
      // Region filter
      if (selectedRegion !== 'ALL') {
        if (selectedRegion === 'UT' && state.type !== 'Union Territory') return false;
        if (selectedRegion !== 'UT' && state.region !== selectedRegion) return false;
      }

      // Specific State Filter
      if (selectedStateId !== 'ALL' && state.id !== selectedStateId) return false;

      // Status filter across state's promises
      if (selectedStatus !== 'ALL') {
        const hasStatus = state.promises.some((p) => p.status === selectedStatus);
        if (!hasStatus) return false;
      }

      // Category filter across state's promises
      if (selectedCategory !== 'ALL') {
        const hasCategory = state.promises.some((p) => p.category === selectedCategory);
        if (!hasCategory) return false;
      }

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchState = state.name.toLowerCase().includes(q) || state.capital.toLowerCase().includes(q);
        const matchPromise = state.promises.some(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.originalPledge.toLowerCase().includes(q) ||
            p.groundReality.toLowerCase().includes(q) ||
            p.officialMetric.toLowerCase().includes(q)
        );
        if (!matchState && !matchPromise) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'unemployment') {
        return (b.youthUnemploymentRatePct || 0) - (a.youthUnemploymentRatePct || 0);
      }
      if (sortBy === 'assetGrowth') {
        return (b.mpMlaAssetGrowthPct || 0) - (a.mpMlaAssetGrowthPct || 0);
      }
      if (sortBy === 'seats') {
        return b.totalSeats - a.totalSeats;
      }
      return a.name.localeCompare(b.name);
    });
  }, [selectedRegion, selectedStateId, selectedStatus, selectedCategory, searchQuery, sortBy]);

  const getStatusBadge = (status: ManifestoStatus) => {
    switch (status) {
      case 'Fulfilled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            {t('status_fulfilled')}
          </span>
        );
      case 'Broken':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-950/80 text-rose-400 border border-rose-500/40">
            <XCircle className="w-3 h-3 text-rose-400" />
            {t('status_broken')}
          </span>
        );
    }
  };

  const calculateStateStats = (state: StateTerritoryAudit) => {
    let f = 0, b = 0;
    state.promises.forEach((pr) => {
      if (pr.status === 'Fulfilled') f++;
      else if (pr.status === 'Broken') b++;
    });
    return { f, b, total: state.promises.length };
  };

  const toggleStateExpanded = (stateId: string) => {
    setExpandedStateIds((prev) => {
      const next = new Set(prev);
      if (next.has(stateId)) {
        next.delete(stateId);
      } else {
        next.add(stateId);
      }
      return next;
    });
  };

  const maximizeAll = () => {
    setExpandedStateIds(new Set(filteredStates.map((s) => s.id)));
  };

  const minimizeAll = () => {
    setExpandedStateIds(new Set());
  };

  const handleStateSelect = (stateId: string) => {
    setSelectedStateId(stateId);
    if (stateId !== 'ALL') {
      setExpandedStateIds(new Set([stateId]));
      setTimeout(() => {
        const el = document.getElementById(`state-${stateId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 50);
    }
  };

  // When user searches for a promise or topic (>= 3 chars), auto-expand matching states (up to 4)
  useEffect(() => {
    if (searchQuery.trim().length >= 3) {
      const q = searchQuery.toLowerCase();
      const matchingIds = filteredStates
        .filter((s) =>
          s.promises.some(
            (p) =>
              p.title.toLowerCase().includes(q) ||
              p.originalPledge.toLowerCase().includes(q) ||
              p.groundReality.toLowerCase().includes(q)
          )
        )
        .map((s) => s.id);
      if (matchingIds.length > 0 && matchingIds.length <= 4) {
        setExpandedStateIds(new Set(matchingIds));
      }
    }
  }, [searchQuery, filteredStates]);

  return (
    <section id="states-audit" className="py-14 bg-[#080C10] border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#138808]/20 text-emerald-400 border border-emerald-500/30 mb-4">
            <MapPin className="w-3.5 h-3.5" />
            {t('module2_tag')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('module2_title')}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
            {t('module2_sub')}
          </p>
        </div>

        {/* Search, Region & Quick Jump Control Panel */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search state, capital or promise (e.g., Delhi, Yamuna, Article 371, MSP, Gas, Land)..."
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933]"
              />
            </div>

            {/* Quick State Selector Dropdown */}
            <div className="md:col-span-3">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Bring Out Specific State</span>
                {selectedStateId !== 'ALL' && (
                  <button
                    onClick={() => handleStateSelect('ALL')}
                    className="text-[#FF9933] hover:underline normal-case text-xs font-medium cursor-pointer"
                  >
                    Reset to All
                  </button>
                )}
              </label>
              <select
                value={selectedStateId}
                onChange={(e) => handleStateSelect(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-[#FF9933] cursor-pointer"
              >
                <option value="ALL">Browse All (36 States & UTs)</option>
                {ALL_STATES_TERRITORIES.map((s) => (
                  <option key={s.id} value={s.id}>
                    Bring Out: {s.name} ({s.type === 'Union Territory' ? 'UT' : s.region})
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Sort States By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-[#FF9933] cursor-pointer"
              >
                <option value="name">Sort by: Alphabetical (A-Z)</option>
                <option value="unemployment">Sort by: Highest Youth Unemployment</option>
                <option value="assetGrowth">Sort by: Highest Lawmaker Asset Jump</option>
                <option value="seats">Sort by: Lok Sabha Seats</option>
              </select>
            </div>
          </div>

          {/* Maximize / Minimize Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF9933]" />
                Front Page State View:
              </span>

              <button
                onClick={minimizeAll}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  expandedStateIds.size === 0
                    ? 'bg-amber-500/20 text-[#FF9933] border border-[#FF9933]/50 shadow-sm'
                    : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
                title="Minimize all state promises to keep the front page compact"
              >
                <Minimize2 className="w-3.5 h-3.5 text-[#FF9933]" />
                Minimize All (Compact Front Page)
              </button>

              <button
                onClick={maximizeAll}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  expandedStateIds.size === filteredStates.length && filteredStates.length > 0
                    ? 'bg-blue-600/30 text-blue-300 border border-blue-500/50 shadow-sm'
                    : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
                title="Bring out all state promises at once"
              >
                <Maximize2 className="w-3.5 h-3.5 text-blue-400" />
                Maximize All (Bring Out All)
              </button>
            </div>

            {/* Live Indicator Badge */}
            <div className="text-xs font-mono">
              {expandedStateIds.size === 0 ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 text-amber-300 border border-amber-500/30">
                  <span className="w-2 h-2 rounded-full bg-[#FF9933] animate-pulse" />
                  All States Minimized (Select state or click "Bring Out" below)
                </span>
              ) : expandedStateIds.size === filteredStates.length ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 text-blue-300 border border-blue-500/30">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  All {filteredStates.length} States Maximized
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 text-emerald-300 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {expandedStateIds.size} of {filteredStates.length} States Brought Out
                </span>
              )}
            </div>
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/80">
            <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#FF9933]" /> Region:
            </span>
            {[
              { label: 'All India (36)', value: 'ALL' },
              { label: 'North', value: 'North' },
              { label: 'South', value: 'South' },
              { label: 'East', value: 'East' },
              { label: 'West', value: 'West' },
              { label: 'Central', value: 'Central' },
              { label: 'North-East', value: 'North-East' },
              { label: 'Union Territories', value: 'UT' },
            ].map((reg) => (
              <button
                key={reg.value}
                onClick={() => {
                  setSelectedRegion(reg.value);
                  setSelectedStateId('ALL');
                }}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedRegion === reg.value
                    ? 'bg-[#FF9933] text-slate-950 font-bold'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {reg.label}
              </button>
            ))}

            <div className="hidden lg:block h-4 w-px bg-slate-800 mx-2" />

            {/* Status Filter */}
            <div className="flex items-center gap-1.5 mt-2 lg:mt-0">
              <span className="text-xs font-semibold text-slate-400 mr-1">Status:</span>
              {(['ALL', 'Fulfilled', 'Broken'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-2.5 py-1 rounded text-xs transition-colors ${
                    selectedStatus === st
                      ? 'bg-slate-700 text-white font-medium'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-4 px-1">
          <span>
            Showing <strong className="text-white">{filteredStates.length}</strong> of{' '}
            {ALL_STATES_TERRITORIES.length} States & Territories
          </span>
          {(searchQuery || selectedRegion !== 'ALL' || selectedStatus !== 'ALL' || selectedStateId !== 'ALL') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRegion('ALL');
                setSelectedStatus('ALL');
                setSelectedStateId('ALL');
              }}
              className="text-[#FF9933] hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* State Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStates.map((state) => {
            const { f, b, total } = calculateStateStats(state);
            const isStateExpanded = expandedStateIds.has(state.id);

            return (
              <div
                key={state.id}
                id={`state-${state.id}`}
                className="bg-slate-900/95 border border-slate-800 rounded-xl overflow-hidden shadow-lg shadow-black/20 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                {/* State Card Header */}
                <div className="p-5 border-b border-slate-800/90 bg-gradient-to-r from-slate-950 to-slate-900">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-extrabold text-white tracking-tight">{state.name}</h3>
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                          {state.type}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-900 text-slate-400 border border-slate-800">
                          {state.region}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-3">
                        <span>Capital: <strong className="text-slate-300">{state.capital}</strong></span>
                        <span>•</span>
                        <span>
                          Lok Sabha: <strong className="text-[#FF9933]">{state.bjpSeats}</strong> / {state.totalSeats} seats
                        </span>
                        <span>•</span>
                        <span>Manifesto: <strong className="text-slate-300">{state.electionYear}</strong></span>
                      </div>
                    </div>

                    {/* Mini Fulfillment Summary Pills & Quick Bring Out / Minimize button */}
                    <div className="flex flex-col items-end gap-1.5">
                      <div className="flex items-center gap-1 text-xs">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold" title="Fulfilled">
                          {f} ✓ Fulfilled
                        </span>
                        <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-500/30 text-[11px] font-bold" title="Broken">
                          {b} ✗ Broken
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500 font-mono">
                          {Math.round((f / total) * 100)}% Delivered
                        </span>
                        <button
                          onClick={() => toggleStateExpanded(state.id)}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer border ${
                            isStateExpanded
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-600'
                              : 'bg-[#FF9933]/15 hover:bg-[#FF9933]/25 text-[#FF9933] border-[#FF9933]/40'
                          }`}
                          title={isStateExpanded ? 'Minimize state promises' : 'Bring out state promises'}
                        >
                          {isStateExpanded ? (
                            <>
                              <ChevronUp className="w-3 h-3 text-[#FF9933]" /> Minimize
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-3 h-3 text-[#FF9933]" /> Bring Out (Max)
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Squeeze Metric Bar for this State */}
                  <div className="mt-3.5 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-950/70 border border-slate-800/60 rounded px-2.5 py-1.5 flex items-center justify-between">
                      <span className="text-slate-400 text-[11px] flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-[#FF9933]" /> Lawmaker Wealth Jump
                      </span>
                      <span className="font-bold text-[#FF9933] font-mono">+{state.mpMlaAssetGrowthPct}%</span>
                    </div>

                    <div className="bg-slate-950/70 border border-slate-800/60 rounded px-2.5 py-1.5 flex items-center justify-between">
                      <span className="text-slate-400 text-[11px] flex items-center gap-1">
                        <UserX className="w-3 h-3 text-rose-400" /> Youth Unemployment
                      </span>
                      <span className="font-bold text-rose-400 font-mono">{state.youthUnemploymentRatePct}%</span>
                    </div>
                  </div>
                </div>

                {/* Minimized View: Clean preview with Bring Out CTA */}
                {!isStateExpanded ? (
                  <div className="p-4 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    <div className="text-xs text-slate-300">
                      <span className="font-bold text-white font-mono">{state.promises.length}</span> Audited Manifesto Promises
                      <span className="hidden sm:inline text-slate-500 text-[11px] ml-2 font-mono">
                        ({f} Fulfilled • {b} Broken)
                      </span>
                    </div>
                    <button
                      onClick={() => toggleStateExpanded(state.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FF9933]/15 hover:bg-[#FF9933]/25 text-[#FF9933] border border-[#FF9933]/40 text-xs font-bold transition-all cursor-pointer shadow-sm hover:shadow active:scale-98"
                    >
                      <ChevronDown className="w-4 h-4" />
                      <span>Bring Out Promises</span>
                      <span className="hidden sm:inline font-normal text-slate-400 text-[10px]">(Maximize)</span>
                    </button>
                  </div>
                ) : (
                  /* Maximized / Brought Out View: Full promises list */
                  <div className="p-5 space-y-3.5 flex-1 border-t border-slate-800/80 bg-slate-950/40">
                    <div className="flex items-center justify-between pb-2 mb-1 border-b border-slate-800/60">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                        {state.name} Pledges vs Ground Reality ({state.promises.length})
                      </span>
                      <button
                        onClick={() => toggleStateExpanded(state.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold transition-all cursor-pointer border border-slate-700"
                      >
                        <ChevronUp className="w-3.5 h-3.5 text-[#FF9933]" />
                        Minimize
                      </button>
                    </div>

                    {state.promises
                      .filter((p) => {
                        if (selectedStatus !== 'ALL' && p.status !== selectedStatus) return false;
                        if (selectedCategory !== 'ALL' && p.category !== selectedCategory) return false;
                        return true;
                      })
                      .map((promise) => {
                        const isExpanded = expandedPromiseId === promise.id;

                        return (
                          <div
                            key={promise.id}
                            className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3.5 transition-colors hover:border-slate-700"
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h4 className="text-sm font-bold text-slate-100 leading-snug">
                                {promise.title}
                              </h4>
                              <div className="shrink-0">{getStatusBadge(promise.status)}</div>
                            </div>

                            {/* Original Pledge vs Ground Reality */}
                            <div className="text-xs space-y-2 text-slate-300">
                              <div>
                                <span className="text-[#FF9933] font-semibold uppercase text-[10px] tracking-wider block">
                                  Manifesto Promise ({promise.manifestoYear}):
                                </span>
                                <p className="text-slate-400 italic mt-0.5">"{promise.originalPledge}"</p>
                              </div>

                              <div>
                                <span className="text-slate-300 font-semibold uppercase text-[10px] tracking-wider block">
                                  Ground Reality Audit:
                                </span>
                                <p className="text-slate-200 mt-0.5">{promise.groundReality}</p>
                              </div>
                            </div>

                            {/* Empirical Metric & Verification toggle */}
                            <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                              <span className="text-slate-400 font-mono truncate max-w-[70%]">
                                {promise.officialMetric}
                              </span>
                              <button
                                onClick={() => setExpandedPromiseId(isExpanded ? null : promise.id)}
                                className="text-[#FF9933] hover:underline font-semibold flex items-center gap-1 cursor-pointer shrink-0"
                              >
                                {isExpanded ? 'Hide Citation' : `[${promise.verification.type}]`}
                                {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                              </button>
                            </div>

                            {/* Expandable Verification Citation */}
                            {isExpanded && (
                              <div className="mt-2.5 pt-2.5 border-t border-slate-800 bg-slate-900/90 rounded p-2.5 text-[11px] space-y-1 text-slate-300">
                                <p>
                                  <strong className="text-slate-200">Source Document:</strong> {promise.verification.document}
                                </p>
                                <p>
                                  <strong className="text-slate-200">Citation:</strong> {promise.verification.citation}
                                </p>
                                {promise.verification.linkUrl && (
                                  <a
                                    href={promise.verification.linkUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[#FF9933] hover:underline pt-1 font-medium"
                                  >
                                    Open official record <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}

                    {/* Bottom minimize button */}
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => toggleStateExpanded(state.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold transition-all cursor-pointer border border-slate-700"
                      >
                        <ChevronUp className="w-3.5 h-3.5 text-[#FF9933]" />
                        Minimize {state.name} (Tuck Away)
                      </button>
                    </div>
                  </div>
                )}

                {/* State Card Footer - Representative Sample */}
                {state.topLawmakerSample && (
                  <div className="px-5 py-3 bg-slate-950/90 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                    <span className="truncate">
                      Sample Lawmaker: <strong className="text-slate-200">{state.topLawmakerSample.name}</strong>
                    </span>
                    <span className="shrink-0 text-slate-300 font-mono">
                      Declared: <strong className="text-[#FF9933]">₹{state.topLawmakerSample.currentWealthCr} Cr</strong> (+{state.topLawmakerSample.wealthJumpPct}%)
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
