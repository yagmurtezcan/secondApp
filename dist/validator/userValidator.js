"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const schemas1 = {
    list: joi_1.default.object().keys({
        name: joi_1.default.string().max(150).trim().optional(),
        coordinates: joi_1.default.array().items(joi_1.default.number()).length(4).optional()
    }).options({ abortEarly: false }),
};
const schemas = {
    list: joi_1.default.object().keys({
        firstName: joi_1.default.string().min(2).max(50).trim().required(),
        lastName: joi_1.default.string().min(2).max(50).trim().required(),
        email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
        age: joi_1.default.number().integer().required()
    }).options({ abortEarly: false })
};
exports.default = schemas;
//# sourceMappingURL=userValidator.js.map