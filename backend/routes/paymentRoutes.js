const express = require('express');
const {
  initiatePayment,
  handleCallback,
  handleRedirectAfterPayment,
  handleRedirectCallback, 
} = require('../controllers/paymentController');
const router = express.Router();

/**
 * Payment Routes
 * 
 * POST /subscribe - Initiate a new payment
 * POST /callback - Payment gateway server-to-server callback
 * GET /callback - User redirect after payment completion
 */

// Initiate payment subscription
router.post('/subscribe', initiatePayment);

// Payment gateway webhook (server-to-server)
router.post('/callback', handleCallback);

// Client redirect after payment completion
router.get('/callback', handleRedirectCallback); 

module.exports = router;

