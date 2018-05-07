const mongoose = require('mongoose')
const validate = require('mongoose-validator')

const emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Invalid Email address. Please try again'
  })
]

const EntrantSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: emailValidator
  },
  pictureUrl: {
    type: String,
    required: true
  },
  location: {
    type: { type: String },
    coordinates: [Number]
  },
  votes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})

const EntrantModel = mongoose.model('Entrant', EntrantSchema)

module.exports = EntrantModel
