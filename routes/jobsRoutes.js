import express from "express";
const router = express.Router();

import {
  createJob,
  deleteJob,
  getAllJobs,
} from "../controllers/jobsController.js";

router.route("/").post(createJob).get(getAllJobs);
// remember about :id
router.route("/:id").delete(deleteJob);

export default router;
