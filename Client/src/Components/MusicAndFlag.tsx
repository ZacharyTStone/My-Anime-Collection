import america from "./../assets/images/america.webp";
import IconButton from "@mui/material/IconButton";
import japan from "./../assets/images/japan.webp";
import Box from "@mui/material/Box";
import { useAppContext } from "./../context/appContext";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

//icons
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ModeNightIcon from "@mui/icons-material/ModeNight";

const MusicAndFlag = () => {
  const { changeSiteLanguage, theme, changeTheme } = useAppContext();
  const { i18n } = useTranslation();

  return (
    <Wrapper>
      <Box className="full-flag-div flag-div-holder">
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
          <div className="flag-div nav-button">
            <img
              className="flag"
              src={japan}
              alt="Japan Flag"
              onClick={() => changeSiteLanguage("jp")}
            />
          </div>
        ) : (
          <div className="flag-div nav-button">
            <img
              className="flag"
              src={america}
              alt="America Flag"
              onClick={() => changeSiteLanguage("en")}
            />
          </div>
        )}
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .flag {
    width: 3rem;
    height: 2rem;
    cursor: pointer;
    margin-top: 0.5rem;
  }
`;

export default MusicAndFlag;
