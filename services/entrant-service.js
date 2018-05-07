const EntrantModel = require('../models/entrant-model')

async function findAll() {
  return EntrantModel.find()
}

async function add(entrant) {
  return EntrantModel.create(entrant)
}

module.exports = {
  add,
  findAll
}
