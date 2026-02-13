import { atom } from "jotai";
import i18n from "../translations/i18n";

export const siteLanguageAtom = atom("en");

export const changeSiteLanguageAtom = atom(null, (_get, set, lang: string) => {
  set(siteLanguageAtom, lang);
  i18n.changeLanguage(lang);
});
