# Contributing Guide

Welcome! This guide walks you through local setup and development workflows.

## Prerequisites

- Node.js 18+ and pnpm
- Docker & Docker Compose (for local database)
- Git

## Quick Start

### 1. Clone & Install Dependencies

```bash
git clone <repo-url>
cd grp3-expense-tracker
pnpm install
cd backend && pnpm install
cd ../frontend && pnpm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env.local` in the **root** directory:

```bash
cp .env.example .env.local
```

Then in `backend/`:

```bash
cp ../.env.local .env
```

### 3. Start Local Database

```bash
docker-compose up -d
```

This launches Postgres 16 on `localhost:5432`. Wait ~3 seconds for the container to be healthy.

Verify:
```bash
psql postgresql://postgres:password@localhost:5432/expense_dev
```

### 4. Run Backend Migrations & Seeds

```bash
cd backend
pnpm run db:migrate
pnpm run db:seed
```

### 5. Start Backend & Frontend

**Backend** (port 3000):
```bash
cd backend
pnpm run dev
```

**Frontend** (port 3001):
```bash
cd frontend
pnpm run dev
```

Open http://localhost:3001 in your browser.

## Development Workflows

### Running Tests

```bash
cd backend
pnpm test
```

### Creating a New Migration

```bash
cd backend
pnpm run db:migrate:create -- --name add_your_feature
```

Edit the migration file in `backend/prisma/migrations/`, then run:

```bash
pnpm run db:migrate
```

### Resetting the Local Database

```bash
docker-compose down -v
docker-compose up -d
pnpm run db:migrate
pnpm run db:seed
```

## Pull Request Checklist

Before opening a PR:

- [ ] Branch follows naming convention: `feature/`, `bugfix/`, `devops/`, etc.
- [ ] Commit messages follow [conventional commits](https://www.conventionalcommits.org/) format.
- [ ] If schema changes: migration file is included and tested locally.
- [ ] Tests pass locally: `pnpm test`
- [ ] Code is formatted: `pnpm run format`
- [ ] No secrets or `.env` files committed.

## Database & Schema Changes

- Always create a **migration** for schema changes (never edit schema.prisma and push without running migrations).
- Run `pnpm run db:seed` after migrations to ensure seed data is fresh.
- Test migrations locally with `docker-compose down -v` → fresh start → `pnpm run db:migrate`.

## Questions or Issues?

Refer to [DEVOPS-ISSUES.md](./DEVOPS-ISSUES.md) for infrastructure, deployment, and DevOps docs.

Happy coding!
