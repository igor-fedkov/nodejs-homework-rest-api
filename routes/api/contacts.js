const express = require('express')
const router = express.Router()

const validate = require('./validation-contacts')

const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../model')

router.get('/', async (_req, res, next) => {
  try {
    const contacts = await listContacts()
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      },
    })
  } catch (err) {
    next(err)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId)

    if (contact.id) {
      return res.status(200).json(contact)
    }

    return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found'
    })
  } catch (err) {
    next(err)
  }
})

router.post('/', validate.createContact, async (req, res, next) => {
  try {
    const contact = await addContact(req.body)
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        contact,
      },
    })
  } catch (err) {
    next(err)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const success = await removeContact(req.params.contactId)

    if (success) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        message: 'contact deleted'
      })
    }

    return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found'
    })
  } catch (err) {
    next(err)
  }
})

router.patch('/:contactId', validate.updateContact, async (req, res, next) => {
  try {
    const success = await updateContact(req.params.contactId, req.body)

    if (success) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          contact: success,
        },
      })
    }

    return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    })
  } catch (err) {
    next(err)
  }
})

router.put('/:contactId', validate.updateContact, async (req, res, next) => {
  try {
    const success = await updateContact(req.params.contactId, req.body)

    if (success) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          contact: success,
        },
      })
    }

    return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
