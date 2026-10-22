import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Fuel,
  Gauge,
  Settings2,
} from "lucide-react";
import { getVehicle, formatPrice } from "@/lib/inventory";
import { ContactForm } from "@/components/contact-form";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const vehicle = await getVehicle((await params).slug);
  return {
    title: vehicle?.name || "Vehicle not found",
    description: vehicle?.description,
  };
}
export default async function VehiclePage({ params }: Props) {
  const vehicle = await getVehicle((await params).slug);
  if (!vehicle) notFound();
  const specs = [
    {
      icon: CalendarDays,
      label: "Model year",
      value: vehicle.year || "On request",
    },
    {
      icon: Gauge,
      label: "Mileage",
      value:
        vehicle.mileage === null
          ? "On request"
          : `${vehicle.mileage.toLocaleString()} km`,
    },
    {
      icon: Fuel,
      label: "Fuel type",
      value: vehicle.fuel === "Not specified" ? "On request" : vehicle.fuel,
    },
    {
      icon: Settings2,
      label: "Transmission",
      value:
        vehicle.transmission === "Not specified"
          ? "On request"
          : vehicle.transmission,
    },
  ];
  return (
    <main id="main" className="vehicle-detail container">
      <Link href="/vehicles" className="back-link">
        <ArrowLeft size={16} /> Back to collection
      </Link>
      <div className="detail-grid">
        <div>
          <div className="detail-photo">
            <Image
              src={vehicle.image}
              alt={vehicle.name}
              fill
              priority
              sizes="(max-width: 850px) 100vw, 60vw"
              unoptimized={vehicle.image.startsWith("https:")}
            />
          </div>
          <div className="detail-specs">
            {specs.map((s) => (
              <div key={s.label}>
                <s.icon size={22} />
                <span>{s.label}</span>
                <strong>{s.value}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="detail-copy">
          <span className="eyebrow">
            {vehicle.category} / TUBILEX COLLECTION
          </span>
          <h1>{vehicle.name}</h1>
          <span className={`detail-status ${vehicle.status}`}>
            {vehicle.status === "available"
              ? "Contact us for current availability"
              : vehicle.status}
          </span>
          <p>{vehicle.description}</p>
          <div className="detail-price">{formatPrice(vehicle.price)}</div>
          <a href="#enquire" className="button">
            Enquire about this vehicle <ArrowUpRight size={18} />
          </a>
          <a
            href={`https://wa.me/255788835182?text=${encodeURIComponent(`Hello, I’m interested in the ${vehicle.name}. Could you share more details?`)}`}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Talk to us on WhatsApp <ArrowUpRight size={17} />
          </a>
          <small>
            Our team will confirm the exact specifications, condition, price and
            availability before you make a decision.
          </small>
        </div>
      </div>
      <section id="enquire" className="detail-enquiry">
        <div>
          <span className="eyebrow">LET’S TAKE THE NEXT STEP</span>
          <h2>
            Picture yourself
            <br />
            <em>behind the wheel.</em>
          </h2>
          <p>
            Ask a question, request more details,
            <br />
            or arrange a visit to our showroom.
          </p>
        </div>
        <ContactForm vehicleId={vehicle.id} vehicleName={vehicle.name} />
      </section>
    </main>
  );
}
