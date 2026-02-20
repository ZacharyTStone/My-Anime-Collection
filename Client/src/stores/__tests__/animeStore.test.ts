import { describe, it, expect, beforeEach } from "vitest";
import { useAnimeStore } from "../animeStore";

beforeEach(() => {
  // Reset store to initial state between tests
  useAnimeStore.setState({
    loadingMyAnimes: false,
    loadingItemIds: [],
    animes: [],
    totalAnimes: 0,
    numOfPages: 1,
    page: 1,
    search: "",
    searchStatus: "all",
    searchStared: "all",
    searchType: "all",
    sort: "latest",
    fetchedAnimes: [],
    totalFetchedAnimes: 0,
    numOfFetchedAnimesPages: 0,
    loadingFetchAnimes: false,
  });
});

describe("animeStore", () => {
  describe("handleChange", () => {
    it("updates the specified filter field and resets page to 1", () => {
      useAnimeStore.setState({ page: 3 });
      useAnimeStore.getState().handleChange({ name: "search", value: "naruto" });

      const state = useAnimeStore.getState();
      expect(state.search).toBe("naruto");
      expect(state.page).toBe(1);
    });

    it("updates searchStatus", () => {
      useAnimeStore.getState().handleChange({ name: "searchStatus", value: "completed" });
      expect(useAnimeStore.getState().searchStatus).toBe("completed");
    });

    it("updates sort", () => {
      useAnimeStore.getState().handleChange({ name: "sort", value: "a-z" });
      expect(useAnimeStore.getState().sort).toBe("a-z");
    });
  });

  describe("clearValues", () => {
    it("resets all filter fields to defaults", () => {
      useAnimeStore.setState({
        page: 5,
        search: "one piece",
        searchStatus: "watching",
        searchType: "TV",
        searchStared: "true",
        sort: "a-z",
      });

      useAnimeStore.getState().clearValues();
      const state = useAnimeStore.getState();

      expect(state.page).toBe(1);
      expect(state.search).toBe("");
      expect(state.searchStatus).toBe("all");
      expect(state.searchType).toBe("all");
      expect(state.searchStared).toBe("all");
      expect(state.sort).toBe("latest");
    });
  });

  describe("changePage", () => {
    it("sets the page number", () => {
      useAnimeStore.getState().changePage(7);
      expect(useAnimeStore.getState().page).toBe(7);
    });
  });

  describe("resetFetchedAnimes", () => {
    it("clears fetched animes and resets counts", () => {
      useAnimeStore.setState({
        fetchedAnimes: [{ id: "1" }],
        totalFetchedAnimes: 100,
        numOfFetchedAnimesPages: 6,
      });

      useAnimeStore.getState().resetFetchedAnimes();
      const state = useAnimeStore.getState();

      expect(state.fetchedAnimes).toEqual([]);
      expect(state.totalFetchedAnimes).toBe(0);
      expect(state.numOfFetchedAnimesPages).toBe(0);
    });
  });

  describe("isItemLoading", () => {
    it("returns true when id is in loadingItemIds", () => {
      useAnimeStore.setState({ loadingItemIds: ["abc", "def"] });
      expect(useAnimeStore.getState().isItemLoading("abc")).toBe(true);
    });

    it("returns false when id is not in loadingItemIds", () => {
      useAnimeStore.setState({ loadingItemIds: ["abc"] });
      expect(useAnimeStore.getState().isItemLoading("xyz")).toBe(false);
    });
  });
});
