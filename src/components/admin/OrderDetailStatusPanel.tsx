"use client";

import { useRouter } from "next/navigation";
import StatusSelect from "@/components/admin/StatusSelect";
import type { OrderStatus } from "@/types/order";

export default function OrderDetailStatusPanel({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: OrderStatus;
}) {
  const router = useRouter();

  return (
    <StatusSelect
      orderId={orderId}
      currentStatus={currentStatus}
      onUpdated={() => router.refresh()}
    />
  );
}
