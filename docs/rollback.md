# Versions, deployment and rollback

The previous live site uses cPanel / PHP hosting. The rebuild uses Node.js / Next.js and PostgreSQL. Both source versions are preserved in this repository; switching source versions does not switch or restore a database.

## Permanent source checkpoints

- `legacy/php-mysql` branch and `v1.0.0-php` tag: the original PHP / MySQL site at commit `63ba9c545607c8744104155b444443a5a82b0972`, before the rebuild.
- `main` branch and `v2.0.0-nextjs` tag: the Next.js / PostgreSQL rebuild.

Keep these release tags. Add a new version tag for each future production release so a known version can be selected without rewriting Git history.

## Before replacing the cPanel site

1. In cPanel, create and download a full account backup, or at minimum back up the complete current document root and export the **current live MySQL database** using phpMyAdmin. The old SQL file in Git is only a historical snapshot; it is not a current production backup.
2. Record the existing domain's document root, PHP version, database name, database user and hosting configuration privately. Preserve the live database and uploaded files during the transition.
3. Check whether this cPanel plan includes a supported Node.js Application feature. PHP-only hosting cannot run this Next.js application. If it does not, use a separate Node.js-capable host and point the domain to it only after verification.
4. Keep the original cPanel site and MySQL database available until the new deployment has been accepted. The new Neon database is separate from the old MySQL database.

Pushing this repository is not a cPanel deployment. Existing auto-deployment hooks, if any, must target the appropriate branch/runtime; do not deploy `main` into a PHP-only document root. Use `legacy/php-mysql` for any Git-connected cPanel deployment that must remain on PHP.

## Return to the previous PHP deployment

Prefer restoring the cPanel file backup that was taken just before the migration. It preserves the exact live uploads and host-specific configuration.

If the files need to be reconstructed from GitHub, select the `v1.0.0-php` tag or `legacy/php-mysql` branch and download its source. Alternatively, create a deployable ZIP from a checkout:

```powershell
git fetch origin --tags
git archive --format=zip --output=tubilex-php-rollback.zip v1.0.0-php -- admin images video src home.php index.php favicon.png README.md
```

The ZIP places `index.php` at the root and excludes the unused Node dependencies. Back up the current document root before replacing files. Extract the PHP release into the original document root, restore the private PHP/MySQL connection configuration, and reconnect the existing MySQL database. Do not overwrite a live database with the repository's historical SQL dump. Restore a database backup only when necessary, after accounting for messages and uploads received since that backup.

If the domain was moved to a new host, point it back to the original cPanel host using the previously recorded DNS configuration, and verify HTTPS, public pages, staff login, vehicle images and contact submission.

This does not require resetting `main`, deleting the Next.js version, or force-pushing. The PHP branch/tag and Next.js branch/tag can coexist.

## Work on either version locally

Start with a clean or committed working tree. Create a separate working branch from the chosen release:

```powershell
git fetch origin --tags
# Choose ONE starting point:
git switch -c restore-php v1.0.0-php
# or
git switch -c restore-nextjs v2.0.0-nextjs
```

Use the PHP/MySQL environment for the PHP version. Use Node.js, `npm ci`, and the appropriate ignored `.env.local` for the Next.js version. Environment files are deliberately not versioned. Never use PostgreSQL credentials in the old PHP connection file.

For future Next.js rollbacks, select a previous release in the Node.js host's deployment history or redeploy its Git tag, keeping compatible environment variables. Take a PostgreSQL snapshot/backup before production schema changes: redeploying code does not undo migrations, restore deleted records, or recover image uploads stored in the database.

No live cPanel files, databases, DNS records, deployment hooks or production settings were changed as part of the GitHub push. A current cPanel backup and restoration test must be performed through that hosting account before a production cutover.
