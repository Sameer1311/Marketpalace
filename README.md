# Marketplace Project

A modern full-stack marketplace application built with Next.js, Tailwind CSS, MongoDB, and NextAuth authentication.

---

# Features

* User Authentication with NextAuth
* Secure Login & Registration
* Add to Cart Functionality
* Modern Responsive UI
* Dashboard Cart Management
* Product Listing UI
* Protected Routes
* MongoDB Database Integration
* Framer Motion Animations

---

# Tech Stack

* Next.js
* React.js
* Tailwind CSS
* MongoDB
* NextAuth.js
* Framer Motion
* Lucide React

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/Sameer1311/Marketpalace.git
```

---

## 2. Navigate To Project

```bash
cd Marketpalace
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Create Environment Variables

Create a `.env.local` file in the root directory.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

---

## 5. Run Development Server

```bash
npm run dev
```

Project will run on:

```bash
http://localhost:3000
```

---

# Environment Variable Example

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/marketplace
NEXTAUTH_SECRET=your_super_secret_key
NEXTAUTH_URL=http://localhost:3000
```

---

# Project Structure

```bash
app/
 ├── api/
 ├── login/
 ├── dashboard/
 ├── components/
 ├── models/
 ├── context/
 └── main_page/

lib/
 └── mongodb.js
```

---

# Authentication Flow

1. User registers with email and password
2. Password is hashed using bcrypt
3. User logs in using NextAuth credentials provider
4. Session is stored using JWT strategy
5. Protected pages access session data

---

# API Documentation

## Base URL

```bash
http://localhost:3000/api
```

---

## Authentication APIs

### Register User

### Endpoint

```bash
POST /api/register
```

### Request Body

```json
{
  "name": "Sameer",
  "email": "sameer@example.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "message": "User registered successfully"
}
```

---

### Login User

### Endpoint

```bash
POST /api/auth/callback/credentials
```

### Request Body

```json
{
  "email": "sameer@example.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "ok": true,
  "status": 200
}
```

### Error Response

```json
{
  "error": "CredentialsSignin",
  "status": 401
}
```

---

## Session API

### Endpoint

```bash
GET /api/auth/session
```

### Response

```json
{
  "user": {
    "name": "Sameer",
    "email": "sameer@example.com"
  }
}
```

---

# Important Notes

* Deployment was not completed due to limited deadline.
* Some advanced features are still under development.
* Core functionality and UI implementation are completed.

---

# Future Improvements

* Payment Gateway Integration
* Product Search & Filters
* Order Management
* Wishlist Functionality
* Admin Dashboard
* Product Reviews
* Deployment & CI/CD

---

# Author

Sameer Negi

GitHub Repository:

[https://github.com/Sameer1311/Marketpalace](https://github.com/Sameer1311/Marketpalace)
