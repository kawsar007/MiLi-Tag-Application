"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import StatusBadge from "@/components/admin/StatusBadge";
import StatusSelect from "@/components/admin/StatusSelect";
import { formatBDT } from "@/lib/money";
import { ORDER_STATUSES, type OrderRecord, type OrdersResponse } from "@/types/order";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [search, setSearch] = useState("");

  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      if (search) params.set("q", search);
      const res = await fetch(`/api/orders?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load orders");
      const data: OrdersResponse = await res.json();
      setOrders(data.orders);
    } catch {
      setError("Couldn't load orders. Refresh to try again.");
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, search]);

  useEffect(() => {
    const timeout = setTimeout(loadOrders, 250); // debounce search input
    return () => clearTimeout(timeout);
  }, [loadOrders]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-medium text-ink">Orders</h1>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="search"
            placeholder="Search name or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-full border border-cloud-line bg-cloud-card px-4 py-2 text-sm text-ink placeholder:text-steel"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-full border border-cloud-line bg-cloud-card px-4 py-2 text-sm text-ink"
          >
            <option value="">All statuses</option>
            {ORDER_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-cloud-line bg-cloud-card">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-cloud-line text-xs uppercase tracking-wide text-steel">
            <tr>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Phone</th>
              <th className="px-5 py-3 font-medium">Qty</th>
              <th className="px-5 py-3 font-medium">Total</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Placed</th>
              <th className="px-5 py-3 font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y divide-cloud-line">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-steel">
                  Loading orders…
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-red-600">
                  {error}
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-steel">
                  No orders match these filters yet.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-5 py-4 font-medium text-ink">{order.customerName}</td>
                  <td className="px-5 py-4 text-steel">{order.phone}</td>
                  <td className="px-5 py-4 text-steel">{order.quantity}</td>
                  <td className="px-5 py-4 font-mono text-ink">{formatBDT(order.totalCents)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={order.status} />
                    </div>
                    <div className="mt-2">
                      <StatusSelect
                        orderId={order.id}
                        currentStatus={order.status}
                        onUpdated={(next) =>
                          setOrders((prev) =>
                            prev.map((o) => (o.id === order.id ? { ...o, status: next } : o))
                          )
                        }
                      />
                    </div>
                  </td>
                  <td className="px-5 py-4 text-steel">
                    {new Date(order.createdAt).toLocaleDateString("en-BD", {
                      day: "numeric",
                      month: "short",
                    })}
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-sm font-medium text-indigo hover:text-indigo-deep"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
