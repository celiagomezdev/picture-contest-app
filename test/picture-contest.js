import test from 'ava'
import request from 'supertest'
import app from '../app'
import faker from 'faker'
import mongoose from 'mongoose'

test('Create an entrant', async t => {
  const entrant = {
    email: faker.internet.email(),
    pictureId: '98787hjhasdghjg',
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

//Make a votation

test('Make a votation', async t => {
  const entrant = {
    email: faker.internet.email(),
    pictureId: '98787hjhasdghjg',
    location: { type: 'Point', coordinates: [-564638, 332432] }
  }

  const entrantRes = await request(app)
    .post('/contest/entrant')
    .send(entrant)

  t.is(entrantRes.status, 200)

  const user = {
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    email: faker.internet.email()
  }

  const userRes = await request(app)
    .post('/contest/user')
    .send(user)

  t.is(userRes.status, 200)

  const votationBodyReq = {
    entrantId: entrantRes.body._id,
    userId: userRes.body._id
  }

  const reservationRes = await request(app)
    .post('/contest/votation')
    .send(votationBodyReq)

  t.is(reservationRes.status, 200)
})
