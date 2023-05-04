const { salesModel, productsModel } = require('../models');

const salesAll = async () => {
  const sales = await salesModel.salesAll();

  return { status: 200, message: sales };
};

const salesCreate = async (mSales) => {
  const productNotExist = mSales.map(async (sale) => {
    const productExist = await productsModel.getProductsId(+sale.productId);

    if (!productExist) return false;
    return true;
  });

  const promiseProductNot = await Promise.all(productNotExist);

  if (promiseProductNot.some((product) => !product)) {
    return {
      status: 404,
      message: 'Product not found',
      type: 'PRODUCT_NOT_FOUND',
    };
  }

  const result = await salesModel.salesCreate(mSales);
  return { status: 201, message: result };
};

const findAllSales = async () => {
  const allSales = await salesModel.findAllSales();

  return { response: allSales };
};

const findSaleID = async (id) => {
  const sale = await salesModel.findSaleID(id);

  if (sale.length === 0) return { type: 404, message: 'Sale not found' };

  return { message: sale };
};

module.exports = {
  salesAll,
  salesCreate,
  findAllSales,
  findSaleID,
};