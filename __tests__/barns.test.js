require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Barn = require('../lib/models/Barn');
const Animal = require('../lib/models/Animal');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let barn;
  let animals;
  beforeEach(async() => {
    barn = await Barn.create({
      barnType: 'pigs',
      maxSize: 50
    });
    animals = await Animal.create([{
      barnId: barn._id,
      species: 'pig',
      age: 5,
      maxAge: 15,
      size: 2,
      display: 'piggy'
    }, {
      barnId: barn._id,
      species: 'pig',
      age: 3,
      maxAge: 15,
      size: 1,
      display: 'pig'
    }]);
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  describe('barn routes', () => {
    it('should create a barn', () => {
      return request(app)
        .post('/api/v1/barns')
        .send({
          barnType: 'pigs',
          maxSize: 50
        })
        .then(res => {
          expect(res.body).toEqual({
            _id: expect.any(String),
            barnType: 'pigs',
            maxSize: 50,
            __v: 0
          });
        });
    });

    it('should get all barns', async() => {
      await Barn.create([
        {
          barnType: 'pigs',
          maxSize: 50,
        }, {
          barnType: 'chickens',
          maxSize: 50
        }
      ]);
      return request(app)
        .get('/api/v1/barns')
        .then(barns => {
          barns.body.forEach(barn => {
            expect(barn).toEqual({
              _id: expect.any(String),
              barnType: expect.any(String),
              maxSize: 50,
              animals: expect.any(Array),
              __v: 0
            });
          });
        });
    });

    it('should update a barn by id', async() => {
      return request(app)
        .patch(`/api/v1/barns/${barn._id}`)
        .send({ barnType: 'chickens' })
        .then(res => {
          expect(res.body).toEqual({
            _id: expect.any(String),
            barnType: 'chickens',
            maxSize: 50,
            __v: 0
          });
        });
    });
  });
});
