import { apiClient } from "./axiosInstance";
import { API_ENDPOINTS } from "./endpoints";

/**
 * Interface for playlist data
 */
export interface PlaylistData {
    id: string;
    title: string;
    userID: string;
    isDemoUserPlaylist?: boolean;
}

/**
 * Interface for playlist response
 */
export interface PlaylistResponse {
    playlists: PlaylistData[];
}

/**
 * Interface for create playlist data
 */
export interface CreatePlaylistData {
    title?: string;
}

/**
 * Interface for update playlist data
 */
export interface UpdatePlaylistData {
    title: string;
}

/**
 * Playlist service class
 */
export class PlaylistService {
    /**
     * Get all playlists for the current user
     * @returns Promise with playlist list
     */
    static async getPlaylists(): Promise<PlaylistResponse> {
        const response = await apiClient.get(API_ENDPOINTS.PLAYLIST.BASE);
        return response.data.data;
    }

    /**
     * Create a new playlist
     * @param playlistData - Playlist data to create
     * @returns Promise with created playlist
     */
    static async createPlaylist(playlistData?: CreatePlaylistData): Promise<{ playlist: PlaylistData }> {
        const response = await apiClient.post(API_ENDPOINTS.PLAYLIST.BASE, playlistData || {});
        return response.data.data;
    }

    /**
     * Update a playlist by ID
     * @param playlistId - ID of playlist to update
     * @param playlistData - Updated playlist data
     * @returns Promise with updated playlist
     */
    static async updatePlaylist(playlistId: string, playlistData: UpdatePlaylistData): Promise<{ playlist: PlaylistData }> {
        const response = await apiClient.patch(API_ENDPOINTS.PLAYLIST.BY_ID(playlistId), playlistData);
        return response.data.data;
    }

    /**
     * Delete a playlist by ID
     * @param playlistId - ID of playlist to delete
     * @returns Promise with deletion result
     */
    static async deletePlaylist(playlistId: string): Promise<{ message: string }> {
        const response = await apiClient.delete(API_ENDPOINTS.PLAYLIST.BY_ID(playlistId));
        return response.data.data;
    }
}
