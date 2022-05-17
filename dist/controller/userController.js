"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userOperations_1 = __importDefault(require("./userOperations"));
class UserController {
    constructor() {
        this.users = [];
        this.router = express_1.default.Router();
        this.routes();
        this.users = [];
    }
    getAllUser(req, res, next) {
        // res.send()
    }
    createUser(req, res, next) {
        // const user = req.body;
        // const userId = uuid();
        // const userWithId = {...user, userId : userId}
        // this.users.push(userWithId)
        res.send(userOperations_1.default.pushUser);
    }
    getUser(req, res, next) {
        // const userId = req.params.id
        // const foundUser = this.users.find((user) => user.id === userId)
        // res.send(foundUser)
        res.send(userOperations_1.default.findUser);
    }
    updateUser(req, res, next) {
    }
    deleteUser(req, res, next) {
    }
    routes() {
        this.router.get("/", this.getAllUser.bind);
        this.router.post("/", this.createUser.bind(this));
        this.router.get("/:id", this.getUser.bind(this));
        this.router.put("/:id", this.updateUser.bind(this));
        this.router.delete("/:id", this.deleteUser.bind(this));
    }
}
const userController = new UserController();
exports.default = userController.router;
//# sourceMappingURL=userController.js.map