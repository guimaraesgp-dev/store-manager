const productIdInvalid = (req, res, next) => {
  const midSalesValit = req.body;

  if (midSalesValit.some((sale) => !sale.productId)) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  return next();
};

const quantityInvalid = (req, res, next) => {
  const midSalesValit = req.body;

  if (midSalesValit.some((sale) => sale.quantity === undefined)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (midSalesValit.some((sale) => Number(sale.quantity) <= 0)) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }

  return next();
};

const validation = [productIdInvalid, quantityInvalid];

module.exports = validation;