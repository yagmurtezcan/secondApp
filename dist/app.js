"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YApp = void 0;
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const userController_1 = __importDefault(require("./controller/userController"));
class YApp {
    constructor() {
        this.app = (0, express_1.default)();
        this.appRouter = express_1.default.Router();
        this.server = new http.Server;
        this.init();
        this.port = 3000;
    }
    init() {
        this.app.use(express_1.default.json({ limit: "3mb" }));
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use("/", this.appRouter);
        this.appRouter.use("/user", userController_1.default);
        this.server = http.createServer(this.app);
        this.server.on("error", (err) => {
            process.exit(2);
        });
        this.server.listen(3000, () => {
            console.log(`Server is running on ${this.port}`);
        });
    }
}
exports.YApp = YApp;
const app = new YApp();
exports.default = app;
//# sourceMappingURL=app.js.map