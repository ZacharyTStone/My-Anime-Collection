import { create } from "zustand";
import i18n from "../translations/i18n";

interface LanguageState {
  siteLanguage: string;
  changeSiteLanguage: (lang: string) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  siteLanguage: "en",
  changeSiteLanguage: (lang) => {
    set({ siteLanguage: lang });
    i18n.changeLanguage(lang);
  },
}));
