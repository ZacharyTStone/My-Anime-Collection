import express, { Router } from "express";
const router: Router = express.Router();

import {
  register,
  login,
  updateUser,
  deleteUser,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { apiLimiter10, apiLimiter500 } from "../utils/rateLimiters.js";
import { loginSchema, registerSchema, updateUserSchema } from "../utils/schemas.js";

// Define the routes
router.route("/register").post(apiLimiter10, validate(registerSchema), register);
router.route("/login").post(apiLimiter500, validate(loginSchema), login);
router.route("/updateUser").patch(apiLimiter500, authenticateUser, validate(updateUserSchema), updateUser);
router.route("/deleteUser").delete(apiLimiter500, authenticateUser, deleteUser);

export default router;
