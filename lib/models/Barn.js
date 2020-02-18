const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  species: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  display: {
    type: String,
    required: true,
    enum: [🐷, 🐖, 🐄, 🐮, 🐓, 🐔]
  }
});

const schema = new mongoose.Schema({
  farmId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  barnType: {
    type: String,
    required: true,
    enum: [chickens, pigs, cows]
  },
  maxSize: {
    type: Number,
    required: true
  },
  animals: [animalSchema]
});

module.exports = mongoose.model('Barn', schema);
