import { readFile } from "node:fs/promises";
import { getPool } from "../src/lib/db";
async function main() {
  const pool = getPool();
  await pool.query(
    await readFile(new URL("../database/schema.sql", import.meta.url), "utf8"),
  );
  console.log("PostgreSQL schema is ready.");
  await pool.end();
}
main().catch(() => {
  console.error("Migration failed. Check the database connection and schema.");
  process.exit(1);
});
