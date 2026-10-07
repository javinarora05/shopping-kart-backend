# 🛒 ShopKart — Customer Authentication Service

> A REST API authentication backend demonstrating registration, login, JWT authentication, protected routes and secure password handling.

## ✨ Features
- Customer registration
- bcrypt password hashing
- Duplicate-email validation
- JWT authentication
- HttpOnly cookie-based authentication
- Protected profile endpoint
- Logout
- Change-password flow
- MVC-style separation

## 🧰 Stack
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000)
![JWT](https://img.shields.io/badge/JWT-000000)
![bcrypt](https://img.shields.io/badge/bcrypt-Hashing-111827)

## 🏗️ Architecture
```text
Route
  ↓
Controller
  ↓
Model
  ↓
MongoDB
```

JWTs are stored in HttpOnly cookies and validated by middleware on protected routes.

## 🚀 Setup
```bash
git clone https://github.com/javinarora05/shopping-kart-backend.git
cd shopping-kart-backend
npm install
```

Create .env:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

Never commit real secrets.

## 📡 API
| Method | Endpoint | Auth |
|---|---|---|
| POST | /customers/register | Public |
| POST | /customers/login | Public |
| GET | /customers/me | Protected |
| POST | /customers/logout | Protected |
| PATCH | /customers/change-password | Protected |

Built by **Javin Arora**.