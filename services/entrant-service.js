const EntrantModel = require('../models/entrant-model')

async function add(entrant) {
  return EntrantModel.create(entrant)
}

async function find(id) {
  return EntrantModel.findOne({ _id: id })
}

module.exports = {
  add,
  find
}
