import { getPool } from "@/lib/db";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (
    !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(id)
  )
    return new Response(null, { status: 404 });
  const { rows } = await getPool().query(
    "SELECT data,content_type FROM media WHERE id=$1",
    [id],
  );
  if (!rows[0]) return new Response(null, { status: 404 });
  return new Response(new Uint8Array(rows[0].data), {
    headers: {
      "Content-Type": rows[0].content_type,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
