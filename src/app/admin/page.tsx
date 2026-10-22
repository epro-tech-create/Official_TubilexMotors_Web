import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { getVehicles } from "@/lib/inventory";
import { getPool } from "@/lib/db";
import type { Enquiry } from "@/lib/types";
import { AdminDashboard } from "@/components/admin-dashboard";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Workspace",
  robots: { index: false, follow: false },
};
export default async function AdminPage() {
  const session = await requireAdmin();
  const [vehicles, enquiries] = await Promise.all([
    getVehicles(),
    getPool().query<Enquiry>(
      "SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 200",
    ),
  ]);
  return (
    <AdminDashboard
      name={session.user.name}
      vehicles={vehicles}
      enquiries={enquiries.rows.map((e) => ({
        ...e,
        created_at: new Date(e.created_at).toISOString(),
      }))}
    />
  );
}
