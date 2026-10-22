import { Pool, types } from "pg";
types.setTypeParser(20, Number);
const globalDb = globalThis as unknown as { tubilexPool?: Pool };
export function getPool() {
  if (!process.env.DATABASE_URL)
    throw new Error(
      "DATABASE_URL is missing. Follow the database setup in README.md.",
    );
  return (globalDb.tubilexPool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 20000,
  }));
}
