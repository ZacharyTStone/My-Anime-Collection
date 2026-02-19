const isProduction = process.env.NODE_ENV === "production";

export const logger = {
  info: (message: string) => {
    console.log(`[INFO] ${message}`);
  },

  warn: (message: string) => {
    console.warn(`[WARN] ${message}`);
  },

  error: (message: string, error?: unknown) => {
    if (isProduction) {
      // In production, only log the message — never the full error/stack
      console.error(`[ERROR] ${message}`);
    } else {
      console.error(`[ERROR] ${message}`, error ?? "");
    }
  },
};
