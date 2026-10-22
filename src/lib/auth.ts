import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPool } from "./db";
export const auth = betterAuth({
  database: getPool(),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    minPasswordLength: 12,
  },
  rateLimit: {
    enabled: true,
    storage: "database",
    window: 60,
    max: 20,
    customRules: { "/sign-in/email": { window: 60, max: 5 } },
  },
  session: { expiresIn: 60 * 60 * 8 },
  plugins: [nextCookies()],
});
export async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/admin/login");
  const result = await getPool().query(
    "SELECT user_id FROM admin_users WHERE user_id = $1",
    [session.user.id],
  );
  if (!result.rowCount) redirect("/admin/login?error=access");
  return session;
}
