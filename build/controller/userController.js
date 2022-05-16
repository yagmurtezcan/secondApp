"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUser = void 0;
const uuid_1 = require("uuid");
const users = [];
const getUser = (req, res) => {
    res.send(users);
};
exports.getUser = getUser;
const createUser = (req, res) => {
    const user = req.body;
    const userId = (0, uuid_1.v4)();
    const userWithId = Object.assign(Object.assign({}, user), { userId: userId });
    users.push(userWithId);
    res.send(users);
};
exports.createUser = createUser;
