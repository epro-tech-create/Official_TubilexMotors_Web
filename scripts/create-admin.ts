import { betterAuth } from "better-auth";
import { getPool } from "../src/lib/db";
async function main() {
  const { ADMIN_EMAIL: email, ADMIN_PASSWORD: password } = process.env;
  if (!email || !password || password.length < 12)
    throw new Error(
      "Set ADMIN_EMAIL and a password of at least 12 characters in .env.local.",
    );
  const pool = getPool();
  // Sign-up is enabled only inside this local CLI process, never in the web app.
  const setupAuth = betterAuth({
    database: pool,
    emailAndPassword: { enabled: true, minPasswordLength: 12 },
  });
  const result = await setupAuth.api.signUpEmail({
    body: { name: process.env.ADMIN_NAME || "Tubilex Admin", email, password },
  });
  await pool.query(
    "INSERT INTO admin_users (user_id) VALUES ($1) ON CONFLICT DO NOTHING",
    [result.user.id],
  );
  console.log(
    "Administrator created. Remove ADMIN_PASSWORD from .env.local after setup.",
  );
  await pool.end();
}
main().catch(() => {
  console.error(
    "Could not create administrator. Check the environment, password length, schema, and whether the email already exists.",
  );
  process.exit(1);
});
