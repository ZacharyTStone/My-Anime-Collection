import express from "express";
const router = express.Router();

import {
  createPlaylist,
  deletePlaylist,
  getPlaylists,
  updatePlaylist,
} from "../controllers/playlistsController.js";

// the apiLimiter middleware is used to limit the number of requests for registering and logging in
import rateLimiter from "express-rate-limit";
const apiLimiterSmall = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

const apiLimiterLarge = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3000,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

// the base URL
// app.use("/api/v1/playlists", authenticateUser, playlistsRouter);

router
  .route("/")
  .post(apiLimiterSmall, createPlaylist)
  .get(apiLimiterLarge, getPlaylists);
// :id is a dynamic parameter
router
  .route("/:id")
  .delete(deletePlaylist)
  .put(apiLimiterLarge, updatePlaylist);

export default router;
