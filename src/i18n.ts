import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importing translation files
import translationEn from './locales/en/translation.json';
import translationFi from './locales/fi/translation.json';

type Languages = 'en' | 'fi';
type Resource = {
    [K in Languages]: {
        translation: typeof translationEn
    };
};

const resources: Resource = {
    en: {
        translation: translationEn
    },
    fi: {
        translation: translationFi
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        resources,
        debug: true,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });

export default i18n;
