import express from "express";
const router = express.Router();

// the apiLimiter middleware is used to limit the number of requests for registering and logging in
import rateLimiter from "express-rate-limit";
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

// The base URL
// app.use("/api/v1/auth", authRouter);

import {
  register,
  login,
  updateUser,
  deleteUser,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";
router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/deleteUser").delete(authenticateUser, deleteUser);

export default router;
