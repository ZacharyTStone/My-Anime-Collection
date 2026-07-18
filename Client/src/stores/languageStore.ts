import { create } from "zustand";
import i18n from "../translations/i18n";
import type { SiteLanguage } from "../utils/types";

const STORAGE_KEY = "siteLanguage";

const getInitialSiteLanguage = (): SiteLanguage => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "jp") {
    return stored;
  }
  return i18n.language === "jp" ? "jp" : "en";
};

interface LanguageState {
  siteLanguage: SiteLanguage;
  changeSiteLanguage: (lang: SiteLanguage) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  siteLanguage: getInitialSiteLanguage(),
  changeSiteLanguage: (lang) => {
    localStorage.setItem(STORAGE_KEY, lang);
    set({ siteLanguage: lang });
    i18n.changeLanguage(lang);
  },
}));
