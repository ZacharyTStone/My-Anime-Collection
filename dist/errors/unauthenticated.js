"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const custom_api_js_1 = __importDefault(require("./custom-api.js"));
/* used in the following files:
./middleware/auth.js:    throw new UnAuthenticatedError("Authentication Invalid");
./utils/checkPermissions.js:    throw new UnAuthenticatedError("Not authorized to access this route");
./controllers/authController.js:    throw new UnAuthenticatedError("Invalid Credentials");
*/
class UnAuthenticatedError extends custom_api_js_1.default {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED;
    }
}
exports.default = UnAuthenticatedError;
