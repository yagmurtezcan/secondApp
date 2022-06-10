"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const schemas = {
    detail: Joi.object().keys({
        id: Joi.number().required(),
    }).options({ abortEarly: false }),
    create: Joi.object().keys({
        firstname: Joi.string().min(2).max(50).trim().required(),
        lastname: Joi.string().min(2).max(50).trim().required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
        age: Joi.number().integer().required(),
        id: Joi.string(),
        isActive: Joi.boolean(),
        password: Joi.string().required(),
        image: Joi.string()
    }).options({ abortEarly: false })
};
exports.default = schemas;
//# sourceMappingURL=userValidator.js.map