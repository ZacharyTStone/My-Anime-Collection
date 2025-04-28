import dotenv from "dotenv";

// Load environment variables
dotenv.config();

interface EnvConfig {
  NODE_ENV: string;
  PORT: number;
  MONGO_URL: string;
}

function validateEnv(): EnvConfig {
  const requiredEnvVars = ["MONGO_URL", "PORT", "NODE_ENV"];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`${envVar} must be defined in environment variables`);
    }
  }

  return {
    NODE_ENV: process.env.NODE_ENV!,
    PORT: parseInt(process.env.PORT!, 10),
    MONGO_URL: process.env.MONGO_URL!,
  };
}

export const env = validateEnv();
