import Joi from "joi";

const schemas1 = {
    list: Joi.object().keys({
        name: Joi.string().max(150).trim().optional(),
        coordinates: Joi.array().items(Joi.number()).length(4).optional()
    }).options({ abortEarly: false }),

};

const schemas = {
list: Joi.object().keys({
  firstName : Joi.string().min(2).max(50).trim().required(),
  lastName : Joi.string().min(2).max(50).trim().required(),
  email : Joi.string().email({minDomainSegments : 2 , tlds : {allow : ["com", "net"]}}).required(),
  age : Joi.number().integer().required()
}).options({abortEarly : false})
}


export default schemas;