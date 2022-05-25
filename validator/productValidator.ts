const Joi = require("joi")

const schemas = {
    detail: Joi.object().keys({
        id: Joi.string().required()
    }).options({abortEarly: false}),

    create: Joi.object().keys({
        id: Joi.string(),
        product_name: Joi.string().min(2).max(100).trim().required(),
        product_price: Joi.number().integer().required(),
        product_quantity: Joi.number().integer().required(),
        is_active: Joi.boolean().required(),
    }).options({abortEarly: false})
}

export default schemas;