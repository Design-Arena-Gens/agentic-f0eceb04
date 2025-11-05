import { NextRequest } from "next/server";
import { searchCompanies } from "@/lib/ademe";

export const revalidate = 60;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || undefined;
  const size = Number(searchParams.get("size") || "10");
  const page = Number(searchParams.get("page") || "1");
  const departement = searchParams.get("departement") || undefined;
  const commune = searchParams.get("commune") || undefined;

  try {
    const data = await searchCompanies({ query, size, page, departement, commune });
    return Response.json({ ok: true, total: data.total, results: data.results });
  } catch (e: any) {
    return Response.json({ ok: false, error: e?.message || "Unknown error" }, { status: 500 });
  }
}
