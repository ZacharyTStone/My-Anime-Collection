"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const playlistsController_js_1 = require("../controllers/playlistsController.js");
// the apiLimiter middleware is used to limit the number of requests for registering and logging in
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const apiLimiterSmall = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after 15 minutes",
});
const apiLimiterLarge = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 3000,
    message: "Too many requests from this IP, please try again after 15 minutes",
});
// the base URL
// app.use("/api/v1/playlists", authenticateUser, playlistsRouter);
router
    .route("/")
    .post(apiLimiterSmall, playlistsController_js_1.createPlaylist)
    .get(apiLimiterLarge, playlistsController_js_1.getPlaylists);
// :id is a dynamic parameter
router
    .route("/:id")
    .delete(playlistsController_js_1.deletePlaylist)
    .put(apiLimiterLarge, playlistsController_js_1.updatePlaylist);
exports.default = router;
