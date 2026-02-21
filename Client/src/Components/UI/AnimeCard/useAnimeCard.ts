import { useState, useRef } from "react";
import { useAnimeSelector, usePlaylistSelector, useLanguageSelector, useAiSelector } from "../../../stores/hooks";
import { useMobile } from "../../../utils/hooks";
import { AiRecommendation, ExpectedFetchedAnimeResponse } from "../../../utils/types";

interface AnimeCardState {
  modalOpen: boolean;
  isHovering: boolean;
  failedToLoadYoutube: boolean;
}

interface AiState {
  open: boolean;
  loading: boolean;
  results: AiRecommendation[];
  error: boolean;
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

  const { createAnime, deleteAnime, isItemLoading } = useAnimeSelector((s) => ({
    createAnime: s.createAnime,
    deleteAnime: s.deleteAnime,
    isItemLoading: s.isItemLoading,
  }));

  const { currentPlaylist } = usePlaylistSelector((s) => ({
    currentPlaylist: s.currentPlaylist,
  }));

  const siteLanguage = useLanguageSelector((s) => s.siteLanguage);
  const { getRecommendations } = useAiSelector((s) => ({
    getRecommendations: s.getRecommendations,
  }));

  const onMobile = useMobile();

  const [aiState, setAiState] = useState<AiState>({
    open: false,
    loading: false,
    results: [],
    error: false,
  });
  const aiCacheRef = useRef<AiRecommendation[] | null>(null);

  const itemId = _id || fetchedAnime?.id || "";
  const isCurrentlyLoading = isItemLoading(itemId);

  const handleMouseEnter = () => setState((prev) => ({ ...prev, isHovering: true }));
  const handleMouseLeave = () => setState((prev) => ({ ...prev, isHovering: false }));
  const handleModalOpen = () => setState((prev) => ({ ...prev, modalOpen: true }));
  const handleModalClose = () => setState((prev) => ({ ...prev, modalOpen: false }));
  const onVideoError = () => setState((prev) => ({ ...prev, failedToLoadYoutube: true }));

  const handleSubmit = () => {
    if (isCurrentlyLoading) return;
    if (type === "add" && fetchedAnime) {
      createAnime(fetchedAnime, currentPlaylist.id);
    } else if (type === "delete" && _id) {
      deleteAnime(_id, currentPlaylist.id);
    }
  };

  const handleAiModalOpen = async () => {
    if (aiState.loading) {
      setAiState((prev) => ({ ...prev, open: true }));
      return;
    }

    setAiState((prev) => ({ ...prev, open: true, loading: true, error: false }));

    if (aiCacheRef.current) {
      setAiState((prev) => ({
        ...prev,
        loading: false,
        results: aiCacheRef.current!,
      }));
      return;
    }

    try {
      const recommendations = await getRecommendations(title || "", synopsis || "");
      aiCacheRef.current = recommendations;
      setAiState((prev) => ({
        ...prev,
        loading: false,
        results: recommendations,
      }));
    } catch {
      setAiState((prev) => ({ ...prev, loading: false, error: true }));
    }
  };

  const handleAiModalClose = () => setAiState((prev) => ({ ...prev, open: false }));

  return {
    state,
    aiState,
    onMobile,
    siteLanguage,
    isCurrentlyLoading,
    currentPlaylist,
    deleteAnime,
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
