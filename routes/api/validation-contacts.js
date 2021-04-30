const joi = require('joi')

const schemaCreateContact = joi.object({
  name: joi.string()
    .min(1)
    .max(255)
    .required(),
  email: joi.string()
    .email({ ignoreLength: true })
    .required(),
  phone: joi.string()
    .regex(/^(\d*|\+*|-*| *|\(*|\)*)*$/)
    .required()
    .messages({
      'string.pattern.base': 'For the phone number allowed nambers, spaces and symbols: "+", "-", "(", ")"',
    }),
})

const schemaUpdateContact = joi.object({
  name: joi.string()
    .min(1)
    .max(255),
  email: joi.string()
    .email({ ignoreLength: true }),
  phone: joi.string()
    .regex(/^(\d*|\+*|-*| *|\(*|\)*)*$/)
    .messages({
      'string.pattern.base': 'For the phone number allowed nambers, spaces and symbols: "+", "-", "(", ")"',
    }),
}).min(1)

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    return next()
  } catch (err) {
    next({
      status: 400,
      message: err.message.replace(/"/g, "'")
    })
  }
}

module.exports = {
  createContact: async (req, res, next) => {
    return await validate(schemaCreateContact, req.body, next)
  },
  updateContact: async (req, res, next) => {
    return await validate(schemaUpdateContact, req.body, next)
  }
}
