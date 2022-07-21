import express from "express";
const router = express.Router();

import {
  createAnime,
  deleteAnime,
  getAnimes,
} from "../controllers/animesController.js";

// the apiLimiter middleware is used to limit the number of requests for registering and logging in
import rateLimiter from "express-rate-limit";
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

// the base URL
// app.use("/api/v1/animes", authenticateUser, animesRouter);

router.route("/").post(apiLimiter, createAnime).get(getAnimes);
// :id is a dynamic parameter
router.route("/:id").delete(deleteAnime);

export default router;
