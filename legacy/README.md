# Archived PHP / MySQL application

This folder preserves the previous site and its original database exports for reference. Next.js does not serve or execute these files. Do not expose this directory through a separate static server.

The active application is in `src/app`, uses PostgreSQL, and serves optimized imagery from `public/media`. The previous hardcoded database and seed credentials have been removed from the working copy; the new staff account uses Better Auth and a freshly generated password.

The four vehicle listings have been carried over to the new development database. Historical contact messages, visitor logs, and old admin password hashes have not been imported. Keep these exports as a reference for any later historical-data migration. Existing production PHP hosting and MySQL data have not been modified.
