"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const schemas = {
    detail: Joi.object().keys({
        id: Joi.string().required(),
    }).options({ abortEarly: false }),
    create: Joi.object().keys({
        firstName: Joi.string().min(2).max(50).trim().required(),
        lastName: Joi.string().min(2).max(50).trim().required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
        age: Joi.number().integer().required(),
        id: Joi.string(),
        isActive: Joi.boolean()
    }).options({ abortEarly: false })
};
exports.default = schemas;
//# sourceMappingURL=userValidator.js.map