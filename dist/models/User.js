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
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const playlist = new mongoose_1.default.Schema({
    title: String,
    id: String,
}, { timestamps: true });
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        validate: {
            validator: validator_1.default.isEmail,
            message: "Please provide a valid email",
        },
        unique: true,
    },
    isDemo: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 6,
        select: false,
    },
    theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
    },
    language: {
        type: String,
        enum: ["en", "jp"],
        default: "en",
    },
    playlists: {
        type: [playlist],
        default: [
            {
                title: "Default",
                id: "0",
            },
            {
                title: "Watch List",
                id: "1",
            },
            {
                title: "All Time Favorites",
                id: "2",
            },
        ],
    },
}, { timestamps: true });
UserSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        // hash the password
        if (!this.isModified("password"))
            return;
        const salt = yield bcryptjs_1.default.genSalt(10);
        this.password = yield bcryptjs_1.default.hash(this.password, salt);
    });
});
// Generate JWT
UserSchema.methods.createJWT = function () {
    return jsonwebtoken_1.default.sign({ userId: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
};
// compare the entered password with the hashed password
UserSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const isMatch = yield bcryptjs_1.default.compare(candidatePassword, this.password);
        return isMatch;
    });
};
exports.default = mongoose_1.default.model("User", UserSchema);
