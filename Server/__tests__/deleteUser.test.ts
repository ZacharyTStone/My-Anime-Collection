import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";
import Anime from "../models/Anime.js";
import Playlist from "../models/Playlists.js";
import User from "../models/User.js";
import { registerAndGetAuth } from "./helpers.js";

describe("deleteUser cascade", () => {
  it("removes the user's playlists and animes, leaving other users untouched", async () => {
    const user1 = await registerAndGetAuth();
    const user2 = await registerAndGetAuth();

    const user1Default = await Playlist.findOne({
      id: "0",
      userID: user1.userId,
    }).lean();
    const user2Default = await Playlist.findOne({
      id: "0",
      userID: user2.userId,
    }).lean();

    // Give user1 an extra playlist and some animes
    await Playlist.create({
      title: "User1 Extra",
      id: "user1-extra",
      userID: user1.userId,
      isDemoUserPlaylist: false,
    });
    await Anime.create({
      createdBy: user1.userId,
      id: 1,
      title: "User1 Anime",
      playlistID: user1Default?._id as import("mongoose").Types.ObjectId,
    });
    // Give user2 an anime that must survive the cascade
    await Anime.create({
      createdBy: user2.userId,
      id: 2,
      title: "User2 Anime",
      playlistID: user2Default?._id as import("mongoose").Types.ObjectId,
    });

    const deleteRes = await request(app)
      .delete("/api/v1/auth/deleteUser")
      .set("Authorization", `Bearer ${user1.token}`);
    expect(deleteRes.status).toBe(200);

    // user1 fully gone — playlists are keyed by `userID`, animes by `createdBy`
    expect(await User.countDocuments({ _id: user1.userId })).toBe(0);
    expect(await Playlist.countDocuments({ userID: user1.userId })).toBe(0);
    expect(await Anime.countDocuments({ createdBy: user1.userId })).toBe(0);

    // user2 untouched
    expect(await User.countDocuments({ _id: user2.userId })).toBe(1);
    expect(await Playlist.countDocuments({ userID: user2.userId })).toBe(3);
    expect(await Anime.countDocuments({ createdBy: user2.userId })).toBe(1);

    // user2 can still use the API
    const res = await request(app)
      .get("/api/v1/animes")
      .set("Authorization", `Bearer ${user2.token}`)
      .query({ currentPlaylistID: "0" });
    expect(res.status).toBe(200);
    expect(res.body.animes).toHaveLength(1);
  });
});
