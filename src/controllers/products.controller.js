const { productsService } = require('../services');

const getAllProducts = async (_req, res) => {
  const { message } = await productsService.getAllProducts();
  return res.status(200).json(message);
};

const getProductsId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getProductsId(id);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const createProducts = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.createProducts(name);
  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};

module.exports = {
  getAllProducts,
  getProductsId,
  createProducts,
};