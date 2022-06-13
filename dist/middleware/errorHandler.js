"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(error, request, response, next) {
    const errorObject = {};
    const status = error.status || 500;
    const status_code = error.status_code || 0;
    errorObject.message = error.message || "Something went wrong";
    errorObject.status_code = status_code;
    response.status(status).send(Object.assign({}, errorObject));
}
exports.default = errorMiddleware;
//# sourceMappingURL=errorHandler.js.map