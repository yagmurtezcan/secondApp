"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const schemas = {
    login: Joi.object().keys({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
        password: Joi.string().required()
    }).options({ abortEarly: false })
};
exports.default = schemas;
//# sourceMappingURL=loginValidator.js.map