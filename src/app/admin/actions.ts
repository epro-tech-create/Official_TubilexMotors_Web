"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { getPool } from "@/lib/db";
import { vehicleSchema } from "@/lib/validation";
import sharp from "sharp";
import { randomUUID } from "node:crypto";
export async function uploadVehicleImage(form: FormData) {
  await requireAdmin();
  const file = form.get("image");
  if (!(file instanceof File) || !file.size || file.size > 5 * 1024 * 1024)
    return { error: "Choose a JPG, PNG or WebP image under 5 MB." };
  try {
    const image = sharp(Buffer.from(await file.arrayBuffer()), {
      limitInputPixels: 40000000,
    });
    const metadata = await image.metadata();
    if (!metadata.format || !["jpeg", "png", "webp"].includes(metadata.format))
      return { error: "Only JPG, PNG and WebP images are supported." };
    const buffer = await image
      .rotate()
      .resize(1920, 1400, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer();
    const id = randomUUID();
    await getPool().query("INSERT INTO media (id,data) VALUES ($1,$2)", [
      id,
      buffer,
    ]);
    return { url: `/api/media/${id}` };
  } catch {
    return {
      error:
        "Could not process this image. Try a different JPG, PNG or WebP file.",
    };
  }
}
export async function saveVehicle(id: number | null, input: unknown) {
  await requireAdmin();
  const parsed = vehicleSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const v = parsed.data;
  const values = [
    v.slug,
    v.name,
    v.category,
    v.description,
    v.image,
    v.price,
    v.year,
    v.mileage,
    v.fuel,
    v.transmission,
    v.status,
    v.featured,
  ];
  try {
    if (id !== null) {
      if (!Number.isSafeInteger(id) || id < 1)
        return { error: "Invalid vehicle." };
      await getPool().query(
        "UPDATE vehicles SET slug=$1,name=$2,category=$3,description=$4,image=$5,price=$6,year=$7,mileage=$8,fuel=$9,transmission=$10,status=$11,featured=$12,updated_at=now() WHERE id=$13",
        [...values, id],
      );
    } else
      await getPool().query(
        "INSERT INTO vehicles (slug,name,category,description,image,price,year,mileage,fuel,transmission,status,featured) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
        values,
      );
    revalidatePath("/", "layout");
    return { success: true };
  } catch {
    return {
      error:
        "Could not save the vehicle. Check that the URL slug is unique and try again.",
    };
  }
}
export async function deleteVehicle(id: number) {
  await requireAdmin();
  if (!Number.isSafeInteger(id) || id < 1) return { error: "Invalid vehicle." };
  try {
    await getPool().query("DELETE FROM vehicles WHERE id=$1", [id]);
    revalidatePath("/", "layout");
    return { success: true };
  } catch {
    return { error: "Could not delete this vehicle. Please try again." };
  }
}
export async function updateEnquiry(id: number, status: string) {
  await requireAdmin();
  if (
    !Number.isSafeInteger(id) ||
    !["new", "contacted", "closed"].includes(status)
  )
    return { error: "Invalid enquiry." };
  try {
    await getPool().query("UPDATE enquiries SET status=$1 WHERE id=$2", [
      status,
      id,
    ]);
    revalidatePath("/admin");
    return { success: true };
  } catch {
    return { error: "Could not update the enquiry. Please try again." };
  }
}
