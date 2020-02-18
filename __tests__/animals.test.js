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
  let animal;
  beforeEach(async() => {
    barn = await Barn.create({
      barnType: 'chickens',
      maxSize: 50
    });
    animal = await Animal.create({
      barnId: barn._id,
      species: 'pig',
      age: 11,
      maxAge: 15,
      size: 2,
      display: 'Oinker'
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

  it('should get all animals', async() => {
    await Animal.create({
      barnId: barn._id,
      species: 'chicken',
      age: 3,
      maxAge: 5,
      size: 1,
      display: 'Cluck Cluck'
    }, { 
      barnId: barn._id,
      species: 'chicken',
      age: 2,
      maxAge: 5,
      size: 3,
      display: 'Chickity China'
    });

    return request(app)
      .get('/api/v1/animals')
      .then(animals => {
        animals.body.forEach(animal => {
          expect(animal).toEqual({
            _id: expect.any(String),
            barnId: barn._id.toString(),
            species: expect.any(String),
            age: expect.any(Number),
            maxAge: expect.any(Number),
            size: expect.any(Number),
            display: expect.any(String),
            __v: 0
          });
        });
      });
  });

  it('should get an animal by id', () => {
    return request(app)
      .get(`/api/v1/animals/${animal._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          barnId: barn._id.toString(),
          species: 'pig',
          age: 11,
          maxAge: 15,
          size: 2,
          display: 'Oinker',
          __v: 0
        });
      });
  });

  it('should update an animal by id', () => {
    return request(app)
      .patch(`/api/v1/animals/${animal._id}`)
      .send({ age: 14, display: 'Piggy' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          barnId: barn._id.toString(),
          species: 'pig',
          age: 14,
          maxAge: 15,
          size: 2,
          display: 'Piggy',
          __v: 0
        });
      });
  });
});



