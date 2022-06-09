"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository_1 = __importDefault(require("../repository/userRepository"));
const config_1 = __importDefault(require("../config"));
const emailService_1 = __importDefault(require("./emailService"));
class LoginService {
    login(user) {
        return new Promise((resolve, rejects) => {
            userRepository_1.default.getLoginUser(user.email).then((userFromDB) => {
                const hashedPassword = userFromDB.password;
                bcrypt_1.default.compare(user.password, hashedPassword, (err, isMatch) => {
                    if (err) {
                        rejects(err);
                    }
                    else if (!isMatch) {
                        rejects("Email or password is not correct");
                    }
                    else {
                        const token = jsonwebtoken_1.default.sign({
                            id: userFromDB.id,
                            email: userFromDB.email,
                            isActive: userFromDB.isActive
                        }, config_1.default.secret_key, {
                            expiresIn: "2h"
                        });
                        resolve(token);
                        emailService_1.default.sendMail();
                    }
                });
            }).catch((err) => {
                rejects(err);
            });
        });
    }
}
const loginService = new LoginService();
exports.default = loginService;
//# sourceMappingURL=loginService.js.map