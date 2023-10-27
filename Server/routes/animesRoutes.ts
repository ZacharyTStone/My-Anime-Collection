import express, { Request, Response, Router } from "express";
const router: Router = express.Router();

import {
  createAnime,
  deleteAnime,
  getAnimes,
} from "../controllers/animesController.js"; // Add .js extension

import { apiLimiter500, apiLimiter2000 } from "../utils/rateLimiters.js";

router
  .route("/")
  .post(apiLimiter500, createAnime) // POST /api/v1/animes
  .get(apiLimiter2000, getAnimes); // GET /api/v1/animes

router.route("/:id").delete(apiLimiter500, deleteAnime); // DELETE /api/v1/animes/:id

export default router;
