import express, { Request, Response, Router } from "express";
const router: Router = express.Router();

import {
  createPlaylist,
  deletePlaylist,
  getPlaylists,
  updatePlaylist,
} from "../controllers/playlistsController.js"; // Add .js extension

// Import middleware functions
import rateLimiter from "express-rate-limit";

// Define rate limiter middlewares
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

// Define the routes
router
  .route("/")
  .post(apiLimiterSmall, createPlaylist) // POST /api/v1/playlists
  .get(apiLimiterLarge, getPlaylists); // GET /api/v1/playlists

// :id is a dynamic parameter
router
  .route("/:id")
  .delete(deletePlaylist) // DELETE /api/v1/playlists/:id
  .put(apiLimiterLarge, updatePlaylist); // PUT /api/v1/playlists/:id

export default router;
