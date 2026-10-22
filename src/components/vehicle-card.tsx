import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Fuel, Settings2 } from "lucide-react";
import type { Vehicle } from "@/lib/types";
export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const price =
    vehicle.price === null
      ? "Price on request"
      : new Intl.NumberFormat("en-TZ", {
          style: "currency",
          currency: "TZS",
          maximumFractionDigits: 0,
        }).format(vehicle.price);
  return (
    <Link href={`/vehicles/${vehicle.slug}`} className="vehicle-card">
      <div className="vehicle-photo">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
          unoptimized={vehicle.image.startsWith("https:")}
        />
        <span className={`vehicle-status ${vehicle.status}`}>
          {vehicle.status === "available"
            ? "Enquire for availability"
            : vehicle.status}
        </span>
        <span className="card-arrow">
          <ArrowUpRight size={20} />
        </span>
      </div>
      <div className="vehicle-info">
        <span className="vehicle-category">
          {vehicle.category}
          {vehicle.year ? ` / ${vehicle.year}` : ""}
        </span>
        <h3>{vehicle.name}</h3>
        <div className="vehicle-specs">
          <span>
            <Fuel size={14} />
            {vehicle.fuel === "Not specified"
              ? "Details on request"
              : vehicle.fuel}
          </span>
          {vehicle.transmission !== "Not specified" && (
            <span>
              <Settings2 size={14} />
              {vehicle.transmission}
            </span>
          )}
        </div>
        <div className="vehicle-price">
          {price}
          <span>
            Explore vehicle <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
