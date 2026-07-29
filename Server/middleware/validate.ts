import { Request, Response, NextFunction } from "express";
import { type ZodType, ZodError, type ZodIssue } from "zod";
import { BadRequestError } from "../errors/index.js";

const parseOrThrow = (schema: ZodType, data: unknown) => {
  try {
    return schema.parse(data);
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

const validatePart =
  (part: "body" | "params") =>
  (schema: ZodType) =>
  (req: Request, _res: Response, next: NextFunction) => {
    parseOrThrow(schema, req[part]);
    next();
  };

export const validate = validatePart("body");
export const validateParams = validatePart("params");

// Express 4 types req.query loosely, so the parsed (and coerced) query values
// are exposed via res.locals.query instead — controllers stay fully typed.
export const validateQuery =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    res.locals.query = parseOrThrow(schema, req.query);
    next();
  };
