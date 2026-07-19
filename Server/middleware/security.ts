import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import { Express } from "express";

const KITSU_API = "https://kitsu.io";

const getAllowedOrigins = (): string[] => {
  if (process.env.NODE_ENV === "development") {
    return ["http://localhost:3000"];
  }

  if (!process.env.FRONTEND_URL) {
    throw new Error(
      "FRONTEND_URL must be set in production environment variables"
    );
  }

  // FRONTEND_URL supports a comma-separated allowlist
  // e.g. "https://myapp.com,https://staging.myapp.com"
  return process.env.FRONTEND_URL.split(",").map((url) => url.trim());
};

export const configureSecurity = (app: Express) => {
  app.set("trust proxy", 1);

  const allowedOrigins = getAllowedOrigins();

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g. server-to-server, curl)
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
      },
      credentials: true,
    })
  );

  app.use(
    helmet({
      referrerPolicy: { policy: "strict-origin-when-cross-origin" },
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'", "*"],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "*"],
          styleSrc: ["'self'", "'unsafe-inline'", "*"],
          fontSrc: ["'self'", "*"],
          imgSrc: ["'self'", "data:", "blob:", "*"],
          connectSrc: ["'self'", "*"],
          frameSrc: ["'self'", "*"],
          mediaSrc: ["'self'", "*"],
          workerSrc: ["'self'", "blob:", "*"],
        },
      },
    })
  );

  app.use(mongoSanitize());
};
