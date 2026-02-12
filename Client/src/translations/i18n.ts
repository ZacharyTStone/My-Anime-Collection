import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import jp from "./jp.json";

const resources = {
  en,
  jp,
};

const browserLanguageSettings =
  (navigator as any).userLanguage || navigator.language;

const language = browserLanguageSettings.split(/[-_]/)[0].toLowerCase();

const checkLanguage = (lang: string): string => {
  switch (lang) {
    case "en":
      return "en";
    case "ja":
      return "jp";
    default:
      return "en";
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: checkLanguage(language),
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
