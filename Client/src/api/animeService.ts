import { apiClient } from "./axiosInstance";
import { API_ENDPOINTS } from "./endpoints";

/**
 * Interface for anime data
 */
export interface AnimeData {
    _id?: string;
    title: string;
    rating?: number;
    episodeCount?: number;
    format?: string;
    creationDate?: string;
    synopsis?: string;
    coverImage?: string;
    youtubeVideoId?: string;
    japanese_title?: string;
    playlistID: string;
}

/**
 * Interface for anime query parameters
 */
export interface AnimeQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    sort?: string;
    currentPlaylistID?: string;
}

/**
 * Interface for anime response
 */
export interface AnimeResponse {
    animes: AnimeData[];
    totalAnimes: number;
    numOfPages: number;
}

/**
 * Interface for external anime data (from Kitsu API)
 */
export interface ExternalAnimeData {
    id: string;
    attributes: {
        titles: {
            en?: string;
            en_jp?: string;
            ja_jp?: string;
        };
        posterImage?: {
            medium: string;
            small: string;
        };
        synopsis?: string;
        averageRating?: number;
        subtype?: string;
        startDate?: string;
        youtubeVideoId?: string;
        episodeCount?: number;
        format?: string;
    };
}

/**
 * Interface for external anime response
 */
export interface ExternalAnimeResponse {
    data: ExternalAnimeData[];
    meta: {
        count: number;
    };
}

/**
 * Anime service class
 */
export class AnimeService {
    /**
     * Create a new anime
     * @param animeData - Anime data to create
     * @returns Promise with created anime
     */
    static async createAnime(animeData: AnimeData): Promise<{ anime: AnimeData }> {
        const response = await apiClient.post(API_ENDPOINTS.ANIME.BASE, animeData);
        return response.data;
    }

    /**
     * Get animes with pagination and filtering
     * @param params - Query parameters
     * @returns Promise with anime list and pagination info
     */
    static async getAnimes(params: AnimeQueryParams = {}): Promise<AnimeResponse> {
        const queryParams = new URLSearchParams();

        if (params.page) queryParams.append("page", params.page.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());
        if (params.search) queryParams.append("search", params.search);
        if (params.sort) queryParams.append("sort", params.sort);
        if (params.currentPlaylistID) queryParams.append("currentPlaylistID", params.currentPlaylistID);

        const response = await apiClient.get(`${API_ENDPOINTS.ANIME.BASE}?${queryParams.toString()}`);
        return response.data;
    }

    /**
     * Delete an anime by ID
     * @param animeId - ID of anime to delete
     * @returns Promise with deletion result
     */
    static async deleteAnime(animeId: string): Promise<{ message: string }> {
        const response = await apiClient.delete(API_ENDPOINTS.ANIME.BY_ID(animeId));
        return response.data;
    }

    /**
     * Fetch animes from external API (Kitsu)
     * @param params - Search parameters
     * @returns Promise with external anime data
     */
    static async fetchExternalAnimes(params: {
        page: number;
        baseURL: string;
        filter?: string;
        searchText?: string;
        sort?: string;
    }): Promise<ExternalAnimeResponse> {
        const { page, baseURL, searchText, sort } = params;
        const limit = 18;
        const offset = Math.max(0, (page - 1) * limit);

        let url = baseURL;
        const urlParams = new URLSearchParams();

        if (baseURL.includes("/trending/")) {
            // Trending endpoint
            urlParams.set("limit", String(limit));
            urlParams.set("offset", String(offset));
        } else {
            // Search endpoint
            urlParams.set("page[limit]", String(limit));
            urlParams.set("page[offset]", String(offset));

            if (searchText) {
                urlParams.set("filter[text]", searchText);
            }
            if (sort) {
                urlParams.set("sort", sort);
            }
        }

        url = `${baseURL}?${urlParams.toString()}`;
        const response = await apiClient.get(url);
        return response.data;
    }
}
