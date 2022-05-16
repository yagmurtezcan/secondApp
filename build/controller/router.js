"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("./userController");
const router = express_1.default.Router();
router.get("/", userController_1.getUser);
router.post("/", userController_1.createUser);
// router.get("/:id", getUserWithId);
// router.delete("/:id", deleteUser);
// router.put("/:id", updateUser);
exports.default = router;
