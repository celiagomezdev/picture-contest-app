const express = require('express')
const router = express.Router()

const EntrantService = require('../services/entrant-service')
const UserService = require('../services/user-service')

//Entrant Routes

router.post('/entrant', async (req, res, next) => {
  const entrant = await EntrantService.add(req.body)
  res.send(entrant)
})

//User Routes

router.post('/user', async (req, res, next) => {
  const user = await UserService.add(req.body)
  res.send(user)
})

module.exports = router
