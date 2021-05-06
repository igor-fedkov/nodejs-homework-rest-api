const Contact = require('./schemas/contact')

const getAllContacts = async () => {
  return await Contact.find()
}

const getContactById = async (id) => {
  return await Contact.findOne({ _id: id })
}

const createContact = async contact => {
  return await Contact.create(contact)
}

const updateContact = async (id, fields) => {
  return await Contact.findByIdAndUpdate({ _id: id }, { ...fields }, { new: true })
}

const removeContact = async id => {
  return await Contact.findByIdAndRemove({ _id: id })
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
}
