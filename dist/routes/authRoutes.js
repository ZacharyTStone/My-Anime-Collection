"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// the apiLimiter middleware is used to limit the number of requests for registering and logging in
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: "Too many requests from this IP, please try again after 15 minutes",
});
// The base URL
// app.use("/api/v1/auth", authRouter);
const authController_js_1 = require("../controllers/authController.js");
const auth_js_1 = __importDefault(require("../middleware/auth.js"));
router.route("/register").post(apiLimiter, authController_js_1.register);
router.route("/login").post(apiLimiter, authController_js_1.login);
router.route("/updateUser").patch(auth_js_1.default, authController_js_1.updateUser);
router.route("/deleteUser").delete(auth_js_1.default, authController_js_1.deleteUser);
exports.default = router;
