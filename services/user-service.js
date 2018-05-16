const UserModel = require('../models/user-model')

async function add(user) {
  return UserModel.create(user)
}

async function find(id) {
  return UserModel.findOne({ _id: id })
}

async function findByIdAndUpdate(id) {
  return UserModel.findByIdAndUpdate({ _id: id })
}

async function vote(userId) {
  const user = await this.find(userId)

  if (user.votationsAmount === undefined) {
    console.log('First vote. We set up time of votation.')
    return UserModel.findByIdAndUpdate(
      { _id: userId },
      { votationStarted: Date.now(), $inc: { votationsAmount: 1 } },
      { new: true }
    )
  } else if (user.votationIsAllowed() && user.votationsAmount > 2) {
    console.log('Performed more than 3 votes in 10 minutes. Error.')
    const err = new Error('You can only perform 3 votes every 10 minutes.')
    err.name = 'ExceededVotesError'
    throw err

    //We set votations count to 0
    return UserModel.findByIdAndUpdate(
      { _id: userId },
      { votationsAmount: 0 },
      { new: true }
    )
  } else {
    console.log(
      'The user has not reach the 3 maximum votes in 10 minutes. We add one.'
    )
    return UserModel.findByIdAndUpdate(
      { _id: userId },
      { $inc: { votationsAmount: 1 } },
      { new: true }
    )
  }
}

module.exports = {
  add,
  find,
  findByIdAndUpdate,
  vote
}
