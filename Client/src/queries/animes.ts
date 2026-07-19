import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiClient } from "../utils/api";
import { handleApiError } from "../utils/handleApiError";
import { mapFetchedAnime } from "../utils/mapFetchedAnime";
import { fetchAllAnimes, type CollectionAnime } from "../utils/fetchAllAnimes";
import { useAuthStore } from "../stores/authStore";
import type {
  ExpectedFetchedAnimeResponse,
  SavedAnime,
} from "../utils/types";
import { queryKeys } from "./keys";

export interface AnimeListParams {
  page: number;
  search: string;
  searchStatus: string;
  searchType: string;
  searchStared: string;
  sort: string;
}

interface AnimesResponse {
  animes: SavedAnime[];
  totalAnimes: number;
  numOfPages: number;
}

const fetchAnimesPage = async (
  playlistId: string,
  params: AnimeListParams
): Promise<AnimesResponse> => {
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(params.page));
  searchParams.set("status", params.searchStatus);
  searchParams.set("type", params.searchType);
  searchParams.set("stared", params.searchStared);
  searchParams.set("sort", params.sort);
  searchParams.set("currentPlaylistID", playlistId);
  if (params.search) {
    searchParams.set("search", params.search);
  }
  const { data } = await apiClient.get(`/animes?${searchParams.toString()}`);
  return data;
};

export const useAnimesQuery = (
  playlistId: string,
  params: AnimeListParams,
  enabled = true
) => {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: queryKeys.animes(playlistId, {
      page: String(params.page),
      search: params.search,
      status: params.searchStatus,
      type: params.searchType,
      stared: params.searchStared,
      sort: params.sort,
    }),
    queryFn: () => fetchAnimesPage(playlistId, params),
    enabled: enabled && Boolean(token) && Boolean(playlistId),
    placeholderData: (previousData) => previousData,
  });
};

export const useAnimeStatsQuery = () => {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: queryKeys.animeStats,
    queryFn: async () => {
      const { data } = await apiClient.get("/animes/stats");
      return data as {
        total: number;
        totalEpisodes: number;
        playlistCounts: Record<string, number>;
        topRated: { title: string; rating: number | null } | null;
        recentlyAdded: { title: string; createdAt: string | null } | null;
      };
    },
    enabled: Boolean(token),
  });
};

/** Every saved anime across all playlists (random pick, export). */
export const useCollectionQuery = (enabled: boolean) => {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: queryKeys.collection,
    queryFn: fetchAllAnimes,
    enabled: Boolean(token) && enabled,
    staleTime: 60 * 1000,
  });
};

const invalidateAnimeCaches = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: ["animes"] });
  queryClient.invalidateQueries({ queryKey: queryKeys.animeStats });
  queryClient.invalidateQueries({ queryKey: queryKeys.collection });
};

export const useCreateAnime = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      anime,
      playlistID,
      isDemo,
    }: {
      anime: ExpectedFetchedAnimeResponse;
      playlistID: string;
      isDemo: boolean;
    }) => {
      const mapped = mapFetchedAnime(anime);
      // Kitsu returns id and averageRating as strings; the API expects numbers
      const rating = Number(mapped.rating);
      await apiClient.post("/animes", {
        title: mapped.title,
        id: Number(anime.id),
        rating: Number.isNaN(rating) ? undefined : rating,
        format: mapped.format,
        episodeCount: mapped.episodeCount,
        synopsis: mapped.synopsis,
        coverImage: mapped.coverImage,
        creationDate: mapped.creationDate,
        youtubeVideoId: mapped.youtubeVideoId ?? undefined,
        japanese_title: mapped.japanese_title,
        playlistID,
        isDemoAnime: isDemo,
      });
    },
    onSuccess: () => {
      toast.success("Anime Created!");
      invalidateAnimeCaches(queryClient);
    },
    onError: (error) =>
      handleApiError(error, "An error occurred while adding the anime"),
  });
};

export const useDeleteAnime = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (animeId: string) => {
      await apiClient.delete(`/animes/${animeId}`);
    },
    onMutate: async (animeId) => {
      // Optimistically remove the anime from any cached lists
      await queryClient.cancelQueries({ queryKey: ["animes"] });
      const previous = queryClient.getQueriesData<AnimesResponse>({
        queryKey: ["animes"],
      });
      queryClient.setQueriesData<AnimesResponse>(
        { queryKey: ["animes"] },
        (old) =>
          old
            ? {
                ...old,
                animes: old.animes.filter((a) => a._id !== animeId),
                totalAnimes: Math.max(0, old.totalAnimes - 1),
              }
            : old
      );
      return { previous };
    },
    onError: (error, _animeId, context) => {
      context?.previous.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
      handleApiError(error, "Failed to delete anime");
    },
    onSuccess: () => {
      toast.success("Anime Deleted!");
    },
    onSettled: () => {
      invalidateAnimeCaches(queryClient);
    },
  });
};

export type { CollectionAnime };
