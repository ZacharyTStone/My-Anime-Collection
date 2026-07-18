import { describe, it, expect } from "vitest";
import { animesToCsv, animesToJson, escapeCsvField } from "../exportCollection";
import type { CollectionAnime } from "../fetchAllAnimes";

const makeAnime = (overrides: Partial<CollectionAnime> = {}): CollectionAnime => ({
  _id: "abc123",
  title: "Attack on Titan",
  rating: 85,
  episodeCount: 25,
  playlistID: "1",
  createdAt: "2024-01-15T10:00:00.000Z",
  ...overrides,
});

describe("escapeCsvField", () => {
  it("returns an empty string for null and undefined", () => {
    expect(escapeCsvField(null)).toBe("");
    expect(escapeCsvField(undefined)).toBe("");
  });

  it("passes plain values through untouched", () => {
    expect(escapeCsvField("Attack on Titan")).toBe("Attack on Titan");
    expect(escapeCsvField(85)).toBe("85");
  });

  it("quotes fields containing commas, quotes, or newlines", () => {
    expect(escapeCsvField("One, Two")).toBe('"One, Two"');
    expect(escapeCsvField("line1\nline2")).toBe('"line1\nline2"');
    expect(escapeCsvField('Say "hi"')).toBe('"Say ""hi"""');
  });
});

describe("animesToCsv", () => {
  it("produces a header row and one row per anime", () => {
    const csv = animesToCsv([makeAnime(), makeAnime({ title: "Frieren" })]);
    const lines = csv.split("\n");

    expect(lines[0]).toBe("title,rating,episodeCount,playlistID,createdAt");
    expect(lines).toHaveLength(3);
    expect(lines[1]).toBe("Attack on Titan,85,25,1,2024-01-15T10:00:00.000Z");
    expect(lines[2]).toBe("Frieren,85,25,1,2024-01-15T10:00:00.000Z");
  });

  it("escapes titles containing commas and quotes", () => {
    const csv = animesToCsv([makeAnime({ title: 'K-On!, "The Movie"' })]);
    expect(csv.split("\n")[1]).toBe(
      '"K-On!, ""The Movie""",85,25,1,2024-01-15T10:00:00.000Z'
    );
  });

  it("handles missing optional fields as empty cells", () => {
    const csv = animesToCsv([
      makeAnime({ rating: undefined, episodeCount: null, createdAt: undefined }),
    ]);
    expect(csv.split("\n")[1]).toBe("Attack on Titan,,,1,");
  });

  it("returns only the header for an empty collection", () => {
    expect(animesToCsv([])).toBe("title,rating,episodeCount,playlistID,createdAt");
  });
});

describe("animesToJson", () => {
  it("pretty-prints the collection as a JSON array", () => {
    const animes = [makeAnime()];
    expect(animesToJson(animes)).toBe(JSON.stringify(animes, null, 2));
    expect(JSON.parse(animesToJson(animes))).toEqual(animes);
  });
});
