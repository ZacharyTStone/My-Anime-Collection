import { useState } from "react";
import { useTranslation } from "react-i18next";
import ModalBackdrop from "../UI/ModalBackdrop";
import { fetchAllAnimes, type CollectionAnime } from "../../utils/fetchAllAnimes";
import { handleApiError } from "../../utils/handleApiError";

const pickRandom = (animes: CollectionAnime[]): CollectionAnime | null =>
  animes.length > 0
    ? animes[Math.floor(Math.random() * animes.length)]
    : null;

const RandomPickButton = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [animes, setAnimes] = useState<CollectionAnime[] | null>(null);
  const [picked, setPicked] = useState<CollectionAnime | null>(null);

  const handleOpen = async () => {
    setIsOpen(true);

    if (animes !== null) {
      setPicked(pickRandom(animes));
      return;
    }

    setLoading(true);
    try {
      const fetched = await fetchAllAnimes();
      setAnimes(fetched);
      setPicked(pickRandom(fetched));
    } catch (error: unknown) {
      setIsOpen(false);
      handleApiError(error, "Failed to fetch animes");
    } finally {
      setLoading(false);
    }
  };

  const handleReroll = () => {
    if (animes) setPicked(pickRandom(animes));
  };

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button type="button" className="btn btn-outline" onClick={handleOpen}>
        {t("random_pick.button")}
      </button>

      {isOpen && (
        <ModalBackdrop onClose={handleClose} ariaLabel={t("random_pick.title")}>
          <div
            className="p-8 rounded-[calc(var(--borderRadius)*1.5)] max-w-[80vw] w-[320px] text-center border-2 border-[var(--primary-alpha-30)]"
            style={{
              background:
                "linear-gradient(135deg, var(--white) 0%, var(--primary-50) 100%)",
              boxShadow: "var(--shadow-anime-lg)",
            }}
          >
            <h2 className="text-xl font-semibold mb-4">
              {t("random_pick.title")}
            </h2>

            {loading ? (
              <p className="text-[var(--grey-500)]">...</p>
            ) : picked ? (
              <div className="flex flex-col items-center gap-2">
                {picked.coverImage && (
                  <img
                    src={picked.coverImage}
                    alt={picked.title}
                    className="w-40 rounded-lg object-cover"
                  />
                )}
                <p className="font-bold text-[var(--textColor)]">
                  {picked.title}
                </p>
                <p className="text-sm text-[var(--grey-500)]">
                  ⭐ {picked.rating ?? "N/A"} · {picked.episodeCount ?? "?"} ep
                </p>
              </div>
            ) : (
              <p className="text-[var(--grey-500)]">{t("random_pick.empty")}</p>
            )}

            <div className="mt-6 flex justify-center gap-3">
              {picked && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleReroll}
                >
                  {t("random_pick.reroll")}
                </button>
              )}
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleClose}
              >
                {t("random_pick.close")}
              </button>
            </div>
          </div>
        </ModalBackdrop>
      )}
    </>
  );
};

export default RandomPickButton;
