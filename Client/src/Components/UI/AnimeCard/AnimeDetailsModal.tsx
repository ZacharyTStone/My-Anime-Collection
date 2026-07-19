import { useTranslation } from "react-i18next";
import { ExternalLink } from "lucide-react";
import ModalBackdrop from "../ModalBackdrop";
import { SkeletonLoadingBlock } from "..";
import { useAnimeDetailsQuery } from "../../../queries/kitsu";
import { useLanguageSelector } from "../../../stores/hooks";
import { serviceNameFromUrl } from "../../../utils/streamingServices";

interface AnimeDetailsModalProps {
  title?: string;
  japanese_title?: string;
  synopsis?: string;
  coverImage?: string;
  rating?: number | string;
  episodeCount?: number | null;
  format?: string;
  creationDate?: string;
  kitsuId?: string;
  onClose: () => void;
}

const capitalize = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1);

const MetaChip = ({ label, value }: { label: string; value?: string | number | null }) =>
  value === undefined || value === null || value === "" ? null : (
    <span className="rounded-full border bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
      {label}: <span className="font-medium text-foreground">{value}</span>
    </span>
  );

const AnimeDetailsModal = ({
  title,
  japanese_title,
  synopsis,
  coverImage,
  rating,
  episodeCount,
  format,
  creationDate,
  kitsuId,
  onClose,
}: AnimeDetailsModalProps) => {
  const { t } = useTranslation();
  const siteLanguage = useLanguageSelector((s) => s.siteLanguage);
  const { data: details, isPending } = useAnimeDetailsQuery(kitsuId, true);

  return (
    <ModalBackdrop
      onClose={onClose}
      ariaLabel={t("details.aria", { title })}
      className="max-h-[85vh] overflow-y-auto sm:max-w-2xl"
    >
      <div className="flex gap-4">
        {coverImage && (
          <img
            src={coverImage}
            alt={title}
            className="hidden w-28 shrink-0 self-start rounded-lg object-cover sm:block"
          />
        )}
        <div className="min-w-0">
          <h2 className="text-xl font-semibold leading-snug">
            {siteLanguage === "en" ? title : japanese_title || title}
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            <MetaChip label={t("details.rating")} value={rating} />
            <MetaChip label={t("details.format")} value={format} />
            <MetaChip
              label={t("details.episodes")}
              value={episodeCount ?? undefined}
            />
            <MetaChip
              label={t("details.year")}
              value={creationDate?.slice(0, 4)}
            />
            {details?.episodeLength && (
              <MetaChip
                label={t("details.episode_length")}
                value={t("details.minutes", { count: details.episodeLength })}
              />
            )}
            {details?.status && (
              <MetaChip label={t("details.status")} value={capitalize(details.status)} />
            )}
            {details?.ageRating && (
              <MetaChip label={t("details.age_rating")} value={details.ageRating} />
            )}
            {details?.ratingRank && (
              <MetaChip label={t("details.rating_rank")} value={`#${details.ratingRank}`} />
            )}
            {details?.popularityRank && (
              <MetaChip
                label={t("details.popularity_rank")}
                value={`#${details.popularityRank}`}
              />
            )}
          </div>
        </div>
      </div>

      {isPending && kitsuId && (
        <div className="mt-4 flex flex-col gap-2">
          <SkeletonLoadingBlock height={20} width="60%" borderRadius={6} />
          <SkeletonLoadingBlock height={20} width="40%" borderRadius={6} />
        </div>
      )}

      {details && details.categories.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-2 text-sm font-semibold">{t("details.genres")}</h3>
          <div className="flex flex-wrap gap-2">
            {details.categories.map((category) => (
              <span
                key={category}
                className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-500"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      )}

      {synopsis && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {synopsis}
        </p>
      )}

      {details && details.streamingLinks.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <h3 className="mb-2 text-sm font-semibold">{t("details.where_to_watch")}</h3>
          <div className="flex flex-wrap gap-2">
            {details.streamingLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm text-primary-500 transition-colors hover:bg-primary-500/10"
              >
                {serviceNameFromUrl(link.url)}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      )}
    </ModalBackdrop>
  );
};

export default AnimeDetailsModal;
