"use client";

import { useState } from "react";
import { ORDER_STATUSES, type OrderStatus } from "@/types/order";

interface StatusSelectProps {
  orderId: string;
  currentStatus: OrderStatus;
  onUpdated: (newStatus: OrderStatus) => void;
}

export default function StatusSelect({ orderId, currentStatus, onUpdated }: StatusSelectProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleChange(next: OrderStatus) {
    setIsSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error("Update failed");
      onUpdated(next);
    } catch {
      setError("Couldn't update status. Try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <select
        value={currentStatus}
        disabled={isSaving}
        onChange={(e) => handleChange(e.target.value as OrderStatus)}
        className="rounded-lg border border-cloud-line bg-cloud-card px-2 py-1.5 text-xs font-medium text-ink disabled:opacity-60"
      >
        {ORDER_STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </div>
  );
}
