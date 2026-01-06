const Product = require('../models/Product.model');

exports.createProducts = async (req, res) => {
  const tenantId = req.tenantId;
  const productsData = req.body; // array ya single object

  try {
    const products = await Product.create(
      Array.isArray(productsData)
        ? productsData.map(p => ({ ...p, tenantId }))
        : { ...productsData, tenantId }
    );
    res.status(201).json({ success: true, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getProducts = async (req, res) => {
  const tenantId = req.tenantId;
  const { page = 1, limit = 10 } = req.query;

  try {
    const products = await Product.find({ tenantId })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    res.json({ success: true, products, total: products.length });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const tenantId = req.tenantId;

  try {
    const product = await Product.findOne({ _id: id, tenantId });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.error('Get single product error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};