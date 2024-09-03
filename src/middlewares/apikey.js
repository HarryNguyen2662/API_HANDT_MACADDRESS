const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.header('x-api-key');

  if (!apiKey || apiKey !== config.apiKey) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'Invalid API key'));
  }

  next();
};

module.exports = apiKeyMiddleware;
