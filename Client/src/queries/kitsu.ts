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
