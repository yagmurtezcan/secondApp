import Joi from "joi";

const schemas = {
    list: Joi.object().keys({
        name: Joi.string().max(150).trim().optional(),
        coordinates: Joi.array().items(Joi.number()).length(4).optional()
    }).options({ abortEarly: false }),

};
export default schemas;