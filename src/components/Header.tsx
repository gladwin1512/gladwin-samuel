import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldAlert,
  BookOpen,
  Menu,
  X,
  Globe2,
  ChevronDown,
  Check,
  DollarSign,
  Users,
  FileSpreadsheet,
  Scale,
  MapPin,
  Calculator,
  AlertOctagon,
  Plane
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { SUPPORTED_LANGUAGES, SupportedLocale } from '../i18n/translations';

interface HeaderProps {
  onOpenSources: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSources }) => {
  const { currentLocale, setLocale, setIsGatewayOpen, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLocale) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'UN/WHO & Exodus', href: '#global-rankings-audit', icon: Globe2 },
    { label: 'Rhetoric vs Reality', href: '#rhetoric-tracker', icon: AlertOctagon },
    { label: 'Citizen Tax & Rank', href: '#tax-calculator', icon: Calculator },
    { label: 'Taxpayer Loss', href: '#taxpayer-loss', icon: AlertOctagon },
    { label: t('nav_national_guarantee'), href: '#national-guarantee', icon: ShieldAlert },
    { label: t('nav_states_territories'), href: '#states-audit', icon: MapPin },
    { label: 'Delhi MPs Audit', href: '#delhi-representative-audit', icon: Users },
    { label: 'Privatization', href: '#privatization-tracker', icon: Plane },
    { label: t('nav_wealth_squeeze'), href: '#divergence', icon: Scale },
    { label: t('nav_citizen_debt'), href: '#squeeze', icon: DollarSign },
    { label: t('nav_youth_jobs'), href: '#jobs', icon: Users },
    { label: t('nav_affidavits'), href: '#affidavits', icon: FileSpreadsheet },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F14]/95 backdrop-blur-md border-b border-orange-500/20">
      {/* Accent strip */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[#FF9933] via-amber-400 to-[#138808]" />

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <a href="#overview" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#FF9933] flex items-center justify-center text-slate-950 font-black shadow-sm">
            <ShieldAlert className="w-4 h-4 text-slate-950" />
          </div>
          <div>
            <span className="font-black tracking-tight text-white text-sm sm:text-base">
              {t('app_title')}
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-orange-500/10 transition-colors flex items-center gap-1.5"
              >
                <Icon className="w-3.5 h-3.5 text-[#FF9933]" />
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action buttons & Language Dropdown */}
        <div className="flex items-center gap-2">
          {/* Language Selector Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-bold transition-all shadow-sm"
              title="Select Language"
              aria-label="Language Selector"
            >
              <Globe2 className="w-3.5 h-3.5 text-[#FF9933]" />
              <span className="hidden sm:inline font-sans">{currentLangObj.nativeName}</span>
              <span className="sm:hidden font-mono uppercase">{currentLangObj.code}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#0B0F14] border border-orange-500/30 shadow-2xl shadow-black/80 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-96 overflow-y-auto">
                <div className="px-3 py-1.5 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                  <span>Choose Language</span>
                  <button
                    onClick={() => {
                      setLangDropdownOpen(false);
                      setIsGatewayOpen(true);
                    }}
                    className="text-[#FF9933] hover:underline normal-case font-medium text-[11px]"
                  >
                    View All
                  </button>
                </div>

                <div className="py-1">
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const isSelected = currentLocale === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLocale(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-orange-500/15 text-[#FF9933] font-bold'
                            : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="font-bold text-sm">{lang.nativeName}</span>
                          <span className="text-[10px] text-slate-400">{lang.name}</span>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#FF9933]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sources button */}
          <button
            onClick={onOpenSources}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/15 hover:bg-orange-500/25 text-[#FF9933] border border-orange-500/40 text-xs font-bold transition-all"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('nav_sources')}</span>
            <span className="sm:hidden">Sources</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg xl:hidden text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-orange-500/20 bg-[#0B0F14] px-4 py-3 space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold text-slate-300 hover:bg-orange-500/10 hover:text-white"
              >
                <Icon className="w-4 h-4 text-[#FF9933]" />
                {item.label}
              </a>
            );
          })}
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsGatewayOpen(true);
              }}
              className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-slate-300 hover:bg-slate-800"
            >
              <Globe2 className="w-4 h-4 text-[#FF9933]" />
              Change Language ({currentLangObj.nativeName})
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSources();
              }}
              className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-[#FF9933] hover:bg-orange-500/10"
            >
              <BookOpen className="w-4 h-4" />
              View Sources & Verification Methodology
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

