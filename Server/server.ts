import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
// import morgan from "morgan";
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

// Start up the server
const app = express();

// Configure security middleware
configureSecurity(app);

// Get the app to use JSON as the default data format
app.use(express.json());

// API Routes
app.use(routes);

// Error handling middleware
app.use(errorHandlerMiddleware);

// HEROKU DEPLOYMENT
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "../Client/build")));

app.get("*", apiLimiter500, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../Client/build", "index.html"));
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  process.exit(1);
});

// Start the server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    const server = app.listen(process.env.PORT || 5001, () => {
      console.log(`Server is listening on port ${process.env.PORT || 5001}...`);
    });

    // Handle server errors
    server.on("error", (error) => {
      console.error("Server error:", error);
      process.exit(1);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

start();
