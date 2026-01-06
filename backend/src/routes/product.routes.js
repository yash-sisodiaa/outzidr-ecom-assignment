const express = require('express');
const router = express.Router();
const tenantMiddleware = require('../middlewares/tenant.middleware');
const { protect } = require('../middlewares/auth.middleware');
const { getProducts, getProductById, createProducts } = require('../controllers/product.controller');

router.use(tenantMiddleware);
router.use(protect);

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProducts);

module.exports = router;