import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import styled from "styled-components";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
}));

export default function AnimeCard({ anime }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Wrapper>
      <Box
        sx={{
          minWidth: 275,
          width: 400,
          color: "var(--textColor)",
          backgroundColor: "var(--backgroundColor)",
          marginBottom: "1rem",
        }}
      >
        <Card
          variant="outlined"
          sx={{
            backgroundColor: "var(--backgroundColor)",
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
                {anime.attributes.titles.en || anime.attributes.titles.en_jp}
              </Typography>
              <CardMedia
                component="img"
                height={340}
                imagePosition="center"
                image={anime.attributes.posterImage.small}
                title={
                  anime.attributes.titles.en || anime.attributes.titles.en_jp
                }
              />
              <Typography sx={{ mb: 1.5 }} color="var(--textColor)">
                <Button
                  sx={{
                    color: "var(--textColor)",
                  }}
                >
                  {anime.attributes.averageRating}
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
                  {" "}
                  {anime.attributes.showType}
                </Button>
                <Button
                  sx={{
                    color: "var(--textColor)",
                  }}
                >
                  {anime.attributes.createdAt.slice(0, 10)}
                </Button>
                <Button
                  sx={{
                    color: "var(--textColor)",
                  }}
                >
                  {anime.attributes.episodeCount} Episodes
                </Button>
              </Typography>
              <Typography
                sx={{ mb: 1.5 }}
                color="var(--textColor)"
              ></Typography>
            </CardContent>
            <CardActions
              sx={{
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
              </ExpandMore>
              <Button
                size="small"
                className="card-btn add"
                // onClick={handleSubmit}
              >
                Add to Collection
              </Button>
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
                  {anime.attributes.synopsis}
                </Typography>
              </CardContent>
            </Collapse>
          </React.Fragment>
        </Card>
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  .card-btn {
    margin: 10px;
    background-color: var(--primary-500);
    color: var(--textColor);
  }
  .card-btn:hover {
    transform: scale(1.1);
    background-color: var(--primary-500);
  }
`;
