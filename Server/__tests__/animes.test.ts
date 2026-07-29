import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import Anime from "../models/Anime.js";
import Playlist from "../models/Playlists.js";
import { registerAndGetAuth } from "./helpers.js";

let token: string;
let userId: mongoose.Types.ObjectId;
let playlistIds: Record<string, mongoose.Types.ObjectId> = {};

const seedAnime = (overrides: Record<string, unknown> = {}): Record<string, unknown> => ({
  createdBy: userId,
  id: Math.floor(Math.random() * 1_000_000_000),
  title: "Untitled",
  playlistID: playlistIds["0"],
  rating: 5,
  ...overrides,
});

// The DB is wiped between tests, so register a fresh user each time —
// the animes endpoint looks the caller up by JWT, not by persisted user.
beforeEach(async () => {
  ({ token, userId } = await registerAndGetAuth());
  const playlists = await Playlist.find({ userID: userId }).lean();
  playlistIds = Object.fromEntries(playlists.map((p) => [p.id, p._id as mongoose.Types.ObjectId]));
});

describe("animes controller", () => {
  it("creates an anime and rejects duplicates in the same playlist", async () => {
    const payload = { id: 101, title: "Cowboy Bebop", playlistID: "0" };

    const createRes = await request(app)
      .post("/api/v1/animes")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);
    expect(createRes.status).toBe(201);
    expect(createRes.body.anime.title).toBe("Cowboy Bebop");
    expect(createRes.body.anime.createdBy).toBe(userId.toString());
    expect(createRes.body.anime.playlistID).toBe("0");

    const dupRes = await request(app)
      .post("/api/v1/animes")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);
    expect(dupRes.status).toBe(400);
  });

  it("paginates results with page/limit", async () => {
    await Anime.insertMany(
      Array.from({ length: 25 }, (_, i) =>
        seedAnime({
          title: `Anime ${String(i + 1).padStart(2, "0")}`,
          rating: (i % 10) + 1,
        })
      )
    );

    const page1 = await request(app)
      .get("/api/v1/animes")
      .set("Authorization", `Bearer ${token}`)
      .query({ currentPlaylistID: "0", page: "1", limit: "10" });
    expect(page1.status).toBe(200);
    expect(page1.body.animes).toHaveLength(10);
    expect(page1.body.totalAnimes).toBe(25);
    expect(page1.body.numOfPages).toBe(3);

    const page3 = await request(app)
      .get("/api/v1/animes")
      .set("Authorization", `Bearer ${token}`)
      .query({ currentPlaylistID: "0", page: "3", limit: "10" });
    expect(page3.status).toBe(200);
    expect(page3.body.animes).toHaveLength(5);
  });

  it("sorts a-z and by rating", async () => {
    await Anime.insertMany([
      seedAnime({ title: "Zeta", rating: 3 }),
      seedAnime({ title: "Alpha", rating: 9 }),
      seedAnime({ title: "Mid", rating: 6 }),
    ]);

    const azRes = await request(app)
      .get("/api/v1/animes")
      .set("Authorization", `Bearer ${token}`)
      .query({ currentPlaylistID: "0", sort: "a-z" });
    expect(azRes.status).toBe(200);
    expect(azRes.body.animes.map((a: { title: string }) => a.title)).toEqual([
      "Alpha",
      "Mid",
      "Zeta",
    ]);

    const ratingRes = await request(app)
      .get("/api/v1/animes")
      .set("Authorization", `Bearer ${token}`)
      .query({ currentPlaylistID: "0", sort: "rating" });
    expect(ratingRes.status).toBe(200);
    expect(ratingRes.body.animes.map((a: { rating: number }) => a.rating)).toEqual([9, 6, 3]);
  });

  it("escapes regex special characters in search", async () => {
    await Anime.insertMany([seedAnime({ title: "Foo.Bar" }), seedAnime({ title: "FooXBar" })]);

    const res = await request(app)
      .get("/api/v1/animes")
      .set("Authorization", `Bearer ${token}`)
      .query({ currentPlaylistID: "0", search: "Foo.Bar" });

    expect(res.status).toBe(200);
    // Unescaped, the "Foo.Bar" pattern would also match "FooXBar"
    expect(res.body.animes).toHaveLength(1);
    expect(res.body.animes[0].title).toBe("Foo.Bar");
  });

  it("searches case-insensitively", async () => {
    await Anime.insertMany([seedAnime({ title: "Attack on Titan" })]);

    const res = await request(app)
      .get("/api/v1/animes")
      .set("Authorization", `Bearer ${token}`)
      .query({ currentPlaylistID: "0", search: "attack" });

    expect(res.status).toBe(200);
    expect(res.body.animes).toHaveLength(1);
  });

  it("filters animes by playlist", async () => {
    await Anime.insertMany([
      seedAnime({ title: "InZero", playlistID: playlistIds["0"] }),
      seedAnime({ title: "InOne", playlistID: playlistIds["1"] }),
      seedAnime({ title: "InOneToo", playlistID: playlistIds["1"] }),
    ]);

    const zeroRes = await request(app)
      .get("/api/v1/animes")
      .set("Authorization", `Bearer ${token}`)
      .query({ currentPlaylistID: "0" });
    expect(zeroRes.body.animes.map((a: { title: string }) => a.title)).toEqual(["InZero"]);

    const oneRes = await request(app)
      .get("/api/v1/animes")
      .set("Authorization", `Bearer ${token}`)
      .query({ currentPlaylistID: "1" });
    expect(oneRes.body.totalAnimes).toBe(2);
  });
});
