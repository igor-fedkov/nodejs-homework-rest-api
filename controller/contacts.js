const Contact = require('../model/contacts')
const { HttpCodes } = require('../helpers/constants')

const get = async (req, res, next) => {
  const userId = req.user?.id
  const { page = 1, limit = 20, favorite } = req.query
  const customLabels = {
    docs: 'contacts',
  }
  try {
    let contacts
    if (favorite === undefined) {
      contacts = await Contact.getAllContacts({ userId, page, limit, customLabels })
    } else {
      contacts = await Contact.getFavoriteContacts({ userId, page, limit, favorite, customLabels })
    }

    return res.status(HttpCodes.OK).json({
      status: 'success',
      code: HttpCodes.OK,
      data: contacts,
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

const getById = async (req, res, next) => {
  const userId = req.user?.id
  const { contactId } = req.params
  console.log(req.params)
  try {
    const contact = await Contact.getContactById(userId, contactId)

    if (contact) {
      return res.status(HttpCodes.OK).json({
        status: 'success',
        code: HttpCodes.OK,
        data: {
          contact,
        },
      })
    }

    return res.status(HttpCodes.NOT_FOUND).json({
      status: 'error',
      code: HttpCodes.NOT_FOUND,
      message: `Not found contact id: ${contactId}`,
      data: 'Not Found',
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

const remove = async (req, res, next) => {
  const userId = req.user?.id
  const { contactId } = req.params

  try {
    const result = await Contact.removeContact(userId, contactId)

    if (result) {
      return res.status(HttpCodes.OK).json({
        status: 'success',
        code: HttpCodes.OK,
        data: { contact: result },
      })
    }

    return res.status(HttpCodes.NOT_FOUND).json({
      status: 'error',
      code: HttpCodes.NOT_FOUND,
      message: `Not found contact id: ${contactId}`,
      data: 'Not Found',
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

const create = async (req, res, next) => {
  const userId = req.user?.id
  const contact = req.body
  try {
    const result = await Contact.createContact({ ...contact, owner: userId })
    return res.status(HttpCodes.CREATED).json({
      status: 'success',
      code: HttpCodes.CREATED,
      data: { contact: result },
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

const update = async (req, res, next) => {
  const userId = req.user?.id
  const { contactId } = req.params
  const fields = req.body

  try {
    const result = await Contact.updateContact(userId, contactId, fields)
    if (result) {
      return res.status(HttpCodes.OK).json({
        status: 'success',
        code: HttpCodes.OK,
        data: { contact: result },
      })
    }

    return res.status(HttpCodes.NOT_FOUND).json({
      status: 'error',
      code: HttpCodes.NOT_FOUND,
      message: `Not found contact id: ${contactId}`,
      data: 'Not Found',
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

const updateStatus = async (req, res, next) => {
  const userId = req.user?.id
  const { contactId } = req.params
  const { favorite } = req.body

  try {
    const result = await Contact.updateContact(userId, contactId, { favorite })
    if (result) {
      return res.status(HttpCodes.OK).json({
        status: 'success',
        code: HttpCodes.OK,
        data: { contact: result },
      })
    }

    return res.status(HttpCodes.NOT_FOUND).json({
      status: 'error',
      code: HttpCodes.NOT_FOUND,
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
  updateStatus,
  remove,
}
