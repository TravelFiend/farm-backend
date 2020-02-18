require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Animal = require('../lib/models/Animal');
const Barn = require('../lib/models/Barn');

describe('animal routes', () => {
  beforeAll(() => connect());

  beforeEach(() => mongoose.connection.dropDatabase());
  
  let barn;
  beforeEach(async() => {
    barn = await Barn.create({
      barnType: 'chickens',
      maxSize: 50
    });
  });

  afterAll(() => mongoose.connection.close());

  it('should create an animal', () => {
    return request(app)
      .post('/api/v1/animals')
      .send({
        barnId: barn._id,
        species: 'chicken',
        age: 3,
        maxAge: 10,
        size: 1,
        display: 'Cluck Cluck'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          barnId: barn._id.toString(),
          species: 'chicken',
          age: 3,
          maxAge: 10,
          size: 1,
          display: 'Cluck Cluck',
          __v: 0
        });
      });

  });
});



