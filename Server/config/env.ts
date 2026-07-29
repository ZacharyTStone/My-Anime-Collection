import dotenv from "dotenv";
import { z } from "zod";

// Load environment variables
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.string().min(1),
  PORT: z.coerce.number().int().positive(),
  MONGO_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  JWT_LIFETIME: z.string().min(1).default("7d"),
  GOOGLE_CLIENT_ID: z.string().min(1).optional(),
  GROQ_API_KEY: z.string().min(1).optional(),
  FRONTEND_URL: z.string().min(1).optional(),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid environment variables — ${issues}`);
  }

  return parsed.data;
}

export const env = validateEnv();
