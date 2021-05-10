const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const { Schema, SchemaTypes } = mongoose

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
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    }
  },
  {
    versionKey: false,
    timestamps: true,
    toObjects: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id
        return ret
      }
    },
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id
        return ret
      }
    }
  }
)

contactSchema.path('email').validate((value) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return re.test(String(value))
})

contactSchema.path('phone').validate((value) => {
  const re = /^(\d*|\+*|-*| *|\(*|\)*)*$/
  return re.test(String(value))
})

contactSchema.plugin(mongoosePaginate)

const Contact = mongoose.model('contact', contactSchema)

Contact.paginate().then({})

module.exports = Contact
