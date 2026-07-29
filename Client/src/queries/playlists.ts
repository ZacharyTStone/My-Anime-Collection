import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import i18n from "../translations/i18n";
import { apiClient } from "../utils/api";
import { handleApiError } from "../utils/handleApiError";
import { useAuthStore } from "../stores/authStore";
import { usePlaylistStore, DEFAULT_PLAYLIST, type Playlist } from "../stores/playlistStore";
import { queryKeys } from "./keys";

export const usePlaylistsQuery = () => {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: queryKeys.playlists,
    queryFn: async (): Promise<Playlist[]> => {
      const { data } = await apiClient.get("/playlists");
      return data.playlists;
    },
    enabled: Boolean(token),
  });
};

export const useCreatePlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (playlistTitle: string) => {
      await apiClient.post("/playlists", { title: playlistTitle });
    },
    onSuccess: () => {
      toast.success(i18n.t("edit_playlist.created"));
      queryClient.invalidateQueries({ queryKey: queryKeys.playlists });
    },
    onError: (error) => handleApiError(error, i18n.t("errors.create_playlist_failed")),
  });
};

export const useUpdatePlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (playlist: Playlist) => {
      await apiClient.patch(`/playlists/${playlist.id}`, playlist);
    },
    onSuccess: () => {
      toast.success(i18n.t("edit_playlist.updated"));
      queryClient.invalidateQueries({ queryKey: queryKeys.playlists });
    },
    onError: (error) => handleApiError(error, i18n.t("errors.update_playlist_failed")),
  });
};

export const useDeletePlaylist = () => {
  const queryClient = useQueryClient();
  const setCurrentPlaylist = usePlaylistStore((s) => s.setCurrentPlaylist);
  return useMutation({
    mutationFn: async (playlistId: string) => {
      await apiClient.delete(`/playlists/${playlistId}`);
    },
    onSuccess: async () => {
      toast.success(i18n.t("edit_playlist.deleted"));
      const playlists = await queryClient.fetchQuery<Playlist[]>({
        queryKey: queryKeys.playlists,
        queryFn: async () => {
          const { data } = await apiClient.get("/playlists");
          return data.playlists;
        },
      });
      setCurrentPlaylist(playlists[0] || { ...DEFAULT_PLAYLIST });
      queryClient.invalidateQueries({ queryKey: queryKeys.playlists });
    },
    onError: (error) => handleApiError(error, i18n.t("errors.delete_playlist_failed")),
  });
};
