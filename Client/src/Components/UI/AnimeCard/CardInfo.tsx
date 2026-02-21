import { FaYoutube } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { ExpectedFetchedAnimeResponse } from "../../../utils/types";

interface CardInfoProps {
  rating?: number | string;
  format?: string;
  creationDate?: string;
  episodeCount?: number | null;
  youtubeVideoId?: string;
  fetchedAnime?: ExpectedFetchedAnimeResponse;
  title?: string;
}

const CardInfo = ({
  rating,
  format,
  creationDate,
  episodeCount,
  youtubeVideoId,
  fetchedAnime,
  title,
}: CardInfoProps) => {
  const { t } = useTranslation();
  const hasYoutubeVideoId = Boolean(youtubeVideoId);

  return (
    <div className="mb-1.5 text-[var(--textColor)] text-sm font-medium flex items-center justify-center gap-[var(--spacing-xs)] mt-[var(--spacing-sm)] flex-wrap">
      <span className="text-[var(--textColor)] px-2 py-1">
        {rating}
        <span className="text-[var(--grey-500)]">/100</span>
      </span>
      <span className="text-[var(--textColor)] px-2 py-1">{format}</span>
      <span className="text-[var(--textColor)] px-2 py-1">{creationDate?.slice(0, 4)}</span>
      <span className="text-[var(--textColor)] px-2 py-1">
        <span>{episodeCount ?? "N/A"}</span>
        <span className="ml-[5px]">{t("anime.episode")}</span>
      </span>
      {hasYoutubeVideoId && (
        <span className="text-[var(--textColor)] px-2 py-1">
          <a
            href={`https://www.youtube.com/watch?v=${youtubeVideoId || fetchedAnime?.attributes?.youtubeVideoId}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`Watch ${title} trailer on YouTube`}
          >
            <FaYoutube color="red" size={30} />
          </a>
        </span>
      )}
    </div>
  );
};

export default CardInfo;
