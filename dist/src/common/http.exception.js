"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExist = exports.TokenNotFoundException = exports.HttpException = void 0;
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
        super(500, message, statusCode);
        this.message = message;
        this.status_code = statusCode ? statusCode : 1;
    }
}
exports.TokenNotFoundException = TokenNotFoundException;
class UserAlreadyExist extends HttpException {
    constructor(message, statusCode) {
        if (!statusCode)
            statusCode = 2;
        super(500, message || "User already exist", statusCode);
    }
}
exports.UserAlreadyExist = UserAlreadyExist;
//# sourceMappingURL=http.exception.js.map