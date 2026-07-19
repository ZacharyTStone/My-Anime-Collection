import { SkeletonLoadingBlock } from "..";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/UI/card";
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
      <article className={cn("flex flex-col justify-center items-center max-[1000px]:flex-row", className)}>
        <SkeletonLoadingBlock height={skeletonHeight} width={SKELETON_WIDTH} borderRadius={SKELETON_BORDER_RADIUS} />
      </article>
    );
  }

  return (
    <article
      className="flex flex-col justify-center items-center max-[1000px]:flex-row"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card
        className={cn(
          "h-full w-full sm:w-[300px] gap-0 overflow-hidden py-0",
          "transition-all duration-300 hover:-translate-y-1 hover:border-primary-400 hover:shadow-lg"
        )}
      >
        <CardHeader className="px-4 pt-4">
          <CardTitle className="flex min-h-[60px] items-center justify-center text-center text-lg leading-snug tracking-tight">
            {siteLanguage === "en" ? title : japanese_title}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-2">
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
        </CardContent>
        <CardActions
          title={title}
          type={type}
          isCurrentlyLoading={isCurrentlyLoading}
          onSynopsisOpen={handleModalOpen}
          onAiOpen={handleAiModalOpen}
          onSubmit={handleSubmit}
          onDelete={() => { if (_id) deleteAnime(_id); }}
        />
      </Card>
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
