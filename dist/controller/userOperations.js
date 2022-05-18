"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class UserOperations {
    constructor() {
        this.users = [];
        this.users = [];
    }
    getId(req, res, next) {
        const userId = req.params.id;
        return userId;
    }
    findUser(req, res, next) {
        const userId = req.params.id;
        const foundUser = this.users.find((user) => user.id === userId);
        return foundUser;
    }
    filterUser(req, res, next) {
        const userId = req.params.id;
        this.users = this.users.filter((user) => user.id !== userId);
        return this.users;
    }
    pushUser(req, res, next) {
        const user = req.body;
        const userId = (0, uuid_1.v4)();
        const userWithId = Object.assign(Object.assign({}, user), { userId: userId });
        this.users.push(userWithId);
        return this.users;
    }
    setNewData(req, res, next) {
    }
}
const userOperations = new UserOperations();
exports.default = userOperations;
//# sourceMappingURL=UserOperations.js.map