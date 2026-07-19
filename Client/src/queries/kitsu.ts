import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ExpectedFetchedAnimeResponse } from "../utils/types";
import { queryKeys } from "./keys";

const PAGE_LIMIT = 18;

export interface KitsuQueryArgs {
  baseURL: string;
  page: number;
  searchText: string;
  sort: string;
  extraParams?: Record<string, string>;
  enabled?: boolean;
}

export interface KitsuResult {
  animes: ExpectedFetchedAnimeResponse[];
  totalAnimes: number;
  numOfPages: number;
}

export interface KitsuStreamingLink {
  url: string;
  subs: string[];
  dubs: string[];
}

export interface AnimeDetails {
  status?: string;
  ageRating?: string;
  ratingRank?: number;
  popularityRank?: number;
  episodeLength?: number;
  endDate?: string;
  categories: string[];
  streamingLinks: KitsuStreamingLink[];
}

const fetchAnimeDetails = async (
  kitsuId: string,
  signal?: AbortSignal
): Promise<AnimeDetails> => {
  const params = new URLSearchParams();
  params.set("include", "categories,streamingLinks");
  params.set("fields[categories]", "title");
  params.set("fields[streamingLinks]", "url,subs,dubs");
  const { data } = await axios.get(
    `https://kitsu.io/api/edge/anime/${kitsuId}?${params.toString()}`,
    { signal }
  );
  const attributes = data?.data?.attributes ?? {};
  const included: { type: string; attributes?: Record<string, unknown> }[] =
    data?.included ?? [];
  return {
    status: attributes.status,
    ageRating: attributes.ageRating,
    ratingRank: attributes.ratingRank,
    popularityRank: attributes.popularityRank,
    episodeLength: attributes.episodeLength,
    endDate: attributes.endDate,
    categories: included
      .filter((i) => i.type === "categories")
      .map((i) => String(i.attributes?.title ?? ""))
      .filter(Boolean),
    streamingLinks: included
      .filter((i) => i.type === "streamingLinks")
      .map((i) => ({
        url: String(i.attributes?.url ?? ""),
        subs: (i.attributes?.subs as string[]) ?? [],
        dubs: (i.attributes?.dubs as string[]) ?? [],
      }))
      .filter((l) => l.url),
  };
};

/** Shared query options so the details modal and bulk fetches share cache. */
export const animeDetailsQueryOptions = (kitsuId: string) => ({
  queryKey: queryKeys.kitsuAnimeDetails(kitsuId),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    fetchAnimeDetails(kitsuId, signal),
  staleTime: 5 * 60 * 1000,
});

/**
 * Fetches extra details for a single anime (status, ranks, age rating,
 * categories/genres and streaming links) in one request. Used by the
 * anime details modal.
 */
export const useAnimeDetailsQuery = (
  kitsuId: string | undefined,
  enabled: boolean
) => {
  return useQuery({
    ...animeDetailsQueryOptions(kitsuId ?? ""),
    enabled: enabled && Boolean(kitsuId),
  });
};

/**
 * Fetches anime from the external Kitsu API. Used by the Add Anime search,
 * the trending page, and the seasonal page.
 */
export const useKitsuAnimesQuery = ({
  baseURL,
  page,
  searchText,
  sort,
  extraParams,
  enabled = true,
}: KitsuQueryArgs) => {
  return useQuery({
    queryKey: queryKeys.kitsu({ baseURL, page, searchText, sort, extraParams }),
    queryFn: async ({ signal }): Promise<KitsuResult> => {
      let url: string;
      const offset = Math.max(0, (page - 1) * PAGE_LIMIT);

      if (baseURL.includes("/trending/")) {
        const params = new URLSearchParams();
        params.set("limit", String(PAGE_LIMIT));
        params.set("offset", String(offset));
        url = `${baseURL}?${params.toString()}`;
      } else {
        const params = new URLSearchParams();
        params.set("page[limit]", String(PAGE_LIMIT));
        params.set("page[offset]", String(offset));
        if (searchText) {
          params.set("filter[text]", searchText);
        }
        if (sort) {
          params.set("sort", sort);
        }
        if (extraParams) {
          Object.entries(extraParams).forEach(([key, value]) => {
            if (value) {
              params.set(key, value);
            }
          });
        }
        url = `${baseURL}?${params.toString()}`;
      }

      const { data } = await axios.get(url, { signal });
      const animes = data?.data ?? [];
      const totalAnimes = data?.meta?.count ?? animes.length;
      return {
        animes,
        totalAnimes,
        numOfPages: Math.max(1, Math.ceil(totalAnimes / PAGE_LIMIT)),
      };
    },
    enabled,
    placeholderData: (previousData) => previousData,
  });
};
