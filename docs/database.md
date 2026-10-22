# Hosted PostgreSQL

Tubilex has its own Neon project: `long-breeze-71366392` in `aws-eu-central-1` (PostgreSQL 18).

The local app is connected to development branch `dev-nextjs` (`br-steep-shadow-ba4zdgz5`). Its parent is the untouched default branch. This keeps testing and generated administrator credentials out of production.

Connection details live only in the ignored `.env.local`. Never put them in `NEXT_PUBLIC_*`, commits, screenshots, or client code.

## Recreate or update the schema

```powershell
npm run db:migrate
npm run db:seed
```

Migrations are additive and transactional. The seed is idempotent by vehicle slug and never overwrites edited listings. Run schema changes against a development branch before applying to production. Record any future schema modifications as versioned migrations before changing an already deployed schema.

## Staff access

Better Auth manages password hashing, sessions, origin validation and database-backed login rate limits. Public signup is disabled. Every admin page and mutation checks the session and the `admin_users` allowlist on the server.

To create another administrator, set `ADMIN_EMAIL`, `ADMIN_PASSWORD` (12 characters minimum), and `ADMIN_NAME` in `.env.local`, then run `npm run admin:create`. This CLI process alone permits signup. Remove the setup password from the file after securely saving it.

## Before production

Use a production database branch, apply the schema there, create the real staff accounts, and confirm the vehicle details. Set `DATABASE_URL`, a new `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and `NEXT_PUBLIC_SITE_URL` in the hosting provider. Use the real HTTPS origin for the final two values. Existing MySQL production records must be exported and migrated separately if they differ from the repository's snapshot.

Enquiries are stored in PostgreSQL and shown in the workspace. They do not send email notifications. The vehicle editor supports JPG, PNG and WebP uploads up to 5 MB. The server decodes and re-encodes them as optimized WebP (up to 1920 x 1400), strips metadata, and stores them durably in PostgreSQL. The immutable `/api/media/:id` route serves them. HTTPS image URLs and paths under `/media/` are also supported. For a large inventory, move media storage to an object storage provider to keep database backups small.

The former dashboard's IP-based visitor counting has not been reintroduced. Current workspace statistics show inventory and enquiries.
