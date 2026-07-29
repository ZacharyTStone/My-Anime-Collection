import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import Anime from "../models/Anime.js";
import Playlist from "../models/Playlists.js";
import { registerAndGetAuth } from "./helpers.js";

let token: string;
let userId: mongoose.Types.ObjectId;

beforeEach(async () => {
  ({ token, userId } = await registerAndGetAuth());
});

describe("playlists controller", () => {
  it("lists the three default playlists after registration", async () => {
    const res = await request(app).get("/api/v1/playlists").set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.playlists).toHaveLength(3);
    expect(res.body.playlists.map((p: { id: string }) => p.id).sort()).toEqual(["0", "1", "2"]);
  });

  it("creates, updates, and deletes a playlist (happy path)", async () => {
    const createRes = await request(app)
      .post("/api/v1/playlists")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "My Custom List" });
    expect(createRes.status).toBe(201);

    const listRes = await request(app)
      .get("/api/v1/playlists")
      .set("Authorization", `Bearer ${token}`);
    expect(listRes.body.playlists).toHaveLength(4);
    const custom = listRes.body.playlists.find(
      (p: { id: string }) => !["0", "1", "2"].includes(p.id)
    );
    expect(custom).toBeDefined();

    const updateRes = await request(app)
      .put(`/api/v1/playlists/${custom.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Renamed List" });
    expect(updateRes.status).toBe(200);
    expect(updateRes.body.playlist.title).toBe("Renamed List");

    const deleteRes = await request(app)
      .delete(`/api/v1/playlists/${custom.id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(deleteRes.status).toBe(200);

    const finalRes = await request(app)
      .get("/api/v1/playlists")
      .set("Authorization", `Bearer ${token}`);
    expect(finalRes.body.playlists).toHaveLength(3);
  });

  it("deleting a playlist cascades to its animes (transaction)", async () => {
    const doomedPlaylist = await Playlist.create({
      title: "Doomed",
      id: "doomed-playlist",
      userID: userId,
      isDemoUserPlaylist: false,
    });
    const defaultPlaylist = await Playlist.findOne({
      id: "0",
      userID: userId,
    }).lean();

    await Anime.create({
      createdBy: userId,
      id: 55,
      title: "Doomed Anime",
      playlistID: doomedPlaylist._id,
    });
    await Anime.create({
      createdBy: userId,
      id: 56,
      title: "Safe Anime",
      playlistID: defaultPlaylist?._id as mongoose.Types.ObjectId,
    });

    const deleteRes = await request(app)
      .delete("/api/v1/playlists/doomed-playlist")
      .set("Authorization", `Bearer ${token}`);
    expect(deleteRes.status).toBe(200);

    expect(await Playlist.countDocuments({ id: "doomed-playlist" })).toBe(0);
    expect(await Anime.countDocuments({ playlistID: doomedPlaylist._id })).toBe(0);
    expect(await Anime.countDocuments({ title: "Safe Anime" })).toBe(1);
  });

  it.each(["0", "1", "2"])("refuses to delete default playlist %s", async (defaultId) => {
    const res = await request(app)
      .delete(`/api/v1/playlists/${defaultId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(400);
    expect(res.body.msg).toMatch(/cannot delete/i);
    expect(await Playlist.countDocuments({ id: defaultId })).toBe(1);
  });

  it("returns 400 when deleting a non-existent playlist", async () => {
    const res = await request(app)
      .delete("/api/v1/playlists/no-such-playlist")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(400);
  });
});
