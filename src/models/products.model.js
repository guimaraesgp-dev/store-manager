const connection = require('../connection');

  const getAllProducts = async () => {
   const [products] = await connection.execute(
     'SELECT * FROM StoreManager.products ORDER BY id;',
   );
   return products;
};

  const getProductsId = async (id) => {
    const [[productId]] = await connection.execute(
      'SELECT * FROM StoreManager.products WHERE id = ?;', [id],
    );
   return productId;
 };

  const createProducts = async (productName) => {
    const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?);',
      [productName],
  );
    return { id: insertId, name: productName };
  };

const update = async (product, idProduct) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = (?);',
    [idProduct],
  );
  if (result === undefined) {
    return undefined;
  }
  await connection.execute(
    `UPDATE StoreManager.products 
    SET name = (?) WHERE id = (?);`,
    [product, idProduct],
  );
  return {
    id: idProduct,
    name: product,
  };
};

module.exports = {
  getAllProducts,
  getProductsId,
  createProducts,
  update,
};