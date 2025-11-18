import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  keyValue?: Record<string, unknown>;
  errors?: {
    [key: string]: {
      message?: string;
    };
  };
}

const errorHandlerMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
  };
  
  if (err.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    if (err.errors) {
      defaultError.msg = Object.values(err.errors)
        .map((item) => item?.message || "")
        .filter(Boolean)
        .join(", ");
    }
  }
  
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    const duplicateFields = err.keyValue ? Object.keys(err.keyValue).join(", ") : "field";
    defaultError.msg = `${duplicateFields} field has to be unique`;
  }

  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
