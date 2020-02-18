const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  barnType: {
    type: String,
    required: true,
    enum: ['chickens', 'pigs', 'cows']
  },
  maxSize: {
    type: Number,
    required: true
  }
}, {
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.id;
    }
  }
});

schema.virtual('animals', {
  localField: '_id',
  foreignField: 'barnId',
  ref: 'Animal'
});

module.exports = mongoose.model('Barn', schema);
