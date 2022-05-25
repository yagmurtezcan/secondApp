const Joi  = require("joi");

const schemas = {
detail: Joi.object().keys({
  id:  Joi.string().required(),
}).options({abortEarly: false}),

create: Joi.object().keys({
  firstname: Joi.string().min(2).max(50).trim().required(),
  lastname: Joi.string().min(2).max(50).trim().required(),
  email: Joi.string().email({minDomainSegments : 2 , tlds : {allow : ["com", "net"]}}).required(),
  age: Joi.number().integer().required(),
  id:  Joi.string(),
  isActive: Joi.boolean()
}).options({abortEarly: false})
}

export default schemas;