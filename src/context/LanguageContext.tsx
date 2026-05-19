import { createContext, useContext, useState, useCallback, type ReactNode, useEffect } from 'react';
import i18n from '@/i18n';

interface LanguageContextType {
  language: 'it' | 'en';
  setLanguage: (lang: 'it' | 'en') => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLang] = useState<'it' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('cais-lang') as 'it' | 'en') || 'it';
    }
    return 'it';
  });

  // Sync with i18n on mount
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLanguage = useCallback((lang: 'it' | 'en') => {
    setLang(lang);
    localStorage.setItem('cais-lang', lang);
    i18n.changeLanguage(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'it' ? 'en' : 'it');
  }, [language, setLanguage]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
