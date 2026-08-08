// lib/id.ts
import crypto from 'node:crypto';

export function generateOrderId(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');

  // Add 4 random hex characters to prevent collisions if 2 orders land in the same second
  const randomSuffix = crypto.randomBytes(2).toString('hex').toUpperCase();

  return `${yy}${mm}${dd}${hh}${min}${ss}-${randomSuffix}`;
  // Output example: 260808164119-A3F1
}