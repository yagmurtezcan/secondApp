"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FileUploadService {
    loadProfilePhoto(profilePhoto) {
        return new Promise((resolve, rejects) => {
            if (profilePhoto) {
                resolve(profilePhoto);
            }
            else {
                rejects("please select profile photo");
            }
        });
    }
}
const fileUploadService = new FileUploadService();
exports.default = fileUploadService;
//# sourceMappingURL=fileUploadService.js.map