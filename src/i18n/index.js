import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
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
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    load: "languageOnly",

    keySeparator: false,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });


console.log(i18n.language)
// console.log(i18n.language.split('-')[0])

export const t = i18n.t.bind(i18n);

export default i18n;