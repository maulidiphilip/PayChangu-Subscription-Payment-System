const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  amount: Number,
  plan: String,
  status: { type: String, default: 'PENDING' },
  transaction_id: String,
  tx_ref: String,
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
