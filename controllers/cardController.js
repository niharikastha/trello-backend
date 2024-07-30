const Card = require('../models/Card');
const List = require('../models/List');

// Get all cards
const getCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single card by ID
const getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ message: 'Card not found' });
    res.json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new card
const createCard = async (req, res) => {
  const card = new Card({ title: req.body.title, list: req.body.listId, description: req.body.description });
  try {
    const newCard = await card.save();
    const list = await List.findById(req.body.listId);
    list.cards.push(newCard);
    await list.save();
    res.status(201).json(newCard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a card by ID
const updateCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ message: 'Card not found' });

    card.title = req.body.title || card.title;
    card.description = req.body.description || card.description;
    const updatedCard = await card.save();
    res.json(updatedCard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a card by ID
const deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ message: 'Card not found' });

    await card.remove();
    res.json({ message: 'Card deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard
};
