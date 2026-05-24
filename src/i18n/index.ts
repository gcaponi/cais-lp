import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import it from './it.json';
import ptBR from './pt-BR.json';

const savedLang = typeof window !== 'undefined' ? localStorage.getItem('cais-lang') : null;

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      it: { translation: it },
      'pt-BR': { translation: ptBR },
    },
    lng: savedLang || 'it',
    fallbackLng: 'it',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
