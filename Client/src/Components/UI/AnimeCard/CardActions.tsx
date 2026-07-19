import { BsReverseLayoutTextWindowReverse, BsStars } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { Button } from "@/Components/UI/button";
import { CardFooter } from "@/Components/UI/card";
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
    <CardFooter className="mt-auto justify-center gap-3 border-t border-primary-500/10 bg-muted/30 p-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={onSynopsisOpen}
        aria-label={t("anime.details")}
        className="text-primary-500"
      >
        <BsReverseLayoutTextWindowReverse size={20} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
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
      </Button>
      {type === "delete" ? (
        <Button
          variant="destructive"
          aria-label={`${t("anime.delete")} ${title}`}
          onClick={onDelete}
        >
          {t("anime.delete")}
        </Button>
      ) : (
        <Button
          disabled={isCurrentlyLoading}
          onClick={onSubmit}
          aria-label={`${t("anime.add")} ${title}`}
        >
          {t("anime.add")}
        </Button>
      )}
    </CardFooter>
  );
};

export default CardActions;
