import { describe, it, expect, vi, beforeEach } from "vitest";
import { usePlaylistStore } from "../playlistStore";

vi.mock("../../utils/api", () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
  },
  registerLogoutHandler: vi.fn(),
}));

vi.mock("../authStore", () => ({
  useAuthStore: {
    getState: () => ({ token: "mock-token" }),
  },
}));

vi.mock("../../utils/handleApiError", () => ({
  handleApiError: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

beforeEach(() => {
  usePlaylistStore.setState({
    currentPlaylist: { id: "2", title: "", userId: "", createdAt: "", updatedAt: "" },
    userPlaylists: [],
    loadingFetchPlaylists: false,
  });
});

describe("playlistStore", () => {
  describe("handlePlaylistChange", () => {
    it("sets currentPlaylist to the matching playlist", () => {
      const playlists = [
        { id: "1", title: "Favorites", userId: "u1", createdAt: "", updatedAt: "" },
        { id: "2", title: "Watch Later", userId: "u1", createdAt: "", updatedAt: "" },
      ];
      usePlaylistStore.setState({ userPlaylists: playlists });

      usePlaylistStore.getState().handlePlaylistChange({ value: "1" });

      expect(usePlaylistStore.getState().currentPlaylist.title).toBe("Favorites");
    });

    it("does nothing when no playlist matches", () => {
      usePlaylistStore.getState().handlePlaylistChange({ value: "nonexistent" });
      expect(usePlaylistStore.getState().currentPlaylist.id).toBe("2");
    });
  });

  describe("getPlaylists", () => {
    it("fetches and sets playlists", async () => {
      const { apiClient } = await import("../../utils/api");
      const mockGet = vi.mocked(apiClient.get);
      mockGet.mockResolvedValueOnce({
        data: {
          playlists: [
            { id: "10", title: "My List", userId: "u1", createdAt: "", updatedAt: "" },
          ],
        },
      });

      await usePlaylistStore.getState().getPlaylists();

      const state = usePlaylistStore.getState();
      expect(state.loadingFetchPlaylists).toBe(false);
      expect(state.userPlaylists).toHaveLength(1);
      expect(state.userPlaylists[0].title).toBe("My List");
    });
  });
});
