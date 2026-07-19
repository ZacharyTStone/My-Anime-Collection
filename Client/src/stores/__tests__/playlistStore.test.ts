import { describe, it, expect, beforeEach } from "vitest";
import { usePlaylistStore, DEFAULT_PLAYLIST } from "../playlistStore";

beforeEach(() => {
  usePlaylistStore.setState({
    currentPlaylist: { ...DEFAULT_PLAYLIST },
  });
});

describe("playlistStore", () => {
  describe("setCurrentPlaylist", () => {
    it("sets the current playlist", () => {
      const playlist = {
        id: "1",
        title: "Favorites",
        userId: "u1",
        createdAt: "",
        updatedAt: "",
      };

      usePlaylistStore.getState().setCurrentPlaylist(playlist);

      expect(usePlaylistStore.getState().currentPlaylist).toEqual(playlist);
    });

    it("replaces the previous playlist", () => {
      usePlaylistStore.getState().setCurrentPlaylist({
        id: "1",
        title: "Favorites",
        userId: "u1",
        createdAt: "",
        updatedAt: "",
      });
      usePlaylistStore.getState().setCurrentPlaylist({
        id: "2",
        title: "Watch Later",
        userId: "u1",
        createdAt: "",
        updatedAt: "",
      });

      const state = usePlaylistStore.getState();
      expect(state.currentPlaylist.id).toBe("2");
      expect(state.currentPlaylist.title).toBe("Watch Later");
    });
  });
});
