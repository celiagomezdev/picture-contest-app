const UserModel = require('../models/user-model')

async function add(user) {
  return UserModel.create(user)
}

module.exports = {
  add
}
