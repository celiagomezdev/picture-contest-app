const mongoose = require('mongoose')
const validate = require('mongoose-validator')

const emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Invalid Email address. Please try again'
  })
]

const UserSchema = mongoose.Schema({
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
  votationStarted: {
    type: Date
  },
  votationsAmount: {
    type: Number,
    max: 3
  }
})

UserSchema.methods.votationIsAllowed = function votationIsAllowed() {
  return (Date.now() - this.votationStarted) / 1000 < 600
}

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
