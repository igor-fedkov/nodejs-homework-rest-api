const express = require('express')
const router = express.Router()

const validate = require('../../controller/validation-contacts')
const ctrContact = require('../../controller')

router.get('/', ctrContact.get)

router.get('/:contactId', ctrContact.getById)

router.post('/', validate.createContact, (req, res, next) => ctrContact.create(req, res, next))

router.delete('/:contactId', ctrContact.remove)

router.put('/:contactId', validate.updateContact, (req, res, next) => ctrContact.update(req, res, next))

router.patch('/:contactId/favorite', validate.updateStatusContact, (req, res, next) => ctrContact.updateStatusContact(req, res, next))

module.exports = router
