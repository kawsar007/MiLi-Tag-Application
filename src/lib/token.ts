import { SignJWT, jwtVerify, type JWTPayload } from "jose";

// Edge-safe (no Node-only APIs) — used by middleware as well as Node route handlers.

export const ADMIN_COOKIE_NAME = "mili_admin_token";
const TOKEN_TTL = "7d";

function getSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      "JWT_SECRET is not set. Add it to your .env file (see .env.example)."
    );
  }
  return new TextEncoder().encode(secret);
}

export interface AdminTokenPayload extends JWTPayload {
  adminId: string;
  email: string;
  name: string;
}

export async function signAdminToken(payload: AdminTokenPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_TTL)
    .sign(getSecretKey());
}

/**
 * Verifies a JWT and returns its payload, or null if missing/invalid/expired.
 * Safe to call from Edge middleware as well as Node runtime API routes.
 */
export async function verifyAdminToken(
  token: string | undefined
): Promise<AdminTokenPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as AdminTokenPayload;
  } catch {
    return null;
  }
}
