// lib/id.ts
import crypto from 'node:crypto';

export function generateOrderId(): string {
  // Asia/Dhaka (BST) timezone dynamic parts extract
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Dhaka',
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(new Date()).reduce((acc, part) => {
    if (part.type !== 'literal') {
      acc[part.type] = part.value;
    }
    return acc;
  }, {} as Record<string, string>);

  const yy = parts.year;
  const mm = parts.month;
  const dd = parts.day;
  const hh = parts.hour === '24' ? '00' : parts.hour; // Standardize 24-hour hour string
  const min = parts.minute;
  const ss = parts.second;

  // Collision avoid korar jonno random suffix
  const randomSuffix = crypto.randomBytes(2).toString('hex').toUpperCase();

  return `${yy}${mm}${dd}${hh}${min}${ss}-${randomSuffix}`;
  // Output example: 260808175046-A3F1
}