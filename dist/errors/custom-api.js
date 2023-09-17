"use strict";
// extends the Javascript Error class to let us create custom error messages
Object.defineProperty(exports, "__esModule", { value: true });
class CustomAPIError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.default = CustomAPIError;
