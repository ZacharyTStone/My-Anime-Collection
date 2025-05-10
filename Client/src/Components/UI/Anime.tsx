import { useState } from "react";
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

import { BsReverseLayoutTextWindowReverse } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import ReactPlayer from "react-player";
import { SkeletonLoadingBlock } from ".";

import pokeball from "../../assets/images/pokeball.png";
import { useMobile } from "../../utils/hooks";
import { ExpectedFetchedAnimeResponse, SavedAnime } from "../../utils/types";

interface animeCardProps extends SavedAnime {
  fetchedAnime: ExpectedFetchedAnimeResponse;
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
  fetchedAnime,
  type,
  japanese_title,
  youtubeVideoId,
}: animeCardProps) {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [failedToLoadYoutube, setFailedToLoadYoutube] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const {
    createAnime,
    deleteAnime,
    siteLanguage,
    currentPlaylist,
    isLoading,

    loadingData,
  } = useAppContext();

  const handleSubmit = () => {
    if (isLoading) return;
    createAnime(fetchedAnime, currentPlaylist.id);
  };

  const onVideoError = () => {
    setFailedToLoadYoutube(true);
  };

  const hasYoutubeVideoId = youtubeVideoId;

  const onMobile = useMobile();

  if (
    isLoading &&
    (loadingData?.anime_id === _id ||
      loadingData?.anime_id === fetchedAnime?.id)
  ) {
    return (
      <Wrapper>
        <SkeletonLoadingBlock
          height={onMobile ? 300 : 600}
          width={300}
          borderRadius={8}
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper
      key={_id || fetchedAnime?.id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card
        variant="outlined"
        sx={{
          height: "100%",
          width: 300,
          color: "var(--textColor)",
          backgroundColor: "var(--white)",
          marginBottom: "1.5rem",
          borderRadius: "10px",
          border: "1px solid var(--grey-200)",
          boxShadow: "var(--shadow)",

          // get bigger on hover
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "var(--shadow-md)",
            borderColor: "var(--primary-300)",
          },
        }}
      >
        <React.Fragment>
          <CardContent
            sx={{
              backgroundColor: "var(--white)",
              marginBottom: "0px",
              paddingBottom: "0px",
            }}
          >
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                color: "var(--textColor)",
                backgroundColor: "var(--white)",
                minHeight: "75px",
                textAlign: "center",
              }}
              color="var(--textColor)"
              gutterBottom
            >
              {siteLanguage === "en" ? title : japanese_title}
            </Typography>
            <div className="info-container">
              <ImageDiv onMobile={onMobile}>
                {!!onMobile ? (
                  <CardMedia
                    component="img"
                    className="anime-cover-image"
                    image={coverImage}
                    title={title}
                    sx={{
                      transition: "all 0.3s ease",
                      "&:hover": {
                        scale: "1.02",
                      },
                    }}
                  />
                ) : isHovering ? (
                  <>
                    {hasYoutubeVideoId && !failedToLoadYoutube ? (
                      <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${
                          youtubeVideoId ||
                          fetchedAnime?.attributes?.youtubeVideoId
                        }`}
                        width={"100%"}
                        controls={true}
                        className={"anime-cover-image"}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        fallback={
                          <CardMedia
                            component="img"
                            className="anime-cover-image"
                            image={
                              coverImage ||
                              fetchedAnime?.attributes?.posterImage?.medium ||
                              fetchedAnime?.attributes?.posterImage?.small
                            }
                            title={title}
                            sx={{
                              transition: "all 0.3s ease",
                              "&:hover": {
                                scale: "1.02",
                              },
                            }}
                          />
                        }
                        onError={onVideoError}
                      />
                    ) : (
                      <CardMedia
                        component="img"
                        className="anime-cover-image"
                        image={
                          coverImage ||
                          fetchedAnime?.attributes?.posterImage?.medium ||
                          fetchedAnime?.attributes?.posterImage?.small
                        }
                        title={title}
                        sx={{
                          transition: "all 0.3s ease",
                          "&:hover": {
                            scale: "1.02",
                          },
                        }}
                      />
                    )}
                  </>
                ) : (
                  <CardMedia
                    component="img"
                    className="anime-cover-image"
                    image={
                      coverImage ||
                      fetchedAnime?.attributes?.posterImage?.medium ||
                      fetchedAnime?.attributes?.posterImage?.small
                    }
                    title={title}
                    sx={{
                      transition: "all 0.3s ease",
                      "&:hover": {
                        scale: "1.02",
                      },
                    }}
                  />
                )}
              </ImageDiv>
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
                  {creationDate?.slice(0, 4)}
                </Button>
                <Button
                  sx={{
                    color: "var(--textColor)",
                  }}
                >
                  <span>{episodeCount ?? "N/A"}</span>
                  <span style={{ marginLeft: "5px" }}>
                    {t("anime.episode")}
                  </span>
                </Button>
                {hasYoutubeVideoId ? (
                  <Button
                    sx={{
                      color: "var(--textColor)",
                    }}
                  >
                    <a
                      href={`https://www.youtube.com/watch?v=${
                        youtubeVideoId ||
                        fetchedAnime?.attributes?.youtubeVideoId
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
              backgroundColor: "var(--white)",
            }}
          >
            <Button
              size="small"
              className="card-btn"
              onClick={handleModalOpen}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <BsReverseLayoutTextWindowReverse
                size={20}
                style={{
                  color: "var(--primary-500)",
                }}
              />
            </Button>
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
                disabled={isLoading}
                onClick={handleSubmit}
              >
                {t("anime.add")}
              </Button>
            )}
          </CardActions>
          <Collapse in={false} timeout="auto" unmountOnExit>
            <CardContent
              sx={{
                backgroundColor: "var(--white)",
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "var(--textColor)",
                  backgroundColor: "var(--white)",
                }}
                color="var(--textColor)"
                gutterBottom
              >
                <Button
                  sx={{
                    color: "var(--textColor)",
                  }}
                  onClick={handleModalOpen}
                >
                  {t("anime.showSynopsis")}
                </Button>
              </Typography>
            </CardContent>
          </Collapse>
        </React.Fragment>
      </Card>
      {modalOpen && (
        <Modal onClose={handleModalClose} onClick={handleModalClose}>
          <ModalContent>
            <Typography variant="h5" gutterBottom>
              {siteLanguage === "en" ? title : japanese_title}
            </Typography>
            <Typography variant="body1">{synopsis}</Typography>
          </ModalContent>
        </Modal>
      )}
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

  .anime-cover-image {
    width: "100%";
    cursor: url(${pokeball}) 4 4, pointer !important;
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

const ImageDiv = styled.div<{ onMobile?: boolean }>`
  min-height: ${(props) => (props.onMobile ? "168px" : "378px")};
`;

// Modal styles
const Modal = styled.div<{ onClose: () => void }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: var(--white);
  padding: 2rem;
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-lg);
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  border: 1px solid var(--grey-200);

  h5 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--grey-900);
    font-weight: 600;
    border-bottom: 1px solid var(--grey-200);
    padding-bottom: 0.75rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--grey-700);
  }
`;

export default Anime;
