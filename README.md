# 🧾 Inventory Management System (IMS)

A full-stack **Inventory Management System** built using **React (Frontend)**, **Node.js + Express (Backend)**, and **MongoDB Atlas (Database)**.  
This project helps manage inventory efficiently — including user authentication, product management, and role-based access for admins and staff.

---

## 🚀 Tech Stack

**Frontend:**
- React.js (Vite)
- TailwindCSS for styling
- Axios for API communication
- React Router for navigation
- Context API for state management

**Backend:**
- Node.js with Express.js
- JWT (JSON Web Token) for authentication
- Bcrypt.js for password hashing
- Mongoose for MongoDB integration
- Multer for file uploads (e.g. product images, PDFs)

**Database:**
- MongoDB Atlas (Cloud NoSQL Database)

---

## 📂 Project Structure

ims/
│
├── ims-frontend/ # React Frontend
│ ├── public/
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Dashboard, Login, Register, etc.
│ │ ├── context/ # Auth & App context providers
│ │ ├── services/ # Axios API services
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── package.json
│ └── vite.config.js
│
├── ims-backend/ # Node + Express Backend
│ ├── config/
│ │ └── db.js # MongoDB Atlas connection
│ ├── middleware/
│ │ ├── authMiddleware.js # Protect routes with JWT
│ │ └── errorHandler.js
│ ├── models/ # MongoDB schemas
│ │ ├── userModel.js
│ │ ├── productModel.js
│ │ └── transactionModel.js
│ ├── routes/ # Express routes
│ │ ├── authRoutes.js
│ │ ├── productRoutes.js
│ │ └── transactionRoutes.js
│ ├── uploads/ # Stored PDF/image uploads
│ ├── server.js # Entry point
│ └── package.json
│
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/inventory-management-system.git
cd inventory-management-system
```
Setup the backend
```
cd ims-backend
npm install
```
Create a .env file in the ims-backend directory and add the following:
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key

Run the backend server:
```
npm start
```
your server will be running on `http://localhost:5000
```
Setup the frontend
```
cd ../ims-frontend
npm install

Run frontend
```
npm start
```
frontend will be running on `http://localhost:5173

Authentication Flow

Users register with an email & password.

Passwords are hashed using bcrypt.

Login generates a JWT token, stored in local storage.

Protected routes are accessed only with valid JWT.

Admins can upload PDFs, manage users, and track inventory transactions.

📦 Features

✅ User authentication (Login/Register)
✅ Role-based access (Admin, Staff)
✅ Product CRUD operations
✅ Real-time inventory updates
✅ PDF upload (by Admin)
✅ Secure API with JWT
✅ Cloud database (MongoDB Atlas)

🧠 Middleware Overview

authMiddleware.js
Protects routes using JWT — verifies if a user is authorized before accessing endpoints.

errorHandler.js
Catches all API errors and sends consistent error responses to the frontend.

🧰 MongoDB Schema Overview

User Model
{
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ["admin", "staff"], default: "staff" }
}

Product model
{
  name: String,
  quantity: Number,
  price: Number,
  category: String,
  pdfUrl: String
}

Transaction model
{
  userId: ObjectId,
  productId: ObjectId,
  type: { type: String, enum: ["in", "out"] },
  date: Date,
  quantity: Number
}

Testing

Use Postman to test backend routes.

Login and fetch the token.

Attach the token to request headers as:
```
Authorization: Bearer <your_token>
```

Contributors

Ashish Bharti – Developer (Frontend + Backend Integration)
Tanisha Patil - Developer (Database and UI design)


License

This project is open-source under the MIT License.
Feel free to use, modify, and share with credit.

🌐 Future Enhancements

Email notifications for low stock

Data analytics dashboard (charts)

Export inventory data as Excel/PDF

Dark mode toggle

🧩 Project Summary

This Inventory Management System provides a scalable, modular, and secure way to manage stock, users, and transactions across different access levels.
It’s built with modern JavaScript frameworks and ready for deployment on any cloud platform.
