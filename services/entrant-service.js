const EntrantModel = require('../models/entrant-model')

async function findAll() {
  return EntrantModel.find()
}

async function find(id) {
  return EntrantModel.findOne({ _id: id })
}

async function add(entrant) {
  return EntrantModel.create(entrant)
}

async function findByIdAndUpdate(id) {
  return EntrantModel.findByIdAndUpdate({ _id: id })
}

async function vote(entrantId, userId) {
  return EntrantModel.findByIdAndUpdate(
    { _id: entrantId },
    { $push: { votes: userId } },
    { new: true }
  )
}

module.exports = {
  add,
  findAll,
  find,
  findByIdAndUpdate,
  vote
}
