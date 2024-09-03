const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const supabase = require('../config/supabase');

const validateMacAddress = async (macAddress) => {
  try {
    // Check if the Mac-Address exists in the database
    const { data, error } = await supabase.from('customer_devices').select('*').eq('Mac-Address', macAddress).single();
    if (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Database error');
    }

    if (!data) {
      return { keys: '', error: 'Mac-Address không hợp lệ' };
    }

    // Check if the Mac-Address is activated
    if (!data.Activation) {
      return { error: 'Chưa kích hoạt' };
    }

    // Generate keys using enCryptor.out
    try {
      return { keys: data.Secretdata };
    } catch (encryptorError) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error generating keys');
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'An unexpected error occurred');
  }
};

module.exports = {
  validateMacAddress,
};
