const User = require('./schemas/user')

const findUserById = async (id) => {
  return await User.findOne({ _id: id })
}

const findUserByEmail = async (email) => {
  return await User.findOne({ email })
}

const createUser = async (userFields) => {
  const user = new User(userFields)
  return await User.create(user)
}

// const updateUser = async (id, fields) => {
//   return await User.findByIdAndUpdate({ _id: id }, { ...fields }, { new: true })
// }

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token })
}

const updateSubscription = async (id, subscription) => {
  return await User.updateOne({ _id: id }, { subscription })
}

module.exports = {
  findUserById,
  findUserByEmail,
  createUser,
  updateToken,
  updateSubscription,
}
