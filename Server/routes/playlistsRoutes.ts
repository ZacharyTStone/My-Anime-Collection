import express, { Request, Response, Router } from "express";
const router: Router = express.Router();

import {
  createPlaylist,
  deletePlaylist,
  getPlaylists,
  updatePlaylist,
} from "../controllers/playlistsController.js";

import { apiLimiter2000, apiLimiter50 } from "../utils/rateLimiters.js";

// Define the routes
router
  .route("/")
  .post(apiLimiter50, createPlaylist) // POST /api/v1/playlists
  .get(apiLimiter2000, getPlaylists); // GET /api/v1/playlists

// :id is a dynamic parameter
router
  .route("/:id")
  .delete(apiLimiter2000, deletePlaylist) // DELETE /api/v1/playlists/:id
  .put(apiLimiter2000, updatePlaylist); // PUT /api/v1/playlists/:id

export default router;
