import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import { Express } from "express";
import { env } from "../config/env.js";

/**
 * Every third party the client talks to, named once so the CSP directives
 * below read as a list of features rather than a list of hostnames. Anything
 * the browser must fetch from outside our own origin belongs here — if it is
 * missing the browser silently refuses the request, which is how cover art,
 * webfonts and the trailer player each ended up broken in turn.
 */
const ORIGINS = {
  /** Anime metadata; kitsu.io is migrating to kitsu.app */
  kitsuApi: ["https://kitsu.io", "https://kitsu.app"],
  /** Cover art CDN (moved off media.kitsu.io, which now 404s) */
  kitsuMedia: "https://media.kitsu.app",
  /** Google Identity Services: script, button stylesheet, and its iframe */
  googleIdentity: "https://accounts.google.com",
  /** Google Fonts: the stylesheet, then the font files it points at */
  googleFontsCss: "https://fonts.googleapis.com",
  googleFontsFiles: "https://fonts.gstatic.com",
  /** Trailer player: iframe embed plus the iframe_api script react-player injects */
  youtube: "https://www.youtube.com",
  youtubeNoCookie: "https://www.youtube-nocookie.com",
  /** Random Pokémon on the profile page, and the sprites the API points at */
  pokeApi: "https://pokeapi.co",
  pokeApiSprites: "https://raw.githubusercontent.com",
} as const;

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
          // Production Vite bundle needs no unsafe-inline/unsafe-eval.
          // react-player injects youtube.com/iframe_api to drive the trailer.
          scriptSrc: ["'self'", ORIGINS.googleIdentity, ORIGINS.youtube],
          // 'unsafe-inline' required for React inline style attributes
          // (react-toastify, dynamic component styles); index.html pulls the
          // Outfit / Noto Sans JP stylesheet, and GSI its button stylesheet
          styleSrc: ["'self'", "'unsafe-inline'", ORIGINS.googleFontsCss, ORIGINS.googleIdentity],
          fontSrc: ["'self'", "data:", ORIGINS.googleFontsFiles],
          imgSrc: ["'self'", "data:", "blob:", ORIGINS.kitsuMedia, ORIGINS.pokeApiSprites],
          // Sprites are only ever <img> sources, so they need imgSrc, not this
          connectSrc: ["'self'", ...ORIGINS.kitsuApi, ORIGINS.googleIdentity, ORIGINS.pokeApi],
          // The Google Sign-In button and the YouTube trailer are both iframes
          frameSrc: ["'self'", ORIGINS.googleIdentity, ORIGINS.youtube, ORIGINS.youtubeNoCookie],
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
