"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class UserService {
    constructor() {
        this.users = [];
        this.users = [];
    }
    getAllUser(userLength) {
        return new Promise((resolve, rejects) => {
            if (userLength > 0) {
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
            const foundUserId = this.users.find((user) => user.id === userId);
            if (foundUserId) {
                resolve(foundUserId);
            }
            else {
                rejects("database_error");
            }
        });
    }
    updateUser(user) {
        return new Promise((resolve, rejects) => {
            if (user) {
                const { firstName, lastName, email, age } = user;
                user.firstName = firstName;
                user.lastName = lastName;
                user.email = email;
                user.age = age;
                resolve(user);
            }
            else {
                rejects("database_error");
            }
        });
    }
    deleteUser() { }
}
const userService = new UserService();
exports.default = userService;
//# sourceMappingURL=UserService.js.map