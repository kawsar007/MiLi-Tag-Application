import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations";
import { ADMIN_COOKIE_NAME, signAdminToken } from "@/lib/token";
import { verifyPassword } from "@/lib/password";

export const dynamic = "force-dynamic";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days, matches token TTL

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { email, password } = parsed.data;

  const admin = await prisma.admin.findUnique({ where: { email } });
  // Compare against a dummy hash when no admin is found, so response timing
  // doesn't reveal whether the email exists.
  const passwordMatches = await verifyPassword(
    password,
    admin?.passwordHash ?? "$2a$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidinva"
  );

  if (!admin || !passwordMatches) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const token = await signAdminToken({
    adminId: admin.id,
    email: admin.email,
    name: admin.name,
  });

  const response = NextResponse.json({
    admin: { id: admin.id, email: admin.email, name: admin.name },
  });

  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  });

  return response;
}
