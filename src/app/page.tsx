import type { Metadata } from "next";
import { OriginalHome } from "@/components/original-home";
import { getOriginalVehicles } from "@/lib/original-inventory";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Tubilex Motors",
  description:
    "Tubilex Motors is a leading automotive company in Tanzania, providing top-notch car sales and maintenance services. We offer a wide range of vehicles from popular brands, ensuring that our customers get the best deals on their desired cars.",
};
export default async function HomePage() {
  return <OriginalHome vehicles={await getOriginalVehicles()} />;
}
