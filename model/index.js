const fs = require('fs').promises
const path = require('path')
const contactsFile = path.resolve('./model/contacts.json')
const shortId = require('shortid')

const onErr = err => {
  console.log(err)
  process.exit(1)
}

// ---------------------------------------

const listContacts = async () => {
  // console.log(__dirname, contactsFile)
  try {
    const data = await fs.readFile(contactsFile)
    return JSON.parse(data)
  } catch (err) {
    onErr(err)
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts()
    return contacts.find(({ id }) => id.toString() === contactId.toString())
  } catch (err) {
    onErr(err)
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts()
    const newList = contacts.filter(({ id }) => id.toString() !== contactId.toString())

    if (contacts.length !== newList.length) {
      await fs.writeFile(contactsFile, JSON.stringify(newList))
      return true
    }
    return false
  } catch (err) {
    onErr(err)
  }
}

const addContact = async (body) => {
  try {
    const contacts = await listContacts()
    const newContact = {
      id: shortId(),
      ...body,
    }

    await fs.writeFile(contactsFile, JSON.stringify([...contacts, newContact]))

    return newContact
  } catch (err) {
    onErr(err)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts()
    const oldContact = contacts.find(({ id }) => id.toString() === contactId.toString())

    if (oldContact) {
      const newList = contacts.filter(({ id }) => id.toString() !== contactId.toString())
      const newContact = { ...oldContact, ...body }
      await fs.writeFile(contactsFile, JSON.stringify([...newList, newContact]))
      return newContact
    }

    return null
  } catch (err) {
    onErr(err)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
