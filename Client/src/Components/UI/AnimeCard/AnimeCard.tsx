import { useState, useRef } from "react";
import { useAnimeSelector, usePlaylistSelector } from "../../../stores/hooks";
import { useLanguageSelector } from "../../../stores/hooks";

import { BsReverseLayoutTextWindowReverse, BsStars } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import ReactPlayer from "react-player";
import { SkeletonLoadingBlock } from "..";

import { useMobile } from "../../../utils/hooks";
import { ExpectedFetchedAnimeResponse, SavedAnime, AiRecommendation } from "../../../utils/types";
import { cn } from "../../../utils/cn";

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
  const siteLanguage = useLanguageSelector((s) => s.siteLanguage);

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

  const imgClasses = "anime-cover-image w-full transition-all duration-400 rounded-[var(--spacing-xs)] shadow-sm hover:scale-[1.02]";

  const renderMedia = () => {
    if (onMobile) {
      return (
        <img
          className={imgClasses}
          src={coverImage}
          alt={title}
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
            <img
              className={imgClasses}
              src={imageSrc}
              alt={title}
            />
          }
          onError={onVideoError}
        />
      );
    }

    return (
      <img
        className={imgClasses}
        src={imageSrc}
        alt={title}
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
      <article
        className={cn(
          "h-full w-full sm:w-[300px] text-[var(--textColor)] mb-6 overflow-hidden relative",
          "rounded-[calc(var(--borderRadius)*1.5)] border-2 border-[var(--primary-alpha-20)]",
          "transition-all duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)]",
          "before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full",
          "before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] before:transition-[left] before:duration-500",
          "hover:-translate-y-2 hover:scale-[1.02] hover:border-[var(--primary-500)]",
          "hover:before:left-full"
        )}
        style={{
          background: "linear-gradient(135deg, var(--white) 0%, var(--primary-50) 100%)",
          boxShadow: "var(--shadow-anime)",
        }}
      >
        {/* CardContent */}
        <div className="bg-[var(--white)] m-0 p-[var(--spacing-md)] pb-[var(--spacing-sm)]">
          <p className="text-lg font-semibold text-[var(--textColor)] bg-[var(--white)] min-h-[60px] text-center tracking-tight leading-snug mb-[var(--spacing-md)] flex items-center justify-center">
            {siteLanguage === "en" ? title : japanese_title}
          </p>
          <div className="info-container">
            <ImageDiv $onMobile={onMobile}>
              {renderMedia()}
            </ImageDiv>
            <div className="mb-1.5 text-[var(--textColor)] text-sm font-medium flex items-center justify-center gap-[var(--spacing-xs)] mt-[var(--spacing-sm)] flex-wrap">
              <span className="text-[var(--textColor)] px-2 py-1">
                {rating}
                <span className="text-[var(--grey-500)]">/100</span>
              </span>
              <span className="text-[var(--textColor)] px-2 py-1">
                {format}
              </span>
              <span className="text-[var(--textColor)] px-2 py-1">
                {creationDate?.slice(0, 4)}
              </span>
              <span className="text-[var(--textColor)] px-2 py-1">
                <span>{episodeCount ?? "N/A"}</span>
                <span className="ml-[5px]">
                  {t("anime.episode")}
                </span>
              </span>
              {hasYoutubeVideoId ? (
                <span className="text-[var(--textColor)] px-2 py-1">
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
                </span>
              ) : null}
            </div>
          </div>
        </div>
        {/* CardActions */}
        <div className="p-[var(--spacing-md)] flex justify-center border-t border-[var(--grey-100)] bg-[var(--grey-50)] gap-[var(--spacing-md)]">
          <button
            type="button"
            className="card-btn flex items-center gap-2 bg-transparent border-none cursor-pointer p-2"
            onClick={handleModalOpen}
            aria-label={t("anime.showSynopsis")}
          >
            <BsReverseLayoutTextWindowReverse
              size={20}
              style={{ color: "var(--primary-500)" }}
            />
          </button>
          <button
            type="button"
            className="card-btn flex items-center gap-2 bg-transparent border-none cursor-pointer p-2"
            onClick={handleAiModalOpen}
            aria-label={t("anime.ai_suggestions")}
          >
            <ShimmerIcon>
              <BsStars size={20} />
            </ShimmerIcon>
          </button>
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
            <button
              type="button"
              className="card-btn add bg-transparent border-none cursor-pointer p-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
              onClick={handleSubmit}
              aria-label={`${t("anime.add")} ${title}`}
            >
              {t("anime.add")}
            </button>
          )}
        </div>
      </article>
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
