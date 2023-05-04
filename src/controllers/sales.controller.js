const { salesService } = require('../services');

const salesCreate = async (req, res) => {
  const mSales = req.body;

  const sales = await salesService.salesCreate(mSales);

  if (sales.type) return res.status(sales.status).json({ message: sales.message });
  return res.status(201).json(sales.message);
};

module.exports = {
  salesCreate,
};