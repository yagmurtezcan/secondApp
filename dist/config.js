"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Config {
    constructor() {
        this.secret_key = process.env.SECRET_KEY || "";
    }
}
const config = new Config();
exports.default = config;
//# sourceMappingURL=config.js.map