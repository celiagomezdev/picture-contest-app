import test from 'ava'
import request from 'supertest'
import app from '../app'
import faker from 'faker'
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

//Make a votation

test('Make a votation', async t => {
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

  const votationRes = await request(app)
    .post('/contest/votation')
    .send(votationBodyReq)

  t.is(votationRes.status, 200)
})

test('Avoid making more than 3 votations in 10 minutes', async t => {
  //Create 4 entrants
  const entrantOne = {
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    email: faker.internet.email(),
    pictureUrl: faker.image.imageUrl(),
    location: { type: 'Point', coordinates: [-564638, 332432] }
  }

  const entrantOneRes = await request(app)
    .post('/contest/entrant')
    .send(entrantOne)

  t.is(entrantOneRes.status, 200)

  const entrantTwo = {
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    email: faker.internet.email(),
    pictureUrl: faker.image.imageUrl(),
    location: { type: 'Point', coordinates: [-564638, 332432] }
  }

  const entrantTwoRes = await request(app)
    .post('/contest/entrant')
    .send(entrantTwo)

  t.is(entrantTwoRes.status, 200)

  const entrantThree = {
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    email: faker.internet.email(),
    pictureUrl: faker.image.imageUrl(),
    location: { type: 'Point', coordinates: [-564638, 332432] }
  }

  const entrantThreeRes = await request(app)
    .post('/contest/entrant')
    .send(entrantThree)

  t.is(entrantThreeRes.status, 200)

  const entrantFour = {
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    email: faker.internet.email(),
    pictureUrl: faker.image.imageUrl(),
    location: { type: 'Point', coordinates: [-564638, 332432] }
  }

  const entrantFourRes = await request(app)
    .post('/contest/entrant')
    .send(entrantFour)

  t.is(entrantFourRes.status, 200)

  //Create User

  const user = {
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    email: faker.internet.email()
  }

  const userRes = await request(app)
    .post('/contest/user')
    .send(user)

  console.log(userRes.body.votationsAmount)
  t.is(userRes.status, 200)

  //Make four votations

  const votationBodyReq = {
    entrantId: entrantOneRes.body._id,
    userId: userRes.body._id
  }

  const votationRes = await request(app)
    .post('/contest/votation')
    .send(votationBodyReq)

  t.is(votationRes.status, 200)

  const votationTwoBodyReq = {
    entrantId: entrantTwoRes.body._id,
    userId: userRes.body._id
  }

  const votationTwoRes = await request(app)
    .post('/contest/votation')
    .send(votationTwoBodyReq)

  t.is(votationTwoRes.status, 200)

  const votationThreeBodyReq = {
    entrantId: entrantThreeRes.body._id,
    userId: userRes.body._id
  }

  const votationThreeRes = await request(app)
    .post('/contest/votation')
    .send(votationThreeBodyReq)

  t.is(votationThreeRes.status, 200)

  const votationFourBodyReq = {
    entrantId: entrantFourRes.body._id,
    userId: userRes.body._id
  }

  const votationFourRes = await request(app)
    .post('/contest/votation')
    .send(votationFourBodyReq)

  console.log(entrantFourRes.body._id)
  console.log(userRes.body._id)

  t.is(votationFourRes.status, 400)
})
