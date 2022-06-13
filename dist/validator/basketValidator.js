"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const schemas = {
    detail: Joi.object().keys({
        id: Joi.string().required()
    }).options({ abortEarly: false }),
    add: Joi.object().keys({
        product_id: Joi.number().integer().required(),
        quantity: Joi.number().integer().required(),
        user_id: Joi.number().required()
    }).options({ abortEarly: false })
};
exports.default = schemas;
//# sourceMappingURL=basketValidator.js.map