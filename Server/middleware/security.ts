import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import { Express } from "express";

export const configureSecurity = (app: Express) => {
  // Enable trust proxy for rate limiting
  app.set("trust proxy", 1);

  // Configure CORS
  app.use(
    cors({
      origin:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : process.env.FRONTEND_URL || "http://localhost:3000",
      credentials: true,
    })
  );

  // Configure Helmet security headers
  app.use(helmet.dnsPrefetchControl());
  app.use(helmet.expectCt());
  app.use(helmet.frameguard());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.hsts());
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.originAgentCluster());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(helmet.referrerPolicy());
  app.use(helmet.xssFilter());

  // Input sanitization
  app.use(xss());
  app.use(mongoSanitize());
};
