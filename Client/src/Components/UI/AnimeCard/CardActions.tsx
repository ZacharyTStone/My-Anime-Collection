import { BsReverseLayoutTextWindowReverse, BsStars } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { cn } from "../../../utils/cn";

interface CardActionsProps {
  title?: string;
  type: "add" | "delete";
  isCurrentlyLoading: boolean;
  onSynopsisOpen: () => void;
  onAiOpen: () => void;
  onSubmit: () => void;
  onDelete: () => void;
}

const CardActions = ({
  title,
  type,
  isCurrentlyLoading,
  onSynopsisOpen,
  onAiOpen,
  onSubmit,
  onDelete,
}: CardActionsProps) => {
  const { t } = useTranslation();

  return (
    <div className="p-[var(--spacing-md)] flex justify-center border-t border-[var(--grey-100)] bg-[var(--grey-50)] gap-[var(--spacing-md)]">
      <button
        type="button"
        className="card-btn flex items-center gap-2 bg-transparent border-none cursor-pointer p-2"
        onClick={onSynopsisOpen}
        aria-label={t("anime.showSynopsis")}
      >
        <BsReverseLayoutTextWindowReverse size={20} className="text-primary-500" />
      </button>
      <button
        type="button"
        className="card-btn flex items-center gap-2 bg-transparent border-none cursor-pointer p-2"
        onClick={onAiOpen}
        aria-label={t("anime.ai_suggestions")}
      >
        <span
          className={cn(
            "shimmer-text inline-flex items-center justify-center",
            "animate-[anime-shimmer_2s_linear_infinite]",
            "[&_svg]:animate-[aiGlow_2s_ease-in-out_infinite,jiggle_3s_ease-in-out_infinite]",
          )}
        >
          <BsStars size={20} />
        </span>
      </button>
      {type === "delete" ? (
        <button
          type="button"
          className="btn delete-btn"
          aria-label={`${t("anime.delete")} ${title}`}
          onClick={onDelete}
        >
          {t("anime.delete")}
        </button>
      ) : (
        <button
          type="button"
          className="card-btn add bg-transparent border-none cursor-pointer p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isCurrentlyLoading}
          onClick={onSubmit}
          aria-label={`${t("anime.add")} ${title}`}
        >
          {t("anime.add")}
        </button>
      )}
    </div>
  );
};

export default CardActions;
