import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import jp from "./jp.json";

// The translations
const resources = {
  en,
  jp,
};

const browserLanguageSettings =
  window.navigator.userLanguage || window.navigator.language;

const language = browserLanguageSettings.split(/[-_]/)[0].toLowerCase(); // language without region code

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
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: checkLanguage(language), // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
