import OrderDetailStatusPanel from "@/components/admin/OrderDetailStatusPanel";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatBDT } from "@/lib/money";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { product: { select: { name: true } } },
  });

  if (!order) notFound();

  const rows: Array<[string, string]> = [
    ["Product", order.product.name],
    ["Quantity", String(order.quantity)],
    ["Unit price", formatBDT(order.unitPriceCents)],
    ["Total", formatBDT(order.totalCents)],
    ["Phone", order.phone],
    ["District", order.district ?? "—"],
    [
      "Placed",
      new Date(order.createdAt).toLocaleString("en-BD", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    ],
    ["Order ID", order.id],
  ];

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <Link href="/admin/orders" className="text-sm text-steel hover:text-indigo">
          ← Back to orders
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-2xl font-medium text-ink">{order.customerName}</h1>
          <StatusBadge status={order.status} />
        </div>
      </div>

      <div className="rounded-2xl border border-cloud-line bg-cloud-card p-6">
        <dl className="divide-y divide-cloud-line">
          {rows.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between py-3 text-sm">
              <dt className="text-steel">{label}</dt>
              <dd className="font-medium text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="rounded-2xl border border-cloud-line bg-cloud-card p-6">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-steel">
          Delivery address
        </h2>
        <p className="mt-2 whitespace-pre-line text-sm text-ink">{order.address}</p>
      </div>

      {order.note ? (
        <div className="rounded-2xl border border-cloud-line bg-cloud-card p-6">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-steel">
            Customer note
          </h2>
          <p className="mt-2 whitespace-pre-line text-sm text-ink">{order.note}</p>
        </div>
      ) : null}

      <div className="flex items-center gap-3 rounded-2xl border border-cloud-line bg-cloud-card p-6">
        <span className="text-sm font-medium text-ink">Update status:</span>
        <OrderDetailStatusPanel orderId={order.id} currentStatus={order.status} />
      </div>
    </div>
  );
}
