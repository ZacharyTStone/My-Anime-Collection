import ReactPlayer from "react-player";
import { ExpectedFetchedAnimeResponse } from "../../../utils/types";

interface CardMediaProps {
  onMobile: boolean;
  isHovering: boolean;
  hasYoutubeVideoId: boolean;
  failedToLoadYoutube: boolean;
  youtubeVideoId?: string;
  fetchedAnime?: ExpectedFetchedAnimeResponse;
  coverImage?: string;
  title?: string;
  onVideoError: () => void;
}

const IMG_CLASSES = "anime-cover-image w-full transition-all duration-400 rounded-[var(--spacing-xs)] shadow-sm hover:scale-[1.02]";

const CardMedia = ({
  onMobile,
  isHovering,
  hasYoutubeVideoId,
  failedToLoadYoutube,
  youtubeVideoId,
  fetchedAnime,
  coverImage,
  title,
  onVideoError,
}: CardMediaProps) => {
  const imageSrc = coverImage ||
    fetchedAnime?.attributes?.posterImage?.medium ||
    fetchedAnime?.attributes?.posterImage?.small;

  if (onMobile) {
    return <img className={IMG_CLASSES} src={coverImage} alt={title} />;
  }

  if (isHovering && hasYoutubeVideoId && !failedToLoadYoutube) {
    return (
      <div className="flex justify-center items-center w-full">
        <ReactPlayer
          src={`https://www.youtube.com/watch?v=${youtubeVideoId || fetchedAnime?.attributes?.youtubeVideoId}`}
          width="100%"
          height="360px"
          controls
          className="anime-cover-image"
          style={{
            borderRadius: "var(--spacing-xs)",
            overflow: "hidden",
            boxShadow: "var(--shadow-md)",
          }}
          fallback={<img className={IMG_CLASSES} src={imageSrc} alt={title} />}
          onError={onVideoError}
        />
      </div>
    );
  }

  return <img className={IMG_CLASSES} src={imageSrc} alt={title} />;
};

export default CardMedia;
