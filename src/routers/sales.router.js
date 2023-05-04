const express = require('express');
const { salesController } = require('../controllers');
const salesValidation = require('../middlewares/salesValidation');

const router = express.Router();

router.post('/', salesValidation, salesController.salesCreate);
router.get('/', salesController.findAllSales);
router.get('/:id', salesController.findSaleID);

module.exports = router;