import { useAppContext } from "../context/appContext";
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

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
}));

function Anime({
  _id,
  id,
  title,
  rating,
  episodeCount,
  format,
  creationDate,
  synopsis,
  coverImage,
  anime,
  type,
  youtubeVideoId,
  ageRating,
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = () => {
    console.log("submit");
    createAnime(anime);
  };

  const { createAnime, deleteAnime } = useAppContext();
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
              }}
              color="var(--textColor)"
              gutterBottom
            >
              {title ||
                anime.attributes.titles.en ||
                anime.attributes.titles.en_jp ||
                "Title N/A"}
            </Typography>
            <CardMedia
              component="img"
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
                  : anime.attributes.createdAt.slice(0, 4)}
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
                <span style={{ marginLeft: "5px" }}>episodes</span>
              </Button>

              <Button
                sx={{
                  color: "var(--textColor)",
                }}
              >
                {ageRating || anime.attributes.ageRating || "Rating N/A"}
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
                Synopsis
              </span>
            </ExpandMore>
            {type === "delete" ? (
              <button
                type="button"
                className="btn delete-btn"
                onClick={() => deleteAnime(_id)}
              >
                Delete
              </button>
            ) : (
              <Button
                size="small"
                className="card-btn add"
                onClick={handleSubmit}
              >
                Add to Collection
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
    /* justify-content: space-between; */
  }

  p {
    word-break: break-all;
    white-space: normal;
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

  .info {
    h5 {
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
    }
  }
  .pending {
    background: var(--yellow-light);
    color: var(--yellow);
  }
  .interview {
    background: #e0e8f9;
    color: #647acb;
  }
  .declined {
    color: #d66a6a;
    background: #ffeeee;
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    /* display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    } */
  }

  footer {
    margin-top: 1rem;
  }
  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
  }

  .delete-btn {
    margin-right: 10px;
    margin-top: 0px;
    margin-left: 0px;
    color: var(--red-dark);
    background: var(--red-light);
    align-self: center;
    margin-bottom: "1rem";
  }
  &:hover .actions {
    visibility: visible;
  }
`;

export default Anime;
