import { create } from "zustand";
import i18n from "../translations/i18n";
import type { SiteLanguage } from "../utils/types";

interface LanguageState {
  siteLanguage: SiteLanguage;
  changeSiteLanguage: (lang: SiteLanguage) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  siteLanguage: "en",
  changeSiteLanguage: (lang) => {
    set({ siteLanguage: lang });
    i18n.changeLanguage(lang);
  },
}));
