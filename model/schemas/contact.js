const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
)

contactSchema.path('email').validate((value) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return re.test(String(value))
})

contactSchema.path('phone').validate((value) => {
  const re = /^(\d*|\+*|-*| *|\(*|\)*)*$/
  return re.test(String(value))
})

const Contact = mongoose.model('contact', contactSchema)

module.exports = Contact
