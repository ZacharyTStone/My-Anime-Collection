import { BsReverseLayoutTextWindowReverse, BsStars } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { Button } from "@/Components/UI/button";
import { CardFooter } from "@/Components/UI/card";

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
    <CardFooter className="mt-auto justify-center gap-3 border-t border-border/70 bg-muted/30 p-4">
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
        className="text-ai"
      >
        <BsStars size={20} />
      </Button>
      {type === "delete" ? (
        <Button
          variant="outline"
          className="border-destructive/30 text-destructive hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive"
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
