"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const custom_api_js_1 = __importDefault(require("./custom-api.js"));
/* used in the following files:
./controllers/animesController.js:    throw new NotFoundError(`No Anime with id :${animeId}`);
./controllers/animesController.js:    throw new NotFoundError(`You have already added that anime to your list`);
*/
class NotFoundError extends custom_api_js_1.default {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
    }
}
exports.default = NotFoundError;
