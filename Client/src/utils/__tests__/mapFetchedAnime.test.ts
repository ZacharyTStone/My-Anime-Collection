import { describe, it, expect, vi } from "vitest";
import { mapFetchedAnime } from "../mapFetchedAnime";
import type { ExpectedFetchedAnimeResponse } from "../types";

vi.mock("dompurify", () => ({
  default: { sanitize: (s: string) => s },
}));

const makeFetched = (
  overrides: Partial<ExpectedFetchedAnimeResponse> = {}
): ExpectedFetchedAnimeResponse => ({
  id: "123",
  attributes: {
    titles: { en: "Attack on Titan", en_jp: "Shingeki no Kyojin", ja_jp: "進撃の巨人" },
    canonicalTitle: "Shingeki no Kyojin",
    averageRating: 85,
    subtype: "TV",
    episodeCount: 25,
    startDate: "2013-04-07",
    synopsis: "Humans vs Titans",
    posterImage: { medium: "https://img/med.jpg", small: "https://img/sm.jpg" },
    youtubeVideoId: "abc123",
  },
  ...overrides,
});

describe("mapFetchedAnime", () => {
  it("maps all fields from a complete response", () => {
    const result = mapFetchedAnime(makeFetched());

    expect(result).toEqual({
      _id: "123",
      title: "Attack on Titan",
      rating: 85,
      episodeCount: 25,
      format: "TV",
      creationDate: "2013-04-07",
      synopsis: "Humans vs Titans",
      coverImage: "https://img/med.jpg",
      youtubeVideoId: "abc123",
      japanese_title: "進撃の巨人",
      fetchedAnime: makeFetched(),
    });
  });

  it("falls back to en_jp title when en is missing", () => {
    const anime = makeFetched();
    delete anime.attributes!.titles!.en;
    const result = mapFetchedAnime(anime);
    expect(result.title).toBe("Shingeki no Kyojin");
  });

  it("returns 'Title N/A' when no titles exist", () => {
    const anime = makeFetched({ attributes: {} });
    const result = mapFetchedAnime(anime);
    expect(result.title).toBe("Title N/A");
  });

  it("handles missing attributes gracefully", () => {
    const result = mapFetchedAnime({ id: "999" });
    expect(result._id).toBe("999");
    expect(result.rating).toBe("N/A");
    expect(result.episodeCount).toBeNull();
    expect(result.synopsis).toBe("No synopsis available");
    expect(result.coverImage).toBe("");
  });

  it("uses small poster when medium is missing", () => {
    const anime = makeFetched();
    anime.attributes!.posterImage = { medium: "", small: "https://img/sm.jpg" };
    const result = mapFetchedAnime(anime);
    expect(result.coverImage).toBe("https://img/sm.jpg");
  });

  it("falls back japanese_title through en_jp then canonicalTitle", () => {
    const anime = makeFetched();
    delete anime.attributes!.titles!.ja_jp;
    expect(mapFetchedAnime(anime).japanese_title).toBe("Shingeki no Kyojin");

    delete anime.attributes!.titles!.en_jp;
    expect(mapFetchedAnime(anime).japanese_title).toBe("Shingeki no Kyojin"); // canonicalTitle
  });
});
