const express = require('express');
const router = express.Router();
const {
  getCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard
} = require('../controllers/cardController');

router.get('/', getCards);
router.get('/:id', getCardById);
router.post('/', createCard);
router.put('/:id', updateCard);
router.delete('/:id', deleteCard);

module.exports = router;
