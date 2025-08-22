import IconButton from "@mui/material/IconButton";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useLanguageContext } from "../context/LanguageContext";
import america from "./../assets/images/america-big.png";
import japan from "./../assets/images/japan-big.png";

const FlagContainer: React.FC = () => {
  const { changeSiteLanguage } = useLanguageContext();
  const { i18n } = useTranslation();

  return (
    <FlagContainerDiv className="flag-div-holder">
      {i18n.language === "en" ? (
        <FlagButton
          onClick={() => changeSiteLanguage("jp")}
          title="Switch to Japanese"
        >
          <FlagImg className="flag" src={japan} alt="Japan Flag" />
        </FlagButton>
      ) : (
        <FlagButton
          onClick={() => changeSiteLanguage("en")}
          title="Switch to English"
        >
          <FlagImg className="flag" src={america} alt="America Flag" />
        </FlagButton>
      )}
    </FlagContainerDiv>
  );
};

const FlagContainerDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

const FlagButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  padding: 4px;
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.2s ease;
  background-color: var(--white);
  border: 1px solid var(--grey-200);
  box-shadow: var(--shadow-sm);
  cursor: pointer;

  &:hover {
    background: rgba(212, 54, 124, 0.05);
    transform: translateY(-2px);
    box-shadow: var(--shadow);
    border-color: var(--primary-200);
  }

  &:active {
    transform: scale(0.96);
  }
`;

const FlagImg = styled.img`
  width: 28px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid var(--grey-200);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  object-fit: cover;
`;

export default FlagContainer;
