"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.login = exports.register = void 0;
const User_js_1 = __importDefault(require("../models/User.js"));
const Anime_js_1 = __importDefault(require("../models/Anime.js"));
const http_status_codes_1 = require("http-status-codes");
const index_js_1 = require("../errors/index.js");
// REST routes are defined in authRoutes.js
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, isDemo, theme } = req.body;
    if (!name || !email || !password) {
        throw new index_js_1.BadRequestError("Please provide all values");
    }
    const userAlreadyExists = yield User_js_1.default.findOne({ email });
    if (userAlreadyExists) {
        throw new index_js_1.BadRequestError("Email already in use");
    }
    const user = yield User_js_1.default.create({ name, email, password, isDemo, theme });
    const token = user.createJWT();
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        user: {
            email: user.email,
            isDemo: user.isDemo,
            name: user.name,
            theme: user.theme,
        },
        token,
    });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new index_js_1.BadRequestError("Please provide all values");
    }
    const user = yield User_js_1.default.findOne({ email }).select("+password");
    if (!user) {
        throw new index_js_1.UnAuthenticatedError("Invalid Credentials");
    }
    const isPasswordCorrect = yield user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new index_js_1.UnAuthenticatedError("Invalid Credentials");
    }
    const token = user.createJWT();
    user.password = undefined;
    res.status(http_status_codes_1.StatusCodes.OK).json({ user, token });
});
exports.login = login;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, theme } = req.body;
    if (!email || !name || !theme) {
        throw new index_js_1.BadRequestError("Please provide all values");
    }
    const user = yield User_js_1.default.findOne({ _id: req.user.userId });
    user.email = email;
    user.name = name;
    user.theme = theme;
    yield user.save();
    const token = user.createJWT();
    res.status(http_status_codes_1.StatusCodes.OK).json({ user, token });
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Delete user
    const user = yield User_js_1.default.findOne({ _id: req.user.userId });
    yield user.remove();
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: "User deleted" });
    // Delete all associated animes
    const animes = yield Anime_js_1.default.find({ createdBy: req.user.userId });
    animes.forEach((anime) => {
        anime.remove();
    });
});
exports.deleteUser = deleteUser;
