import { useTranslation } from "react-i18next";
import { useLanguageSelector } from "../stores/hooks";
import { Button } from "@/Components/UI/button";
import america from "./../assets/images/america-big.png";
import japan from "./../assets/images/japan-big.png";

const FlagContainer = () => {
  const changeSiteLanguage = useLanguageSelector((s) => s.changeSiteLanguage);
  const { i18n } = useTranslation();

  const isEnglish = i18n.language === "en";

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => changeSiteLanguage(isEnglish ? "jp" : "en")}
      title={isEnglish ? "Switch to Japanese" : "Switch to English"}
      className="mr-3 rounded-full"
    >
      <img
        className="h-5 w-7 rounded border object-cover"
        src={isEnglish ? japan : america}
        alt={isEnglish ? "Japan Flag" : "America Flag"}
      />
    </Button>
  );
};

export default FlagContainer;
