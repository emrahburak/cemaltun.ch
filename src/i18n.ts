import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// JSON dosyalarını import et
import en from "./locales/en.json";
import de from "./locales/de.json";
import tr from "./locales/tr.json";

i18n
  // Dili tarayıcıdan otomatik algıla
  .use(LanguageDetector)
  // React ile bağla
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
      tr: { translation: tr },
    },
    fallbackLng: "en", // Eğer algılanan dil yoksa varsayılan İngilizce olsun
    supportedLngs: ["en", "de", "tr"], // Desteklenen diller

    interpolation: {
      escapeValue: false, // React zaten XSS koruması yapıyor
    },
  });

export default i18n;
