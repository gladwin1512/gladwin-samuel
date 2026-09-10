import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLocale, TRANSLATIONS, TranslationSchema, SUPPORTED_LANGUAGES } from './translations';

interface LanguageContextType {
  currentLocale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: (key: keyof TranslationSchema) => string;
  isGatewayOpen: boolean;
  setIsGatewayOpen: (open: boolean) => void;
  confirmLocale: (locale: SupportedLocale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'two_parallel_indias_locale_preference';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLocale, setCurrentLocaleState] = useState<SupportedLocale>('en');
  const [isGatewayOpen, setIsGatewayOpen] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem(STORAGE_KEY) as SupportedLocale | null;
      if (savedLocale && TRANSLATIONS[savedLocale]) {
        setCurrentLocaleState(savedLocale);
        setIsGatewayOpen(false);
      } else {
        // First-time visit: show multilingual modal overlay
        setIsGatewayOpen(true);
      }
    } catch {
      // Fallback for localStorage access restrictions
      setIsGatewayOpen(true);
    }
    setIsInitialized(true);
  }, []);

  const setLocale = (locale: SupportedLocale) => {
    setCurrentLocaleState(locale);
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch (e) {
      console.warn('Unable to save locale preference to localStorage:', e);
    }
  };

  const confirmLocale = (locale: SupportedLocale) => {
    setLocale(locale);
    setIsGatewayOpen(false);
  };

  const t = (key: keyof TranslationSchema): string => {
    const dictionary = TRANSLATIONS[currentLocale] || TRANSLATIONS.en;
    return dictionary[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLocale,
        setLocale,
        t,
        isGatewayOpen,
        setIsGatewayOpen,
        confirmLocale,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
