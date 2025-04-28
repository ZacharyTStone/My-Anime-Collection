import { Router } from "express";
import authRouter from "./authRoutes.js";
import animesRouter from "./animesRoutes.js";
import playlistsRouter from "./playlistsRoutes.js";
import authenticateUser from "../middleware/auth.js";

const router = Router();

// API version prefix
const API_PREFIX = "/api/v1";

// Public routes
router.use(`${API_PREFIX}/auth`, authRouter);

// Protected routes
router.use(`${API_PREFIX}/animes`, authenticateUser, animesRouter);
router.use(`${API_PREFIX}/playlists`, authenticateUser, playlistsRouter);

export default router;
