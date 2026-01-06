const Cart = require('../models/Cart.model');
const Product = require('../models/Product.model');

exports.getCart = async (req, res) => {
  const tenantId = req.tenantId;
  const user = req.user.id;

  try {
    let cart = await Cart.findOne({ user, tenantId, active: true });
    if (!cart) {
      cart = new Cart({ user, tenantId, items: [], active: true });
      await cart.save();
    }
    res.json({ success: true, cart });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const tenantId = req.tenantId;
  const user = req.user.id;

  try {
    // Product check
    const product = await Product.findById(productId);
    if (!product || product.tenantId !== tenantId) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user, tenantId, active: true });
    if (!cart) {
      cart = new Cart({ user, tenantId, items: [], active: true });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += Number(quantity);
    } else {
      cart.items.push({ product: productId, quantity: Number(quantity) });
    }

    await cart.save();
    res.json({ success: true, cart });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};