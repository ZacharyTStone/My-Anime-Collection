import express, { Request, Response } from "express";
import dotenv from "dotenv";
import "express-async-errors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import { logger } from "./utils/logger.js";

// Load environment variables
dotenv.config();

// Validate required environment variables
import "./config/env.js";

// Configurations
import { configureSecurity } from "./middleware/security.js";

// Database
import connectDB from "./db/connect.js";

// Routes
import routes from "./routes/index.js";

// Middleware
import errorHandlerMiddleware from "./middleware/error-handler.js";

// Rate limiting
import { apiLimiter500 } from "./utils/rateLimiters.js";

// Start up the server
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

// Error handling middleware
app.use(errorHandlerMiddleware);

// DEPLOYMENT — serve static client build
const __dirname = dirname(fileURLToPath(import.meta.url));
const clientBuildPath = path.resolve(__dirname, "../Client/dist");

app.use(express.static(clientBuildPath));

app.get("*", apiLimiter500, (_req: Request, res: Response) => {
  res.sendFile(path.resolve(clientBuildPath, "index.html"));
});

// Start the server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL!);
    const server = app.listen(process.env.PORT || 5001, () => {
      logger.info(`Server is listening on port ${process.env.PORT || 5001}`);
    });

    // Graceful shutdown
    const shutdown = (signal: string) => {
      logger.info(`${signal} received — shutting down gracefully`);
      server.close(() => {
        logger.info("Server closed");
        process.exit(0);
      });
      // Force exit after 10s if connections don't close
      setTimeout(() => {
        logger.error("Forced shutdown — connections did not close in time");
        process.exit(1);
      }, 10_000);
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));

    server.on("error", (error: Error) => {
      logger.error("Server error", error);
      process.exit(1);
    });
  } catch (error) {
    logger.error("Failed to start server", error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception", error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  logger.error("Unhandled Rejection", error);
  process.exit(1);
});

start();
