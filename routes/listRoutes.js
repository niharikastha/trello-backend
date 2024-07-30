const express = require('express');
const router = express.Router();
const {
  getLists,
  getListById,
  createList,
  updateList,
  deleteList
} = require('../controllers/listController');

router.get('/', getLists);
router.get('/:id', getListById);
router.post('/', createList);
router.put('/:id', updateList);
router.delete('/:id', deleteList);

module.exports = router;
