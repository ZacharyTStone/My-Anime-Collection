"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const custom_api_js_1 = __importDefault(require("./custom-api.js"));
/* used in
./controllers/authController.js:    throw new BadRequestError("please provide all values");
./controllers/authController.js:    throw new BadRequestError("Email already in use");
./controllers/authController.js:    throw new BadRequestError("Please provide all values");
./controllers/authController.js:    throw new BadRequestError("Please provide all values");
*/
class BadRequestError extends custom_api_js_1.default {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
}
exports.default = BadRequestError;
