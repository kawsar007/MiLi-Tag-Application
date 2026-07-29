/** Amounts are stored in the database as integer paisa (1 BDT = 100 paisa) to avoid floating-point rounding. */
export function formatBDT(cents: number): string {
  const taka = cents / 100;
  return `৳ ${taka.toLocaleString("en-BD", { maximumFractionDigits: 0 })}`;
}

export function toCents(taka: number): number {
  return Math.round(taka * 100);
}
