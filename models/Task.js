const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['To-Do', 'In Progress', 'Under Review', 'Completed'],
    default: 'To-Do',
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'Urgent'],
    default: 'Low',
  },
  deadline: {
    type: Date,
  },
  description: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
