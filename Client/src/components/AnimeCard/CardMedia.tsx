import ReactPlayer from "react-player";
import { ExpectedFetchedAnimeResponse } from "../../utils/types";

export interface CardMediaProps {
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

const IMG_CLASSES = "w-full rounded-md shadow-sm transition-all duration-300 hover:scale-[1.02]";

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
  const imageSrc =
    coverImage ||
    fetchedAnime?.attributes?.posterImage?.medium ||
    fetchedAnime?.attributes?.posterImage?.small;

  // Use the same fallback chain as the desktop branch: anime coming straight
  // from the Kitsu API (Top Animes, Seasonal, Add Anime) carry no saved
  // coverImage, so reading that field alone rendered an img with no src.
  if (onMobile) {
    return <img className={IMG_CLASSES} src={imageSrc} alt={title} />;
  }

  if (isHovering && hasYoutubeVideoId && !failedToLoadYoutube) {
    return (
      <ReactPlayer
        src={`https://www.youtube.com/watch?v=${youtubeVideoId || fetchedAnime?.attributes?.youtubeVideoId}`}
        width="100%"
        height="360px"
        playing
        muted={false}
        className={IMG_CLASSES}
        fallback={<img className={IMG_CLASSES} src={imageSrc} alt={title} />}
        onError={onVideoError}
      />
    );
  }

  return <img className={IMG_CLASSES} src={imageSrc} alt={title} />;
};

export default CardMedia;
