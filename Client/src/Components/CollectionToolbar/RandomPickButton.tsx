import { useState } from "react";
import { useTranslation } from "react-i18next";
import ModalBackdrop from "../UI/ModalBackdrop";
import { Button } from "@/Components/UI/button";
import { useCollectionQuery, type CollectionAnime } from "../../queries/animes";

const pickRandom = (animes: CollectionAnime[]): CollectionAnime | null =>
  animes.length > 0
    ? animes[Math.floor(Math.random() * animes.length)]
    : null;

const RandomPickButton = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [picked, setPicked] = useState<CollectionAnime | null>(null);

  const { data: animes, isPending, isError } = useCollectionQuery(isOpen);

  const handleOpen = () => {
    setIsOpen(true);
    if (animes) setPicked(pickRandom(animes));
  };

  const handleReroll = () => {
    if (animes) setPicked(pickRandom(animes));
  };

  const handleClose = () => setIsOpen(false);

  // Pick once the collection finishes loading after first open
  if (isOpen && !picked && animes && animes.length > 0) {
    setPicked(pickRandom(animes));
  }

  return (
    <>
      <Button variant="outline" onClick={handleOpen}>
        {t("random_pick.button")}
      </Button>

      {isOpen && (
        <ModalBackdrop
          onClose={handleClose}
          ariaLabel={t("random_pick.title")}
          className="sm:max-w-[340px] text-center"
        >
          <h2 className="text-xl font-semibold mb-4">
            {t("random_pick.title")}
          </h2>

          {isPending ? (
            <p className="text-muted-foreground">...</p>
          ) : isError ? (
            <p className="text-muted-foreground">{t("random_pick.empty")}</p>
          ) : picked ? (
            <div className="flex flex-col items-center gap-2">
              {picked.coverImage && (
                <img
                  src={picked.coverImage}
                  alt={picked.title}
                  className="w-40 rounded-lg object-cover"
                />
              )}
              <p className="font-bold">{picked.title}</p>
              <p className="text-sm text-muted-foreground">
                ⭐ {picked.rating ?? "N/A"} · {picked.episodeCount ?? "?"} ep
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground">{t("random_pick.empty")}</p>
          )}

          <div className="mt-6 flex justify-center gap-3">
            {picked && (
              <Button variant="outline" onClick={handleReroll}>
                {t("random_pick.reroll")}
              </Button>
            )}
            <Button variant="outline" onClick={handleClose}>
              {t("random_pick.close")}
            </Button>
          </div>
        </ModalBackdrop>
      )}
    </>
  );
};

export default RandomPickButton;
