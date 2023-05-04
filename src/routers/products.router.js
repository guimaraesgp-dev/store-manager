const express = require('express');
const { productsController } = require('../controllers');
const validateProducts = require('../middlewares/productsValidation');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductsId);
router.post('/', validateProducts, productsController.createProducts);

module.exports = router;