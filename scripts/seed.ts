import { getPool } from "../src/lib/db";
const vehicles = [
  [
    "toyota-corolla",
    "Toyota Corolla",
    "Sedan",
    "A comfortable everyday sedan. Contact our team for specifications, availability, and a viewing.",
    "/media/corolla.webp",
  ],
  [
    "honda-civic",
    "Honda Civic",
    "Sedan",
    "A compact sedan for everyday journeys. Contact our team for specifications and availability.",
    "/media/vehicle-placeholder.svg",
  ],
  [
    "mercedes-benz-gle",
    "Mercedes-Benz GLE",
    "Luxury",
    "Considered design. Effortless presence. Explore the Mercedes-Benz GLE with our team and arrange a closer look.",
    "/media/mercedes.webp",
  ],
  [
    "jeep-wrangler",
    "Jeep Wrangler",
    "SUV",
    "For the roads that lead somewhere different. Speak to us about the Jeep Wrangler and plan your viewing.",
    "/media/jeep.webp",
  ],
];
async function main() {
  const pool = getPool();
  for (const v of vehicles)
    await pool.query(
      "INSERT INTO vehicles (slug,name,category,description,image,featured) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (slug) DO NOTHING",
      [...v, v[0] !== "honda-civic"],
    );
  console.log(
    "Seeded the four vehicles from the original project. Prices and specifications remain unset pending confirmation.",
  );
  await pool.end();
}
main().catch(() => {
  console.error("Seed failed. Run db:migrate first and check your connection.");
  process.exit(1);
});
