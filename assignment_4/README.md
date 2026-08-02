# 🔐 Auth Login Protect API

A secure REST API built with **Node.js**, **Express.js**, and **Supabase Authentication**.
![Swagger Screenshot](https://raw.githubusercontent.com/Dare-TechieZ/Flyrank-AI-internship-work/main/assignment_4/assignment4.png)

## Features

- User Signup
- User Login
- User Logout
- JWT Authentication
- Protected Routes
- Authentication Middleware
- Swagger Documentation

---

## Tech Stack

- Node.js
- Express.js
- Supabase Auth
- Swagger UI
- dotenv

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
PORT=3000
```

Start the server

```bash
npm run dev
```

---

## Swagger Documentation

Open

```
http://localhost:3000/docs
```

Authorize using the JWT Access Token obtained after login.

---

## API Endpoints

| Method | Endpoint | Authentication |
|----------|------------------------|---------------|
| POST | /auth/signup | ❌ |
| POST | /auth/login | ❌ |
| POST | /auth/logout | ✅ |
| GET | /public/info | ❌ |
| GET | /protected/profile | ✅ |
| GET | /protected/dashboard | ✅ |

---

## Authentication Flow

1. User signs up.
2. User logs in.
3. Server returns Access Token.
4. Add token to Authorization Header.

```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

5. Access protected routes.

---

## Project Structure

```
auth-login-protect/

config/
    supabase.js

middleware/
    authMiddleware.js

routes/
    authRoutes.js
    publicRoutes.js
    protectedRoutes.js

server.js
openapi.json
README.md
```

---

## Environment Variables

```
SUPABASE_URL
SUPABASE_KEY
PORT
```

---

## Status Codes

| Code | Meaning |
|------|---------|
|200|Success|
|201|Created|
|204|Logout Successful|
|400|Bad Request|
|401|Unauthorized|
|404|Route Not Found|
|500|Internal Server Error|

---

## Author

Ria Saraswat
