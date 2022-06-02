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
const express_1 = __importDefault(require("express"));
const loginService_1 = __importDefault(require("../service/loginService"));
const schemas = __importStar(require("../validator/loginValidator"));
class LoginController {
    constructor() {
        this.router = express_1.default.Router();
        this.routes();
    }
    login(req, res, next) {
        const user = req.body;
        schemas.default.login.validateAsync(user).then((validatedReq) => {
            loginService_1.default.login(validatedReq).then((token) => {
                res.status(200).json({
                    status_code: 1,
                    message: "Operation Completed",
                    token: token
                });
            }).catch((err) => {
                next(err);
            });
        }).catch((err) => {
            next(err);
        });
    }
    routes() {
        this.router.post("/", this.login.bind(this));
    }
}
const loginController = new LoginController;
exports.default = loginController.router;
//# sourceMappingURL=loginController.js.map