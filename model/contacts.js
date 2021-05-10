const Contact = require('./schemas/contact')

const getAllContacts = async ({ userId, page, limit, customLabels }) => {
  return await Contact.paginate(
    { owner: userId },
    {
      page,
      limit,
      customLabels
    })
}

const getFavoriteContacts = async ({ userId, page, limit, favorite, customLabels }) => {
  return await Contact.paginate(
    {
      owner: userId,
      favorite
    },
    {
      page,
      limit,
      customLabels
    })
}

const getContactById = async (userId, id) => {
  return await Contact.findOne({ _id: id, owner: userId })
}

const createContact = async (contact) => {
  return await Contact.create(contact)
}

const updateContact = async (userId, id, fields) => {
  return await Contact.findByIdAndUpdate({ _id: id, owner: userId }, { ...fields }, { new: true })
}

const removeContact = async (userId, id) => {
  return await Contact.findByIdAndRemove({ _id: id, owner: userId })
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  getFavoriteContacts,
}
