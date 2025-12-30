# INFYLE Vendor Auth - Backend

This is the backend for **INFYLE Vendor Authentication & Product Approval Module** built with MERN stack.

## Tech Stack
- Node.js + Express.js
- MongoDB Atlas
- Mongoose
- Bcrypt for password hashing
- Dotenv for environment variables
- JWT (to be implemented)
- OAuth (Google) (to be implemented)

## Setup Instructions

1. Clone the repo:

```bash
git clone https://github.com/your-username/infyle-Vendor-Auth.git

2.Install dependencies:
npm install

3.Create a .env file in the backend root folder with:
MONGO_URI=your_mongodb_atlas_uri
PORT=5000

4.Start the server:
npx nodemon index.js
Server should run on http:localhost:5000 and log:
MONGODB connected
Server running on port 5000

API Endpoints
POST /api/vendor/signup → Vendor signup with email/password
Request Body (JSON):
{
  "name": "Vishal Thakur",
  "email": "vishal@example.com",
  "password": "Infyle123",
  "phone": "9876543210"
}
Response (Success 201):

{
  "message": "Vendor registered successfully",
  "vendor": {
    "_id": "...",
    "name": "Vishal Thakur",
    "email": "vishal@example.com",
    "phone": "9876543210",
    "oauthProvider": "Local",
    "createdAt": "...",
    "updatedAt": "..."
  }




