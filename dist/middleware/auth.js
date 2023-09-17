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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_js_1 = require("../errors/index.js");
index_js_1.UnAuthenticatedError;
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    // all auth headers are in the form of "Bearer token"
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new index_js_1.UnAuthenticatedError("Authentication Invalid");
    }
    const token = authHeader.split(" ")[1];
    try {
        // the JWT secret is stored in the .env file and ensures that the token was made by us
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId };
        // the next part will be what you will run if the jwt compare is true
        next();
    }
    catch (error) {
        throw new index_js_1.UnAuthenticatedError("Authentication Invalid");
    }
});
exports.default = auth;
