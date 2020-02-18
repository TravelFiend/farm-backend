const { Router } = require('express');
const Animal = require('../models/Animal');

module.exports = Router()
  .post('/', (req, res, next) => {
    Animal
      .create(req.body)
      .then(animal => res.send(animal))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Animal
      .find()
      .then(animals => res.send(animals))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Animal
      .findById(req.params.id)
      .then(animal => res.send(animal))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Animal
      .findByIdAndUpdate(req.params.id)
      .then(updatedAnimal => res.send(updatedAnimal))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Animal
      .findByIdAndDelete(req.params.id)
      .then(animal => res.send(animal))
      .catch(next);
  });
