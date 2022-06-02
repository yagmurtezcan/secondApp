const Joi = require("joi")

const schemas = {
    login: Joi.object().keys({
        email: Joi.string().email({minDomainSegments : 2 , tlds : {allow : ["com", "net"]}}).required(),
        password: Joi.string().required()
    }).options({abortEarly: false})
}

export default schemas;