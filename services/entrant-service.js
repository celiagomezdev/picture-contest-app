const EntrantModel = require('../models/entrant-model')

async function add(entrant) {
  return EntrantModel.create(entrant)
}

module.exports = {
  add
}
