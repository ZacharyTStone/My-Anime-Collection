import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import america from "./../assets/images/america-big.png";
import japan from "./../assets/images/japan-big.png";

//icons
import ModeNightIcon from "@mui/icons-material/ModeNight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

const FlagContainer = () => {
  const { changeSiteLanguage, theme, changeTheme } = useAppContext();
  const { i18n } = useTranslation();

  return (
    <FlagContainerDiv className="flag-div-holder">
      {theme === "light" ? (
        <IconButton onClick={() => changeTheme("dark")}>
          <ModeNightIcon
            htmlColor="var(--primary-800)"
            sx={{
              transform: "scale(2)",
              paddingRight: "0.5rem",
            }}
          />
        </IconButton>
      ) : (
        <IconButton onClick={() => changeTheme("light")}>
          <WbSunnyIcon
            sx={{
              transform: "scale(2)",
              paddingRight: "0.5rem",
            }}
            htmlColor="var(--primary-800)"
          />
        </IconButton>
      )}
      {i18n.language === "en" ? (
        <FlagDiv className="nav-button">
          <FlagImg
            className="flag"
            src={japan}
            alt="Japan Flag"
            onClick={() => changeSiteLanguage("jp")}
          />
        </FlagDiv>
      ) : (
        <FlagDiv className="nav-button">
          <FlagImg
            className="flag"
            src={america}
            alt="America Flag"
            onClick={() => changeSiteLanguage("en")}
          />
        </FlagDiv>
      )}
    </FlagContainerDiv>
  );
};

const FlagContainerDiv = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FlagImg = styled.img`
  width: 3rem;
  height: 2rem;
  cursor: pointer;
  border: 1px solid var(--primary-800);
`;

const FlagDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  height: 100%;
`;

export default FlagContainer;
