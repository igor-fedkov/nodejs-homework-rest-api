const service = require('../model')

const get = async (req, res, next) => {
  try {
    const contacts = await service.getAllContacts()
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      },
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

const getById = async (req, res, next) => {
  const { contactId } = req.params
  console.log(req.params)
  try {
    const contact = await service.getContactById(contactId)

    if (contact) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      })
    }

    return res.status(404).json({
      status: 'error',
      code: 404,
      message: `Not found contact id: ${contactId}`,
      data: 'Not Found',
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

const remove = async (req, res, next) => {
  const { contactId } = req.params

  try {
    const result = await service.removeContact(contactId)

    if (result) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: { contact: result },
      })
    }

    return res.status(404).json({
      status: 'error',
      code: 404,
      message: `Not found contact id: ${contactId}`,
      data: 'Not Found',
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

const create = async (req, res, next) => {
  const contact = req.body
  try {
    const result = await service.createContact(contact)
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: { contact: result },
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

const update = async (req, res, next) => {
  const { contactId } = req.params
  const fields = req.body

  try {
    const result = await service.updateContact(contactId, fields)
    if (result) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: { contact: result },
      })
    }

    return res.status(404).json({
      status: 'error',
      code: 404,
      message: `Not found contact id: ${contactId}`,
      data: 'Not Found',
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params
  const { favorite } = req.body

  try {
    const result = await service.updateContact(contactId, { favorite })
    if (result) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: { contact: result },
      })
    }

    return res.status(404).json({
      status: 'error',
      code: 404,
      message: `Not found contact id: ${contactId}`,
      data: 'Not Found',
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

module.exports = {
  get,
  getById,
  create,
  update,
  updateStatusContact,
  remove,
}
