import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  Clock,
  XCircle,
  ExternalLink,
  Filter,
  Search,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileText,
  Building,
  Briefcase,
  Tractor,
  Flame,
  Award,
  BookOpen
} from 'lucide-react';
import { ManifestoPromise, ManifestoStatus, ManifestoCategory } from '../types';
import { NATIONAL_BIG_TICKET_PROMISES, NATIONAL_STATS_OVERVIEW } from '../data/manifestoData';
import { useLanguage } from '../i18n/LanguageContext';

interface Props {
  onOpenSources?: () => void;
}

export const NationalGuaranteeAudit: React.FC<Props> = ({ onOpenSources }) => {
  const { t } = useLanguage();
  const [selectedYear, setSelectedYear] = useState<number | 'ALL'>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<ManifestoStatus | 'ALL'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<ManifestoCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filtered national promises
  const filteredPromises = useMemo(() => {
    return NATIONAL_BIG_TICKET_PROMISES.filter((promise) => {
      if (selectedYear !== 'ALL' && promise.manifestoYear !== selectedYear) return false;
      if (selectedStatus !== 'ALL' && promise.status !== selectedStatus) return false;
      if (selectedCategory !== 'ALL' && promise.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = promise.title.toLowerCase().includes(q);
        const matchPledge = promise.originalPledge.toLowerCase().includes(q);
        const matchReality = promise.groundReality.toLowerCase().includes(q);
        const matchMetric = promise.officialMetric.toLowerCase().includes(q);
        if (!matchTitle && !matchPledge && !matchReality && !matchMetric) return false;
      }
      return true;
    });
  }, [selectedYear, selectedStatus, selectedCategory, searchQuery]);

  // Dynamic status counters
  const counts = useMemo(() => {
    let fulfilled = 0;
    let broken = 0;
    NATIONAL_BIG_TICKET_PROMISES.forEach((p) => {
      if (p.status === 'Fulfilled') fulfilled++;
      else if (p.status === 'Broken') broken++;
    });
    return { fulfilled, broken, total: NATIONAL_BIG_TICKET_PROMISES.length };
  }, []);

  const getStatusBadge = (status: ManifestoStatus) => {
    switch (status) {
      case 'Fulfilled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 shadow-sm shadow-emerald-950/40">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            {t('status_fulfilled')}
          </span>
        );
      case 'Broken':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-950/80 text-rose-400 border border-rose-500/40 shadow-sm shadow-rose-950/40">
            <XCircle className="w-3.5 h-3.5 text-rose-400" />
            {t('status_broken')}
          </span>
        );
    }
  };

  const getCategoryIcon = (category: ManifestoCategory) => {
    switch (category) {
      case 'Economy/Jobs':
        return <Briefcase className="w-3.5 h-3.5 text-sky-400" />;
      case 'Agriculture':
        return <Tractor className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Infrastructure':
        return <Building className="w-3.5 h-3.5 text-amber-400" />;
      case 'Governance':
        return <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />;
      case 'Ideological':
        return <Flame className="w-3.5 h-3.5 text-orange-400" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  return (
    <section id="national-guarantee" className="py-14 bg-[#0B0F14] border-b border-slate-800 relative">
      {/* Visual Accent Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF9933]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#138808]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Module Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#FF9933]/15 text-[#FF9933] border border-[#FF9933]/30 mb-4">
            <Award className="w-3.5 h-3.5" />
            {t('module1_tag')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('module1_title')}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
            {t('module1_sub')}
          </p>
        </div>

        {/* Visual Scorecard Header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {/* Trust Score Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-[#FF9933]/40 rounded-xl p-5 shadow-lg shadow-black/40 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF9933]">{t('fulfillment_rate')}</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white font-mono">{NATIONAL_STATS_OVERVIEW.trustScorePct}%</span>
                <span className="text-xs text-slate-400">Strictly Delivered</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden flex">
                <div
                  className="bg-emerald-500 h-full transition-all duration-500"
                  style={{ width: `${(counts.fulfilled / counts.total) * 100}%` }}
                />
                <div
                  className="bg-rose-500 h-full transition-all duration-500"
                  style={{ width: `${(counts.broken / counts.total) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 mt-2">
                <span className="text-emerald-400 font-medium">{Math.round((counts.fulfilled / counts.total) * 100)}% Fulfilled</span>
                <span className="text-rose-400 font-medium">{Math.round((counts.broken / counts.total) * 100)}% Broken</span>
              </div>
            </div>
          </div>

          {/* Total Tracked */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('total_promises')}</span>
            <div className="mt-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">{counts.total}</span>
              <p className="text-xs text-slate-400 mt-1">Key National Commitments</p>
            </div>
            <span className="text-[11px] text-slate-500 mt-3 flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> 2014, 2019 & 2024 Manifestos
            </span>
          </div>

          {/* Fulfilled */}
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">{t('status_fulfilled')}</span>
            <div className="mt-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">{counts.fulfilled}</span>
              <p className="text-xs text-emerald-300/70 mt-1">{t('fulfilled_count')}</p>
            </div>
            <span className="text-[11px] text-emerald-400/80 mt-3 font-semibold">
              {Math.round((counts.fulfilled / counts.total) * 100)}% Verified Delivered
            </span>
          </div>

          {/* Broken / Unmet */}
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-5 flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">{t('status_broken')}</span>
            <div className="mt-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-rose-400 font-mono">{counts.broken}</span>
              <p className="text-xs text-rose-300/70 mt-1">{t('broken_count')}</p>
            </div>
            <span className="text-[11px] text-rose-400/80 mt-3 font-semibold">
              {Math.round((counts.broken / counts.total) * 100)}% Unmet / Broken Commitments
            </span>
          </div>
        </div>

        {/* Multi-Filter Bar */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search promises (e.g. 2 Crore Jobs, Farmers, Smart Cities, Ram Mandir, Black Money, Bullet Train)..."
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933]"
              />
            </div>

            {/* Quick Status Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              <button
                onClick={() => setSelectedStatus('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedStatus === 'ALL'
                    ? 'bg-slate-200 text-slate-900 font-bold'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {t('status_all')} ({NATIONAL_BIG_TICKET_PROMISES.length})
              </button>
              <button
                onClick={() => setSelectedStatus('Fulfilled')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedStatus === 'Fulfilled'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-950 text-emerald-400 hover:bg-emerald-950/40 border border-emerald-500/30'
                }`}
              >
                {t('status_fulfilled')} ({counts.fulfilled})
              </button>
              <button
                onClick={() => setSelectedStatus('Broken')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedStatus === 'Broken'
                    ? 'bg-rose-500 text-white font-bold'
                    : 'bg-slate-950 text-rose-400 hover:bg-rose-950/40 border border-rose-500/30'
                }`}
              >
                {t('status_broken')} ({counts.broken})
              </button>
            </div>
          </div>

          {/* Secondary Filter Row: Year & Category */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-2">
              <Filter className="w-3 h-3 text-[#FF9933]" /> Year:
            </span>
            {[
              { label: 'All Manifestos', value: 'ALL' },
              { label: '2014 Sankalp', value: 2014 },
              { label: '2016-19 Pledges', value: 2019 },
              { label: '2020-24 Guarantees', value: 2020 },
            ].map((y) => (
              <button
                key={String(y.value)}
                onClick={() => setSelectedYear(y.value as any)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedYear === y.value
                    ? 'bg-[#FF9933]/20 text-[#FF9933] border border-[#FF9933]/40'
                    : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {y.label}
              </button>
            ))}

            <div className="hidden sm:block h-4 w-px bg-slate-800 mx-2" />

            <span className="text-xs font-semibold text-slate-400 mr-1">Sector:</span>
            {[
              'ALL',
              'Economy/Jobs',
              'Agriculture',
              'Infrastructure',
              'Governance',
              'Ideological',
              'Social Welfare',
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as any)}
                className={`px-2 py-0.5 rounded text-xs transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-700 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Big-Ticket Promise Cards */}
        <div className="space-y-4">
          {filteredPromises.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/50 border border-slate-800 rounded-xl">
              <FileText className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-base text-slate-300 font-medium">No manifesto pledges match the selected filter criteria.</p>
              <button
                onClick={() => {
                  setSelectedYear('ALL');
                  setSelectedStatus('ALL');
                  setSelectedCategory('ALL');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs text-[#FF9933] hover:underline font-semibold"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            filteredPromises.map((promise) => {
              const isExpanded = expandedId === promise.id;
              return (
                <div
                  key={promise.id}
                  className={`bg-slate-900/95 border rounded-xl transition-all duration-200 overflow-hidden ${
                    promise.status === 'Fulfilled'
                      ? 'border-emerald-500/25 hover:border-emerald-500/50'
                      : 'border-rose-500/25 hover:border-rose-500/50'
                  }`}
                >
                  <div className="p-5 sm:p-6">
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {getStatusBadge(promise.status)}
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                          {getCategoryIcon(promise.category)}
                          {promise.category}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-950 text-slate-400 border border-slate-800">
                          Manifesto {promise.manifestoYear}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">ID: {promise.id}</span>
                    </div>

                    {/* Promise Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                      {promise.title}
                    </h3>

                    {/* Original Pledge vs Ground Reality */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                      {/* Original Pledge */}
                      <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3.5">
                        <div className="text-xs font-bold text-[#FF9933] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          {t('original_pledge')}
                        </div>
                        <p className="text-slate-300 leading-relaxed italic">
                          "{promise.originalPledge}"
                        </p>
                      </div>

                      {/* Ground Reality */}
                      <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3.5">
                        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                          {t('ground_reality')}
                        </div>
                        <p className="text-slate-300 leading-relaxed">
                          {promise.groundReality}
                        </p>
                      </div>
                    </div>

                    {/* Official Metric Callout Bar */}
                    <div className="bg-slate-950 border-l-4 border-slate-700 pl-3.5 pr-4 py-2.5 rounded-r-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-400 uppercase">{t('official_metric')}:</span>
                        <span className="text-slate-200 font-mono font-medium">{promise.officialMetric}</span>
                      </div>
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : promise.id)}
                        className="text-[#FF9933] hover:text-[#FF9933]/80 font-semibold flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                      >
                        {isExpanded ? 'Hide Verification Dossier' : t('inspect_evidence')}
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Expandable Verification Citation Drawer */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-slate-800/80 bg-slate-950/90 rounded-lg p-4 text-xs space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-300 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            Official Public Verification Record
                          </span>
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#FF9933]/15 text-[#FF9933] border border-[#FF9933]/30">
                            [{promise.verification.type}]
                          </span>
                        </div>
                        <div>
                          <p className="text-slate-400 font-medium">Document:</p>
                          <p className="text-slate-200 font-mono mt-0.5">{promise.verification.document}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 font-medium">Official Citation & Repository:</p>
                          <p className="text-slate-300 mt-0.5">{promise.verification.citation}</p>
                        </div>
                        {promise.verification.linkUrl && (
                          <div className="pt-1">
                            <a
                              href={promise.verification.linkUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[#FF9933] hover:underline font-medium"
                            >
                              Access Official Document Repository <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Global Documentation Note */}
        <div className="mt-8 bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            Data sourced from official party manifestos, Comptroller & Auditor General (CAG) compliance reports, MoSPI Periodic Labour Force Surveys, and Parliamentary Record Tables.
          </div>
          {onOpenSources && (
            <button
              onClick={onOpenSources}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition-colors whitespace-nowrap"
            >
              View Full Methodology
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
