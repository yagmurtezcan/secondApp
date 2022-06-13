"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function permissonMiddleware(permission) {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (permission.includes(userRole)) {
            next();
        }
        else {
            next("you dont have permission");
        }
    };
}
exports.default = permissonMiddleware;
//# sourceMappingURL=permissionMiddleware.js.map