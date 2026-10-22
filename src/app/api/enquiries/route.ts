import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { getPool } from "@/lib/db";
import { enquirySchema } from "@/lib/validation";
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowedOrigin = new URL(process.env.NEXT_PUBLIC_SITE_URL || request.url)
    .origin;
  if (!origin || origin !== allowedOrigin)
    return NextResponse.json(
      { error: "Invalid request origin." },
      { status: 403 },
    );
  const text = await request.text();
  if (text.length > 15000)
    return NextResponse.json(
      { error: "Message is too large." },
      { status: 413 },
    );
  let payload: unknown;
  try {
    payload = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const parsed = enquirySchema.safeParse(payload);
  if (!parsed.success)
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 },
    );
  const { name, email, phone, message, vehicleId } = parsed.data;
  const key = createHash("sha256").update(email.toLowerCase()).digest("hex");
  let client;
  try {
    client = await getPool().connect();
  } catch {
    return NextResponse.json(
      {
        error:
          "We couldn’t send your message. Please try again or call +255 788 835 182.",
      },
      { status: 503 },
    );
  }
  try {
    await client.query("BEGIN");
    const allowed = await client.query(
      `INSERT INTO enquiry_limits (key, count, window_start) VALUES ($1, 1, now())
      ON CONFLICT (key) DO UPDATE SET count = CASE WHEN enquiry_limits.window_start < now() - interval '1 hour' THEN 1 ELSE enquiry_limits.count + 1 END,
      window_start = CASE WHEN enquiry_limits.window_start < now() - interval '1 hour' THEN now() ELSE enquiry_limits.window_start END RETURNING count`,
      [key],
    );
    if (allowed.rows[0].count > 5) {
      await client.query("ROLLBACK");
      return NextResponse.json(
        {
          error:
            "Please wait before sending another enquiry, or call us directly.",
        },
        { status: 429 },
      );
    }
    await client.query(
      "INSERT INTO enquiries (name,email,phone,message,vehicle_id) VALUES ($1,$2,$3,$4,$5)",
      [name, email, phone, message, vehicleId],
    );
    await client.query("COMMIT");
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    await client.query("ROLLBACK");
    return NextResponse.json(
      {
        error:
          "We couldn’t send your message. Please try again or call +255 788 835 182.",
      },
      { status: 503 },
    );
  } finally {
    client.release();
  }
}
