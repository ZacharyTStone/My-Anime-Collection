import { useState } from "react";
import { useAuthSelector, usePlaylistSelector, useLanguageSelector } from "../../../stores/hooks";
import { useMobile } from "../../../utils/hooks";
import { useCreateAnime, useDeleteAnime } from "../../../queries/animes";
import { useAiRecommendations } from "../../../queries/ai";
import { ExpectedFetchedAnimeResponse } from "../../../utils/types";

interface AnimeCardState {
  modalOpen: boolean;
  isHovering: boolean;
  failedToLoadYoutube: boolean;
}

interface UseAnimeCardParams {
  _id?: string;
  title?: string;
  synopsis?: string;
  fetchedAnime?: ExpectedFetchedAnimeResponse;
  type: "add" | "delete";
}

export const useAnimeCard = ({ _id, title, synopsis, fetchedAnime, type }: UseAnimeCardParams) => {
  const [state, setState] = useState<AnimeCardState>({
    modalOpen: false,
    isHovering: false,
    failedToLoadYoutube: false,
  });

  const createAnime = useCreateAnime();
  const deleteAnime = useDeleteAnime();

  const { currentPlaylist } = usePlaylistSelector((s) => ({
    currentPlaylist: s.currentPlaylist,
  }));

  const isDemo = useAuthSelector((s) => s.user?.isDemo === true);
  const siteLanguage = useLanguageSelector((s) => s.siteLanguage);

  const onMobile = useMobile();

  const [aiOpen, setAiOpen] = useState(false);
  const aiQuery = useAiRecommendations(title || "", synopsis || "", aiOpen);

  const aiState = {
    open: aiOpen,
    loading: aiOpen && aiQuery.isPending,
    results: aiQuery.data ?? [],
    error: aiQuery.isError,
  };

  const isCurrentlyLoading = createAnime.isPending || deleteAnime.isPending;

  const handleMouseEnter = () => setState((prev) => ({ ...prev, isHovering: true }));
  const handleMouseLeave = () => setState((prev) => ({ ...prev, isHovering: false }));
  const handleModalOpen = () => setState((prev) => ({ ...prev, modalOpen: true }));
  const handleModalClose = () => setState((prev) => ({ ...prev, modalOpen: false }));
  const onVideoError = () => setState((prev) => ({ ...prev, failedToLoadYoutube: true }));

  const handleSubmit = () => {
    if (isCurrentlyLoading) return;
    if (type === "add" && fetchedAnime) {
      createAnime.mutate({
        anime: fetchedAnime,
        playlistID: currentPlaylist.id,
        isDemo,
      });
    } else if (type === "delete" && _id) {
      deleteAnime.mutate(_id);
    }
  };

  const handleAiModalOpen = () => setAiOpen(true);
  const handleAiModalClose = () => setAiOpen(false);

  return {
    state,
    aiState,
    onMobile,
    siteLanguage,
    isCurrentlyLoading,
    currentPlaylist,
    deleteAnime: (animeId: string) => deleteAnime.mutate(animeId),
    handleMouseEnter,
    handleMouseLeave,
    handleModalOpen,
    handleModalClose,
    handleSubmit,
    handleAiModalOpen,
    handleAiModalClose,
    onVideoError,
  };
};
