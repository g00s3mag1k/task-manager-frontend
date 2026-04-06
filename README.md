# 📝 Task Manager (Full-Stack)

Full-stack task management application with secure user authentication, allowing users to create, manage and track tasks in real time.

🔗**Live Demo**: https://task-manager-frontend-r18l.onrender.com

🔗**Back-End API**: https://task-manger-api-mkdx.onrender.com

---

## 🚀 Features 

- 🔐User authentication (Register + Login with JWT)
- 🔑Secure password hashing using bcrypt
- 📋Create, update, and delete tasks
- ✅Mark tasks as completed
- 🔄Persistent sessions with token-based auth
- 🚪Auto-logout on expired/invalid tokens
- 🌐Fully deployed (Frontend + Backend + Database)

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- JavaScript (ES6+)
- Fetch API
- CSS (custom styling)

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT (jsonwebtoken)
- bcrypt

---

## 🧩 Architecture Overview

React Frontend → Express API → MongoDB
↓ ↓
JWT stored 
Protected routes in localStorage with middleware

---

## 🔐 Authentication Flow

1. User registers with email/password
2. Password is hashed using bcrypt 
3. User logs in and receives a JWT 
4. JWT is stored in locaStorage
5. Token is sent in Authorization header for protected routes
6. Backend verifies token via middleware

---


## 📸 Screenshots

### Login
![Login](/public/screenshots/dash.png)

### Register
![Register](/public/screenshots/register.png)

### Dashboard
![Dashboard](/public/screenshots/image.png)

---

## ⚙️ Environment Variables

### Backend (.env)

PORT=****

MONGO_URI=*****

JWT_SECRET=****

JWT_EXPIRES_IN=**

### Frontend (Render Environment)

VITE_API_URL=https://task-manger-api-mkdx.onrender.com

---

## 👤 Author 

### Brandon Gonzalez 
📍Carlsbad, CA

🔗LinkedIn: https://www.linkedin.com/in/g00s3mag1k/