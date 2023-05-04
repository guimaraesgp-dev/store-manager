const { salesService } = require('../services');

const salesCreate = async (req, res) => {
  const mSales = req.body;

  const sales = await salesService.salesCreate(mSales);

  if (sales.type) return res.status(sales.status).json({ message: sales.message });
  return res.status(201).json(sales.message);
};

const findAllSales = async (req, res) => {
  const { response } = await salesService.findAllSales();

  return res.status(200).json(response);
};

const findSaleID = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findSaleID(id);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  salesCreate,
  findAllSales,
  findSaleID,
};