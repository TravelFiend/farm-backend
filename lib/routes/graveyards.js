const { Router } = require('express');
const Graveyard = require('../lib/models/Graveyard');

module.exports = Router()
  .post('/', (req, res, next) => {
    Graveyard
      .create(req.body)
      .then(graveyard => res.send(graveyard))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Graveyard
      .find()
      .then(graveyards => res.send(graveyards))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Graveyard
      .findByIdAndDelete(req.params.id)
      .then(graveyard => res.send(graveyard))
      .catch(next);
  });
