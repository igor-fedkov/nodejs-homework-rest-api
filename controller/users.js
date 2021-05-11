const Users = require('../model/users')
const { HttpCodes } = require('../helpers/constants')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const registration = async (req, res, next) => {
  const { email } = req.body
  const user = await Users.findUserByEmail(email)
  if (user) {
    return res.status(HttpCodes.CONFLICT).json({
      status: 'error',
      code: HttpCodes.CONFLICT,
      message: 'Email in use',
      data: 'Email in use'
    })
  }

  try {
    const { subscription } = await Users.createUser(req.body)
    return res.status(HttpCodes.CREATED).json({
      status: 'success',
      code: HttpCodes.CREATED,
      data: {
        user: {
          subscription,
          email,
        }
      },
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  const user = await Users.findUserByEmail(email)

  if (user && user.validPassword(password)) {
    const payload = {
      id: user.id
    }

    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1w' })

    await Users.updateToken(user.id, token)

    return res.status(HttpCodes.OK).json({
      status: 'success',
      code: HttpCodes.OK,
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription
        }
      },
    })
  }

  return res.status(HttpCodes.UNAUTORIZED).json({
    status: 'error',
    code: HttpCodes.UNAUTORIZED,
    message: 'Email or password is wrong',
    data: 'Email or password is wrong',
  })
}

const logout = async (req, res, next) => {
  const id = req.user.id
  const user = await Users.findUserById(id)

  if (user) {
    await Users.updateToken(id, null)
    return res.status(HttpCodes.NO_CONTENT).json({
      status: 'success',
      code: HttpCodes.NO_CONTENT
    })
  }

  return res.status(HttpCodes.UNAUTORIZED).json({
    status: 'error',
    code: HttpCodes.UNAUTORIZED,
    message: 'Not authorized',
    data: 'Not authorized',
  })
}

const getCurrentUser = async (req, res, next) => {
  const user = req.user
  if (user) {
    return res.status(HttpCodes.OK).json({
      status: 'success',
      code: HttpCodes.OK,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription
        }
      },
    })
  }

  return res.status(HttpCodes.UNAUTORIZED).json({
    status: 'error',
    code: HttpCodes.UNAUTORIZED,
    message: 'Not authorized',
    data: 'Not authorized',
  })
}

const updateSubscription = async (req, res, next) => {
  const { subscription } = req.body
  const { user } = req

  if (!subscription) {
    return res.status(HttpCodes.BAD_REQUEST).json({
      status: 'error',
      code: HttpCodes.BAD_REQUEST,
      message: 'No subscription',
      data: 'No subscription',
    })
  }

  if (!user) {
    return res.status(HttpCodes.UNAUTORIZED).json({
      status: 'error',
      code: HttpCodes.UNAUTORIZED,
      message: 'Not authorized',
      data: 'Not authorized',
    })
  }

  await Users.updateSubscription(user.id, subscription)
  return res.status(HttpCodes.OK).json({
    status: 'success',
    code: HttpCodes.OK,
    data: {
      user: {
        email: user.email,
        subscription
      }
    },
  })
}

module.exports = {
  registration,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
}
