const { productsModel } = require('../models');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return { type: null, message: products };
};

const getProductsId = async (id) => {
  const productId = await productsModel.getProductsId(id);
   if (!productId) return { type: 404, message: 'Product not found' };
   return { type: null, message: productId };
};

const createProducts = async (productName) => {
  const newProduct = await productsModel.createProducts(productName);
  return { type: null, message: newProduct };
};

const update = async (product, id) => {
  const result = await productsModel.update(product, id);
  if (result === undefined) {
    return { statusCode: 404, message: { message: 'Product not found' } };
  }
  return { statusCode: 200, message: result };
};

module.exports = {
  getAllProducts,
  getProductsId,
  createProducts,
  update,
};