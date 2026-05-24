import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import i18n from '@/i18n';

type LangCode = 'it' | 'en' | 'pt-BR';

interface LanguageContextType {
  language: LangCode;
  setLanguage: (lang: LangCode) => void;
  toggleLanguage: () => void;
  langLabel: string;
}

const labels: Record<LangCode, string> = {
  it: 'IT',
  en: 'EN',
  'pt-BR': 'PT',
};

const cycle: LangCode[] = ['it', 'en', 'pt-BR'];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLang] = useState<LangCode>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('cais-lang') as LangCode) || 'it';
    }
    return 'it';
  });

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, []);

  const setLanguage = useCallback((lang: LangCode) => {
    setLang(lang);
    localStorage.setItem('cais-lang', lang);
    i18n.changeLanguage(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    const idx = cycle.indexOf(language);
    const next = cycle[(idx + 1) % cycle.length];
    setLanguage(next);
  }, [language, setLanguage]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, langLabel: labels[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
