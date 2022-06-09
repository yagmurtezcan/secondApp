"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const fileStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images");
    },
    filename: (req, file, cb) => {
        cb(null, req.user.id + "-" + "avatar");
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(null, false);
        return cb(new Error("only .png .jpg and format allowed"));
    }
};
const upload = (0, multer_1.default)({
    storage: fileStorage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
});
exports.default = upload;
//# sourceMappingURL=uploadProfilePhoto.js.map