import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translations from "@/locales";
import settings from "@/config/settings";

const resources = {
  uzLatin: {
    translation: translations.uzLatin,
  },
  uzCryllic: {
    translation: translations.uzCryllic,
  },
  ru: {
    translation: translations.ru,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: localStorage.getItem("i18nextLng") ?? settings.defaultLanguage,

    keySeparator: false,

    interpolation: {
      escapeValue: false,
    },
  })
  .catch((err) => {
    console.error(err);
  });

export default i18n;

const { t } = i18n;

export { t };
