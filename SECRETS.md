# Secrets Management Guide

This document explains how to securely manage secrets (database credentials, API keys, etc.) in this project.

## Local Development

### Never commit `.env` files

- Use `.env.local` or `.env.development` (add to `.gitignore`)
- Copy values from `.env.example`
- **Important:** Never commit real credentials or secrets to source control.

### Example `.env.local`:

```
DATABASE_URL=postgres://postgres:password@localhost:5432/expense_dev
NODE_ENV=development
PORT=3000
```

## Production & Deployment

### GitHub Actions: Using GitHub Secrets

All production secrets should be stored as **GitHub Secrets** and referenced in CI/CD workflows.

#### Setting Up GitHub Secrets

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret with a clear name and value

##### Recommended secrets:

- `DATABASE_URL_PROD` — Production Postgres connection string
- `DATABASE_PASSWORD` — Database password (if not in URL)
- `NODE_ENV` — Set to `production`
- `JWT_SECRET` — (if using JWT authentication in future)
- `API_KEY` — (if needed for third-party services)

#### Using Secrets in GitHub Actions Workflows

In `.github/workflows/ci.yml` or deployment workflows, reference secrets like this:

```yaml
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL_PROD }}
  NODE_ENV: ${{ secrets.NODE_ENV }}
```

### Example: Production Deployment Workflow

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy backend
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL_PROD }}
          NODE_ENV: production
        run: |
          # Your deployment commands here
          pnpm run build
          # Deploy to hosting (Heroku, EC2, etc.)
```

## Advanced: Vault & Cloud KMS (Future)

For higher security in larger teams, consider:

- **AWS KMS** — Encrypt secrets at rest, audit access
- **HashiCorp Vault** — Centralized secret management, dynamic credentials
- **Azure Key Vault** — Microsoft cloud secrets management
- **GCP Secret Manager** — Google Cloud secrets

These are optional for now but recommended as the project scales.

## Security Best Practices

1. ✅ Store all secrets in GitHub Secrets, not in code
2. ✅ Use strong, unique passwords for databases
3. ✅ Rotate credentials periodically (especially for shared accounts)
4. ✅ Limit secret access to only necessary workflows
5. ✅ Audit who has access to GitHub Secrets (via repository settings)
6. ✅ Never log or print secrets in CI output
7. ✅ Use environment-specific secrets (e.g., `DATABASE_URL_PROD`, `DATABASE_URL_STAGING`)

## Troubleshooting

**Q: My workflow failed with "secret not found"**  
A: Ensure the secret name matches exactly (case-sensitive). Check GitHub Secrets settings.

**Q: How do I rotate a database password?**  
A: Update the password in your database management console, then update the GitHub Secret with the new password.

**Q: Can I share GitHub Secrets with team members?**  
A: No, GitHub Secrets are encrypted and only visible to GitHub Actions. Share only the **names** of secrets in documentation, not values.

---

For questions or security concerns, reach out to your DevOps engineer or security team.
