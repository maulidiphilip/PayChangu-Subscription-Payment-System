import React, { useState } from 'react';
import axios from 'axios';
import { FaMoneyBillWave, FaCrown, FaRocket } from 'react-icons/fa';

const SubscriptionForm = () => {
  const [plan, setPlan] = useState('basic');

  const planAmounts = {
    basic: 3000,
    premium: 7000,
    pro: 12000,
  };

  const handlePayment = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/subscribe`, {
        amount: planAmounts[plan],
        plan,
      });

      const checkoutUrl = res.data?.data?.data?.checkout_url;
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        alert('Failed to get checkout URL');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to start payment');
    }
  };

  const planDetails = {
    basic: {
      name: 'Basic',
      icon: <FaMoneyBillWave className="text-blue-500 text-xl mr-2" />,
      desc: 'Ideal for individuals or trial users.',
    },
    premium: {
      name: 'Premium',
      icon: <FaCrown className="text-yellow-500 text-xl mr-2" />,
      desc: 'Best for growing professionals.',
    },
    pro: {
      name: 'Pro',
      icon: <FaRocket className="text-purple-600 text-xl mr-2" />,
      desc: 'Perfect for teams and power users.',
    },
  };

  const { name, icon, desc } = planDetails[plan];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-100 to-slate-200 p-4">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-lg p-10 transition-all">
        <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-8">Subscribe to a Plan</h2>

        <div className="mb-6">
          <label htmlFor="plan" className="block text-sm font-semibold text-gray-600 mb-2">
            Select a plan
          </label>
          <select
            id="plan"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 font-medium"
          >
            <option value="basic">Basic – MWK 3,000</option>
            <option value="premium">Premium – MWK 7,000</option>
            <option value="pro">Pro – MWK 12,000</option>
          </select>
        </div>

        <div className="flex items-start bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 shadow-inner">
          <div className="flex-shrink-0 mt-1">{icon}</div>
          <div>
            <h3 className="text-lg font-semibold text-blue-700">{name} Plan</h3>
            <p className="text-sm text-gray-600">{desc}</p>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl transition duration-300 shadow-md hover:shadow-lg"
        >
          Pay MWK {planAmounts[plan].toLocaleString()}
        </button>
      </div>
    </div>
  );
};

export default SubscriptionForm;
