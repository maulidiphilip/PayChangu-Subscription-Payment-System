# 📱 PayChangu Subscription Payment System

A full-stack subscription-based payment system built with **Node.js/Express** backend and **React.js** frontend, integrated with **PayChangu API** to process mobile money payments (Airtel Money and Mpamba) in **Malawi Kwacha (MWK)**.

---

## 🚀 Features

- Subscription plans with flexible pricing
- Seamless mobile money payments using PayChangu
- Transaction verification and callback handling
- Payment record storage using MongoDB
- Redirect-based success confirmation for users
- Email notification to the seller after successful payment

---

## 🧩 Tech Stack

**Frontend**:  
- React.js  
- Axios  

**Backend**:  
- Node.js  
- Express.js  
- MongoDB & Mongoose  
- Dotenv  
- Axios (for PayChangu integration)

---

## 📦 Subscription Plans

| Plan     | Price (MWK) |
|----------|-------------|
| Basic    | 3,000       |
| Premium  | 7,000       |
| Pro      | 12,000      |

---

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/maulidiphilip/PayChangu-Subscription-Payment-System.git
cd your-repo
````

---

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Create `.env` file in the backend directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/subscription_db

PAYCHANGU_API=https://api.paychangu.com/payment
PAYCHANGU_SECRET_KEY=your_paychangu_secret_key

CALLBACK_URL=http://localhost:5000/api/payment/callback
FRONTEND_URL=http://localhost:3000
```

#### Run the backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🌐 Payment Flow

1. **User selects a plan and enters phone number**
2. **System initiates payment using PayChangu API**
3. **User is redirected to PayChangu checkout**
4. **On payment success:**

   * Redirects user to `payment-success` page
   * Sends a server-side callback (webhook)
   * Verifies transaction with PayChangu
   * Updates MongoDB with transaction details
   * Sends an email to the seller

---

## 📂 Folder Structure

```
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── utils
│   └── .env
├── frontend
│   ├── components
│   ├── pages
│   └── App.js
```

---

## ✅ Environment Requirements

* Node.js v18+
* MongoDB 6+
* PayChangu Account with API access

---

## 🛡️ Notes

* Ensure you’re connected to the internet and have valid PayChangu credentials.
* All amounts are in **Malawi Kwacha (MWK)**.

---

## 📧 Contact

For support or collaboration:

* **Developer**: Philip Maulidi
* **Email**: [maulidiphilip@gmail.com](mailto:your.maulidiphilip@gmail.com)
* **GitHub**: [github.com/maulidiphili](https://github.com/maulidiphili)

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

```

```
# PayChangu-Subscription-Payment-System
