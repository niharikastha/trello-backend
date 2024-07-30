const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  list: {
    type: Schema.Types.ObjectId,
    ref: 'List'
  },
  description: String
});

module.exports = mongoose.model('Card', CardSchema);
