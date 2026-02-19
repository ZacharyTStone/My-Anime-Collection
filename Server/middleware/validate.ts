import { Request, Response, NextFunction } from "express";
import { type ZodType, ZodError, type ZodIssue } from "zod";
import { BadRequestError } from "../errors/index.js";

export const validate =
  (schema: ZodType) => (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.issues
          .map((e: ZodIssue) => `${e.path.join(".")}: ${e.message}`)
          .join(", ");
        throw new BadRequestError(message);
      }
      throw error;
    }
  };
