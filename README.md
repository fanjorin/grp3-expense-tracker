# Expense_Tracker

This project is a backend API for an expense tracker app built using Node.js, Express, and TypeScript.
The goal of this project is to handle income and expense data.

## What this project does
* Runs a backend server
* Handles API requests
* Stores and manages transactions (income & expenses)
* Uses TypeScript for better code structure

## Tools used
* Node.js
* Express
* TypeScript
* Morgan (for logging requests)
* Cors (to allow frontend connection)
* Dotenv (for environment variables)
* Nodemon (for development)
* Prettier (for formatting code)


## Project structure
backend/
│
├── src/
│   ├── app.ts        # sets up express
│   ├── server.ts     # starts the server
│   ├── routes/       # API routes
│   ├── types/        # TypeScript types
│
├── dist/             # compiled files
├── package.json
├── tsconfig.json


## Requirements
* Node.js (version 18 or higher)
* npm


## How to install
npm install

## How to run the server

### Development (recommended)
npm run dev

This will auto-restart the server when you make changes.

### Production
npm run build
npm start

## Available scripts

* `npm run dev` → run in development mode
* `npm run build` → compile TypeScript
* `npm start` → run compiled code
* `npm run format` → format code

## API endpoints

### Test route
GET /ping
Response:
pong

### Base route
GET /api/v1/
Response:
{
  "message": "API is working 🚀"
}


## Data structure

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


## Environment variables
Create a `.env` file:

PORT=3000


## Things to improve later

* Add a database (MongoDB or PostgreSQL)
* Add full CRUD (create, read, update, delete)
* Add authentication (login system)
* Add validation for inputs
* Deploy the backend
