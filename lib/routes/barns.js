const { Router } = require('express');
const Barn = require('../models/Barn');

module.exports = Router()
  .post('/', (req, res, next) => {
    Barn
      .create(req.body)
      .then(barn => res.send(barn))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Barn
      .find()
      .populate('animals')
      .then(barns => {
        res.send(barns);
      })
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Barn
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedBarn => {
        res.send(updatedBarn);
      })
      .catch(next);
  });
