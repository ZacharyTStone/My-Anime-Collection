import { logger } from "./utils/logger.js";

// Database
import connectDB from "./db/connect.js";

// App (constructed without listening so tests can import it)
import app from "./app.js";

// Validate required environment variables
import { env } from "./config/env.js";

// Start the server
const start = async () => {
  try {
    await connectDB(env.MONGO_URL);
    const server = app.listen(env.PORT, () => {
      logger.info(`Server is listening on port ${env.PORT}`);
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
