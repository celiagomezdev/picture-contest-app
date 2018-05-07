import test from 'ava'
import request from 'supertest'
import app from '../app'
import faker from 'faker'
import mongoose from 'mongoose'
import databaseHelper from '../bin/emptyDb'

// Clean DB
databaseHelper.emptyEntrantDb()
databaseHelper.emptyUserDb()

// Tests

test('Create an entrant', async t => {
  const entrant = {
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    email: faker.internet.email(),
    pictureUrl: faker.image.imageUrl(),
    location: { type: 'Point', coordinates: [-564638, 332432] }
  }

  const res = await request(app)
    .post('/contest/entrant')
    .send(entrant)

  t.is(res.status, 200)
})

test('Create an user', async t => {
  const user = {
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    email: faker.internet.email(),
    votations: [
      {
        votationStarted: Date.now(),
        entrantsId: ['kjsadksadkgshk876', 'hasghjsghjsgdjhs']
      }
    ]
  }

  const res = await request(app)
    .post('/contest/user')
    .send(user)

  t.is(res.status, 200)
})

// Votation

test('Make a votation', async t => {
  //Create an entrant
  const entrant = {
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    email: faker.internet.email(),
    pictureUrl: faker.image.imageUrl(),
    location: { type: 'Point', coordinates: [-564638, 332432] }
  }

  const entrantRes = await request(app)
    .post('/contest/entrant')
    .send(entrant)

  t.is(entrantRes.status, 200)

  //Create an user
  const user = {
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    email: faker.internet.email(),
    votations: [
      {
        votationStarted: Date.now(),
        entrantsId: ['kjsadksadkgshk876', 'hasghjsghjsgdjhs']
      }
    ]
  }

  const userRes = await request(app)
    .post('/contest/user')
    .send(user)

  t.is(userRes.status, 200)

  //Make the votation

  const bodyReq = { entrantId: entrantRes.body._id, userId: userRes.body._id }

  const votationRes = await request(app)
    .post('/contest/votation')
    .send(bodyReq)

  t.is(votationRes.status, 200)
})
