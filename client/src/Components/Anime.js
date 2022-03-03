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
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { deleteAnime } = useAppContext();
  return (
    <Wrapper>
      <Card
        variant="outlined"
        sx={{
          minWidth: 275,
          width: 400,
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
              {title}
            </Typography>
            <CardMedia
              component="img"
              height={340}
              image={coverImage}
              title={title}
            />
            <Typography sx={{ mb: 1.5 }} color="var(--textColor)">
              <Button
                sx={{
                  color: "var(--textColor)",
                }}
              >
                {rating}
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
                {format}
              </Button>
              <Button
                sx={{
                  color: "var(--textColor)",
                }}
              >
                {creationDate.slice(0, 4)}
              </Button>
              <Button
                sx={{
                  color: "var(--textColor)",
                }}
              >
                {episodeCount} Episodes
              </Button>
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
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteAnime(_id)}
            >
              Delete
            </button>
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
                {synopsis ? synopsis : "No synopsis available"}
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
