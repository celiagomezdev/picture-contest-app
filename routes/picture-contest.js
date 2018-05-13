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
  const user = await UserService.find(req.body.userId)

  if (user.votationsAmount === undefined) {
    console.log('First vote. We set up time of votation.')
    const updatedEntrant = await EntrantModel.findByIdAndUpdate(
      { _id: req.body.entrantId },
      { $push: { votes: req.body.userId } },
      { new: true }
    )

    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id: req.body.userId },
      { votationStarted: Date.now(), $inc: { votationsAmount: 1 } },
      { new: true }
    )

    res.send(updatedEntrant)
  } else if (user.votationIsAllowed() && user.votationsAmount > 2) {
    console.log('Performed more than 3 votes in 10 minutes. Error.')
    res
      .status(400)
      .send({ message: 'You can only perform 3 votes every 10 minutes' })

    //We set votations count to 0
    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id: req.body.userId },
      { votationsAmount: 0 },
      { new: true }
    )
  } else {
    console.log(
      'The user has not reach the 3 maximum votes in 10 minutes. We add one.'
    )
    const updatedEntrant = await EntrantModel.findByIdAndUpdate(
      { _id: req.body.entrantId },
      { $push: { votes: req.body.userId } },
      { new: true }
    )

    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id: req.body.userId },
      { $inc: { votationsAmount: 1 } },
      { new: true }
    )

    res.send(updatedEntrant)
  }
})

module.exports = router

// router.post('/votation', async (req, res, next) => {
//   const user = await UserService.find(req.body.userId)
//   console.log(user.votations.length)

//   if (user.votations.length > 0 && user.votationIsAllowed()) {
//     console.log('We reached first condition')
//     const updatedEntrant = await EntrantModel.findByIdAndUpdate(
//       { _id: req.body.entrantId },
//       { $push: { votes: req.body.userId } },
//       { new: true }
//     )

//     const updatedUser = await UserModel.findByIdAndUpdate(
//       { _id: req.body.userId },
//       {
//         $push: {
//           'votations.0.entrantsId': req.body.entrantId
//         }
//       },
//       { new: true }
//     )

//     console.log(updatedEntrant.votes)
//     // console.log(JSON.stringify(updatedUser.votations[0]))
//     res.send(updatedUser)
//   } else {
//     const updatedEntrant = await EntrantModel.findByIdAndUpdate(
//       { _id: req.body.entrantId },
//       { $push: { votes: req.body.userId } },
//       { new: true }
//     )
//     const updatedUser = await UserModel.findByIdAndUpdate(
//       { _id: req.body.userId },
//       {
//         $push: {
//           votations: {
//             votationStarted: Date.now(),
//             entrantsId: req.body.entrantId
//           },
//           $position: 0
//         }
//       },
//       { new: true }
//     )

//     console.log('We reached second condition')
//     console.log(updatedEntrant.votes)
//     res.send(updatedUser)
//   }
// })
