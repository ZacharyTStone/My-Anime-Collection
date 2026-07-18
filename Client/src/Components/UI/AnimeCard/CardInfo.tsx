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
      <Badge variant="secondary">
        {rating}
        <span className="text-muted-foreground">/100</span>
      </Badge>
      <Badge variant="secondary">{format}</Badge>
      <Badge variant="secondary">{creationDate?.slice(0, 4)}</Badge>
      <Badge variant="secondary">
        <span>{episodeCount ?? "N/A"}</span>
        <span className="ml-1">{t("anime.episode")}</span>
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
