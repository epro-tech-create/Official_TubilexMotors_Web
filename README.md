# Tubilex Motors

The original Tubilex Motors frontend, preserved in **Next.js App Router, React, TypeScript, and PostgreSQL**, with Better Auth for staff access. `main` keeps the original homepage design, content, images, spacing and styling. React replaces its PHP/Alpine behavior; the contact form stores enquiries in PostgreSQL.

The alternative redesigned showroom is preserved on the **`newVersion` branch** at `1aab83d` and tag `v2.0.0-nextjs`. Git cannot simultaneously store branches named `main` and `main/newVersion`, so the separate redesign branch is named `newVersion`.

## Run locally

Requires Node.js 20.9+ and npm. The hosted development database is already connected through the ignored `.env.local` on this machine.

```powershell
npm install
npm run dev
```

Open http://127.0.0.1:3000. Staff workspace: http://127.0.0.1:3000/admin.

The initial staff email is `tubilexmotorslimited@gmail.com`. Its generated password is saved as `ADMIN_PASSWORD` in the local `.env.local` file, not in this repository. Save it securely and remove that setup variable afterward.

For a fresh checkout, copy `.env.example` to `.env.local`, set a PostgreSQL connection string and random authentication secret, then run:

```powershell
npm run db:migrate
npm run db:seed
# Set ADMIN_EMAIL, ADMIN_PASSWORD and ADMIN_NAME before this command:
npm run admin:create
```

## Included

- The exact original homepage structure, original Tailwind stylesheet, fonts, text, photographs, videos and styling.
- React-controlled mobile navigation and FAQ accordions with the original appearance and image hover effects.
- Original contact form connected to PostgreSQL without changing its appearance.
- Additional inventory, vehicle-detail, contact and staff routes remain available; their styles are isolated from the original homepage.
- PostgreSQL-backed vehicle listings and enquiries, validated inputs, parameterized queries, spam honeypot, and persistent submission rate limits.
- Protected staff workspace with vehicle creation/editing/deletion, listing status, featured listings, prices/specifications, and enquiry status management.
- Secure staff sessions through Better Auth; public signup is disabled.
- Page metadata, sitemap, robots rules, error pages, and loading states.

## Structure

- `src/app/(public)` — customer-facing routes
- `src/app/admin` — protected workspace and server actions
- `src/app/api` — authentication and enquiry handlers
- `src/components/original-home.tsx` — original homepage converted to React
- `src/app/original.css` — original compiled CSS, plus original font utility rules
- `src/lib/original-inventory.ts` — original snapshot presentation for untouched imported records; staff edits are respected
- `src/components` — reusable UI and workspace components
- `src/lib` — database, auth, types and validation
- `database/schema.sql` — PostgreSQL schema
- `scripts` — database and administrator setup
- `public/media` — optimized website images
- `legacy` — original PHP/MySQL site and assets, retained for reference

## Checks

```powershell
npm run typecheck
npm test
npm run build
```

The lockfile pins installed dependency versions. `node_modules` is no longer tracked.

## Version history and rollback

The original PHP/MySQL site is preserved on `legacy/php-mysql` and the `v1.0.0-php` tag. `main` uses Next.js with the original frontend; `newVersion` and `v2.0.0-nextjs` preserve the alternative redesigned frontend. See [cPanel deployment and rollback instructions](docs/rollback.md) before changing the live website. Git versions preserve code; live database and upload backups must be preserved separately.

See [database setup and production notes](docs/database.md) for Neon branch details, migration scope, credentials, and hosting configuration. The new application has not replaced the existing public website.
