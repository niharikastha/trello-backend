const List = require('../models/List');
const Board = require('../models/Board');

// Get all lists
const getLists = async (req, res) => {
  try {
    const lists = await List.find().populate('cards');
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single list by ID
const getListById = async (req, res) => {
  try {
    const list = await List.findById(req.params.id).populate('cards');
    if (!list) return res.status(404).json({ message: 'List not found' });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new list
const createList = async (req, res) => {
  const list = new List({ title: req.body.title, board: req.body.boardId });
  try {
    const newList = await list.save();
    const board = await Board.findById(req.body.boardId);
    board.lists.push(newList);
    await board.save();
    res.status(201).json(newList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a list by ID
const updateList = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) return res.status(404).json({ message: 'List not found' });

    list.title = req.body.title || list.title;
    const updatedList = await list.save();
    res.json(updatedList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a list by ID
const deleteList = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) return res.status(404).json({ message: 'List not found' });

    await list.remove();
    res.json({ message: 'List deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getLists,
  getListById,
  createList,
  updateList,
  deleteList
};
