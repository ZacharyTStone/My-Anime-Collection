import { Response } from "express";
import { StatusCodes } from "http-status-codes";

/**
 * Interface for standardized API responses
 */
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

/**
 * Sends a standardized successful response with data
 * @param res - Express response object
 * @param data - Data to send in the response
 * @param message - Optional success message
 * @param statusCode - HTTP status code (default: 200)
 * @example
 * ```typescript
 * sendSuccess(res, { user: userData }, "User created successfully", 201);
 * ```
 */
export const sendSuccess = <T>(
    res: Response,
    data: T,
    message?: string,
    statusCode: number = StatusCodes.OK
): void => {
    const response: ApiResponse<T> = {
        success: true,
        data,
        message,
    };

    res.status(statusCode).json(response);
};

/**
 * Sends a successful response with pagination
 * @param res - Express response object
 * @param data - Data to send
 * @param pagination - Pagination metadata
 * @param message - Optional success message
 * @param statusCode - HTTP status code (default: 200)
 */
export const sendPaginatedSuccess = <T>(
    res: Response,
    data: T,
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    },
    message?: string,
    statusCode: number = StatusCodes.OK
): void => {
    const response: ApiResponse<T> = {
        success: true,
        data,
        message,
        pagination,
    };

    res.status(statusCode).json(response);
};

/**
 * Sends an error response
 * @param res - Express response object
 * @param error - Error message
 * @param statusCode - HTTP status code (default: 400)
 */
export const sendError = (
    res: Response,
    error: string,
    statusCode: number = StatusCodes.BAD_REQUEST
): void => {
    const response: ApiResponse = {
        success: false,
        error,
    };

    res.status(statusCode).json(response);
};

/**
 * Sends a created response (for POST requests)
 * @param res - Express response object
 * @param data - Created data
 * @param message - Success message
 */
export const sendCreated = <T>(
    res: Response,
    data: T,
    message: string = "Resource created successfully"
): void => {
    sendSuccess(res, data, message, StatusCodes.CREATED);
};

/**
 * Sends a no content response (for DELETE requests)
 * @param res - Express response object
 * @param message - Success message
 */
export const sendNoContent = (
    res: Response,
    message: string = "Resource deleted successfully"
): void => {
    sendSuccess(res, null, message, StatusCodes.OK);
};

/**
 * Sends a not found response
 * @param res - Express response object
 * @param message - Error message
 */
export const sendNotFound = (
    res: Response,
    message: string = "Resource not found"
): void => {
    sendError(res, message, StatusCodes.NOT_FOUND);
};

/**
 * Sends an unauthorized response
 * @param res - Express response object
 * @param message - Error message
 */
export const sendUnauthorized = (
    res: Response,
    message: string = "Unauthorized access"
): void => {
    sendError(res, message, StatusCodes.UNAUTHORIZED);
};
