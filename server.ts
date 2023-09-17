import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import morgan from "morgan";
import path from "path"; // Import path module
import { dirname } from "path";
import { fileURLToPath } from "url";

// protections
import helmet from "helmet";
// @ts-ignore
import xssClean = require("xss-clean");

import mongoSanitize from "express-mongo-sanitize";

// db and authenticateUser
import connectDB from "./db/connect.js";

// routers
import authRouter from "./routes/authRoutes.js";
import animesRouter from "./routes/animesRoutes.js";
import playlistsRouter from "./routes/playlistsRoutes.js";

// middleware
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

// Load environment variables from .env file
dotenv.config();

// start up the server
const app = express();

// get the app to use JSON as the default data format
app.use(express.json());

// protections
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

// sanitize input
app.use(xssClean());
// prevents MongoDB operator injection from MongoDB queries
app.use(mongoSanitize());

// app level routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/animes", authenticateUser, animesRouter);
app.use("/api/v1/playlists", authenticateUser, playlistsRouter);

// middleware
app.use(errorHandlerMiddleware);

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// only when ready to deploy

// const newDirname = dirname(fileURLToPath(import.meta.url));
// can't use import.meta
// const newDirname = path.dirname(__filename);
// app.use(express.static(path.resolve(newDirname, "./client/build")));

// only when ready to deploy
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(newDirname, "./client/build", "index.html"));
// });

// start the server

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

start();
