const Board = require('../models/Board');

// Get all boards
const getBoards = async (req, res) => {
  try {
    const boards = await Board.find().populate('lists');
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single board by ID
const getBoardById = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id).populate('lists');
    if (!board) return res.status(404).json({ message: 'Board not found' });
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new board
const createBoard = async (req, res) => {
  const board = new Board({ title: req.body.title });
  try {
    const newBoard = await board.save();
    res.status(201).json(newBoard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a board by ID
const updateBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).json({ message: 'Board not found' });

    board.title = req.body.title || board.title;
    const updatedBoard = await board.save();
    res.json(updatedBoard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a board by ID
const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).json({ message: 'Board not found' });

    await board.remove();
    res.json({ message: 'Board deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
