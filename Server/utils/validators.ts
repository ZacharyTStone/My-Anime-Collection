import { BadRequestError } from "../errors/index.js";

/**
 * Validates that all required values are provided in an input object
 * @param inputObject - Object containing key-value pairs to validate
 * @throws {BadRequestError} When required values are missing
 * @example
 * ```typescript
 * validateInputs({ name: "John", email: "john@example.com" }); // No error
 * validateInputs({ name: "", email: "john@example.com" }); // Throws BadRequestError
 * ```
 */
export const validateInputs = (inputObject: Record<string, unknown>): void => {
    const missingValues = Object.entries(inputObject)
        .filter(([_, value]) => !value)
        .map(([key, _]) => key);

    if (missingValues.length > 0) {
        throw new BadRequestError(
            `Please provide all values: ${missingValues.join(", ")}`
        );
    }
};

/**
 * Validates email format
 * @param email - Email string to validate
 * @returns boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates password strength
 * @param password - Password string to validate
 * @returns boolean indicating if password meets requirements
 */
export const isValidPassword = (password: string): boolean => {
    return password.length >= 6;
};

/**
 * Validates that a string is not empty after trimming
 * @param value - String to validate
 * @returns boolean indicating if string is not empty
 */
export const isNotEmpty = (value: string): boolean => {
    return value.trim().length > 0;
};

/**
 * Validates user input for registration/login
 * @param userData - User data object to validate
 * @throws {BadRequestError} When validation fails
 */
export const validateUserInput = (userData: {
    name?: string;
    email?: string;
    password?: string;
}): void => {
    if (userData.name && !isNotEmpty(userData.name)) {
        throw new BadRequestError("Name cannot be empty");
    }

    if (userData.email && !isValidEmail(userData.email)) {
        throw new BadRequestError("Please provide a valid email");
    }

    if (userData.password && !isValidPassword(userData.password)) {
        throw new BadRequestError("Password must be at least 6 characters long");
    }
};
