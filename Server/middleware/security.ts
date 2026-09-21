import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import { Express } from "express";
import { env } from "../config/env.js";

const KITSU_API = "https://kitsu.io";

const getAllowedOrigins = (): string[] => {
  if (env.NODE_ENV === "development") {
    return ["http://localhost:3000"];
  }

  if (!env.FRONTEND_URL) {
    throw new Error("FRONTEND_URL must be set in production environment variables");
  }

  // FRONTEND_URL supports a comma-separated allowlist
  // e.g. "https://myapp.com,https://staging.myapp.com"
  return env.FRONTEND_URL.split(",").map((url) => url.trim());
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
        // helmet merges these over its secure defaults (object-src 'none',
        // base-uri 'self', frame-ancestors 'self', etc.)
        directives: {
          defaultSrc: ["'self'"],
          // Production Vite bundle needs no unsafe-inline/unsafe-eval;
          // accounts.google.com loads the Google Identity Services script
          scriptSrc: ["'self'", "https://accounts.google.com"],
          // 'unsafe-inline' required for React inline style attributes
          // (react-toastify, dynamic component styles); index.html pulls the
          // Outfit / Noto Sans JP stylesheet from Google Fonts
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          // Google Fonts serves the font files themselves from gstatic
          fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
          // Kitsu serves anime cover art from media.kitsu.app (it migrated off
          // media.kitsu.io, which now 404s — leaving that host here blocked
          // every cover image)
          imgSrc: ["'self'", "data:", "blob:", "https://media.kitsu.app"],
          // SPA calls the Kitsu API and Google OAuth endpoints directly
          connectSrc: [
            "'self'",
            "https://kitsu.io",
            "https://kitsu.app",
            "https://accounts.google.com",
          ],
          // Google Sign-In renders its button in an iframe
          frameSrc: ["'self'", "https://accounts.google.com"],
          mediaSrc: ["'self'"],
          workerSrc: ["'self'", "blob:"],
        },
      },
    })
  );

  // express-mongo-sanitize@2's stock middleware reassigns req[key], which
  // breaks under Express 5: req.query is a getter with no setter, and
  // additionally returns a freshly parsed object on every access, so in-place
  // mutation is discarded. Shadow req.query with an own sanitized property;
  // body/params/headers remain normal own properties and can be sanitized in
  // place. (body is undefined here because express.json() runs after this
  // middleware, matching the previous behavior exactly.)
  app.use((req, _res, next) => {
    for (const target of [req.body, req.params, req.headers]) {
      if (target) mongoSanitize.sanitize(target as Record<string, unknown>);
    }

    const query = req.query;
    if (query) {
      Object.defineProperty(req, "query", {
        value: mongoSanitize.sanitize(query as Record<string, unknown>),
        writable: true,
        configurable: true,
        enumerable: true,
      });
    }

    next();
  });
};
