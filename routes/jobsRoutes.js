import express from "express";
const router = express.Router();

import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
} from "../controllers/jobsController.js";

router.route("/").post(createJob).get(getAllJobs);
// remember about :id
router.route("/:id").delete(deleteJob).patch(updateJob);

export default router;
