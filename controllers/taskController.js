const Task = require('../models/Task');
const mongoose = require('mongoose');

// Allowed values for status and priority
const ALLOWED_STATUSES = ['To-Do', 'In Progress', 'Under Review', 'Completed'];
const ALLOWED_PRIORITIES = ['Low', 'Medium', 'Urgent'];

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, status, priority, deadline, description } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!title || !status || !priority) {
      return res.status(400).json({ message: 'Title, status, and priority are required.' });
    }

    // Validate status and priority against allowed values
    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Allowed values are: ${ALLOWED_STATUSES.join(', ')}` });
    }

    if (!ALLOWED_PRIORITIES.includes(priority)) {
      return res.status(400).json({ message: `Invalid priority. Allowed values are: ${ALLOWED_PRIORITIES.join(', ')}` });
    }

    // Create a new task
    const task = new Task({
      title,
      status,
      priority,
      deadline,
      description,
      userId,
    });
    
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Get tasks for a user
exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID.' });
    }

    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { title, status, priority, deadline, description } = req.body;
    const taskId = req.params.id;

    // Validate taskId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: 'Invalid task ID.' });
    }

    // Validate required fields
    if (!title || !status || !priority) {
      return res.status(400).json({ message: 'Title, status, and priority are required.' });
    }

    // Validate status and priority against allowed values
    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Allowed values are: ${ALLOWED_STATUSES.join(', ')}` });
    }

    if (!ALLOWED_PRIORITIES.includes(priority)) {
      return res.status(400).json({ message: `Invalid priority. Allowed values are: ${ALLOWED_PRIORITIES.join(', ')}` });
    }

    // Update the task
    const updatedTask = await Task.findByIdAndUpdate(taskId, {
      title,
      status,
      priority,
      deadline,
      description,
    }, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    // Validate taskId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: 'Invalid task ID.' });
    }

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
