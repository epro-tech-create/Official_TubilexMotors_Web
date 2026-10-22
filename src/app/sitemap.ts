import type { MetadataRoute } from "next";
import { getVehicles } from "@/lib/inventory";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return [
    "",
    "/vehicles",
    "/contact",
    ...(await getVehicles()).map((v) => `/vehicles/${v.slug}`),
  ].map((path) => ({ url: base + path }));
}
