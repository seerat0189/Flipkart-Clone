const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCart, removeFromCart } = require('../controllers/cartController');

router.get('/', getCart);
router.post('/', addToCart);
router.put('/:id', updateCart);
router.delete('/:id', removeFromCart);

module.exports = router;