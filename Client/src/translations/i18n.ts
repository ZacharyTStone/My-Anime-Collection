import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import jp from "./jp.json";

const resources = {
  en,
  jp,
};

const browserLanguageSettings =
  (navigator as unknown as { userLanguage?: string }).userLanguage || navigator.language;

const storedLanguage = localStorage.getItem("siteLanguage");

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

const initialLanguage =
  storedLanguage === "en" || storedLanguage === "jp"
    ? storedLanguage
    : checkLanguage(language);

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
