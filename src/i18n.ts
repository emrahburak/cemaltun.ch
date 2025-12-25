import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import de from "./locales/de.json";
import tr from "./locales/tr.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
      tr: { translation: tr },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "de", "tr"],
    interpolation: {
      escapeValue: false,
    },
  });

// --- SEO İÇİN EKLENEN KISIM ---
// Dil her değiştiğinde HTML'deki lang özniteliğini günceller
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;
