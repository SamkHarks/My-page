import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importing translation files
import sectionsEn from './locales/en/sections.json';
import sectionsFi from './locales/fi/sections.json';
import aboutEn from './locales/en/about.json';
import aboutFi from './locales/fi/about.json';
import skillsEn from './locales/en/skills.json';
import skillsFi from './locales/fi/skills.json';

export type Languages = 'en' | 'fi';
type Resource = {
    [K in Languages]: {
        sections: typeof sectionsEn,
        about: typeof aboutEn,
        skills: typeof skillsEn
    };
};

const resources: Resource = {
    en: {
        sections: sectionsEn,
        about: aboutEn,
        skills: skillsEn,
    },
    fi: {
        sections: sectionsFi,
        about: aboutFi,
        skills: skillsFi
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
