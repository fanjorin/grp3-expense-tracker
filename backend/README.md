# Expense Tracker Backend

This is the backend for the Group 3 Expense Tracker project. It is built with Node.js, Express, and TypeScript.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)

## Getting Started

### Installation

Install the dependencies using npm:

```bash
npm install
```

### Running the Server

#### Development Mode

To start the server with auto-reload (using nodemon and ts-node):

```bash
npm run dev
```

#### Production Mode

To build the project and start the compiled JavaScript server:

```bash
npm run build
npm start
```

## Database Setup

### Local Development

The backend uses Postgres with Prisma ORM. To set up a local database:

1. **Start Postgres via Docker Compose** (from the project root):
   ```bash
   docker-compose up -d
   ```

2. **Run migrations**:
   ```bash
   npm run db:migrate
   ```

3. **Seed initial data** (optional):
   ```bash
   npm run db:seed
   ```

For details, see [CONTRIBUTING.md](../CONTRIBUTING.md).

## Scripts

- `npm run dev`: Runs the server in development mode.
- `npm run build`: Compiles TypeScript to JavaScript in the `dist` directory.
- `npm start`: Starts the compiled server.
- `npm run format`: Formats the code using Prettier.
- `npm run db:migrate`: Runs pending Prisma migrations.
- `npm run db:seed`: Seeds the database with initial data.
- `npm test`: Runs tests (when configured).
