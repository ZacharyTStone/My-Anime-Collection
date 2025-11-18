import { useState, useCallback, useMemo } from "react";
import { useAnimeContext } from "../../context/AnimeContext";
import { usePlaylistContext } from "../../context/PlaylistContext";
import { useLanguageContext } from "../../context/LanguageContext";

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

// Types and Interfaces
interface AnimeCardProps extends SavedAnime {
  fetchedAnime?: ExpectedFetchedAnimeResponse;
  type?: "add" | "delete";
  className?: string;
}

interface AnimeCardState {
  modalOpen: boolean;
  isHovering: boolean;
  failedToLoadYoutube: boolean;
}

// Constants
const SKELETON_HEIGHT_MOBILE = 300;
const SKELETON_HEIGHT_DESKTOP = 600;
const SKELETON_WIDTH = 300;
const SKELETON_BORDER_RADIUS = 8;

/**
 * Anime component that displays anime information in a card format
 */
const Anime: React.FC<AnimeCardProps> = ({
  _id,
  title,
  rating,
  episodeCount,
  format,
  creationDate,
  synopsis,
  coverImage,
  fetchedAnime,
  type = "add",
  japanese_title,
  youtubeVideoId,
  className,
}) => {
  const { t } = useTranslation();
  const [state, setState] = useState<AnimeCardState>({
    modalOpen: false,
    isHovering: false,
    failedToLoadYoutube: false,
  });

  const {
    createAnime,
    deleteAnime,
    isLoading,
    loadingData,
  } = useAnimeContext();

  const { currentPlaylist } = usePlaylistContext();
  const { siteLanguage } = useLanguageContext();

  const onMobile = useMobile();

  // Memoized values
  const isCurrentlyLoading = useMemo(
    () =>
      isLoading &&
      (loadingData?.anime_id === _id ||
        (fetchedAnime && loadingData?.anime_id === fetchedAnime.id)),
    [isLoading, loadingData?.anime_id, _id, fetchedAnime]
  );

  const hasYoutubeVideoId = useMemo(
    () => Boolean(youtubeVideoId || fetchedAnime?.attributes?.youtubeVideoId),
    [youtubeVideoId, fetchedAnime?.attributes?.youtubeVideoId]
  );

  const skeletonHeight = useMemo(
    () => (onMobile ? SKELETON_HEIGHT_MOBILE : SKELETON_HEIGHT_DESKTOP),
    [onMobile]
  );

  // Callbacks
  const handleMouseEnter = useCallback(() => {
    setState((prev) => ({ ...prev, isHovering: true }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setState((prev) => ({ ...prev, isHovering: false }));
  }, []);

  const handleModalOpen = useCallback(() => {
    setState((prev) => ({ ...prev, modalOpen: true }));
  }, []);

  const handleModalClose = useCallback(() => {
    setState((prev) => ({ ...prev, modalOpen: false }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (isLoading) return;

    if (type === "add" && fetchedAnime) {
      // Transform Kitsu API data to AnimeData format
      const animeData = {
        title: fetchedAnime.attributes?.titles?.en ||
          fetchedAnime.attributes?.titles?.en_jp ||
          "Title N/A",
        rating: fetchedAnime.attributes?.averageRating,
        episodeCount: fetchedAnime.attributes?.episodeCount,
        format: fetchedAnime.attributes?.subtype,
        creationDate: fetchedAnime.attributes?.startDate,
        synopsis: fetchedAnime.attributes?.synopsis,
        coverImage: fetchedAnime.attributes?.posterImage?.small,
        youtubeVideoId: fetchedAnime.attributes?.youtubeVideoId,
        japanese_title: fetchedAnime.attributes?.titles?.ja_jp ||
          fetchedAnime.attributes?.titles?.en_jp ||
          "Title N/A",
        playlistID: currentPlaylist.id,
      };
      createAnime(animeData, currentPlaylist.id);
    } else if (type === "delete") {
      if (_id) {
        deleteAnime(_id, currentPlaylist.id);
      }
    }
  }, [
    isLoading,
    type,
    createAnime,
    fetchedAnime,
    currentPlaylist.id,
    deleteAnime,
    _id,
  ]);

  const onVideoError = useCallback(() => {
    setState((prev) => ({ ...prev, failedToLoadYoutube: true }));
  }, []);

  // Render loading skeleton
  if (isCurrentlyLoading) {
    return (
      <Wrapper className={className}>
        <SkeletonLoadingBlock
          height={skeletonHeight}
          width={SKELETON_WIDTH}
          borderRadius={SKELETON_BORDER_RADIUS}
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
          borderRadius: "var(--borderRadius)",
          border: "1px solid var(--card-border-light)",
          boxShadow: "var(--shadow)",
          overflow: "hidden",
          position: "relative",

          // improved hover effect
          transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "var(--shadow-lg)",
            borderColor: "var(--card-border-hover)",
          },
        }}
      >
        <React.Fragment>
          <CardContent
            sx={{
              backgroundColor: "var(--white)",
              margin: 0,
              padding: "var(--spacing-md)",
              paddingBottom: "var(--spacing-sm)",
              "&:last-child": {
                paddingBottom: "var(--spacing-sm)",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "var(--grey-800)",
                backgroundColor: "var(--white)",
                minHeight: "60px",
                textAlign: "center",
                letterSpacing: "-0.01em",
                lineHeight: 1.4,
                marginBottom: "var(--spacing-md)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
                      transition: "all 0.4s ease",
                      borderRadius: "var(--spacing-xs)",
                      boxShadow: "var(--shadow-sm)",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  />
                ) : state.isHovering ? (
                  <>
                    {hasYoutubeVideoId && !state.failedToLoadYoutube ? (
                      <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${youtubeVideoId ||
                          fetchedAnime?.attributes?.youtubeVideoId
                          }`}
                        width={"100%"}
                        controls={true}
                        className={"anime-cover-image"}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "var(--spacing-xs)",
                          overflow: "hidden",
                          boxShadow: "var(--shadow-md)",
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
                              transition: "all 0.4s ease",
                              borderRadius: "var(--spacing-xs)",
                              boxShadow: "var(--shadow-sm)",
                              "&:hover": {
                                transform: "scale(1.02)",
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
                          transition: "all 0.4s ease",
                          borderRadius: "var(--spacing-xs)",
                          boxShadow: "var(--shadow-sm)",
                          "&:hover": {
                            transform: "scale(1.02)",
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
                      transition: "all 0.4s ease",
                      borderRadius: "var(--spacing-xs)",
                      boxShadow: "var(--shadow-sm)",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  />
                )}
              </ImageDiv>
              <Typography
                sx={{
                  mb: 1.5,
                  color: "var(--grey-700)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "var(--spacing-xs)",
                  margin: "var(--spacing-sm) 0 0",
                  flexWrap: "wrap",
                  "& .MuiButton-root": {
                    minWidth: "auto",
                    padding: "4px 8px",
                  },
                }}
                color="var(--textColor)"
              >
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
                      href={`https://www.youtube.com/watch?v=${youtubeVideoId ||
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
              padding: "var(--spacing-md)",
              justifyContent: "center",
              borderTop: "1px solid var(--grey-100)",
              backgroundColor: "var(--grey-50)",
              gap: "var(--spacing-md)",
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
                onClick={() => {
                  if (_id) deleteAnime(_id, currentPlaylist.id);
                }}
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
      {state.modalOpen && (
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
};

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
