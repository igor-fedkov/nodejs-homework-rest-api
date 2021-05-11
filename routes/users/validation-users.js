const joi = require('joi')

const { HttpCodes } = require('../../helpers/constants')

const subscriptions = ['starter', 'pro', 'business']

const schemaRegistration = joi.object({
  password: joi.string()
    .min(8)
    .max(20)
    .required(),
  email: joi.string()
    .email({ ignoreLength: true })
    .required(),
  subscription: joi.any()
    .valid(...subscriptions)
    .default('starter'),
  token: joi.string()
    .default(null),
})

const schemaLogin = joi.object({
  password: joi.string()
    .min(8)
    .max(20)
    .required(),
  email: joi.string()
    .email({ ignoreLength: true })
    .required(),
})

const schemaSubscription = joi.object({
  subscription: joi.any()
    .valid(...subscriptions)
    .required(),
})

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    return next()
  } catch (err) {
    next({
      status: HttpCodes.BAD_REQUEST,
      message: err.message.replace(/"/g, "'"),
      data: err.message.replace(/"/g, "'")
    })
  }
}

module.exports = {
  registration: async (req, res, next) => {
    return await validate(schemaRegistration, req.body, next)
  },
  login: async (req, res, next) => {
    return await validate(schemaLogin, req.body, next)
  },
  updateSubscription: async (req, res, next) => {
    return await validate(schemaSubscription, req.body, next)
  },
}
