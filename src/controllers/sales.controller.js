const { salesService } = require('../services');

const salesCreate = async (req, res) => {
  const conSales = req.body;

  const sales = await salesService.salesCreate(conSales);

  if (sales.type) return res.status(sales.status).json({ message: sales.message });
  return res.status(201).json(sales.message);
};

module.exports = {
  salesCreate,
};