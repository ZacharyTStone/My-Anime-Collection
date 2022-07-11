import { useTranslation } from "react-i18next";
import { useAppContext } from "../context/appContext";
import { FaTwitter } from "react-icons/fa";

const TwitterShare = () => {
  const { t } = useTranslation();
  const { animes } = useAppContext();

  let twitterUrl =
    "https://twitter.com/intent/tweet?text= Check out my awesome list of anime!&hashtags=anime&url=https://www.my-anime-collection.com/ ";

  for (let i = 0; i < animes.length; i++) {
    twitterUrl += `${i + 1}: ${animes[i].title} \n \n \t `;
  }

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
      <a href={twitterUrl} target="_blank">
        <button
          className="btn  btn-hipster"
          onClick={() => {
            window.open(twitterUrl, "_blank");
          }}
        >
          <span
            style={{
              marginRight: "10px",
            }}
          >
            {" "}
            {t("twitter.share")}
          </span>
          <FaTwitter />
        </button>
      </a>
    </div>
  );
};

export default TwitterShare;
