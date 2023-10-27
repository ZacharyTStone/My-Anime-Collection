// Import middleware functions
import rateLimiter from "express-rate-limit";

// PER 10 minutes

export const apiLimiter5 = rateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

export const apiLimiter10 = rateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

export const apiLimiter50 = rateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 50,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

export const apiLimiter500 = rateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 500,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

export const apiLimiter2000 = rateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 2000,
  message: "Too many requests from this IP, please try again after 15 minutes",
});
