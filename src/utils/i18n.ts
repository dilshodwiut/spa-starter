import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "@/locales/translations";
import settings from "@/config/settings";

const resources = {
  uz: {
    translation: translations.uz,
  },
  ru: {
    translation: translations.ru,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("lang") ?? settings.defaultLanguage,

    keySeparator: false,

    interpolation: {
      escapeValue: false,
    },
  })
  .catch((err) => {
    console.error(err);
  });

export default i18n;
