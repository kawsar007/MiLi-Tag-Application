"use client";

import { ORDER_STATUSES, type OrderStatus } from "@/types/order";
import { Lock } from "lucide-react";
import { useState } from "react";

interface StatusSelectProps {
  orderId: string;
  currentStatus: OrderStatus;
  onUpdated: (newStatus: OrderStatus) => void;
}

export default function StatusSelect({ orderId, currentStatus, onUpdated }: StatusSelectProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if status is DELIVERED (locked)
  const isDelivered = currentStatus === "DELIVERED";

  async function handleChange(next: OrderStatus) {
    setIsSaving(true);
    setError(null);
    try {
      const res = await fetch(`/mili-tag/api/orders/${orderId}`, {
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
      <div className="relative">
        <select
          value={currentStatus}
          disabled={isSaving || isDelivered}
          onChange={(e) => handleChange(e.target.value as OrderStatus)}
          className={`rounded-lg border border-cloud-line bg-cloud-card px-2 py-1.5 text-xs font-medium text-ink disabled:opacity-60 ${isDelivered ? "cursor-not-allowed bg-slate-100" : ""
            }`}
        >
          {ORDER_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        {isDelivered && (
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
            <Lock className="h-3.5 w-3.5 text-slate-400" />
          </div>
        )}
      </div>
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
      {isDelivered && (
        <span className="text-[10px] text-slate-400">Status locked (delivered)</span>
      )}
    </div>
  );
}


// "use client";

// import { ORDER_STATUSES, type OrderStatus } from "@/types/order";
// import { useState } from "react";

// interface StatusSelectProps {
//   orderId: string;
//   currentStatus: OrderStatus;
//   onUpdated: (newStatus: OrderStatus) => void;
// }

// export default function StatusSelect({ orderId, currentStatus, onUpdated }: StatusSelectProps) {
//   const [isSaving, setIsSaving] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   async function handleChange(next: OrderStatus) {
//     setIsSaving(true);
//     setError(null);
//     try {
//       const res = await fetch(`/mili-tag/api/orders/${orderId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: next }),
//       });
//       if (!res.ok) throw new Error("Update failed");
//       onUpdated(next);
//     } catch {
//       setError("Couldn't update status. Try again.");
//     } finally {
//       setIsSaving(false);
//     }
//   }

//   return (
//     <div className="flex flex-col gap-1">
//       <select
//         value={currentStatus}
//         disabled={isSaving}
//         onChange={(e) => handleChange(e.target.value as OrderStatus)}
//         className="rounded-lg border border-cloud-line bg-cloud-card px-2 py-1.5 text-xs font-medium text-ink disabled:opacity-60"
//       >
//         {ORDER_STATUSES.map((status) => (
//           <option key={status} value={status}>
//             {status}
//           </option>
//         ))}
//       </select>
//       {error ? <span className="text-xs text-red-600">{error}</span> : null}
//     </div>
//   );
// }
