const express = require('express')
const router = express.Router()

const EntrantService = require('../services/entrant-service')
const UserService = require('../services/user-service')

//Entrant Routes

router.get('/entrant/all', async (req, res, next) => {
  const entrants = await EntrantService.findAll()
  res.render('entrants-list', { entrants })
})

router.post('/entrant', async (req, res, next) => {
  try {
    const entrant = await EntrantService.add(req.body)
    res.send(entrant)
  } catch (err) {
    next(err)
  }
})

//User Routes

router.post('/user', async (req, res, next) => {
  try {
    const user = await UserService.add(req.body)
    res.send(user)
  } catch (err) {
    next(err)
  }
})

//Votation Route
router.post('/votation', async (req, res, next) => {
  try {
    const updatedUser = await UserService.vote(req.body.userId)
    await EntrantService.vote(req.body.entrantId, req.body.userId)

    res.send(updatedUser)
  } catch (err) {
    next(err)
  }
})

module.exports = router
