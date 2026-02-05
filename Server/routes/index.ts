import { Router } from "express";
import authRouter from "./authRoutes.js";
import animesRouter from "./animesRoutes.js";
import playlistsRouter from "./playlistsRoutes.js";
import authenticateUser from "../middleware/auth.js";
import { apiLimiter2000 } from "../utils/rateLimiters.js";

const router = Router();

// API version prefix
const API_PREFIX = "/api/v1";

// Public routes
router.use(`${API_PREFIX}/auth`, authRouter);

// Protected routes with rate limiting
router.use(`${API_PREFIX}/animes`, apiLimiter2000, authenticateUser, animesRouter);
router.use(`${API_PREFIX}/playlists`, apiLimiter2000, authenticateUser, playlistsRouter);

export default router;
