import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/appContext";
import { FaTwitter } from "react-icons/fa";
import styled from "styled-components";
import { SavedAnime } from "../../utils/types";

const TwitterShare: React.FC = () => {
  const { t } = useTranslation();
  const { animes } = useAppContext();

  const generateTwitterUrl = useMemo(() => {
    const baseUrl =
      "https://twitter.com/intent/tweet?text= Check out my awesome list of anime!&hashtags=anime&url=https://www.my-anime-collection.com/";

    const animeList = animes
      .map((anime: SavedAnime, index: number) => `${index + 1}: ${anime.title}`)
      .join("\n \n \t ");

    return `${baseUrl}${animeList}`;
  }, [animes]);

  const openTwitterUrl = () => {
    window.open(generateTwitterUrl, "_blank");
  };

  return (
    <TwitterDiv>
      <a href={generateTwitterUrl} target="_blank" rel="noopener noreferrer">
        <button className="btn btn-outline" onClick={openTwitterUrl}>
          <span style={{ marginRight: "12px" }}>{t("twitter.share")}</span>
          <FaTwitter />
        </button>
      </a>
    </TwitterDiv>
  );
};

const TwitterDiv = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  position: relative;
  bottom: 0;
  right: 0;
  width: 100%;
`;

export default TwitterShare;
