# DevOps: Database & Collaboration Issues

Date: 2026-04-29

This document captures findings from a quick DevOps review, identifies issues related to the database and collaboration, and lists prioritized next steps to improve onboarding, reliability, and collaborator productivity.

## Quick findings
- Backend currently has no database client or ORM in `backend/package.json`.
- `dotenv` is used (`backend/src/server.ts` imports `dotenv/config`) but there is no `.env.example` or docs describing required env vars.
- No migration tooling, seed data, Docker configuration, or CI workflows found in the repository.
- No migration tooling, seed data, Docker configuration, or CI workflows found in the repository.

## Problems / Risks
- No reproducible local DB: contributors have no standard way to run a database locally.
- No migrations: schema changes are not tracked, causing drift and merge conflicts.
- Secrets management is ad-hoc: potential leakage when env files or credentials are checked into source.
- No automated CI step for schema migration checks or DB-integrated tests.
- No infrastructure as code or deployment guidance for production DB (backups, HA, monitoring).

## Prioritized recommendations (short-term → long-term)

1) Add documentation and minimal onboarding (Immediate)
  - Create `.env.example` listing required variables (DB_URL, NODE_ENV, PORT, etc.).
  - Add a short `CONTRIBUTING.md` snippet describing how to start the app and the DB locally.
  - Add `DEVOPS-ISSUES.md` (this file) and link from `backend/README.md`.

2) Provide a reproducible local DB (1–2 days)
  - Recommended stack: **Postgres 16 + Prisma** (schema-first, great DX).
  - Add a `docker-compose.yml` (already added in this repo) that launches Postgres and the backend.
  - Provide a one-liner to start local infra: `docker-compose up -d` and a short teardown command.

3) Pick and add migration tooling (1–3 days)
  - Chosen tooling (recommended and implemented in this branch): **Prisma**.
  - Add migration commands to `backend/package.json` using `pnpm`: `db:migrate`, `db:migrate:dev`, `db:seed`, `db:push`.
  - Add an initial migration and seed dataset to make local testing easy (see `backend/prisma/`).

4) CI integration for DB (1–2 days)
  - Add GitHub Actions workflow to run migrations and DB-integrated tests in PRs.
  - Fail PRs if migrations are missing or if schema checks fail.

5) Secrets & environment management (1–2 days)
  - Use GitHub Secrets to store production credentials.
  - For higher security, consider Vault or cloud KMS (AWS KMS, Azure Key Vault, GCP Secret Manager).

6) Backups, monitoring, and production readiness (ongoing)
  - If using managed DB (RDS, Cloud SQL), enable automated snapshots & point-in-time recovery.
  - Add basic monitoring/alerts (CPU, connection count, replication lag) and periodic backup tests.
  - Backup & restore: document and automate regular backups. Example `pg_dump` snapshot and restore commands:

```bash
# create a logical backup
pg_dump "$DATABASE_URL" -Fc -f backups/expense_dev-$(date +%F).dump

# restore to a database
pg_restore --clean --no-owner -d postgres://postgres:password@localhost:5432/expense_dev backups/expense_dev-2026-01-01.dump
```

  - Rollback strategy: prefer backward-compatible migrations. When a destructive migration is required:
    - Create a migration that adds the new schema alongside the old, migrate data, then switch application to new schema.
    - Maintain a rollback migration that can be applied by DBAs for emergency reversion.

## Suggested starter artifacts and examples

-.env.example (example contents)

```
NODE_ENV=development
PORT=3000
DATABASE_URL=postgres://postgres:password@localhost:5432/expense_dev
```

- Minimal `docker-compose.yml` snippet (Postgres + app)

```
version: '3.8'
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: expense_dev
    ports:
      - "5432:5432"
    volumes:
      - db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  db-data:
```

-- CI workflow high-level steps
  - Start DB service (docker container or the Actions `services` feature).
  - Run `pnpm install` in the repo root and in `backend`.
  - Run migrations (`pnpm --filter backend run db:migrate`).
  - Run tests that use the DB.

## Collaboration & process improvements
- Add `backend/README.md` section with: how to run the DB locally, how to run migrations, and where seeds live.
- Protect main branches and require PR reviews for schema changes.
- Use migration-generated files in PRs to make schema change intent visible.
- Add a simple QA checklist in PR template for DB-impacting PRs (include: migration present, seed updated, tested locally).

## Next steps I can take for you
- Create `.env.example`, `docker-compose.yml`, and a starter GitHub Actions workflow.
- Add migration tool scaffolding (Prisma or Knex) and a basic migration + seed.

If you want, tell me which DB engine and migration tool you'd prefer (Postgres + Prisma recommended). I can implement the starter artifacts and CI changes.
