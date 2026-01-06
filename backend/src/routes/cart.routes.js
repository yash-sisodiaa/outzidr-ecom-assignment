const express = require('express');
const router = express.Router();
const tenantMiddleware = require('../middlewares/tenant.middleware');
const { protect } = require('../middlewares/auth.middleware');
const { getCart, addToCart } = require('../controllers/cart.controller');

router.use(tenantMiddleware);
router.use(protect);

router.get('/', getCart);
router.post('/', addToCart);

module.exports = router;