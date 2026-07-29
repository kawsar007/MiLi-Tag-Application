import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatBDT } from "@/lib/money";
import { ORDER_STATUSES } from "@/types/order";

export const dynamic = "force-dynamic";

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

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl font-medium text-ink">Overview</h1>
        <p className="mt-1 text-sm text-steel">
          {totalOrders} order{totalOrders === 1 ? "" : "s"} placed so far.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-cloud-line bg-cloud-card p-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel">
            In progress value
          </p>
          <p className="mt-2 font-display text-2xl font-medium text-ink">
            {formatBDT(pendingRevenue._sum.totalCents ?? 0)}
          </p>
          <p className="mt-1 text-xs text-steel">Pending, confirmed &amp; shipped orders</p>
        </div>

        {statusCounts.map(({ status, count }: { status: string; count: number }) => (
          <div key={status} className="rounded-2xl border border-cloud-line bg-cloud-card p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel">
              {status}
            </p>
            <p className="mt-2 font-display text-2xl font-medium text-ink">{count}</p>
          </div>
        ))}
      </div>

      <Link
        href="/admin/orders"
        className="inline-flex w-fit items-center gap-2 rounded-full bg-indigo px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-deep"
      >
        View all orders
      </Link>
    </div>
  );
}
