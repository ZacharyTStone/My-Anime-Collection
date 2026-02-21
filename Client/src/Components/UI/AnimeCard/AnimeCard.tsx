import { SkeletonLoadingBlock } from "..";
import { cn } from "../../../utils/cn";
import { SavedAnime } from "../../../utils/types";
import { useAnimeCard } from "./useAnimeCard";
import CardMedia from "./CardMedia";
import CardInfo from "./CardInfo";
import CardActions from "./CardActions";
import SynopsisModal from "./SynopsisModal";
import AiRecommendationsModal from "./AiRecommendationsModal";

interface AnimeCardProps extends SavedAnime {
  type?: "add" | "delete";
  className?: string;
}

const SKELETON_HEIGHT_MOBILE = 300;
const SKELETON_HEIGHT_DESKTOP = 600;
const SKELETON_WIDTH = 300;
const SKELETON_BORDER_RADIUS = 8;

const AnimeCard = ({
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
  const {
    state,
    aiState,
    onMobile,
    siteLanguage,
    isCurrentlyLoading,
    deleteAnime,
    currentPlaylist,
    handleMouseEnter,
    handleMouseLeave,
    handleModalOpen,
    handleModalClose,
    handleSubmit,
    handleAiModalOpen,
    handleAiModalClose,
    onVideoError,
  } = useAnimeCard({ _id, title, synopsis, fetchedAnime, type });

  const hasYoutubeVideoId = Boolean(youtubeVideoId);
  const skeletonHeight = onMobile ? SKELETON_HEIGHT_MOBILE : SKELETON_HEIGHT_DESKTOP;

  if (isCurrentlyLoading) {
    return (
      <article className={cn("anime-card-wrapper flex flex-col justify-center items-center max-[1000px]:flex-row", className)}>
        <SkeletonLoadingBlock height={skeletonHeight} width={SKELETON_WIDTH} borderRadius={SKELETON_BORDER_RADIUS} />
      </article>
    );
  }

  return (
    <article
      className="anime-card-wrapper flex flex-col justify-center items-center max-[1000px]:flex-row"
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
        <div className="bg-[var(--white)] m-0 p-[var(--spacing-md)] pb-[var(--spacing-sm)]">
          <p className="text-lg font-semibold text-[var(--textColor)] bg-[var(--white)] min-h-[60px] text-center tracking-tight leading-snug mb-[var(--spacing-md)] flex items-center justify-center">
            {siteLanguage === "en" ? title : japanese_title}
          </p>
          <div className="info-container">
            <div className={cn("flex justify-center items-center", !onMobile && "min-h-[378px]")}>
              <CardMedia
                onMobile={onMobile}
                isHovering={state.isHovering}
                hasYoutubeVideoId={hasYoutubeVideoId}
                failedToLoadYoutube={state.failedToLoadYoutube}
                youtubeVideoId={youtubeVideoId}
                fetchedAnime={fetchedAnime}
                coverImage={coverImage}
                title={title}
                onVideoError={onVideoError}
              />
            </div>
            <CardInfo
              rating={rating}
              format={format}
              creationDate={creationDate}
              episodeCount={episodeCount}
              youtubeVideoId={youtubeVideoId}
              fetchedAnime={fetchedAnime}
              title={title}
            />
          </div>
        </div>
        <CardActions
          title={title}
          type={type}
          isCurrentlyLoading={isCurrentlyLoading}
          onSynopsisOpen={handleModalOpen}
          onAiOpen={handleAiModalOpen}
          onSubmit={handleSubmit}
          onDelete={() => { if (_id) deleteAnime(_id, currentPlaylist.id); }}
        />
      </article>
      {state.modalOpen && (
        <SynopsisModal title={title} japanese_title={japanese_title} synopsis={synopsis} onClose={handleModalClose} />
      )}
      {aiState.open && (
        <AiRecommendationsModal loading={aiState.loading} error={aiState.error} results={aiState.results} onClose={handleAiModalClose} />
      )}
    </article>
  );
};

export default AnimeCard;
