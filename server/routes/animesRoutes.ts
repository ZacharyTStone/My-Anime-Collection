import express, { Request, Response, Router } from "express";
const router: Router = express.Router();

import {
  createAnime,
  deleteAnime,
  getAnimes,
} from "../controllers/animesController.js"; // Add .js extension

// Import middleware functions
import rateLimiter from "express-rate-limit";

// Define the rate limiter middleware
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

// Define the routes
router
  .route("/")
  .post(apiLimiter, createAnime) // POST /api/v1/animes
  .get(getAnimes); // GET /api/v1/animes

// :id is a dynamic parameter
router.route("/:id").delete(deleteAnime); // DELETE /api/v1/animes/:id

export default router;
