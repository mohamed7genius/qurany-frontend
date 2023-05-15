import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from '../assets/i18n/locales/en/translation.json';
import translationAR from '../assets/i18n/locales/ar/translation.json';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    lng: "en",
    debug: false,
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    },
    resources: {
      en: {
        translation: translationEN
      },
      ar: {
        translation: translationAR,
      }
    }
  });

export default i18n;
