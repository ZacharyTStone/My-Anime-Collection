import express from "express";
const router = express.Router();

import {
  createPlaylist,
  deletePlaylist,
  getPlaylists,
  updatePlaylist,
} from "../controllers/playlistsController.js";

// the base URL
// app.use("/api/v1/playlists", authenticateUser, playlistsRouter);

router.route("/").post(createPlaylist).get(getPlaylists);
// :id is a dynamic parameter
router.route("/:id").delete(deletePlaylist).put(updatePlaylist);

export default router;
