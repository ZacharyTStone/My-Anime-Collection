import React, {
  useReducer,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";
import { ACTIONS } from "./actions";

// Types and Interfaces
interface LanguageState {
  siteLanguage: string;
}

interface LanguageContextType extends LanguageState {
  changeSiteLanguage: (lang: string) => void;
}

interface LanguageProviderProps {
  children: React.ReactNode;
}

// Initial state
const getInitialLanguageState = (): LanguageState => {
  return {
    siteLanguage: "en",
  };
};

export const initialLanguageState = getInitialLanguageState();

// Language reducer
const languageReducer = (state: LanguageState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case ACTIONS.CHANGE_SITE_LANGUAGE:
      return {
        ...state,
        siteLanguage: action.payload,
      };
    default:
      return state;
  }
};

// Context
const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

/**
 * LanguageProvider component that manages language state
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [state, dispatch] = useReducer(languageReducer, getInitialLanguageState());

  // Language functions
  const changeSiteLanguage = useCallback(
    (lang: string) => {
      dispatch({
        type: ACTIONS.CHANGE_SITE_LANGUAGE,
        payload: lang,
      });
      i18n.changeLanguage(lang);
    },
    [i18n]
  );

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      ...state,
      changeSiteLanguage,
    }),
    [state, changeSiteLanguage]
  );

  return (
    <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>
  );
};

/**
 * Custom hook to use language context
 * @throws {Error} When used outside of LanguageProvider
 */
export const useLanguageContext = (): LanguageContextType => {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error("useLanguageContext must be used within a LanguageProvider");
  }

  return context;
};
