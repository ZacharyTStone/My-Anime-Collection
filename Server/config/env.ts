import dotenv from "dotenv";

// Load environment variables
dotenv.config();

interface EnvConfig {
  NODE_ENV: string;
  PORT: number;
  MONGO_URL: string;
  JWT_SECRET: string;
}

function validateEnv(): EnvConfig {
  const requiredEnvVars = ["MONGO_URL", "PORT", "NODE_ENV", "JWT_SECRET"];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`${envVar} must be defined in environment variables`);
    }
  }

  return {
    NODE_ENV: process.env.NODE_ENV!,
    PORT: parseInt(process.env.PORT!, 10),
    MONGO_URL: process.env.MONGO_URL!,
    JWT_SECRET: process.env.JWT_SECRET!,
  };
}

export const env = validateEnv();
