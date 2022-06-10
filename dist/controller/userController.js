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
const UserService_1 = __importDefault(require("../service/UserService"));
const schemas = __importStar(require("../validator/userValidator"));
const checkAuth_1 = __importDefault(require("../middleware/checkAuth"));
const uploadProfilePhoto_1 = __importDefault(require("../middleware/uploadProfilePhoto"));
class UserController {
    constructor() {
        this.router = express_1.default.Router();
        this.routes();
    }
    getAllUser(req, res, next) {
        UserService_1.default.getAllUser().then((users) => {
            res.status(200).send(users);
        }).catch((err) => {
            next(err);
        });
    }
    createUser(req, res, next) {
        const user = req.body;
        schemas.default.create.validateAsync(user).then((resultValue) => {
            UserService_1.default.createUser(resultValue).then((response) => {
                return res.status(200).json({
                    status_code: 1,
                    message: "Operation Completed",
                    data: response
                });
            }).catch((err) => {
                next(err);
            });
        }).catch((err) => {
            next(err);
        });
    }
    getUser(req, res, next) {
        const userInfo = { id: req.params.id };
        schemas.default.detail.validateAsync(userInfo).then((userId) => {
            UserService_1.default.getUser(userId.id).then((response) => {
                return res.status(200).json({
                    status_code: 1,
                    message: "Operation Completed",
                    data: response
                });
            }).catch((err) => {
                next(err);
            });
        }).catch((err) => {
            next(err);
        });
    }
    updateUser(req, res, next) {
        const userInfo = { id: req.params.id };
        schemas.default.detail.validateAsync(userInfo).then((userId) => {
            let updateReqUser = req.body;
            UserService_1.default.updateUser(updateReqUser, userId.id).then((user) => {
                res.status(200).json({
                    status_code: 1,
                    message: "Operation Completed",
                    data: user
                });
            }).catch((err) => {
                next(err);
            });
        }).catch((err) => {
            next(err);
        });
    }
    deleteUser(req, res, next) {
        const userInfo = { id: req.params.id };
        schemas.default.detail.validateAsync(userInfo).then((userId) => {
            UserService_1.default.deleteUser(userId.id).then((response) => {
                return res.status(200).json({
                    status_code: 1,
                    message: "Operation Completed"
                });
            }).catch((err) => {
                next(err);
            });
        }).catch((err) => {
            next(err);
        });
    }
    routes() {
        this.router.get("/", checkAuth_1.default, this.getAllUser.bind(this));
        this.router.post("/", uploadProfilePhoto_1.default.single("image"), this.createUser.bind(this));
        this.router.get("/:id", checkAuth_1.default, this.getUser.bind(this));
        this.router.put("/:id", checkAuth_1.default, this.updateUser.bind(this));
        this.router.delete("/:id", checkAuth_1.default, this.deleteUser.bind(this));
    }
}
const userController = new UserController();
exports.default = userController.router;
//# sourceMappingURL=userController.js.map