const UserModel = require('../models/user-model')

async function add(user) {
  return UserModel.create(user)
}

async function findByIdAndUpdate(id) {
  return UserModel.findByIdAndUpdate({ _id: id })
}

module.exports = {
  add,
  findByIdAndUpdate
}
