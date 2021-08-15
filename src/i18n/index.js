import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";
import EN from "./languages/en.json";
import PL from "./languages/pl.json";

const resources = {
  en: {
    translation: EN,
  },
  pl: {
    translation: PL,
  },
};


i18n
  .use(Backend)
  // .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en",

    keySeparator: false,
    debug: false,
    load: 'languageOnly',
    interpolation: {
      escapeValue: false,
    },
  });

export const t = i18n.t.bind(i18n);

export default i18n;