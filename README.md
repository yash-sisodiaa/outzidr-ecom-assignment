# MERN Multi-Tenant Ecommerce Core Assignment

A production-grade, multi-tenant ecommerce backend + frontend system built with **React (Vite)**, **Express**, **MongoDB**, and **JWT authentication** with refresh token rotation.

This project implements a **headless commerce core** with logical tenant isolation, dynamic pricing in cart, cart & order simulation, and proper auth flow.

## Features Implemented

- **Multi-Tenant Architecture**  
  Tenant isolation using `x-tenant-id` header. All data scoped to tenantId.

- **Authentication**  
  - Register, Login, Refresh Token, Logout  
  - JWT access token (15 min expiry) + HTTP-only refresh token (7 days)  
  - Refresh token rotation + invalidation on logout  
  - Protected routes with middleware

- **Product Catalog**  
  - List with pagination  
  - Single product detail  
  - SKU unique per tenant  
  - Inventory management

- **Cart System**  
  - One active cart per user per tenant  
  - Add items to cart  
  - Dynamic pricing applied in cart total (percentage/flat discount)

- **Order Creation**  
  - Cart → Order simulation  
  - Atomic inventory decrement (mongoose session)

- **Security & Best Practices**  
  - HTTP-only cookies for refresh token  
  - CORS configured for frontend  
  - Tenant + auth middleware  
  - Error handling & logging

## Tech Stack

**Frontend**  
- React + Vite  
- React Router v6  
- Axios (with auto-refresh on 401)

**Backend**  
- Node.js + Express  
- MongoDB (local or Atlas)  
- Mongoose  
- JWT + bcrypt  
- Cookie-parser + CORS

## Project Structure
mern-ecommerce-core/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── index.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md   
## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB (local or MongoDB Atlas)

### Backend Setup

```bash
cd backend
npm install

Create .env:

PORT=5000
MONGO_URI=mongodb+srv://yashsisodia5062_db_user:jxXg6c8NzHgAWwRr@cluster0.evkxsqi.mongodb.net/?appName=Cluster0
JWT_SECRET=your_very_long_random_secret_for_access_token
JWT_REFRESH_SECRET=another_different_very_long_random_secret_for_refresh
FRONTEND_URL=http://localhost:5173


Start backend:
Bashnpm run dev
Frontend Setup
Bashcd frontend
npm install
npm run dev
Frontend runs on http://localhost:5173
Default Tenant
x-tenant-id: test-tenant-123
API Endpoints (Protected Routes need auth)
Auth

POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout

Products

GET /api/products?page=1&limit=10
GET /api/products/:id

Cart

GET /api/cart
POST /api/cart (body: { productId, quantity })

Orders

POST /api/orders (checkout simulation)

How to Use

Register/Login (tenant: test-tenant-123)
View Products
Add to Cart
View Cart → Checkout
