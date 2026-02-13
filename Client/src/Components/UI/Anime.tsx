import React, { useState, useCallback, useMemo, useRef } from "react";
import axios from "axios";
import { useAnimeStore } from "../../stores/animeStore";
import { usePlaylistStore } from "../../stores/playlistStore";
import { useShallow } from "zustand/react/shallow";
import { useAtomValue } from "jotai";
import { siteLanguageAtom } from "../../atoms/languageAtom";

import styled, { keyframes } from "styled-components";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";

import { BsReverseLayoutTextWindowReverse, BsStars, BsXLg } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import ReactPlayer from "react-player";
import { SkeletonLoadingBlock } from ".";

import pokeball from "../../assets/images/pokeball.png";
import { useMobile } from "../../utils/hooks";
import { ExpectedFetchedAnimeResponse, SavedAnime } from "../../utils/types";

interface AiRecommendation {
  title: string;
  japanese_title: string;
  reason: string;
  reason_jp: string;
}

interface AiState {
  open: boolean;
  loading: boolean;
  results: AiRecommendation[];
  error: boolean;
}

// Types and Interfaces
interface AnimeCardProps extends SavedAnime {
  fetchedAnime: ExpectedFetchedAnimeResponse;
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

// Reusable CardMedia styles
const cardMediaStyles = {
  transition: "all 0.4s ease",
  borderRadius: "var(--spacing-xs)",
  boxShadow: "var(--shadow-sm)",
  "&:hover": {
    transform: "scale(1.02)",
  },
};

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
  } = useAnimeStore(
    useShallow((s) => ({
      createAnime: s.createAnime,
      deleteAnime: s.deleteAnime,
      isLoading: s.isLoading,
      loadingData: s.loadingData,
    }))
  );

  const currentPlaylist = usePlaylistStore((s) => s.currentPlaylist);
  const siteLanguage = useAtomValue(siteLanguageAtom);

  const onMobile = useMobile();

  const [aiState, setAiState] = useState<AiState>({
    open: false,
    loading: false,
    results: [],
    error: false,
  });
  const aiCacheRef = useRef<AiRecommendation[] | null>(null);

  // Memoized values
  const isCurrentlyLoading = useMemo(
    () =>
      isLoading &&
      (loadingData?.anime_id === _id ||
        loadingData?.anime_id === fetchedAnime?.id),
    [isLoading, loadingData?.anime_id, _id, fetchedAnime?.id]
  );

  const hasYoutubeVideoId = useMemo(
    () => Boolean(youtubeVideoId),
    [youtubeVideoId]
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

    if (type === "add") {
      createAnime(fetchedAnime, currentPlaylist.id);
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

  const handleAiModalOpen = useCallback(async () => {
    // Prevent duplicate requests while loading
    if (aiState.loading) {
      setAiState((prev) => ({ ...prev, open: true }));
      return;
    }

    setAiState((prev) => ({ ...prev, open: true, loading: true, error: false }));

    if (aiCacheRef.current) {
      setAiState((prev) => ({
        ...prev,
        loading: false,
        results: aiCacheRef.current!,
      }));
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "/api/v1/animes/recommendations",
        { title, synopsis },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      aiCacheRef.current = data.recommendations;
      setAiState((prev) => ({
        ...prev,
        loading: false,
        results: data.recommendations,
      }));
    } catch {
      setAiState((prev) => ({ ...prev, loading: false, error: true }));
    }
  }, [title, synopsis, aiState.loading]);

  const handleAiModalClose = useCallback(() => {
    setAiState((prev) => ({ ...prev, open: false }));
  }, []);

  // Helper to get the image source
  const imageSrc = coverImage ||
    fetchedAnime?.attributes?.posterImage?.medium ||
    fetchedAnime?.attributes?.posterImage?.small;

  // Helper to render media content (video or image)
  const renderMedia = useCallback(() => {
    // Mobile: always show static image
    if (onMobile) {
      return (
        <CardMedia
          component="img"
          className="anime-cover-image"
          image={coverImage}
          title={title}
          sx={cardMediaStyles}
        />
      );
    }

    // Desktop hovering with valid YouTube: show video player
    if (state.isHovering && hasYoutubeVideoId && !state.failedToLoadYoutube) {
      return (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${youtubeVideoId || fetchedAnime?.attributes?.youtubeVideoId}`}
          width="100%"
          controls
          className="anime-cover-image"
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
              image={imageSrc}
              title={title}
              sx={cardMediaStyles}
            />
          }
          onError={onVideoError}
        />
      );
    }

    // Default: show static image
    return (
      <CardMedia
        component="img"
        className="anime-cover-image"
        image={imageSrc}
        title={title}
        sx={cardMediaStyles}
      />
    );
  }, [onMobile, coverImage, title, state.isHovering, hasYoutubeVideoId, state.failedToLoadYoutube, youtubeVideoId, fetchedAnime?.attributes?.youtubeVideoId, imageSrc, onVideoError]);

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
          borderRadius: "calc(var(--borderRadius) * 1.5)",
          border: "2px solid var(--primary-alpha-20)",
          boxShadow: "var(--shadow-anime)",
          overflow: "hidden",
          position: "relative",
          background: "linear-gradient(135deg, var(--white) 0%, var(--primary-50) 100%)",

          // Anime-style hover effect
          transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
            transition: "left 0.5s",
          },
          "&:hover": {
            transform: "translateY(-8px) scale(1.02)",
            boxShadow: "var(--shadow-anime-hover)",
            borderColor: "var(--primary-500)",
            "&::before": {
              left: "100%",
            },
          },
        }}
      >
        <>
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
                {renderMedia()}
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
                      href={`https://www.youtube.com/watch?v=${
                        youtubeVideoId ||
                        fetchedAnime?.attributes?.youtubeVideoId
                      }`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Watch ${title} trailer on YouTube`}
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
              aria-label={t("anime.showSynopsis")}
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
            <Button
              size="small"
              className="card-btn"
              onClick={handleAiModalOpen}
              aria-label={t("anime.ai_suggestions")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <ShimmerIcon>
                <BsStars size={20} />
              </ShimmerIcon>
            </Button>
            {type === "delete" ? (
              <button
                type="button"
                className="btn delete-btn"
                aria-label={`${t("anime.delete")} ${title}`}
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
                aria-label={`${t("anime.add")} ${title}`}
              >
                {t("anime.add")}
              </Button>
            )}
          </CardActions>
        </>
      </Card>
      {state.modalOpen && (
        <Modal
          onClose={handleModalClose}
          onClick={handleModalClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Synopsis for ${title}`}
        >
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <Typography variant="h5" gutterBottom>
              {siteLanguage === "en" ? title : japanese_title}
            </Typography>
            <Typography variant="body1">{synopsis}</Typography>
          </ModalContent>
        </Modal>
      )}
      {aiState.open && (
        <AiModalOverlay
          onClose={handleAiModalClose}
          onClick={handleAiModalClose}
          role="dialog"
          aria-modal="true"
          aria-label={t("anime.ai_suggestions")}
        >
          <AiModalContent onClick={(e) => e.stopPropagation()}>
            <AiModalHeader>
              <AiModalTitle>
                <ShimmerIcon>
                  <BsStars size={20} />
                </ShimmerIcon>
                {t("anime.ai_suggestions")}
              </AiModalTitle>
              <AiCloseButton onClick={handleAiModalClose} aria-label="Close">
                <BsXLg />
              </AiCloseButton>
            </AiModalHeader>
            <AiModalBody>
              {aiState.loading && (
                <AiLoadingContainer>
                  <ShimmerIcon style={{ fontSize: "2rem" }}>
                    <BsStars size={36} />
                  </ShimmerIcon>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 2,
                      color: "var(--grey-400)",
                      fontStyle: "italic",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {t("anime.ai_loading")}
                  </Typography>
                </AiLoadingContainer>
              )}
              {aiState.error && (
                <AiErrorMessage>
                  {t("anime.ai_error")}
                </AiErrorMessage>
              )}
              {!aiState.loading && !aiState.error && aiState.results.length === 0 && (
                <Typography
                  variant="body2"
                  sx={{ textAlign: "center", py: 3, color: "var(--grey-400)" }}
                >
                  {t("anime.ai_no_results")}
                </Typography>
              )}
              {!aiState.loading && !aiState.error && aiState.results.length > 0 && (
                <AiRecommendationList>
                  {aiState.results.map((rec, i) => (
                    <AiRecommendationItem key={i}>
                      <AiRecNumber>{i + 1}</AiRecNumber>
                      <AiRecContent>
                        <AiRecTitle>
                          {siteLanguage === "en" ? rec.title : rec.japanese_title}
                        </AiRecTitle>
                        <AiRecSecondaryTitle>
                          {siteLanguage === "en" ? rec.japanese_title : rec.title}
                        </AiRecSecondaryTitle>
                        <AiRecReason>
                          <span>{t("anime.ai_reason")}:</span>{" "}
                          {siteLanguage === "en" ? rec.reason : (rec.reason_jp || rec.reason)}
                        </AiRecReason>
                      </AiRecContent>
                    </AiRecommendationItem>
                  ))}
                </AiRecommendationList>
              )}
            </AiModalBody>
          </AiModalContent>
        </AiModalOverlay>
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
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, var(--white) 0%, var(--primary-50) 100%);
  padding: 2rem;
  border-radius: calc(var(--borderRadius) * 1.5);
  box-shadow: var(--shadow-anime-lg);
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  border: 2px solid var(--primary-alpha-30);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-primary);
  }

  h5 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 600;
    border-bottom: 2px solid var(--primary-alpha-20);
    padding-bottom: 0.75rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--grey-700);
  }
`;

// AI shimmer animation
const shimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const aiGlow = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 4px rgba(196, 69, 105, 0.5))
            drop-shadow(0 0 8px rgba(78, 205, 196, 0.3));
  }
  33% {
    filter: drop-shadow(0 0 10px rgba(78, 205, 196, 0.7))
            drop-shadow(0 0 20px rgba(78, 205, 196, 0.3));
  }
  66% {
    filter: drop-shadow(0 0 10px rgba(255, 107, 157, 0.7))
            drop-shadow(0 0 20px rgba(196, 69, 105, 0.3));
  }
`;

const jiggle = keyframes`
  0%, 100% {
    transform: rotate(0deg) scale(1);
  }
  15% {
    transform: rotate(-8deg) scale(1.1);
  }
  30% {
    transform: rotate(6deg) scale(1.05);
  }
  45% {
    transform: rotate(-4deg) scale(1.1);
  }
  60% {
    transform: rotate(3deg) scale(1.05);
  }
  75% {
    transform: rotate(-1deg) scale(1.08);
  }
`;

const ShimmerIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    90deg,
    var(--anime-purple) 0%,
    var(--anime-pink) 20%,
    var(--anime-blue) 40%,
    var(--anime-pink) 60%,
    var(--anime-purple) 80%,
    var(--anime-blue) 100%
  );
  background-size: 300% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 2s linear infinite;

  svg {
    animation: ${aiGlow} 2s ease-in-out infinite, ${jiggle} 3s ease-in-out infinite;
  }
`;

const AiModalOverlay = styled.div<{ onClose: () => void }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  background: rgba(15, 20, 35, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
`;

const AiModalContent = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
  max-width: 520px;
  width: 92%;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      var(--anime-purple),
      var(--anime-blue),
      var(--anime-pink)
    );
    border-radius: 16px 16px 0 0;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--grey-200);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: var(--grey-300);
  }
`;

const AiModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.75rem;
  border-bottom: 1px solid var(--grey-100);
`;

const AiModalTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--anime-purple), var(--anime-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const AiCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.5px solid var(--grey-200);
  background: transparent;
  color: var(--grey-400);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--grey-100);
    border-color: var(--grey-300);
    color: var(--grey-700);
    transform: rotate(90deg);
  }

  &:active {
    transform: rotate(90deg) scale(0.92);
  }

  svg {
    width: 13px;
    height: 13px;
  }
`;

const AiModalBody = styled.div`
  padding: 1rem 1.75rem 1.75rem;
`;


const AiErrorMessage = styled.div`
  text-align: center;
  padding: 1.25rem;
  color: var(--red-dark);
  background: #fef2f2;
  border-radius: 10px;
  font-size: 0.875rem;
  border: 1px solid #fecaca;
`;

const AiLoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
`;

const AiRecommendationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const AiRecommendationItem = styled.div`
  display: flex;
  gap: 0.875rem;
  padding: 1rem 1.125rem;
  border-radius: 12px;
  background: #f9fafb;
  border: 1px solid #f3f4f6;
  transition: all 0.2s ease;

  &:hover {
    background: #ffffff;
    border-color: var(--primary-alpha-30);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
`;

const AiRecNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  min-width: 26px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--anime-purple), var(--anime-blue));
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  margin-top: 2px;
`;

const AiRecContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const AiRecTitle = styled.p`
  font-weight: 700;
  color: var(--grey-900);
  line-height: 1.3;
  font-size: 0.95rem;
  margin: 0 0 2px;
`;

const AiRecSecondaryTitle = styled.p`
  color: var(--grey-400);
  font-size: 0.75rem;
  font-style: italic;
  margin: 0 0 8px;
`;

const AiRecReason = styled.p`
  color: var(--grey-600);
  line-height: 1.55;
  font-size: 0.8125rem;
  margin: 0;

  span {
    color: var(--anime-purple);
    font-weight: 600;
  }
`;

export default Anime;
