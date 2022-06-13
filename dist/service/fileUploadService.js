"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_exception_1 = require("../src/common/http.exception");
class FileUploadService {
    loadProfilePhoto(profilePhoto) {
        return new Promise((resolve, rejects) => {
            if (profilePhoto) {
                resolve(profilePhoto);
            }
            else {
                rejects(new http_exception_1.ProductNotFoundException("Please select profile photo"));
            }
        });
    }
}
const fileUploadService = new FileUploadService();
exports.default = fileUploadService;
//# sourceMappingURL=fileUploadService.js.map