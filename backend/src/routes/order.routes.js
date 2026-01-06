const express = require('express');
const router = express.Router();
const tenantMiddleware = require('../middlewares/tenant.middleware');
const { protect } = require('../middlewares/auth.middleware');
const { createOrder } = require('../controllers/order.controller');

router.use(tenantMiddleware);
router.use(protect);

router.post('/', createOrder);

module.exports = router;