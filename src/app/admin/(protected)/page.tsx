import { formatBDT } from "@/lib/money";
import { prisma } from "@/lib/prisma";
import { ORDER_STATUSES } from "@/types/order";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Package,
  ShoppingBag,
  TrendingUp,
  XCircle
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const statusIcons = {
  PENDING: Clock,
  CONFIRMED: Package,
  SHIPPED: TrendingUp,
  DELIVERED: CheckCircle,
  CANCELLED: XCircle,
};

const statusColors = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  CONFIRMED: "bg-blue-50 text-blue-700 border-blue-200",
  SHIPPED: "bg-purple-50 text-purple-700 border-purple-200",
  DELIVERED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CANCELLED: "bg-red-50 text-red-700 border-red-200",
};

const statusLabelColors = {
  PENDING: "text-amber-600",
  CONFIRMED: "text-blue-600",
  SHIPPED: "text-purple-600",
  DELIVERED: "text-emerald-600",
  CANCELLED: "text-red-600",
};

export default async function AdminOverviewPage() {
  const [statusCounts, pendingRevenue, totalOrders] = await Promise.all([
    Promise.all(
      ORDER_STATUSES.map(async (status) => ({
        status,
        count: await prisma.order.count({ where: { status } }),
      }))
    ),
    prisma.order.aggregate({
      where: { status: { in: ["PENDING", "CONFIRMED", "SHIPPED"] } },
      _sum: { totalCents: true },
    }),
    prisma.order.count(),
  ]);

  // Calculate percentage for progress visualization
  const deliveredCount = statusCounts.find(s => s.status === "DELIVERED")?.count || 0;
  const completionRate = totalOrders > 0 ? Math.round((deliveredCount / totalOrders) * 100) : 0;

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto max-w-full">
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900">
              Dashboard Overview
            </h1>
            <p className="mt-1.5 flex items-center gap-2 text-sm text-slate-500">
              <ShoppingBag className="h-4 w-4" />
              <span>
                {totalOrders} order{totalOrders === 1 ? "" : "s"} placed so far
              </span>
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-slate-300" />
              <span className="font-medium text-emerald-600">
                {completionRate}% completion rate
              </span>
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md hover:ring-slate-300 active:scale-95"
          >
            View all orders
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Revenue Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 transition-all hover:shadow-lg hover:ring-slate-300">
            <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-gradient-to-br from-emerald-400/10 to-emerald-400/5 blur-2xl" />
            <div className="relative">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <TrendingUp className="h-5 w-5" />
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                In Progress Value
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-slate-900">
                {formatBDT(pendingRevenue._sum.totalCents ?? 0)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Pending, confirmed &amp; shipped orders
              </p>
            </div>
          </div>

          {/* Status Cards */}
          {statusCounts.map(({ status, count }) => {
            const Icon = statusIcons[status as keyof typeof statusIcons] || Package;
            const colorClass = statusColors[status as keyof typeof statusColors] || "bg-slate-50 text-slate-700 border-slate-200";
            const labelColor = statusLabelColors[status as keyof typeof statusLabelColors] || "text-slate-600";

            return (
              <div
                key={status}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 transition-all hover:shadow-lg hover:ring-slate-300"
              >
                <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-gradient-to-br from-slate-400/10 to-slate-400/5 blur-2xl" />
                <div className="relative">
                  <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${colorClass} border`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className={`text-xs font-medium uppercase tracking-wider ${labelColor}`}>
                    {status}
                  </p>
                  <p className="mt-2 font-display text-2xl font-bold text-slate-900">
                    {count}
                  </p>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400 transition-all duration-500"
                      style={{ width: `${totalOrders > 0 ? (count / totalOrders) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions / Additional Info */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-6 ring-1 ring-indigo-200/50">
            <h3 className="font-semibold text-indigo-900">Quick Actions</h3>
            <div className="mt-3 flex flex-col gap-2">
              <Link
                href="/admin/orders"
                className="rounded-lg bg-white/80 px-4 py-2 text-sm text-indigo-700 transition-all hover:bg-white hover:shadow-sm"
              >
                Review pending orders →
              </Link>
              <Link
                href="/admin/orders"
                className="rounded-lg bg-white/80 px-4 py-2 text-sm text-indigo-700 transition-all hover:bg-white hover:shadow-sm"
              >
                View all orders →
              </Link>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6 ring-1 ring-emerald-200/50">
            <h3 className="font-semibold text-emerald-900">Order Insights</h3>
            <div className="mt-3 space-y-1.5 text-sm">
              <p className="text-emerald-700">
                <span className="font-medium">Completion Rate:</span> {completionRate}%
              </p>
              <p className="text-emerald-700">
                <span className="font-medium">Total Orders:</span> {totalOrders}
              </p>
              <p className="text-emerald-700">
                <span className="font-medium">Revenue in Progress:</span>{" "}
                {formatBDT(pendingRevenue._sum.totalCents ?? 0)}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200/50 p-6 ring-1 ring-slate-200/50">
            <h3 className="font-semibold text-slate-700">Status Overview</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {statusCounts.map(({ status, count }) => {
                const color = statusLabelColors[status as keyof typeof statusLabelColors] || "text-slate-600";
                return (
                  <span
                    key={status}
                    className={`inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-medium ${color} shadow-sm ring-1 ring-slate-200/50`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {status}: {count}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
