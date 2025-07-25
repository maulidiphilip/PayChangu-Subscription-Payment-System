const axios = require('axios');
const Payment = require('../models/Payment');
const { verifyTransaction } = require('../utils/paychangu');

/**
 * Initiates a payment transaction
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.initiatePayment = async (req, res) => {
  const { amount, plan } = req.body;

  try {
    // Make API request to payment gateway
    const response = await axios.post(
      process.env.PAYCHANGU_API,
      {
        amount,
        currency: 'MWK',
        callback_url: process.env.CALLBACK_URL,
        metadata: { plan }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.PAYCHANGU_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Extract transaction reference from response
    const txRef = response.data.data?.data?.tx_ref;

    // Create payment record in database
    await Payment.create({
      amount,
      plan,
      tx_ref: txRef,
    });

    res.status(200).json({ message: 'Payment initiated', data: response.data });
  } catch (error) {
    console.error('Payment initiation error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Payment request failed' });
  }
};

/**
 * Handles payment callback from payment gateway (server-to-server)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.handleCallback = async (req, res) => {
  const { tx_ref } = req.body;

  try {
    // Verify transaction with payment gateway
    const verification = await verifyTransaction(tx_ref);

    if (!verification || verification.status !== 'success') {
      return res.status(400).json({ message: 'Verification failed' });
    }

    const txData = verification.data;

    // Update payment record in database
    const updated = await Payment.findOneAndUpdate(
      { tx_ref },
      {
        status: txData.status,
        amount: txData.amount,
      },
      { new: true }
    );

    if (!updated) {
      console.warn('Payment record not found for tx_ref:', tx_ref);
    }

    res.status(200).json({ message: 'Callback received and processed' });
  } catch (error) {
    console.error('Callback processing error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Callback processing failed' });
  }
};

/**
 * Handles redirect callback after payment completion (client redirect)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.handleRedirectCallback = async (req, res) => {
  const { tx_ref } = req.query;

  try {
    // Verify transaction with payment gateway
    const verification = await verifyTransaction(tx_ref);

    if (!verification || verification.status !== 'success') {
      return res.status(400).send('Payment verification failed');
    }

    const txData = verification.data;

    // Update payment record in database
    await Payment.findOneAndUpdate(
      { tx_ref },
      {
        status: txData.status,
        amount: txData.amount,
      },
      { new: true }
    );

    // Redirect to frontend success page
    res.redirect(`${process.env.FRONTEND_URL}/payment-success?tx_ref=${tx_ref}`);
  } catch (error) {
    console.error('Redirect callback error:', error?.response?.data || error.message);
    res.status(500).send('Payment processing failed');
  }
};
