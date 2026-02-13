import { create } from "zustand";
import i18n from "../translations/i18n";

interface LanguageStore {
  siteLanguage: string;
  changeSiteLanguage: (lang: string) => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  siteLanguage: "en",
  changeSiteLanguage: (lang: string) => {
    set({ siteLanguage: lang });
    i18n.changeLanguage(lang);
  },
}));
