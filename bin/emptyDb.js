const EntrantModel = require('../models/entrant-model')
const UserModel = require('../models/user-model')

require('../database-connection')

function emptyEntrantDb() {
  EntrantModel.remove({}, function(err, result) {
    if (err) return err
    console.log('Entrant collection removed: ' + JSON.stringify(result.result))
  })
}

function emptyUserDb() {
  UserModel.remove({}, function(err, result) {
    if (err) return err
    console.log('User collection removed: ' + JSON.stringify(result.result))
  })
}

module.exports = {
  emptyEntrantDb,
  emptyUserDb
}
