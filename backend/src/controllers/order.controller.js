const Cart = require('../models/Cart.model');
const Order = require('../models/Order.model');

exports.createOrder = async (req, res) => {
  const tenantId = req.tenantId;
  const user = req.user.id;

  try {
    const cart = await Cart.findOne({ user, tenantId, active: true });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // Simple total (baad mein dynamic pricing add kar sakte ho)
    const total = cart.items.reduce((sum, item) => sum + 1000, 0); // dummy calculation

    const order = new Order({
      tenantId,
      user,
      items: cart.items,
      total,
      status: 'pending'
    });

    await order.save();

    // Cart ko inactive kar do
    cart.active = false;
    await cart.save();

    res.json({ success: true, order });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};