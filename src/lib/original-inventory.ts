import "server-only";
import { getPool } from "./db";
import type { Vehicle } from "./types";
// Preserve the original snapshot's presentation until a staff member edits that listing.
const original: Record<
  string,
  { image: string; category: string; description: string }
> = {
  "toyota-corolla": {
    image: "/admin/uploads/img_68d674d4ca0214.02386135.jpg",
    category: "Car",
    description: "Reliable sedan",
  },
  "honda-civic": {
    image: "/admin/uploads/img_68d674cc0d33d3.99720604.jpg",
    category: "Car",
    description: "Compact car with good fuel economy",
  },
  "mercedes-benz-gle": {
    image: "/admin/uploads/img_68d7033ff22710.27582086.jpg",
    category: "merce2025-12wert",
    description: "A flagship luxury car that combines advanced technology,",
  },
  "jeep-wrangler": {
    image: "/admin/uploads/img_68d706216d37e1.45763275.jpg",
    category: "SUV / Off-Road",
    description:
      "A rugged 4x4 designed for adventure and off-road experiences,",
  },
};
export async function getOriginalVehicles(): Promise<Vehicle[]> {
  const { rows } = await getPool().query<Vehicle & { untouched: boolean }>(
    "SELECT id,slug,name,category,description,image,price,year,mileage,fuel,transmission,status,featured,created_at=updated_at AS untouched FROM vehicles ORDER BY id DESC",
  );
  return rows.map(({ untouched, ...vehicle }) =>
    untouched && original[vehicle.slug]
      ? { ...vehicle, ...original[vehicle.slug] }
      : vehicle,
  );
}
