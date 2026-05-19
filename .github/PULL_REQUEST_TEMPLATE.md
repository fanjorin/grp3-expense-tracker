## Summary

Describe the changes introduced by this PR.

## Related issues

- Closes: # (if applicable)

## Checklist (for PRs that change DB/schema)

- [ ] Migration file(s) included and named clearly
- [ ] Migrations applied locally and tested
- [ ] Seed data updated (if needed)
- [ ] Backwards-compatible: include rollback plan if not
- [ ] Update relevant docs (`backend/README.md`, `DEVOPS-ISSUES.md`)

## How to test

Provide steps to verify the PR locally. Example:

```bash
# start DB
docker-compose up -d
# run migrations
pnpm --filter backend run db:migrate
# seed
pnpm --filter backend run db:seed
# run backend
pnpm --filter backend run dev
```

## Notes

Any additional context for reviewers.
