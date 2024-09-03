const express = require('express');
const macAddressController = require('../../controllers/MACaddress.controller');
const apiKeyMiddleware = require('../../middlewares/apikey');

const router = express.Router();

router.route('/').post(apiKeyMiddleware, macAddressController.validateMacAddress);

module.exports = router;
