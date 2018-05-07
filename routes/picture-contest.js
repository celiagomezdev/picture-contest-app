const express = require('express')
const router = express.Router()

const EntrantService = require('../services/entrant-service')
const UserService = require('../services/user-service')

//Entrant Routes

router.post('/entrant', async (req, res, next) => {
  const entrant = await EntrantService.add(req.body)
  console.log(entrant)
  res.send(entrant)
})

//User Routes

router.post('/user', async (req, res, next) => {
  const user = await UserService.add(req.body)
  console.log(user)
  res.send(user)
})

//Voting route

router.post('/votation', async (req, res, next) => {
  const entrant = await EntrantService.find(req.body.entrantId)
  const user = await UserService.find(req.body.userId)

  if (user.votationIsAllowed()) {
    const updatedEntrant = await EntrantService.update(
      req.body.entrantId,
      { $push: { votes: req.body.userId } },
      { new: true }
    )

    const updatedUser = await UserService.update(req.body.userId, {
      votations: {
        $push: { entrantsId: req.body.entrantId }
      }
    })
  }

  const updatedEntrant = await EntrantService.update(
    req.body.entrantId,
    { $push: { votes: req.body.userId } },
    { new: true }
  )

  const updatedUser = await UserService.update(req.body.userId, {
    $push: {
      votations: { votationStarted: Date.now(), entrantsId: req.body.entrantId }
    }
  })

  res.send(updatedEntrant)
})

module.exports = router
