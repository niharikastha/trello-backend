const express = require('express');
const router = express.Router();
const {
  getBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
} = require('../controllers/boardController');

router.get('/', getBoards);
router.get('/:id', getBoardById);
router.post('/', createBoard);
router.put('/:id', updateBoard);
router.delete('/:id', deleteBoard);

module.exports = router;
