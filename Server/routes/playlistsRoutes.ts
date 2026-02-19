import express, { Router } from "express";
const router: Router = express.Router();

import {
  createPlaylist,
  deletePlaylist,
  getPlaylists,
  updatePlaylist,
} from "../controllers/playlistsController.js";
import { validate } from "../middleware/validate.js";
import { apiLimiter2000, apiLimiter50 } from "../utils/rateLimiters.js";
import { updatePlaylistSchema } from "../utils/schemas.js";

// Define the routes
router
  .route("/")
  .post(apiLimiter50, createPlaylist)
  .get(apiLimiter2000, getPlaylists);

// :id is a dynamic parameter
router
  .route("/:id")
  .delete(apiLimiter2000, deletePlaylist)
  .put(apiLimiter2000, validate(updatePlaylistSchema), updatePlaylist);

export default router;
