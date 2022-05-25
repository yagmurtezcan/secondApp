"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const schemas = {
    create: Joi.object().keys({
        id: Joi.number().integer().required(),
        product_name: Joi.string().min(2).max(100).trim().required(),
        product_price: Joi.number().integer().required(),
        product_quantity: Joi.number().integer().required(),
        is_active: Joi.boolean().required(),
    }).options({ abortEarly: false })
};
exports.default = schemas;
//# sourceMappingURL=productValidator.js.map