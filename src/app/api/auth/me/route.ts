import { NextRequest, NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/require-admin";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({
    admin: { id: admin.adminId, email: admin.email, name: admin.name },
  });
}
