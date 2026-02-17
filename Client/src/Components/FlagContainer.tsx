import { useTranslation } from "react-i18next";
import { useSetAtom } from "jotai";
import { changeSiteLanguageAtom } from "../atoms/languageAtom";
import america from "./../assets/images/america-big.png";
import japan from "./../assets/images/japan-big.png";

const FlagContainer: React.FC = () => {
  const changeSiteLanguage = useSetAtom(changeSiteLanguageAtom);
  const { i18n } = useTranslation();

  return (
    <div className="flag-div-holder flex items-center justify-center mr-3">
      {i18n.language === "en" ? (
        <button
          onClick={() => changeSiteLanguage("jp")}
          title="Switch to Japanese"
          className="flex items-center justify-center h-10 w-10 p-1 rounded-full overflow-hidden transition-all duration-200 bg-white border border-grey-200 shadow-sm cursor-pointer hover:bg-[rgba(212,54,124,0.05)] hover:-translate-y-0.5 hover:shadow hover:border-primary-200 active:scale-[0.96]"
        >
          <img
            className="flag w-7 h-5 rounded border border-grey-200 shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-200 object-cover"
            src={japan}
            alt="Japan Flag"
          />
        </button>
      ) : (
        <button
          onClick={() => changeSiteLanguage("en")}
          title="Switch to English"
          className="flex items-center justify-center h-10 w-10 p-1 rounded-full overflow-hidden transition-all duration-200 bg-white border border-grey-200 shadow-sm cursor-pointer hover:bg-[rgba(212,54,124,0.05)] hover:-translate-y-0.5 hover:shadow hover:border-primary-200 active:scale-[0.96]"
        >
          <img
            className="flag w-7 h-5 rounded border border-grey-200 shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-200 object-cover"
            src={america}
            alt="America Flag"
          />
        </button>
      )}
    </div>
  );
};

export default FlagContainer;
