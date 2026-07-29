// Import middleware functions
import rateLimiter from "express-rate-limit";

// PER 10 minutes
const WINDOW_MS = 10 * 60 * 1000;
const DEFAULT_MESSAGE = "Too many requests from this IP, please try again after 15 minutes";

const createRateLimiter = (max: number, message = DEFAULT_MESSAGE) =>
  rateLimiter({
    windowMs: WINDOW_MS,
    max,
    message,
  });

export const apiLimiter5 = createRateLimiter(5);

export const apiLimiter10 = createRateLimiter(10);

export const apiLimiter50 = createRateLimiter(50);

export const apiLimiter500 = createRateLimiter(500);

export const apiLimiter2000 = createRateLimiter(2000);
