const express = require('express')
const router = express.Router()

const validate = require('./validation-users')
const ctrUser = require('../../controller/users')
const guard = require('../../helpers/guard')

router.patch('/', guard, validate.updateSubscription, ctrUser.updateSubscription)

router.post('/signup', validate.registration, ctrUser.registration)

router.post('/login', validate.login, ctrUser.login)

router.post('/logout', guard, ctrUser.logout)

router.get('/current', guard, ctrUser.getCurrentUser)

module.exports = router
