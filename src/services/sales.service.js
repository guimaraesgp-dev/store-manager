const { salesModel, productsModel } = require('../models');

const salesAll = async () => {
  const sales = await salesModel.salesAll();

  return { status: 200, message: sales };
};

const salesCreate = async (arrSale) => {
  const productNotExist = arrSale.map(async (sale) => {
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

  const result = await salesModel.salesCreate(arrSale);
  return { status: 201, message: result };
};

module.exports = {
  salesAll,
  salesCreate,
};