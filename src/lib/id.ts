// lib/id.ts
import crypto from 'node:crypto';

export function generateOrderId(): string {
  const now = new Date();

  // Convert current UTC time to BST (UTC + 6 hours)
  const bstDate = new Date(now.getTime() + 6 * 60 * 60 * 1000);

  const yy = String(bstDate.getUTCFullYear()).slice(-2);
  const mm = String(bstDate.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(bstDate.getUTCDate()).padStart(2, '0');
  const hh = String(bstDate.getUTCHours()).padStart(2, '0');
  const min = String(bstDate.getUTCMinutes()).padStart(2, '0');
  const ss = String(bstDate.getUTCSeconds()).padStart(2, '0');

  // 4 random hex characters to prevent collisions on simultaneous orders
  const randomSuffix = crypto.randomBytes(2).toString('hex').toUpperCase();

  return `${yy}${mm}${dd}${hh}${min}${ss}-${randomSuffix}`;
  // Example output for August 8, 2026 at 17:33:58 BST:
  // 260808173358-8F2A
}


// // lib/id.ts
// import crypto from 'node:crypto';

// export function generateOrderId(): string {
//   const now = new Date();
//   const yy = String(now.getFullYear()).slice(-2);
//   const mm = String(now.getMonth() + 1).padStart(2, '0');
//   const dd = String(now.getDate()).padStart(2, '0');
//   const hh = String(now.getHours()).padStart(2, '0');
//   const min = String(now.getMinutes()).padStart(2, '0');
//   const ss = String(now.getSeconds()).padStart(2, '0');

//   // Add 4 random hex characters to prevent collisions if 2 orders land in the same second
//   const randomSuffix = crypto.randomBytes(2).toString('hex').toUpperCase();

//   return `${yy}${mm}${dd}${hh}${min}${ss}-${randomSuffix}`;
//   // Output example: 260808164119-A3F1
// }