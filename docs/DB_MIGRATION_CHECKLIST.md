# DB Migration Checklist

Use this checklist for any PR that introduces schema changes or data migrations.

- [ ] Add a migration file (Prisma migration under `backend/prisma/migrations/`) with a clear name.
- [ ] Run migrations locally against a fresh DB (`docker-compose down -v && docker-compose up -d && pnpm --filter backend run db:migrate`).
- [ ] Run and update seed data if necessary (`pnpm --filter backend run db:seed`).
- [ ] Verify application behavior against the migrated schema.
- [ ] Add automated tests covering the migration where feasible.
- [ ] Include a rollback plan in the PR description if the change is destructive.
- [ ] Ensure CI runs migrations as part of the PR checks.

## Rollback Guidance
- For simple changes, include a down migration or a safe reversal script.
- For destructive operations (dropping columns/tables):
  - Prefer a phased approach: add new fields -> backfill data -> switch reads -> remove old fields in a later migration.

## Notes
- Keep migrations small and focused to simplify review and rollback.
- Document any manual steps required for production deployment in the PR description.
