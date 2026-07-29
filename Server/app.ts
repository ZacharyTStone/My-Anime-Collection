import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// Load environment variables
dotenv.config();

// Validate required environment variables at startup
import "./config/env.js";

// Configurations
import { configureSecurity } from "./middleware/security.js";

// Routes
import routes from "./routes/index.js";

// Middleware
import errorHandlerMiddleware from "./middleware/error-handler.js";

// Rate limiting
import { apiLimiter500 } from "./utils/rateLimiters.js";

// App construction lives here (separate from server.ts) so tests can import
// the Express app without booting a listener.
const app = express();

// Health check endpoint (before security middleware so it's lightweight)
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

// Configure security middleware
configureSecurity(app);

// Get the app to use JSON as the default data format
app.use(express.json());

// API Routes
app.use(routes);

// DEPLOYMENT — serve static client build
const __dirname = dirname(fileURLToPath(import.meta.url));
const clientBuildPath = path.resolve(__dirname, "../Client/dist");

app.use(express.static(clientBuildPath));

// SPA fallback — serve index.html for every GET not handled above.
// Express 5 (path-to-regexp v8) rejects a bare "*"; "/{*splat}" matches all paths.
app.get("/{*splat}", apiLimiter500, (_req: Request, res: Response) => {
  res.sendFile(path.resolve(clientBuildPath, "index.html"));
});

// Error handling middleware (must be registered last)
app.use(errorHandlerMiddleware);

export default app;
