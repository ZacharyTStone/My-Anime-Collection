import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// Protections
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// Database and authenticateUser
import connectDB from "./db/connect.js";

// Routers
import authRouter from "./routes/authRoutes.js";
import animesRouter from "./routes/animesRoutes.js";
import playlistsRouter from "./routes/playlistsRoutes.js";

// Middleware
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

// Load environment variables from .env file
dotenv.config();

// Start up the server
const app = express();

// Get the app to use JSON as the default data format
app.use(express.json());

// Protections
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

// Sanitize input
app.use(xss());
// Prevents MongoDB operator injection from MongoDB queries
app.use(mongoSanitize());

// App-level routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/animes", authenticateUser, animesRouter);
app.use("/api/v1/playlists", authenticateUser, playlistsRouter);

// Middleware
app.use(errorHandlerMiddleware);

if (process.env.NODE_ENV !== "production") {
  // app.use(morgan("dev"));
}

// HEROKU DEPLOYMENT
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./FE/build")));

// HEROKU DEPLOYMENT
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./FE/build", "index.html"));
});

// Start the server

const port = process.env.PORT || 5001;

const start = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL must be defined");
    }
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

// test

start();
