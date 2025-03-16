import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

// Supported languages
const languages = ["en", "fi"] as const;

// Supported namespaces
const namespaces = ["common", "home", "about", "skills", "sections"] as const;

i18n
  .use(resourcesToBackend((language: typeof languages[number], namespace: typeof namespaces[number]) => import(`./locales/${language}/${namespace}.json`))) // Lazy-load translations
  .use(initReactI18next) // Initialize react-i18next
  .init({
    fallbackLng: "en", // Fallback language
    supportedLngs: languages, // Supported languages
    ns: namespaces, // Namespaces
    debug: process.env.NODE_ENV === "development", // Enable debug mode in development
    interpolation: {
      escapeValue: false, // React already escapes values by default
    },
  });

export default i18n;