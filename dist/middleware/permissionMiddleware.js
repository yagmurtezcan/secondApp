"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_exception_1 = require("../src/common/http.exception");
function permissonMiddleware(permission) {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (permission.includes(userRole)) {
            next();
        }
        else {
            next(new http_exception_1.UnAutorizedPerson("You dont have permission"));
        }
    };
}
exports.default = permissonMiddleware;
//# sourceMappingURL=permissionMiddleware.js.map