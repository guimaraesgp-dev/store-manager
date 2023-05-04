const express = require('express');
const { salesController } = require('../controllers');
const salesValidation = require('../middlewares/salesValidation');

const router = express.Router();

router.post('/', salesValidation, salesController.salesCreate);

module.exports = router;