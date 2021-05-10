const express = require('express')
const router = express.Router()

const validate = require('./validation-contacts')
const ctrContact = require('../../controller/contacts')

const guard = require('../../helpers/guard')

router.get('/', guard, ctrContact.get)

router.post('/', guard, validate.createContact, (req, res, next) => ctrContact.create(req, res, next))

router.get('/:contactId', guard, ctrContact.getById)

router.delete('/:contactId', guard, ctrContact.remove)

router.put('/:contactId', guard, validate.updateContact, (req, res, next) => ctrContact.update(req, res, next))

router.patch('/:contactId/favorite', guard, validate.updateStatusContact, (req, res, next) => ctrContact.updateStatus(req, res, next))

module.exports = router
