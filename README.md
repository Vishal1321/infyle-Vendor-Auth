# Infyle Vendor Task - Backend

## Overview
This is the backend for the Infyle Vendor Task. It includes vendor signup/login, JWT authentication, and product management.

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- Bcrypt for password hashing

## API Routes

### Vendor
- **POST /vendor/signup** – Register a new vendor
  - Body: `{ name, email, password, phone }`
- **POST /vendor/login** – Login vendor
  - Body: `{ email, password }`
  - Returns: JWT token

### Product
- **POST /product/add** – Add new product (requires token)
  - Header: `Authorization: Bearer <token>`
  - Body: `{ name, description, price, category, image }`

## Environment Variables
Create a `.env` file with:
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
PORT=5000

```bash
npm install
npm run dev