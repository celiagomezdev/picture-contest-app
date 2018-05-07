const express = require('express')
const router = express.Router()

const EntrantService = require('../services/entrant-service')
const UserService = require('../services/user-service')
const EntrantModel = require('../models/entrant-model')
const UserModel = require('../models/user-model')

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
  const updatedEntrant = await EntrantModel.findByIdAndUpdate(
    { _id: req.body.entrantId },
    { $push: { votes: req.body.userId } },
    { new: true }
  )
  const updatedUser = await UserModel.findByIdAndUpdate(
    { _id: req.body.userId },
    {
      $push: {
        votations: {
          votationStarted: Date.now(),
          $push: { entrantsId: req.body.entrantsId }
        }
      }
    },
    { new: true }
  )

  res.send(updatedEntrant)
})

// //Voting route

// router.post('/votation', async (req, res, next) => {
//   const entrant = await EntrantService.find(req.body.entrantId)
//   const user = await UserService.find(req.body.userId)
//   console.log(req.body.entrantId)
//   console.log(req.body.userId)
//   console.log(user)
//   console.log(user.votationIsAllowed())

//   if (user.votationIsAllowed()) {
//     console.log('reached votation is allowed')
//     const updatedEntrant = await EntrantService.update(
//       req.body.entrantId,
//       { $push: { votes: req.body.userId } },
//       { new: true }
//     )
//     console.log(updatedEntrant)
//     const updatedUser = await UserService.update(
//       req.body.userId,
//       {
//         votations: {
//           $push: { entrantsId: req.body.entrantId }
//         }
//       },
//       { new: true }
//     )

//     console.log(updatedUser)
//   }

//   console.log('NOT reached votation is allowed')
//   const updatedEntrant = await EntrantService.update(
//     req.body.entrantId,
//     { $push: { votes: req.body.userId } },
//     { new: true }
//   )

//   const updatedUser = await UserService.update(req.body.userId, {
//     $push: {
//       votations: { votationStarted: Date.now(), entrantsId: req.body.entrantId }
//     }
//   })
//   console.log(updatedEntrant)
//   console.log(updatedUser)
//   res.send(updatedEntrant)
// })

module.exports = router
