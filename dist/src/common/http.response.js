"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
class Response {
    constructor(message, data, statusCode) {
        this.status_code = statusCode;
        this.message = message;
        this.data = data;
    }
}
exports.Response = Response;
class OperationCompleted extends Response {
    constructor(message = "Operation Completed", data, statusCode) {
        super(message, data);
        this.message = message;
        this.status_code = statusCode ? statusCode : 1;
    }
}
exports.default = OperationCompleted;
//# sourceMappingURL=http.response.js.map