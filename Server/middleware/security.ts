import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import { Express } from "express";

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

  app.use(helmet());

  app.use(mongoSanitize());
};
