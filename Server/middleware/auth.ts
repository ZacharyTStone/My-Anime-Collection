import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UnAuthenticatedError } from "../errors/index.js";

// Extend the Express Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: { userId: string };
    }
  }
}

const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  // all auth headers are in the form of "Bearer token"
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    // the JWT secret is stored in the .env file and ensures that the token was made by us
    const payload = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: string;
    };
    req.user = { userId: payload.userId };
    // the next part will be what you will run if the jwt compare is true
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

export default auth;
