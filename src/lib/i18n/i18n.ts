import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

// Supported languages
const languages = ["en", "fi"] as const;

export type Languages = typeof languages[number];

i18n
  .use(HttpBackend) // Load translations via HTTP
  .use(initReactI18next) // Initialize react-i18next
  .init({
    fallbackLng: "en", // Fallback language
    supportedLngs: languages, // Supported languages
    defaultNS: "common",
    ns: ["common", "sections"], // Preload these namespaces
    load: "languageOnly", // Only load language without region code
    debug: process.env.NODE_ENV === "development", // Enable debug mode in development
    interpolation: {
      escapeValue: false, // React already escapes values by default
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Path to translation files
    },
  });

export default i18n;