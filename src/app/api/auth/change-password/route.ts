import { hashPassword, verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/require-admin";
import { changePasswordSchema } from "@/lib/validations";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * POST /api/auth/change-password
 * Admin only (JWT via the existing admin cookie — see lib/require-admin.ts).
 * Does not touch the login route/flow at all; this is a separate endpoint
 * with its own validation (see `changePasswordSchema` in lib/validations.ts).
 */
export async function POST(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = changePasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { currentPassword, newPassword } = parsed.data;

  const record = await prisma.admin.findUnique({ where: { id: admin.adminId } });
  if (!record) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isCurrentPasswordCorrect = await verifyPassword(currentPassword, record.passwordHash);
  if (!isCurrentPasswordCorrect) {
    return NextResponse.json(
      { error: "Validation failed", issues: { currentPassword: ["Current password is incorrect"] } },
      { status: 422 }
    );
  }

  const newPasswordHash = await hashPassword(newPassword);
  await prisma.admin.update({
    where: { id: record.id },
    data: { passwordHash: newPasswordHash },
  });

  return NextResponse.json({ success: true });
}