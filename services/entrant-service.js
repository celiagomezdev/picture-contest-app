const EntrantModel = require('../models/entrant-model')

async function findAll() {
  return EntrantModel.find()
}

async function add(entrant) {
  return EntrantModel.create(entrant)
}

async function findByIdAndUpdate(id) {
  return EntrantModel.findByIdAndUpdate({ _id: id })
}

module.exports = {
  add,
  findAll,
  findByIdAndUpdate
}
