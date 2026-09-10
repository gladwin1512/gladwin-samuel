import React, { useState } from 'react';
import { Globe2, Check, ArrowRight, ShieldAlert, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { SUPPORTED_LANGUAGES, SupportedLocale } from '../i18n/translations';

export const LanguageGatewayModal: React.FC = () => {
  const { isGatewayOpen, setIsGatewayOpen, currentLocale, confirmLocale } = useLanguage();
  const [selected, setSelected] = useState<SupportedLocale>(currentLocale);

  if (!isGatewayOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-gateway-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-[#0B0F14] border border-orange-500/40 rounded-2xl shadow-2xl shadow-orange-950/50 overflow-hidden">
        {/* Tricolor accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-amber-400 to-[#138808]" />

        {/* Close button */}
        <button
          onClick={() => setIsGatewayOpen(false)}
          aria-label="Close language selector"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="text-center max-w-lg mx-auto mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#FF9933]/15 text-[#FF9933] border border-[#FF9933]/30 mb-3">
              <Globe2 className="w-6 h-6" />
            </div>

            <h2
              id="language-gateway-title"
              className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight"
            >
              Select Your Language
            </h2>
            <p className="text-base font-semibold text-[#FF9933] mt-1 font-sans">
              अपनी भाषा चुनें / உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்
            </p>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Choose your preferred language to explore the verified audit across 28 States and 8 Union Territories.
            </p>
          </div>

          {/* Languages Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[340px] overflow-y-auto pr-1 py-1 custom-scrollbar">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = selected === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => setSelected(lang.code)}
                  className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all relative ${
                    isSelected
                      ? 'bg-orange-500/15 border-[#FF9933] text-white shadow-md shadow-orange-950/40 ring-1 ring-[#FF9933]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-lg font-bold text-white tracking-wide">
                      {lang.nativeName}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#FF9933] text-slate-950 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400 mt-0.5 font-medium">
                    {lang.name}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                    {lang.scriptLabel}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldAlert className="w-4 h-4 text-[#FF9933] shrink-0" />
              <span>You can change this anytime from the navigation bar.</span>
            </div>

            <button
              onClick={() => confirmLocale(selected)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF9933] to-amber-500 hover:from-amber-500 hover:to-[#FF9933] text-slate-950 font-extrabold text-sm shadow-lg shadow-orange-950/40 transition-all cursor-pointer"
            >
              <span>Explore Audit Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
