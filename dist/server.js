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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
require("express-async-errors");
const morgan_1 = __importDefault(require("morgan"));
const path_1 = require("path");
const url_1 = require("url");
const path_2 = __importDefault(require("path"));
// protections
const helmet_1 = __importDefault(require("helmet"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
// db and authenticateUser
const connect_js_1 = __importDefault(require("./db/connect.js"));
// routers
const authRoutes_js_1 = __importDefault(require("./routes/authRoutes.js"));
const animesRoutes_js_1 = __importDefault(require("./routes/animesRoutes.js"));
const playlistsRoutes_js_1 = __importDefault(require("./routes/playlistsRoutes.js"));
// middleware
const error_handler_js_1 = __importDefault(require("./middleware/error-handler.js"));
const auth_js_1 = __importDefault(require("./middleware/auth.js"));
// Load environment variables from .env file
dotenv_1.default.config();
// start up the server
const app = (0, express_1.default)();
// get the app to use JSON as the default data format
app.use(express_1.default.json());
// protections
app.use(helmet_1.default.dnsPrefetchControl());
app.use(helmet_1.default.expectCt());
app.use(helmet_1.default.frameguard());
app.use(helmet_1.default.hidePoweredBy());
app.use(helmet_1.default.hsts());
app.use(helmet_1.default.ieNoOpen());
app.use(helmet_1.default.noSniff());
app.use(helmet_1.default.originAgentCluster());
app.use(helmet_1.default.permittedCrossDomainPolicies());
app.use(helmet_1.default.referrerPolicy());
app.use(helmet_1.default.xssFilter());
//sanitize input
app.use((0, xss_clean_1.default)());
// prevents mongodb operator injection from mongoDB queries
app.use((0, express_mongo_sanitize_1.default)());
// app level routes
app.use("/api/v1/auth", authRoutes_js_1.default);
app.use("/api/v1/animes", auth_js_1.default, animesRoutes_js_1.default);
app.use("/api/v1/playlists", auth_js_1.default, playlistsRoutes_js_1.default);
// middleware
app.use(error_handler_js_1.default);
if (process.env.NODE_ENV !== "production") {
    app.use((0, morgan_1.default)("dev"));
}
// only when ready to deploy
const __dirname = (0, path_1.dirname)((0, url_1.fileURLToPath)(import.meta.url));
app.use(express_1.default.static(path_2.default.resolve(__dirname, "./client/build")));
// only when ready to deploy
app.get("*", (req, res) => {
    res.sendFile(path_2.default.resolve(__dirname, "./client/build", "index.html"));
});
// start the server
const port = process.env.PORT || 5000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_js_1.default)(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
start();
