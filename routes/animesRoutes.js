import express from "express";
const router = express.Router();

import {
  createAnime,
  deleteAnime,
  getAnimes,
} from "../controllers/animesController.js";

// the base URL
// app.use("/api/v1/animes", authenticateUser, animesRouter);

router.route("/").post(createAnime).get(getAnimes);
// remember about :id
router.route("/:id").delete(deleteAnime);

export default router;
