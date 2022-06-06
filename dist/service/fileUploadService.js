"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("./UserService"));
class FileUploadService {
    loadProfilePhoto(profilePhoto, user, userId) {
        return new Promise((resolve, rejects) => {
            user.image = profilePhoto;
            UserService_1.default.updateUser(user, userId).then((updatedUser) => {
                resolve(updatedUser);
            }).catch((err) => {
                rejects(err);
            });
        });
    }
}
const fileUploadService = new FileUploadService();
exports.default = fileUploadService;
//# sourceMappingURL=fileUploadService.js.map