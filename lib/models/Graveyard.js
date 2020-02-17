const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  farmId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  deadAnimals: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('Graveyard', schema);
