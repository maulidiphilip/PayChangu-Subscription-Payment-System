import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const txRef = params.get('tx_ref');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-4">
      <div className="bg-white shadow-xl rounded-3xl w-full max-w-md p-10 text-center border border-green-100">
        <FaCheckCircle className="text-green-600 text-6xl mx-auto mb-4 animate-pulse" />

        <h1 className="text-3xl font-extrabold text-green-700 mb-4">Payment Successful</h1>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Thank you for your payment. Your subscription has been activated.
        </p>

        <div className="bg-gray-100 text-sm text-gray-800 px-4 py-3 rounded-lg mb-6 font-mono">
          Transaction Ref: <span className="font-semibold">{txRef || 'N/A'}</span>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition duration-300"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
