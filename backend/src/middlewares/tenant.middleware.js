const tenantMiddleware = (req, res, next) => {
  const tenantId = req.headers['x-tenant-id'];

  if (!tenantId) {
    return res.status(400).json({
      success: false,
      message: 'x-tenant-id header is required'
    });
  }

  req.tenantId = tenantId.trim();
  next();
};

module.exports = tenantMiddleware;