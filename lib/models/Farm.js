const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  farmName: {
    type: String,
    required: true
  }
});

schema.virtual('barns');

module.exports = mongoose.model('Farm', schema);
