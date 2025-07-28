import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// Load environment variables
dotenv.config();

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

// Constants
const DEFAULT_PORT = 5001;
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Create and configure Express application
 */
const createApp = (): express.Application => {
  const app = express();

  // Configure security middleware
  configureSecurity(app);

  // Parse JSON requests
  app.use(express.json({ limit: "10mb" }));

  // API Routes
  app.use("/api/v1", routes);

  // Error handling middleware
  app.use(errorHandlerMiddleware);

  // Serve static files for production
  app.use(express.static(path.resolve(__dirname, "../Client/build")));

  // Handle client-side routing
  app.get("*", apiLimiter500, (req, res) => {
    res.sendFile(path.resolve(__dirname, "../Client/build", "index.html"));
  });

  return app;
};

/**
 * Handle uncaught exceptions
 */
const handleUncaughtException = (error: Error): void => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
};

/**
 * Handle unhandled promise rejections
 */
const handleUnhandledRejection = (reason: any, promise: Promise<any>): void => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
};

/**
 * Start the server
 */
const startServer = async (): Promise<void> => {
  try {
    const port = process.env.PORT || DEFAULT_PORT;
    const mongoUrl = process.env.MONGO_URL;

    if (!mongoUrl) {
      throw new Error("MONGO_URL environment variable is required");
    }

    // Connect to database
    await connectDB(mongoUrl);
    console.log("Database connected successfully");

    // Create and start server
    const app = createApp();
    const server = app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });

    // Handle server errors
    server.on("error", (error: Error) => {
      console.error("Server error:", error);
      process.exit(1);
    });

    // Graceful shutdown
    const gracefulShutdown = (signal: string) => {
      console.log(`Received ${signal}. Starting graceful shutdown...`);
      server.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Set up global error handlers
process.on("uncaughtException", handleUncaughtException);
process.on("unhandledRejection", handleUnhandledRejection);

// Start the application
startServer();
