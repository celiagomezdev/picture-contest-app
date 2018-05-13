const mongoose = require('mongoose')
const validate = require('mongoose-validator')

const emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Invalid Email address. Please try again'
  })
]

const arrayLimit = value => {
  return value.length <= 3
}

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
    max: [3, 'You can only vote 3 entrants every 10 minutes']
  }
  // votations: [
  //   {
  //     votationStarted: Date,
  //     entrantsId: [
  //       {
  //         type: String,
  //         validate: [
  //           arrayLimit,
  //           'You can only vote 3 entrants every 10 minutes'
  //         ]
  //       }
  //     ]
  //   }
  // ]
})

UserSchema.methods.votationIsAllowed = function votationIsAllowed() {
  return (Date.now() - this.votationStarted) / 1000 < 600
}

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
