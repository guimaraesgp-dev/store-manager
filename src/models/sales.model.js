const camelize = require('camelize');
const connection = require('../connection');

const salesCreate = async (mSales) => {
  const date = new Date();
  const time = `${date.toISOString().split('T')[0]} ${date.toTimeString().split(' ')[0]
    }`;

  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (?)',
    [time],
  );

  const salesPromisse = mSales.map(async (sale) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [insertId, sale.productId, sale.quantity],
    );

    return sale;
  });

  const result = await Promise.all(salesPromisse);

  return { id: insertId, itemsSold: result };
};

const salesAll = async () => {
  const [sales] = await connection.execute(
    `SELECT
    sales_products.sale_id, sales.date,
    sales_products.product_id, sales_products.quantity
    FROM sales
    JOIN sales_products ON sales.id = sales_products.product_id;`,
  );

  return camelize(sales);
};

module.exports = {
  salesAll,
  salesCreate,
};