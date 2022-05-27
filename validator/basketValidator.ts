const Joi = require("joi")

const schemas = {
    detail: Joi.object().keys({
        id: Joi.string().required()
    }).options({abortEarly: false}),

    add: Joi.object().keys({
        product_id: Joi.number().integer().required(),
        quantity: Joi.number().integer().required(),
    }).options({abortEarly: false})
}

export default schemas;