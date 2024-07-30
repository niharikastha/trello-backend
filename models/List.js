const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board'
  },
  cards: [{
    type: Schema.Types.ObjectId,
    ref: 'Card'
  }]
});

module.exports = mongoose.model('List', ListSchema);
