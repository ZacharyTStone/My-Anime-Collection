"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const animesController_js_1 = require("../controllers/animesController.js");
// the apiLimiter middleware is used to limit the number of requests for registering and logging in
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 500,
    message: "Too many requests from this IP, please try again after 15 minutes",
});
// the base URL
// app.use("/api/v1/animes", authenticateUser, animesRouter);
router.route("/").post(apiLimiter, animesController_js_1.createAnime).get(animesController_js_1.getAnimes);
// :id is a dynamic parameter
router.route("/:id").delete(animesController_js_1.deleteAnime);
exports.default = router;
