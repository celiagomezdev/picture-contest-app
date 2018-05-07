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
