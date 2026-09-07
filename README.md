# 🛒 ShopKart — Customer Authentication Service

A beginner-friendly **REST API authentication backend** built for ShopKart, an e-commerce platform. This project implements customer registration, login, JWT-based authentication, protected profile access, logout, and password changing.

Built as **Engineering Lab 01 — Backend Engineering Lab**.

---

## 🚀 Features

* 👤 Customer registration
* 🔐 Secure password hashing with **bcrypt**
* 📧 Duplicate email validation
* 🔑 JWT-based authentication
* 🍪 JWT stored in an **HttpOnly cookie**
* 🛡️ Protected customer profile route
* 🚪 Secure logout
* 🔄 Change password functionality
* ❌ Passwords never returned in API responses
* 🗂️ MVC architecture

---

## 🛠️ Tech Stack

| Technology     | Purpose               |
| -------------- | --------------------- |
| Node.js        | JavaScript runtime    |
| Express.js     | REST API framework    |
| MongoDB        | Database              |
| Mongoose       | MongoDB ODM           |
| bcrypt         | Password hashing      |
| JSON Web Token | Authentication        |
| cookie-parser  | Cookie handling       |
| dotenv         | Environment variables |

---

## 📁 Project Structure

```text
shopkart-backend/
│
├── controllers/
│   └── customer.controller.js
│
├── models/
│   └── customer.model.js
│
├── routes/
│   └── customer.routes.js
│
├── middlewares/
│   └── auth.middleware.js
│
├── utils/
│   └── generateToken.js
│
├── index.js
├── .env
├── package.json
└── package-lock.json
```

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone <your-repository-url>
```

Navigate into the project:

```bash
cd shopkart-backend
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/shopkart
JWT_SECRET=your_secret_key
```

> ⚠️ Never commit your actual `.env` file or JWT secret to GitHub.

Add `.env` to `.gitignore`:

```gitignore
node_modules/
.env
```

---

## 4. Start MongoDB

Make sure your local MongoDB server is running.

The application connects to:

```text
mongodb://localhost:27017/shopkart
```

---

## 5. Start the server

```bash
node index.js
```

The server should start on:

```text
http://localhost:5000
```

---

# 📡 API Documentation

Base URL:

```text
http://localhost:5000
```

---

## 👤 1. Register Customer

### Endpoint

```http
POST /customers/register
```

### Request Body

```json
{
  "fullName": "John Doe",
  "email": "john@gmail.com",
  "password": "john123",
  "phone": "9876543210"
}
```

### Successful Response

```json
{
  "success": true,
  "message": "Customer registered successfully",
  "customer": {
    "_id": "...",
    "fullName": "John Doe",
    "email": "john@gmail.com",
    "phone": "9876543210"
  }
}
```

### Validation

* All fields are required
* Password must contain at least 6 characters
* Email must be unique
* Password is stored as a bcrypt hash

---

# 🔐 2. Login

### Endpoint

```http
POST /customers/login
```

### Request Body

```json
{
  "email": "john@gmail.com",
  "password": "john123"
}
```

### Successful Response

```json
{
  "success": true,
  "message": "Login successful"
}
```

After successful authentication, the server generates a JWT and stores it in an **HttpOnly cookie**.

### Invalid Credentials

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

Status:

```text
401 Unauthorized
```

---

# 👤 3. Get My Profile

### Endpoint

```http
GET /customers/me
```

🔒 **Protected Route**

The JWT must exist in the authentication cookie.

### Successful Response

```json
{
  "_id": "...",
  "fullName": "John Doe",
  "email": "john@gmail.com",
  "phone": "9876543210"
}
```

The password is never returned.

### Without Authentication

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

Status:

```text
401 Unauthorized
```

---

# 🚪 4. Logout

### Endpoint

```http
POST /customers/logout
```

🔒 **Protected Route**

### Successful Response

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

The authentication cookie is cleared.

---

# 🔄 5. Change Password

### Endpoint

```http
PATCH /customers/change-password
```

🔒 **Protected Route**

### Request Body

```json
{
  "oldPassword": "john123",
  "newPassword": "john456"
}
```

### Successful Response

```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

The new password is hashed with bcrypt before being stored.

---

# 📋 API Summary

| Method  | Endpoint                     | Protected |
| ------- | ---------------------------- | --------- |
| `POST`  | `/customers/register`        | ❌         |
| `POST`  | `/customers/login`           | ❌         |
| `GET`   | `/customers/me`              | ✅         |
| `POST`  | `/customers/logout`          | ✅         |
| `PATCH` | `/customers/change-password` | ✅         |

---

# 🔒 Authentication Flow

```text
                CUSTOMER
                   │
                   ▼
              Login API
                   │
                   ▼
          Verify Password
             bcrypt.compare
                   │
                   ▼
              Generate JWT
                   │
                   ▼
          HttpOnly Cookie
                   │
                   ▼
        ┌───────────────────┐
        │ Authentication     │
        │ Middleware         │
        └─────────┬─────────┘
                  │
                  ▼
             Verify JWT
                  │
                  ▼
             Find User
                  │
                  ▼
             req.user
                  │
          ┌───────┴────────┐
          ▼                ▼
       /me          Change Password
```

---

# 🗄️ Customer Schema

The Customer collection contains:

| Field       | Type   | Required  | Description           |
| ----------- | ------ | --------- | --------------------- |
| `fullName`  | String | ✅         | Customer's full name  |
| `email`     | String | ✅         | Unique email address  |
| `password`  | String | ✅         | bcrypt password hash  |
| `phone`     | String | ✅         | Customer phone number |
| `createdAt` | Date   | Automatic | Creation timestamp    |

---

# 🔐 Security

This project follows several basic authentication security practices:

### Password Hashing

Passwords are hashed using bcrypt before being stored:

```javascript
const hashedPassword = await bcrypt.hash(password, 10);
```

Plain-text passwords are never stored in MongoDB.

### Password Verification

During login:

```javascript
const isPasswordCorrect = await bcrypt.compare(
  password,
  customer.password
);
```

### HttpOnly Cookies

The JWT is stored using:

```javascript
res.cookie("token", token, {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000
});
```

This prevents client-side JavaScript from directly accessing the authentication cookie.

### Protected Routes

Protected routes use authentication middleware:

```javascript
router.get("/me", authMiddleware, getMyProfile);
```

---

# 🧪 Testing

The APIs can be tested using **Postman**.

Recommended testing sequence:

```text
1. Register customer
       ↓
2. Login
       ↓
3. Check /customers/me
       ↓
4. Logout
       ↓
5. Check /customers/me again
       ↓
6. Login again
       ↓
7. Change password
       ↓
8. Verify old password fails
       ↓
9. Verify new password works
```

### Expected authentication behavior

```text
Before Login
GET /customers/me
        ↓
   401 Unauthorized


After Login
GET /customers/me
        ↓
      200 OK


After Logout
GET /customers/me
        ↓
   401 Unauthorized
```

---

# 🧠 Key Concepts Learned

This project demonstrates:

* REST API development
* Express routing
* MVC architecture
* MongoDB and Mongoose
* Password hashing
* Password comparison
* JWT authentication
* HttpOnly cookies
* Authentication middleware
* Protected routes
* Environment variables
* Error handling
* API testing with Postman

---

# 🎯 Lab Requirements

This project satisfies the core ShopKart Authentication Lab requirements:

* ✅ Customer Registration
* ✅ Duplicate Email Prevention
* ✅ bcrypt Password Hashing
* ✅ Customer Login
* ✅ JWT Generation
* ✅ HttpOnly Cookie Authentication
* ✅ Protected Profile API
* ✅ Logout
* ✅ Password Exclusion from Responses
* ✅ MVC Architecture
* ✅ Change Password Bonus Challenge

---

# 🔮 Future Development

ShopKart will eventually be extended with:

```text
Customer Authentication
        ↓
Product Management
        ↓
Shopping Cart
        ↓
Wishlist
        ↓
Orders
        ↓
Payment Integration
```

---

## 👨‍💻 Author

**Javin Arora**

Backend Engineering Lab — ShopKart

---

## 📄 License

This project was created for educational and backend engineering practice purposes.
