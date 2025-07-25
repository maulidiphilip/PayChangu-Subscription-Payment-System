const axios = require('axios');

const verifyTransaction = async (tx_ref) => {
  try {
    const response = await axios.get(
      `https://api.paychangu.com/verify-payment/${tx_ref}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.PAYCHANGU_SECRET_KEY}`,
        },
      }
    );    

    return response.data;
  } catch (error) {
    console.error('❌ Error verifying transaction:', error.response?.data || error.message);
    return null;
  }
};

module.exports = { verifyTransaction };
