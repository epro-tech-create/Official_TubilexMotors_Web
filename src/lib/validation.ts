import { z } from "zod";
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address.").max(254),
  phone: z.string().trim().max(30).default(""),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters).")
    .max(3000),
  vehicleId: z.number().int().positive().nullable().default(null),
  website: z.string().max(0).optional(),
});
const optionalNumber = z.preprocess(
  (v) => (v === "" || v === null || v === undefined ? null : Number(v)),
  z.number().int().nonnegative().nullable(),
);
export const vehicleSchema = z.object({
  name: z.string().trim().min(2).max(100),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .max(150),
  category: z.enum(["SUV", "Sedan", "Pickup", "Luxury", "Hatchback"]),
  description: z.string().trim().min(10).max(5000),
  image: z
    .string()
    .max(2048)
    .refine(
      (v) =>
        /^\/media\/[a-zA-Z0-9._-]+$/.test(v) ||
        /^\/api\/media\/[a-f0-9-]{36}$/.test(v) ||
        /^https:\/\/[^\s]+$/.test(v),
      "Upload an image, or use a /media/ path or HTTPS image URL.",
    ),
  price: optionalNumber,
  year: optionalNumber.refine(
    (v) => v === null || (v >= 1900 && v <= new Date().getFullYear() + 2),
    "Enter a valid model year.",
  ),
  mileage: optionalNumber,
  fuel: z.enum(["Not specified", "Petrol", "Diesel", "Hybrid", "Electric"]),
  transmission: z.enum(["Not specified", "Automatic", "Manual"]),
  status: z.enum(["available", "reserved", "sold"]),
  featured: z.boolean(),
});
