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
const config_1 = __importDefault(require("../config"));
const userRepository_1 = __importDefault(require("../repository/userRepository"));
function verifyToken(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (token) {
            jsonwebtoken_1.default.verify(token, config_1.default.secret_key, (error, decoded) => {
                if (error)
                    next("token not found");
                else if (decoded) {
                    userRepository_1.default.checkUserActivity(decoded.user).then(() => {
                        req.user = decoded.user;
                        next();
                    }).catch((err) => {
                        next(err);
                    });
                }
            });
        }
        else {
            next("token not found");
        }
    });
}
exports.default = verifyToken;
//# sourceMappingURL=checkAuth.js.map