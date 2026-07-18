import express, { Router } from "express";
const router: Router = express.Router();

import {
  createAnime,
  deleteAnime,
  getAnimes,
  getAnimeStats,
  getRecommendations,
} from "../controllers/animesController.js";
import { validate } from "../middleware/validate.js";
import { apiLimiter50, apiLimiter500, apiLimiter2000 } from "../utils/rateLimiters.js";
import { createAnimeSchema, recommendationsSchema } from "../utils/schemas.js";

router
  .route("/")
  .post(apiLimiter500, validate(createAnimeSchema), createAnime)
  .get(apiLimiter2000, getAnimes);

router.route("/recommendations").post(apiLimiter50, validate(recommendationsSchema), getRecommendations);

router.route("/stats").get(apiLimiter2000, getAnimeStats);

router.route("/:id").delete(apiLimiter500, deleteAnime);

export default router;
