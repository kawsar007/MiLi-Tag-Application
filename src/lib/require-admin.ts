import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminToken, type AdminTokenPayload } from "@/lib/token";

/**
 * Reads and verifies the admin JWT from the request cookies.
 * Returns the decoded payload, or null if the caller is not an authenticated admin.
 */
export async function getAdminFromRequest(
  request: NextRequest
): Promise<AdminTokenPayload | null> {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminToken(token);
}
