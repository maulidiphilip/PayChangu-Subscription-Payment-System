import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const txRef = queryParams.get('tx_ref');

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white shadow-lg rounded-xl p-10 text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-700">Your transaction was successful.</p>
        <p className="mt-2 text-sm text-gray-500">Transaction Ref: <strong>{txRef}</strong></p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
