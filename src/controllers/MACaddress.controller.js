const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const macAddressService = require('../services/MACaddress.service');

const validateMacAddress = catchAsync(async (req, res) => {
  const { macAddress } = req.body;
  if (!macAddress) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Mac-Address is required');
  }
  const result = await macAddressService.validateMacAddress(macAddress);
  res.send(result);
});

module.exports = {
  validateMacAddress,
};
