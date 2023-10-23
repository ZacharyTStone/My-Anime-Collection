import express, { Request, Response, Router } from "express";
const router: Router = express.Router();

// Import middleware functions
import rateLimiter from "express-rate-limit";

// Define the rate limiter middleware
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

const strictApiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: "Too many requests from this IP, please try again after 15 minutes",
});
// Import controller functions and middleware
import {
  register,
  login,
  updateUser,
  deleteUser,
} from "../controllers/authController.js"; // Add .js extension
import authenticateUser from "../middleware/auth.js"; // Add .js extension

// Define the routes
router.route("/register").post(strictApiLimiter, register); // POST /api/v1/auth/register
router.route("/login").post(apiLimiter, login); // POST /api/v1/auth/login
router.route("/updateUser").patch(apiLimiter, authenticateUser, updateUser); // PATCH /api/v1/auth/updateUser
router.route("/deleteUser").delete(apiLimiter, authenticateUser, deleteUser); // DELETE /api/v1/auth/deleteUser

export default router;
