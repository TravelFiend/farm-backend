require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Farm = require('../lib/models/Farm');
const Barn = require('../lib/models/Barn');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let farm;
  beforeEach(() => {
    farm = new Farm({
      farmName: 'Salute Your Shorts',
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  describe('barn routes', () => {
    it('should create a barn', () => {
      return request(app)
        .post('/api/v1/barns')
        .send({
          farmId: farm._id,
          barnType: 'pigs',
          maxSize: 50,
          animals: [{
            species: 'pig',
            age: 3,
            size: 2,
            display: '🐷'
          }, {
            species: 'pig',
            age: 2,
            size: 2,
            display: '🐖'
          }]
        })
        .then(res => {
          expect(res.body).toEqual({
            _id: expect.any(String),
            farmId: farm._id,
            barnType: 'pigs',
            maxSize: 50,
            animals: [{
              species: 'pig',
              age: 3,
              size: 2,
              display: '🐷'
            }, {
              species: 'pig',
              age: 2,
              size: 2,
              display: '🐖'
            }],
            __v: 0
          });
        });
    });

    it('should get all barns', async() => {
      const barns = await Barn.create([
        {
          farmId: farm._id,
          barnType: 'pigs',
          maxSize: 50,
          animals: [{
            species: 'pig',
            age: 3,
            size: 2,
            display: '🐷'
          }, {
            species: 'pig',
            age: 2,
            size: 2,
            display: '🐖'
          }]
        }, {
          farmId: farm._id,
          barnType: 'chickens',
          maxSize: 50,
          animals: [{
            species: 'chicken',
            age: 3,
            size: 1,
            display: '🐓'
          }, {
            species: 'chicken',
            age: 2,
            size: 1,
            display: '🐔'
          }]
        }
      ]);
      return request(app)
        .get('/api/v1/barns')
        .then(res => {
          barns.forEach(barn => {
            expect(res.body).toContainEqual(JSON.parse(JSON.stringify(barn)));
          });
        });
    });

    it('should update a barn by id', async() => {
      const barn = await Barn.create({
        farmId: farm._id,
        barnType: 'pigs',
        maxSize: 50,
        animals: [{
          species: 'pig',
          age: 3,
          size: 2,
          display: '🐷'
        }, {
          species: 'pig',
          age: 2,
          size: 2,
          display: '🐖'
        }]
      });

      return request(app)
        .patch(`/api/v1/barns/${barn._id}`)
        .send({ barnType: 'chickens' })
        .then(res => {
          expect(res.body).toEqual({
            _id: expect.any(String),
            farmId: farm._id,
            barnType: 'chickens',
            maxSize: 50,
            animals: [{
              species: 'pig',
              age: 3,
              size: 2,
              display: '🐷'
            }, {
              species: 'pig',
              age: 2,
              size: 2,
              display: '🐖'
            }],
            __v: 0
          });
        });
    });
  });
});
