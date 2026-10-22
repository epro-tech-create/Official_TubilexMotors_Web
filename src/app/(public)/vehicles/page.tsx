import type { Metadata } from "next";
import { getVehicles } from "@/lib/inventory";
import { Inventory } from "@/components/inventory";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Our Vehicles" };
export default async function VehiclesPage() {
  return (
    <main id="main" className="inventory-page">
      <div className="container">
        <div className="page-intro">
          <span className="eyebrow">THE TUBILEX COLLECTION</span>
          <h1>
            Your next chapter.
            <br />
            <em>Your next drive.</em>
          </h1>
          <p>
            Find the car that fits your world. Explore the collection,
            <br className="desktop-break" /> then let’s talk about the details.
          </p>
        </div>
        <Inventory vehicles={await getVehicles()} />
        <p className="inventory-note">
          Vehicle availability and specifications are confirmed by our team
          before purchase. Contact us to arrange a viewing.
        </p>
      </div>
    </main>
  );
}
