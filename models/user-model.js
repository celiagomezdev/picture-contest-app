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
  votations: [
    {
      votationStarted: Date,
      entrantsId: [
        {
          type: String,
          max: [3, 'You can only vote 3 entrants every 10 minutes']
        }
      ]
    }
  ]
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
