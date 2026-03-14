# email-verification-auth-system

# Email Verification Authentication System

## Overview

This project implements a **user registration system with email verification** using Node.js, Express, MongoDB, and Redis.

When a user registers, their account is created in an **unverified state**. A verification email containing a unique token is sent to the user's email address. The account becomes active only after the user clicks the verification link.

The system also demonstrates **production-grade backend architecture** with background jobs, logging, validation, and monitoring tools.

---

# Features

* User Registration
* Email Verification via Token
* Login Restricted to Verified Users
* Password Hashing
* Token Expiration Handling
* Background Email Processing using Queue
* API Request Logging
* Validation Layer
* Global Error Handling
* Queue Monitoring Dashboard
* Interactive API Documentation

---

# Tech Stack

| Technology       | Purpose                   |
| ---------------- | ------------------------- |
| Node.js          | Backend runtime           |
| Express.js       | REST API framework        |
| MongoDB          | Database                  |
| Mongoose         | MongoDB ODM               |
| Redis            | Queue storage             |
| BullMQ           | Background job processing |
| Nodemailer       | Email delivery            |
| Joi              | Request validation        |
| Morgan + Winston | Logging                   |
| Swagger          | API documentation         |
| Bull Board       | Queue monitoring UI       |

---

# Architecture

```
Client
  │
  ▼
Express API
  │
  ├── Validation Layer
  │
  ├── Controllers
  │
  ├── Service Layer
  │
  ├── MongoDB (User Data)
  │
  └── Redis Queue (BullMQ)
          │
          ▼
      Email Worker
          │
          ▼
      Nodemailer
```

---

# Folder Structure

```
src
│
├── config
│   └── swagger.ts
│
├── controllers
│   └── auth.controller.ts
│
├── middlewares
│   ├── error.middleware.ts
│   ├── logger.middleware.ts
│   └── validate.middleware.ts
│
├── models
│   └── user.model.ts
│
├── queues
│   ├── email.queue.ts
│   └── queueDashboard.ts
│
├── routes
│   └── auth.routes.ts
│
├── services
│   ├── auth.service.ts
│   └── email.service.ts
│
├── utils
│   ├── asyncHandler.ts
│   ├── hash.ts
│   └── logger.ts
│
├── validations
│   └── auth.validation.ts
│
├── workers
│   └── email.worker.ts
│
├── app.ts
└── server.ts
```

---

# Installation

Clone the repository:

```
git clone https://github.com/your-username/email-verification-auth-system.git
```

Install dependencies:

```
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000

MONGO_URI=mongodb://127.0.0.1:27017/email-verification

JWT_SECRET=your_secret_key

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Note: For Gmail, you must use an **App Password**.

---

# Running the Project

Start the API server:

```
npm run dev
```

Start the email worker:

```
npm run worker
```

---

# API Documentation

Interactive API documentation is available at:

```
http://localhost:3000/docs
```

---

# Queue Monitoring Dashboard

The BullMQ dashboard can be accessed at:

```
http://localhost:3000/queues
```

This dashboard shows:

* Waiting jobs
* Active jobs
* Completed jobs
* Failed jobs
* Retry attempts

---

# API Endpoints

### Register User

```
POST /auth/register
```

Example request:

```
{
  "name": "Ishan",
  "email": "ishan@example.com",
  "password": "password123"
}
```

---

### Verify Email

```
GET /auth/verify?token=verification_token
```

---

### Login

```
POST /auth/login
```

---

# Security Considerations

* Passwords are hashed using bcrypt
* Email verification required before login
* Verification tokens expire after 24 hours
* API input validation prevents malformed requests
* Rate limiting can be added to prevent abuse

---

# Future Improvements

* OAuth authentication
* Email templates with HTML styling
* Refresh tokens and JWT authentication
* Docker containerization
* CI/CD pipeline

---

# Author

Ishan Palkar

Backend Developer | Node.js | System Design Enthusiast | DevOps Enthusiast
