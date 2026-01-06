const express = require('express');
const router = express.Router();
const tenantMiddleware = require('../middlewares/tenant.middleware');
const {
  register,
  login,
  refreshToken,
  logout
} = require('../controllers/auth.controller');

router.use(tenantMiddleware);

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);

module.exports = router;