const { productsModel } = require('../models');

const getAllProducts = async () => {
   const allproducts = await productsModel.getAllProducts();
   return { type: null, message: allproducts };
};

const getProductsId = async (id) => {
   const productsId = await productsModel.getProductsId(id);
   if (!productsId) return { type: 404, message: 'Product not found' };
   return { type: null, message: productsId };
};

module.exports = {
  getAllProducts,
  getProductsId,
};