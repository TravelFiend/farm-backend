const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  farmName: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtuals: true
  }
});

schema.virtual('barns', {
  localField: '_id',
  foreignField: 'farmId',
  ref: 'Barn'
});

schema.virtual('graveyard', {
  localField: '_id',
  foreignField: 'farmId',
  ref: 'Graveyard'
});

module.exports = mongoose.model('Farm', schema);
