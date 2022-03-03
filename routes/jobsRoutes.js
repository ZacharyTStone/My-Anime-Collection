import express from "express";
const router = express.Router();

import {
  createAnime,
  deleteAnime,
  getAllAnimes,
} from "../controllers/jobsController.js";

router.route("/").post(createAnime).get(getAllAnimes);
// remember about :id
router.route("/:id").delete(deleteAnime);

export default router;
