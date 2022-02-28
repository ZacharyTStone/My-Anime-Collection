import moment from "moment";
import { FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import JobInfo from "./JobInfo";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddJob from "../pages/Dashboard/AddJob";

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

function Job({
  id,
  title,
  rating,
  episodeCount,
  format,
  createdAt,
  synopsis,
  coverImage,
}) {
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
                {title}
              </Typography>
              <CardMedia
                component="img"
                height={340}
                imagePosition="center"
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
                  {createdAt.slice(0, 10)}
                </Button>
                <Button
                  sx={{
                    color: "var(--textColor)",
                  }}
                >
                  {episodeCount} Episodes
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
                  {synopsis}
                </Typography>
              </CardContent>
            </Collapse>
          </React.Fragment>
        </Card>
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);
  .job {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
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
    display: grid;
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
    }
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
  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }
  &:hover .actions {
    visibility: visible;
  }
`;

export default Job;
