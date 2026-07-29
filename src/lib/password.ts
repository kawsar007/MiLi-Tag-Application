import bcrypt from "bcryptjs";

// Node-only (bcrypt hashing) — import this from route handlers and the seed
// script, never from middleware.ts.

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
