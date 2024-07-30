const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  lists: [{
    type: Schema.Types.ObjectId,
    ref: 'List'
  }]
});

module.exports = mongoose.model('Board', BoardSchema);
