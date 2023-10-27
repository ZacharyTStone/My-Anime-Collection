import express, { Request, Response, Router } from "express";
const router: Router = express.Router();

import {
  register,
  login,
  updateUser,
  deleteUser,
} from "../controllers/authController.js"; // Add .js extension
import authenticateUser from "../middleware/auth.js"; // Add .js extension

import { apiLimiter10, apiLimiter500 } from "../utils/rateLimiters.js";


// Define the routes
router.route("/register").post(apiLimiter10, register); // POST /api/v1/auth/register
router.route("/login").post(apiLimiter500, login); // POST /api/v1/auth/login
router.route("/updateUser").patch(apiLimiter500, authenticateUser, updateUser); // PATCH /api/v1/auth/updateUser
router.route("/deleteUser").delete(apiLimiter500, authenticateUser, deleteUser); // DELETE /api/v1/auth/deleteUser

export default router;
