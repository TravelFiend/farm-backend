const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  barnId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Barn'
  },
  species: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  maxAge: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  display: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Animal', schema);
