# Expense_Tracker
This project is a backend API for an expense tracker app built using Node.js, Express, and TypeScript.
The goal of this project is to handle income and expense data through REST API endpoints.

# What this project does
* Runs a backend server
* Handles API requests
* Stores and manages transactions (income & expenses)
* Creates unique IDs for transactions
* Uses TypeScript for better code structure
* Allows frontend connection using CORS
* Logs requests using Morgan

# Tools used
* Node.js
* Express
* TypeScript
* Morgan (for logging requests)
* Cors (to allow frontend connection)
* Dotenv (for environment variables)
* Nodemon (for development)
* Prettier (for formatting code)
* UUID (for generating transaction IDs)

# Project structure
backend/
│
├── src/
│   ├── app.ts          # sets up express
│   ├── server.ts       # starts the server
│   ├── models/         # transaction types/interfaces
│   ├── routes/         # API routes
│
├── dist/               # compiled JavaScript files
├── package.json
├── tsconfig.json

# Requirements
* Node.js (version 18 or higher recommended)
* npm

# How to install
Install dependencies:

npm install

# How to run the server

## Development Mode (recommended)

npm run dev

This uses Nodemon and automatically restarts the server whenever changes are made.


## Production Mode

Build the TypeScript files:

npm run build

Start the compiled server:

npm start

# Available scripts
npm run dev

Runs the backend in development mode.

npm run build

Compiles TypeScript into JavaScript.


npm start

Runs the compiled JavaScript files from the `dist` folder.

npm run format

Formats TypeScript files using Prettier.


# API Endpoints

## Test route

GET /ping

Response:

pong

## Get all transactions

GET /api/v1/transactions


Response:
{
  "success": true,
  "data": []
}

## Create a transaction

POST /api/v1/transactions


Request body:
{
  "type": "EXPENSE",
  "amount": 5000,
  "category": "Food",
  "description": "Lunch",
  "date": "2026-05-17T10:00:00.000Z"
}


Response:
{
  "success": true,
  "data": {
    "id": "generated-id",
    "type": "EXPENSE",
    "amount": 5000,
    "category": "Food",
    "description": "Lunch",
    "date": "2026-05-17T10:00:00.000Z",
    "createdAt": "2026-05-17T10:00:00.000Z",
    "updatedAt": "2026-05-17T10:00:00.000Z"
  }
}


## Delete a transaction

DELETE /api/v1/transactions/:id


Response:
{
  "success": true,
  "message": "Deleted"
}


# Data structure

This is what a transaction looks like:
type TransactionType = "INCOME" | "EXPENSE";

interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  description?: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}
# Environment variables

Create a `.env` file in the root folder:

PORT=3000

# CORS Configuration

The backend currently allows requests from:


http://localhost:3001

This allows a frontend application running on that port to connect to the backend.

