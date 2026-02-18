import { useState, useRef } from "react";
import { useAnimeSelector, usePlaylistSelector } from "../../../stores/hooks";
import { useAtomValue } from "jotai";
import { siteLanguageAtom } from "../../../atoms/languageAtom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";

import { BsReverseLayoutTextWindowReverse, BsStars } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import ReactPlayer from "react-player";
import { SkeletonLoadingBlock } from "..";

import { useMobile } from "../../../utils/hooks";
import { ExpectedFetchedAnimeResponse, SavedAnime, AiRecommendation } from "../../../utils/types";

import { Wrapper, ImageDiv, ShimmerIcon } from "./AnimeCard.styles";
import SynopsisModal from "./SynopsisModal";
import AiRecommendationsModal from "./AiRecommendationsModal";

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

interface AiState {
  open: boolean;
  loading: boolean;
  results: AiRecommendation[];
  error: boolean;
}

const SKELETON_HEIGHT_MOBILE = 300;
const SKELETON_HEIGHT_DESKTOP = 600;
const SKELETON_WIDTH = 300;
const SKELETON_BORDER_RADIUS = 8;

const cardMediaStyles = {
  transition: "all 0.4s ease",
  borderRadius: "var(--spacing-xs)",
  boxShadow: "var(--shadow-sm)",
  "&:hover": {
    transform: "scale(1.02)",
  },
};

const Anime = ({
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
}: AnimeCardProps) => {
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
    getAiRecommendations,
  } = useAnimeSelector((s) => ({
    createAnime: s.createAnime,
    deleteAnime: s.deleteAnime,
    isLoading: s.isLoading,
    loadingData: s.loadingData,
    getAiRecommendations: s.getAiRecommendations,
  }));

  const { currentPlaylist } = usePlaylistSelector((s) => ({
    currentPlaylist: s.currentPlaylist,
  }));
  const siteLanguage = useAtomValue(siteLanguageAtom);

  const onMobile = useMobile();

  const [aiState, setAiState] = useState<AiState>({
    open: false,
    loading: false,
    results: [],
    error: false,
  });
  const aiCacheRef = useRef<AiRecommendation[] | null>(null);

  const isCurrentlyLoading =
    isLoading &&
    (loadingData?.anime_id === _id ||
      loadingData?.anime_id === fetchedAnime?.id);

  const hasYoutubeVideoId = Boolean(youtubeVideoId);

  const skeletonHeight = onMobile ? SKELETON_HEIGHT_MOBILE : SKELETON_HEIGHT_DESKTOP;

  const handleMouseEnter = () => {
    setState((prev) => ({ ...prev, isHovering: true }));
  };

  const handleMouseLeave = () => {
    setState((prev) => ({ ...prev, isHovering: false }));
  };

  const handleModalOpen = () => {
    setState((prev) => ({ ...prev, modalOpen: true }));
  };

  const handleModalClose = () => {
    setState((prev) => ({ ...prev, modalOpen: false }));
  };

  const handleSubmit = () => {
    if (isLoading) return;

    if (type === "add") {
      createAnime(fetchedAnime, currentPlaylist.id);
    } else if (type === "delete") {
      if (_id) {
        deleteAnime(_id, currentPlaylist.id);
      }
    }
  };

  const onVideoError = () => {
    setState((prev) => ({ ...prev, failedToLoadYoutube: true }));
  };

  const handleAiModalOpen = async () => {
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
      const recommendations = await getAiRecommendations(title || "", synopsis || "");
      aiCacheRef.current = recommendations;
      setAiState((prev) => ({
        ...prev,
        loading: false,
        results: recommendations,
      }));
    } catch {
      setAiState((prev) => ({ ...prev, loading: false, error: true }));
    }
  };

  const handleAiModalClose = () => {
    setAiState((prev) => ({ ...prev, open: false }));
  };

  const imageSrc = coverImage ||
    fetchedAnime?.attributes?.posterImage?.medium ||
    fetchedAnime?.attributes?.posterImage?.small;

  const renderMedia = () => {
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

    if (state.isHovering && hasYoutubeVideoId && !state.failedToLoadYoutube) {
      return (
        <ReactPlayer
          src={`https://www.youtube.com/watch?v=${youtubeVideoId || fetchedAnime?.attributes?.youtubeVideoId}`}
          width="100%"
          height="360px"
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

    return (
      <CardMedia
        component="img"
        className="anime-cover-image"
        image={imageSrc}
        title={title}
        sx={cardMediaStyles}
      />
    );
  };

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
          width: { xs: "100%", sm: 300 },
          color: "var(--textColor)",
          backgroundColor: "var(--white)",
          marginBottom: "1.5rem",
          borderRadius: "calc(var(--borderRadius) * 1.5)",
          border: "2px solid var(--primary-alpha-20)",
          boxShadow: "var(--shadow-anime)",
          overflow: "hidden",
          position: "relative",
          background: "linear-gradient(135deg, var(--white) 0%, var(--primary-50) 100%)",
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
              color: "var(--textColor)",
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
            gutterBottom
          >
            {siteLanguage === "en" ? title : japanese_title}
          </Typography>
          <div className="info-container">
            <ImageDiv $onMobile={onMobile}>
              {renderMedia()}
            </ImageDiv>
            <Typography
              sx={{
                mb: 1.5,
                color: "var(--textColor)",
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
            >
              <Button
                sx={{
                  color: "var(--textColor)",
                }}
              >
                {rating}
                <span className="text-[var(--grey-500)]">
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
                <span className="ml-[5px]">
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
            className="card-btn flex items-center gap-2"
            onClick={handleModalOpen}
            aria-label={t("anime.showSynopsis")}
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
            className="card-btn flex items-center gap-2"
            onClick={handleAiModalOpen}
            aria-label={t("anime.ai_suggestions")}
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
      </Card>
      {state.modalOpen && (
        <SynopsisModal
          title={title}
          japanese_title={japanese_title}
          synopsis={synopsis}
          onClose={handleModalClose}
        />
      )}
      {aiState.open && (
        <AiRecommendationsModal
          loading={aiState.loading}
          error={aiState.error}
          results={aiState.results}
          onClose={handleAiModalClose}
        />
      )}
    </Wrapper>
  );
};

export default Anime;
