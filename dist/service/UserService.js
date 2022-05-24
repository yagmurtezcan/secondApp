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
const userRepository_1 = __importDefault(require("../repository/userRepository"));
class UserService {
    getAllUser() {
        return new Promise((resolve, rejects) => {
            userRepository_1.default.getAllUsers().then((user) => {
                console.log(JSON.stringify(user));
                resolve(user);
            }).catch(err => {
                console.error("Err: " + err);
                rejects("database_error");
            });
        });
    }
    createUser(user) {
        return new Promise((resolve, reject) => {
            userRepository_1.default.createUser(user).then((resultValue) => {
                resolve(resultValue);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    getUser(userId) {
        return new Promise((resolve, rejects) => {
            userRepository_1.default.getUser(userId).then((user) => {
                resolve(user);
            }).catch((err) => {
                rejects(err);
            });
        });
    }
    updateUser(userUpdateData, userId) {
        return new Promise((resolve, rejects) => __awaiter(this, void 0, void 0, function* () {
            userRepository_1.default.updateUser(userUpdateData, userId.id).then((updatedUser) => {
                resolve(updatedUser);
            }).catch((err) => {
                rejects(err);
            });
        }));
    }
    deleteUser(userId) {
        return new Promise((resolve, rejects) => {
            userRepository_1.default.deleteUser(userId).then((deletedUser) => {
                resolve(deletedUser);
            }).catch((err) => {
                rejects(err);
            });
        });
    }
}
const userService = new UserService();
exports.default = userService;
//# sourceMappingURL=UserService.js.map