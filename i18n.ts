'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: require('./public/locales/en/common.json'),
  },
  sp: {
    translation: require('./public/locales/sp/common.json'),
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language
  debug: true, // Enable debug mode for development
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
