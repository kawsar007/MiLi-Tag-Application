"use client";

import StatusBadge from "@/components/admin/StatusBadge";
import StatusSelect from "@/components/admin/StatusSelect";
import { formatBDT } from "@/lib/money";
import { ORDER_STATUSES, type OrderRecord, type OrdersResponse } from "@/types/order";
import {
  Calendar,
  ChevronDown,
  Eye,
  Filter,
  Package,
  Phone,
  RefreshCw,
  Search,
  User,
  X
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [search, setSearch] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
    const timeout = setTimeout(loadOrders, 250);
    return () => clearTimeout(timeout);
  }, [loadOrders]);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("");
  };

  const hasActiveFilters = search || statusFilter;

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto max-w-full">
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900">
              Order Management
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              {orders.length} order{orders.length === 1 ? "" : "s"} found
            </p>
          </div>

          <button
            onClick={loadOrders}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md hover:ring-slate-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Filters Section */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Search by name or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
              />
            </div>

            {/* Desktop Filters */}
            <div className="hidden sm:flex sm:items-center gap-3">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all cursor-pointer"
                >
                  <option value="">All statuses</option>
                  {ORDER_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  <X className="h-4 w-4" />
                  Clear
                </button>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 sm:hidden"
            >
              <Filter className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="flex h-2 w-2 rounded-full bg-indigo-500" />
              )}
            </button>
          </div>

          {/* Mobile Filters */}
          {showMobileFilters && (
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:hidden animate-in slide-in-from-top-2">
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                  >
                    <option value="">All statuses</option>
                    {ORDER_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      clearFilters();
                      setShowMobileFilters(false);
                    }}
                    className="w-full rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm sm:block overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <div className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5" />
                      Customer
                    </div>
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5" />
                      Phone
                    </div>
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <div className="flex items-center gap-2">
                      <Package className="h-3.5 w-3.5" />
                      Qty
                    </div>
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <div className="flex items-center gap-2">
                      {/* <DollarSign className="h-3.5 w-3.5" /> */}
                      <span className="text-base">৳</span>
                      Total
                    </div>
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5" />
                      Placed
                    </div>
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
                        <p className="text-sm text-slate-500">Loading orders...</p>
                      </div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-sm text-red-600">{error}</p>
                        <button
                          onClick={loadOrders}
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                        >
                          Try again
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Package className="h-12 w-12 text-slate-300" />
                        <p className="text-sm font-medium text-slate-700">No orders found</p>
                        <p className="text-sm text-slate-500">
                          Try adjusting your filters or search terms
                        </p>
                        {hasActiveFilters && (
                          <button
                            onClick={clearFilters}
                            className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                          >
                            Clear all filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="group hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{order.customerName}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{order.phone}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center justify-center rounded-full bg-slate-100 px-3 py-0.5 text-sm font-medium text-slate-700">
                          {order.quantity}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono font-semibold text-slate-900">
                          {formatBDT(order.totalCents)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2">
                          <StatusBadge status={order.status} />
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
                      <td className="px-6 py-4">
                        <span className="font-mono font-medium text-slate-900">
                          {order.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <time className="text-sm text-slate-500">
                          {new Date(order.createdAt).toLocaleDateString("en-BD", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </time>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100 group-hover:shadow-sm"
                        >
                          <Eye className="h-3.5 w-3.5" />
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

        {/* Mobile Card View */}
        <div className="space-y-4 sm:hidden">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
              <p className="mt-3 text-sm text-slate-500">Loading orders...</p>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
              <p className="text-sm text-red-600">{error}</p>
              <button
                onClick={loadOrders}
                className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Try again
              </button>
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
              <Package className="mx-auto h-12 w-12 text-slate-300" />
              <p className="mt-2 font-medium text-slate-700">No orders found</p>
              <p className="text-sm text-slate-500">Try adjusting your filters</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-slate-900">{order.customerName}</h3>
                    <p className="text-sm text-slate-600">{order.phone}</p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      Quantity
                    </p>
                    <p className="mt-0.5 font-medium text-slate-900">{order.quantity}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      Total
                    </p>
                    <p className="mt-0.5 font-mono font-semibold text-slate-900">
                      {formatBDT(order.totalCents)}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      Placed
                    </p>
                    <p className="mt-0.5 text-sm text-slate-600">
                      {new Date(order.createdAt).toLocaleDateString("en-BD", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
                  <StatusSelect
                    orderId={order.id}
                    currentStatus={order.status}
                    onUpdated={(next) =>
                      setOrders((prev) =>
                        prev.map((o) => (o.id === order.id ? { ...o, status: next } : o))
                      )
                    }
                  />
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="flex items-center justify-center gap-2 rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Results Count */}
        {!isLoading && !error && orders.length > 0 && (
          <div className="mt-4 text-center text-sm text-slate-500">
            Showing {orders.length} order{orders.length === 1 ? "" : "s"}
          </div>
        )}
      </div>
    </div>
  );
}


// "use client";

// import { useCallback, useEffect, useState } from "react";
// import Link from "next/link";
// import StatusBadge from "@/components/admin/StatusBadge";
// import StatusSelect from "@/components/admin/StatusSelect";
// import { formatBDT } from "@/lib/money";
// import { ORDER_STATUSES, type OrderRecord, type OrdersResponse } from "@/types/order";

// export default function AdminOrdersPage() {
//   const [orders, setOrders] = useState<OrderRecord[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [statusFilter, setStatusFilter] = useState<string>("");
//   const [search, setSearch] = useState("");

//   const loadOrders = useCallback(async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const params = new URLSearchParams();
//       if (statusFilter) params.set("status", statusFilter);
//       if (search) params.set("q", search);
//       const res = await fetch(`/api/orders?${params.toString()}`);
//       if (!res.ok) throw new Error("Failed to load orders");
//       const data: OrdersResponse = await res.json();
//       setOrders(data.orders);
//     } catch {
//       setError("Couldn't load orders. Refresh to try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [statusFilter, search]);

//   useEffect(() => {
//     const timeout = setTimeout(loadOrders, 250); // debounce search input
//     return () => clearTimeout(timeout);
//   }, [loadOrders]);

//   return (
//     <div className="flex flex-col gap-6">
//       <div className="flex flex-wrap items-center justify-between gap-4">
//         <h1 className="font-display text-2xl font-medium text-ink">Orders</h1>

//         <div className="flex flex-wrap items-center gap-3">
//           <input
//             type="search"
//             placeholder="Search name or phone"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="rounded-full border border-cloud-line bg-cloud-card px-4 py-2 text-sm text-ink placeholder:text-steel"
//           />
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="rounded-full border border-cloud-line bg-cloud-card px-4 py-2 text-sm text-ink"
//           >
//             <option value="">All statuses</option>
//             {ORDER_STATUSES.map((status) => (
//               <option key={status} value={status}>
//                 {status}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="overflow-x-auto rounded-2xl border border-cloud-line bg-cloud-card">
//         <table className="w-full min-w-[720px] text-left text-sm">
//           <thead className="border-b border-cloud-line text-xs uppercase tracking-wide text-steel">
//             <tr>
//               <th className="px-5 py-3 font-medium">Customer</th>
//               <th className="px-5 py-3 font-medium">Phone</th>
//               <th className="px-5 py-3 font-medium">Qty</th>
//               <th className="px-5 py-3 font-medium">Total</th>
//               <th className="px-5 py-3 font-medium">Status</th>
//               <th className="px-5 py-3 font-medium">Placed</th>
//               <th className="px-5 py-3 font-medium" />
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-cloud-line">
//             {isLoading ? (
//               <tr>
//                 <td colSpan={7} className="px-5 py-8 text-center text-steel">
//                   Loading orders…
//                 </td>
//               </tr>
//             ) : error ? (
//               <tr>
//                 <td colSpan={7} className="px-5 py-8 text-center text-red-600">
//                   {error}
//                 </td>
//               </tr>
//             ) : orders.length === 0 ? (
//               <tr>
//                 <td colSpan={7} className="px-5 py-8 text-center text-steel">
//                   No orders match these filters yet.
//                 </td>
//               </tr>
//             ) : (
//               orders.map((order) => (
//                 <tr key={order.id}>
//                   <td className="px-5 py-4 font-medium text-ink">{order.customerName}</td>
//                   <td className="px-5 py-4 text-steel">{order.phone}</td>
//                   <td className="px-5 py-4 text-steel">{order.quantity}</td>
//                   <td className="px-5 py-4 font-mono text-ink">{formatBDT(order.totalCents)}</td>
//                   <td className="px-5 py-4">
//                     <div className="flex items-center gap-2">
//                       <StatusBadge status={order.status} />
//                     </div>
//                     <div className="mt-2">
//                       <StatusSelect
//                         orderId={order.id}
//                         currentStatus={order.status}
//                         onUpdated={(next) =>
//                           setOrders((prev) =>
//                             prev.map((o) => (o.id === order.id ? { ...o, status: next } : o))
//                           )
//                         }
//                       />
//                     </div>
//                   </td>
//                   <td className="px-5 py-4 text-steel">
//                     {new Date(order.createdAt).toLocaleDateString("en-BD", {
//                       day: "numeric",
//                       month: "short",
//                     })}
//                   </td>
//                   <td className="px-5 py-4">
//                     <Link
//                       href={`/admin/orders/${order.id}`}
//                       className="text-sm font-medium text-indigo hover:text-indigo-deep"
//                     >
//                       View
//                     </Link>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
