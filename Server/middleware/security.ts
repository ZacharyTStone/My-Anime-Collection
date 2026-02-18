import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import { Express } from "express";

const KITSU_API = "https://kitsu.io";

export const configureSecurity = (app: Express) => {
  app.set("trust proxy", 1);

  app.use(
    cors({
      origin:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : process.env.FRONTEND_URL || "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "https://www.youtube.com", "https://s.ytimg.com"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "data:", "https://media.kitsu.io", "https://media.kitsu.app", "https://i.ytimg.com"],
          connectSrc: ["'self'", KITSU_API],
          frameSrc: ["'self'", "https://www.youtube.com"],
          mediaSrc: ["'self'", "https://www.youtube.com"],
        },
      },
    })
  );

  app.use(mongoSanitize());
};
