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
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class UserService {
    constructor() {
        this.users = [];
        this.users = [];
    }
    getAllUser() {
        if (this.users.length > 0) {
            console.log(this.users[0].firstName);
        }
        return new Promise((resolve, rejects) => {
            if (this.users.length >= 0) {
                resolve(this.users);
            }
            else {
                rejects("database_error");
            }
        });
    }
    createUser(user) {
        return new Promise((resolve, reject) => {
            if (user) {
                const userId = (0, uuid_1.v4)();
                const userWithId = Object.assign(Object.assign({}, user), { id: userId });
                this.users.push(userWithId);
                resolve(userWithId);
            }
            else {
                reject("database_error");
            }
        });
    }
    getUser(userId) {
        return new Promise((resolve, rejects) => {
            const foundUser = this.users.find((user) => user.id === userId);
            if (foundUser) {
                resolve(foundUser);
            }
            else {
                rejects("user not found");
            }
        });
    }
    updateUser(user, userId) {
        return new Promise((resolve, rejects) => __awaiter(this, void 0, void 0, function* () {
            const foundUser = userService.getUser(userId);
            if (yield foundUser) {
                const { firstName, lastName, email, age } = user;
                user.firstName = firstName;
                user.lastName = lastName;
                user.email = email;
                user.age = age;
                resolve(user);
            }
            else {
                rejects("user not found");
            }
        }));
    }
    deleteUser() { }
}
const userService = new UserService();
exports.default = userService;
//# sourceMappingURL=UserService.js.map