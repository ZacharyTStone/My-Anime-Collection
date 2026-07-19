import { FaYoutube } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Badge } from "@/Components/UI/badge";
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
    <div className="mb-1.5 mt-2 flex flex-wrap items-center justify-center gap-1.5 text-sm font-medium">
      <Badge variant="secondary" className="bg-primary-500/10 text-primary-600 border border-primary-500/20 dark:bg-primary-500/15 dark:text-primary-300">
        {rating}
        <span className="text-primary-400/60 ml-0.5">/100</span>
      </Badge>
      <Badge variant="secondary" className="font-mono text-[0.7rem] tracking-wide">{format}</Badge>
      <Badge variant="secondary" className="font-mono text-[0.7rem] tracking-wide">{creationDate?.slice(0, 4)}</Badge>
      <Badge variant="secondary" className="font-mono text-[0.7rem] tracking-wide">
        <span>{episodeCount ?? "N/A"}</span>
        <span className="ml-1 opacity-70">{t("anime.episode")}</span>
      </Badge>
      {hasYoutubeVideoId && (
        <a
          href={`https://www.youtube.com/watch?v=${youtubeVideoId || fetchedAnime?.attributes?.youtubeVideoId}`}
          target="_blank"
          rel="noreferrer"
          aria-label={`Watch ${title} trailer on YouTube`}
          className="inline-flex items-center px-1"
        >
          <FaYoutube color="red" size={26} />
        </a>
      )}
    </div>
  );
};

export default CardInfo;
