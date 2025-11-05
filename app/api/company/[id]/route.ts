import { NextRequest } from "next/server";
import { getCompanyById } from "@/lib/ademe";

export const revalidate = 300;

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await getCompanyById(params.id);
    return Response.json({ ok: true, company: data });
  } catch (e: any) {
    return Response.json({ ok: false, error: e?.message || "Unknown error" }, { status: 500 });
  }
}
