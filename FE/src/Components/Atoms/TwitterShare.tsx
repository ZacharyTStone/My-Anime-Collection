import React from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/appContext";
import { FaTwitter } from "react-icons/fa";

const TwitterShare: React.FC = () => {
  const { t } = useTranslation();
  const { animes } = useAppContext();

  const twitterUrl = React.useMemo(() => {
    let url =
      "https://twitter.com/intent/tweet?text= Check out my awesome list of anime!&hashtags=anime&url=https://www.my-anime-collection.com/";

    for (let i = 0; i < animes.length; i++) {
      url += `${i + 1}: ${animes[i].title} \n \n \t `;
    }

    return url;
  }, [animes]);

  const openTwitterUrl = () => {
    window.open(twitterUrl, "_blank");
  };

  return (
    <div
      style={{
        display: "flex",
        margin: "0 auto",
        justifyContent: "center",
        position: "relative",
        bottom: "0",
        right: "0",
        width: "100%",
      }}
    >
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
        <button className="btn btn-hipster" onClick={openTwitterUrl}>
          <span style={{ marginRight: "10px" }}>{t("twitter.share")}</span>
          <FaTwitter />
        </button>
      </a>
    </div>
  );
};

export default TwitterShare;
