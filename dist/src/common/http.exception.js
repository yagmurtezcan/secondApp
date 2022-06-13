"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectPhotoException = exports.ProductNotFoundException = exports.UserNotFoundException = exports.UserAlreadyExistException = exports.TokenNotFoundException = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(status, message, statusCode, data) {
        super();
        this.status = status;
        this.status_code = statusCode;
        this.message = message;
    }
}
exports.HttpException = HttpException;
class TokenNotFoundException extends HttpException {
    constructor(message = "Token not found", statusCode) {
        super(409, message, statusCode);
        this.message = message;
        this.status_code = statusCode ? statusCode : 2;
    }
}
exports.TokenNotFoundException = TokenNotFoundException;
class UserAlreadyExistException extends HttpException {
    constructor(message, statusCode) {
        if (!statusCode)
            statusCode = 2;
        super(500, message || "User already exist", statusCode);
    }
}
exports.UserAlreadyExistException = UserAlreadyExistException;
class UserNotFoundException extends HttpException {
    constructor(message, statusCode) {
        if (!statusCode)
            statusCode = 2;
        super(400, message || "User not found", statusCode);
    }
}
exports.UserNotFoundException = UserNotFoundException;
class ProductNotFoundException extends HttpException {
    constructor(message, statusCode) {
        if (!statusCode)
            statusCode = 2;
        super(400, message || "Product not found", statusCode);
    }
}
exports.ProductNotFoundException = ProductNotFoundException;
class SelectPhotoException extends HttpException {
    constructor(message, statusCode) {
        if (!statusCode)
            statusCode: 2;
        super(400, message || "Please select a photo", statusCode);
    }
}
exports.SelectPhotoException = SelectPhotoException;
//# sourceMappingURL=http.exception.js.map