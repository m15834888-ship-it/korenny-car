import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './locales/ar.json';
import en from './locales/en.json';
import fr from './locales/fr.json';

const savedLang = localStorage.getItem('korenny-lang') || 'ar';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: ar },
      en: { translation: en },
      fr: { translation: fr },
    },
    lng: savedLang,
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
