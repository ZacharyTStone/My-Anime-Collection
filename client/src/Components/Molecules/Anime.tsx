import { useAppContext } from "../../context/appContext";
import styled from "styled-components";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FaYoutube } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(() => ({
  marginLeft: "auto",
}));

interface anime {
  attributes: {
    titles: {
      en: string;
      en_jp: string;
      ja_jp: string;
    };
    posterImage: {
      medium: string;
      small: string;
    };
    synopsis: string;
    coverImage: string;
    averageRating: number;
    subtype: string;
    startDate: string;
    youtubeVideoId: string;
    episodeCount: number;
    format: string;
    rating: number;
    creationDate: string;
    type: string;
  };
  id: string;
  type: string;
}

interface animeProps {
  anime: anime;
  _id: string;
  title: string;
  rating: number;
  episodeCount: number;
  format: string;
  creationDate: string;
  synopsis: string;
  coverImage: string;
  description: string;
  youtube: string;
  type: string;
  japanese_title: string;
  youtubeVideoId: string;
}

function Anime({
  _id,
  title,
  rating,
  episodeCount,
  format,
  creationDate,
  synopsis,
  coverImage,
  anime,
  type,
  japanese_title,
  youtubeVideoId,
}: animeProps) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = () => {
    if (isLoading) return;
    createAnime(anime, currentPlaylist.id, currentPlaylist.title);
    if (addToDefault) {
      if (currentPlaylist.id !== "0" || currentPlaylist.title !== "default") {
        createAnime(anime, "0", "default");
      }
    }
  };

  const {
    createAnime,
    deleteAnime,
    siteLanguage,
    currentPlaylist,
    addToDefault,
    isLoading,
  } = useAppContext();
  return (
    <Wrapper>
      <Card
        variant="outlined"
        sx={{
          height: "100%",
          width: 300,
          color: "var(--textColor)",
          backgroundColor: "var(--backgroundColor)",
          marginBottom: "1rem",
        }}
      >
        <React.Fragment>
          <CardContent
            sx={{
              backgroundColor: "var(--backgroundColor)",
              marginBottom: "0px",
              paddingBottom: "0px",
            }}
          >
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                color: "var(--textColor)",
                backgroundColor: "var(--backgroundColor)",
                minHeight: "75px",
                textAlign: "center",
              }}
              color="var(--textColor)"
              gutterBottom
            >
              {siteLanguage === "en"
                ? title ||
                  anime.attributes.titles.en ||
                  anime.attributes.titles.en_jp ||
                  "Title N/A"
                : japanese_title ||
                  anime.attributes.titles.ja_jp ||
                  anime.attributes.titles.en ||
                  "Title N/A"}
            </Typography>
            <div className="info-container">
              <CardMedia
                component="img"
                className="anime-cover-image"
                height="300"
                image={coverImage || anime.attributes.posterImage.small}
                title={
                  title ||
                  anime.attributes.titles.en ||
                  anime.attributes.titles.en_jp ||
                  "Title N/A"
                }
              />
              <Typography sx={{ mb: 1.5 }} color="var(--textColor)">
                <Button
                  sx={{
                    color: "var(--textColor)",
                  }}
                >
                  {rating === 9001
                    ? "N/A"
                    : rating || anime.attributes.averageRating || "N/A"}
                  <span
                    style={{
                      color: "var(--grey-500)",
                    }}
                  >
                    /100
                  </span>
                </Button>
                <Button
                  sx={{
                    color: "var(--textColor)",
                  }}
                >
                  {format ? format : anime.attributes.subtype || "N/A"}
                </Button>
                <Button
                  sx={{
                    color: "var(--textColor)",
                  }}
                >
                  {creationDate
                    ? creationDate.slice(0, 4)
                    : anime.attributes.startDate
                    ? anime.attributes.startDate.slice(0, 4)
                    : "N/A"}
                </Button>
                <Button
                  sx={{
                    color: "var(--textColor)",
                  }}
                >
                  <span>
                    {episodeCount === 9001
                      ? "N/A"
                      : episodeCount || anime.attributes.episodeCount || "N/A"}
                  </span>
                  <span style={{ marginLeft: "5px" }}>
                    {t("anime.episode")}
                  </span>
                </Button>
                {youtubeVideoId || anime.attributes.youtubeVideoId ? (
                  <Button
                    sx={{
                      color: "var(--textColor)",
                    }}
                  >
                    <a
                      href={`https://www.youtube.com/watch?v=${
                        youtubeVideoId || anime.attributes.youtubeVideoId
                      }`}
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      {" "}
                      <FaYoutube color="red" size={30} />{" "}
                    </a>
                  </Button>
                ) : null}
              </Typography>
            </div>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              backgroundColor: "var(--backgroundColor)",
            }}
          >
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon
                style={{
                  color: "var(--textColor)",
                }}
              />
              <span
                style={{
                  color: "var(--textColor)",
                  fontSize: "1rem",
                }}
              >
                {t("anime.synopsis")}
              </span>
            </ExpandMore>
            {type === "delete" ? (
              <button
                type="button"
                className="btn delete-btn"
                onClick={() => deleteAnime(_id)}
              >
                {t("anime.delete")}
              </button>
            ) : (
              <Button
                size="small"
                className="card-btn add"
                onClick={handleSubmit}
              >
                {t("anime.add")}
              </Button>
            )}
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent
              sx={{
                backgroundColor: "var(--backgroundColor)",
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "var(--textColor)",
                  backgroundColor: "var(--backgroundColor)",
                }}
                color="var(--textColor)"
                gutterBottom
              >
                {synopsis
                  ? synopsis
                  : anime.attributes.synopsis
                  ? anime.attributes.synopsis.replace(/<[^>]*>?/gm, "")
                  : "No synopsis available"}
              </Typography>
            </CardContent>
          </Collapse>
        </React.Fragment>
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .anime {
    padding: 2rem;
    display: flex;
    flex-direction: column;
  }

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }

  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
    margin: 10px 10px 10px 10px;
    color: var(--red-dark);
    background: var(--red-light);
    align-self: center;
  }

  @media (max-width: 1000px) {
    flex-direction: row;
    .anime-cover-image {
      height: 100px;
      width: 100px;
    }
    .info-container {
      display: flex;
      flex-direction: row;
    }
  }
`;

export default Anime;
