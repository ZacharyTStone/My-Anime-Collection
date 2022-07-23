import america from "../../assets/images/america.webp";
import IconButton from "@mui/material/IconButton";
import japan from "../../assets/images/japan.webp";
import Box from "@mui/material/Box";
import { useAppContext } from "../../context/appContext";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

//icons
import { PlayCircle, PauseCircle } from "@mui/icons-material";

const MusicAndFlag = () => {
  const { changeSiteLanguage, playOrPauseAudio, isAudioPlaying } =
    useAppContext();
  const { i18n } = useTranslation();

  return (
    <Wrapper>
      {i18n.language === "en" ? (
        <Box className="full-flag-div flag-div-holder">
          <IconButton
            color="warning"
            size="medium"
            variant="contained"
            aria-label="play/ pause"
            onClick={(e) => playOrPauseAudio(e)}
          >
            {isAudioPlaying ? (
              <PauseCircle fontSize="large" />
            ) : (
              <PlayCircle fontSize="large" />
            )}
          </IconButton>
          <div className="flag-div nav-button">
            <img
              className="flag"
              src={japan}
              alt="Japan Flag"
              onClick={() => changeSiteLanguage("jp")}
            />
          </div>
        </Box>
      ) : (
        <Box className="full-flag-div flag-div-holder">
          <IconButton
            color="warning"
            size="medium"
            variant="contained"
            aria-label="play/ pause"
            onClick={(e) => playOrPauseAudio(e)}
          >
            {isAudioPlaying ? (
              <PauseCircle fontSize="large" />
            ) : (
              <PlayCircle fontSize="large" />
            )}
          </IconButton>
          <div className="flag-div nav-button">
            <div className="flag-div">
              <div className="">
                <img
                  className="flag"
                  src={america}
                  alt="America Flag"
                  onClick={() => changeSiteLanguage("en")}
                />
              </div>
            </div>
          </div>
        </Box>
      )}
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
