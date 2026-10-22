import "server-only";
import { getPool } from "./db";
import type { Vehicle } from "./types";
export async function getVehicles(): Promise<Vehicle[]> {
  const { rows } = await getPool().query<Vehicle>(
    "SELECT * FROM vehicles ORDER BY featured DESC, id DESC",
  );
  return rows;
}
export async function getVehicle(slug: string): Promise<Vehicle | undefined> {
  const { rows } = await getPool().query<Vehicle>(
    "SELECT * FROM vehicles WHERE slug = $1",
    [slug],
  );
  return rows[0];
}
export function formatPrice(price: number | null) {
  return price === null
    ? "Price on request"
    : new Intl.NumberFormat("en-TZ", {
        style: "currency",
        currency: "TZS",
        maximumFractionDigits: 0,
      }).format(price);
}
