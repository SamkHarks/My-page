import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

// Define the supported languages
type Language = "fi" | "en";

// Define the supported namespaces
type Namespace = "common" | "home" | "about" | "skills" | "sections";

i18n
  .use(resourcesToBackend((language: Language, namespace: Namespace) => import(`./locales/${language}/${namespace}.json`))) // Lazy-load translations
  .use(initReactI18next) // Initialize react-i18next
  .init({
    lng: "en", // Default language
    debug: process.env.NODE_ENV === "development", // Enable debug mode in development
    interpolation: {
      escapeValue: false, // React already escapes values by default
    },
  });

export default i18n;