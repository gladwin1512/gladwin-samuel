import React from 'react';
import { TrendingUp, AlertOctagon, GraduationCap, Flame, ArrowUpRight } from 'lucide-react';
import { HERO_KPIS } from '../data/parallelIndiasData';
import { useLanguage } from '../i18n/LanguageContext';

interface HeroHeaderProps {
  onOpenSources: () => void;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({ onOpenSources }) => {
  const { t } = useLanguage();

  const getCardIcon = (cat: string) => {
    switch (cat) {
      case 'politician':
        return <TrendingUp className="w-5 h-5 text-[#FFB347]" />;
      case 'debt':
        return <AlertOctagon className="w-5 h-5 text-rose-400" />;
      case 'unemployment':
        return <GraduationCap className="w-5 h-5 text-amber-400" />;
      case 'cost':
        return <Flame className="w-5 h-5 text-orange-400" />;
      default:
        return null;
    }
  };

  return (
    <section id="overview" className="relative pt-8 pb-12 sm:pt-12 sm:pb-14 overflow-hidden">
      {/* Subtle warm glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-orange-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tag */}
        <div className="mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-orange-500/15 text-[#FF9933] border border-orange-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933] animate-pulse" />
            OFFICIAL PUBLIC AUDIT (2014–2024)
          </span>
        </div>

        {/* Headline */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            {t('app_title')}:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-amber-300 to-[#138808]">
              {t('module3_title')}
            </span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-300">
            {t('app_subtitle')}
          </p>
        </div>

        {/* 4 Clean KPI Stat Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HERO_KPIS.map((kpi) => (
            <div
              key={kpi.id}
              className="rounded-xl bg-[#0F141C] border border-orange-500/30 hover:border-orange-500/60 p-5 transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {kpi.title}
                  </span>
                  <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                    {getCardIcon(kpi.category)}
                  </div>
                </div>

                <div className="text-3xl sm:text-4xl font-black font-mono text-white">
                  {kpi.metric}
                </div>

                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  {kpi.subtext}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="font-mono text-orange-400 font-semibold">
                  [{kpi.sourceBadge}]
                </span>
                <button
                  onClick={onOpenSources}
                  className="text-slate-400 hover:text-[#FF9933] flex items-center gap-0.5 font-bold transition-colors"
                >
                  Source
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

