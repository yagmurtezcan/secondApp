"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkAuth_1 = __importDefault(require("../middleware/checkAuth"));
const uploadProfilePhoto_1 = __importDefault(require("../middleware/uploadProfilePhoto"));
const fileUploadService_1 = __importDefault(require("../service/fileUploadService"));
class FileUploadController {
    constructor() {
        this.router = express_1.default.Router();
        this.routes();
    }
    loadProfilePhoto(req, res, next) {
        const profilePhoto = req.file;
        fileUploadService_1.default.loadProfilePhoto(profilePhoto).then((existProfilePhoto) => {
            res.status(200).json({
                status_code: 1,
                message: "Operation Completed",
                image_key: existProfilePhoto === null || existProfilePhoto === void 0 ? void 0 : existProfilePhoto.filename
            });
        }).catch((err) => {
            next(err);
        });
    }
    routes() {
        this.router.post("/", checkAuth_1.default, uploadProfilePhoto_1.default.single("image"), this.loadProfilePhoto.bind(this));
    }
}
const fileUploadController = new FileUploadController();
exports.default = fileUploadController.router;
//# sourceMappingURL=fileUploadController.js.map