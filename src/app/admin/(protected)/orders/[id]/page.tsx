import OrderDetailStatusPanel from "@/components/admin/OrderDetailStatusPanel";
import StatusBadge from "@/components/admin/StatusBadge";
import { deliveryOptions } from "@/constants/product";
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

  const deliveryAreaLabel =
    deliveryOptions.find((o) => o.value === order.deliveryArea)?.label ?? order.deliveryArea;

  const rows: Array<[string, string]> = [
    ["Product", order.product.name],
    ["Quantity", String(order.quantity)],
    ["Unit price", formatBDT(order.unitPriceCents)],
    ["Total", formatBDT(order.totalCents)],
    ["Delivery Area", deliveryAreaLabel],
    ["Delivery Charge", formatBDT(order.deliveryChargeCents)],
    ["Grand Total", formatBDT(order.grandTotalCents)],
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

  const placedLabel = new Date(order.createdAt).toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <Link
        href="/admin/orders"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-steel transition-colors duration-150 hover:text-indigo"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to orders
      </Link>

      {/* Header: customer, status, meta, grand total */}
      <div className="flex flex-col gap-4 rounded-2xl border border-cloud-line bg-cloud-card p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl font-semibold text-ink">{order.customerName}</h1>
            <StatusBadge status={order.status} />
          </div>
          <p className="font-mono text-xs text-steel">
            Order <span className="text-ink">#{order.id.slice(-8).toUpperCase()}</span> · Placed{" "}
            {placedLabel}
          </p>
        </div>

        <div className="flex flex-col items-start gap-1 rounded-xl border border-indigo/15 bg-indigo/5 px-4 py-3 sm:items-end">
          <span className="text-xs font-medium uppercase tracking-wide text-steel">Grand total</span>
          <span className="font-display text-xl font-semibold tabular-nums text-indigo">
            {formatBDT(order.grandTotalCents)}
          </span>
        </div>
      </div>

      {/* Full order details */}
      <div className="rounded-2xl border border-cloud-line bg-cloud-card p-6 shadow-sm sm:p-7">
        <h2 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-steel">
          <ReceiptIcon className="h-3.5 w-3.5" />
          Order details
        </h2>
        <dl className="divide-y divide-cloud-line">
          {rows.map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between gap-4 rounded-lg px-2 py-3 text-sm transition-colors duration-150 hover:bg-white"
            >
              <dt className="text-steel">{label}</dt>
              <dd className="text-right font-medium tabular-nums text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Delivery address */}
      <div className="rounded-2xl border border-cloud-line bg-cloud-card p-6 shadow-sm sm:p-7">
        <h2 className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-steel">
          <MapPinIcon className="h-3.5 w-3.5" />
          Delivery address
        </h2>
        <p className="whitespace-pre-line text-sm leading-relaxed text-ink">{order.address}</p>
      </div>

      {/* Customer note */}
      {order.note ? (
        <div className="rounded-2xl border border-cloud-line bg-cloud-card p-6 shadow-sm sm:p-7">
          <h2 className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-steel">
            <NoteIcon className="h-3.5 w-3.5" />
            Customer note
          </h2>
          <p className="whitespace-pre-line text-sm leading-relaxed text-ink">{order.note}</p>
        </div>
      ) : null}

      {/* Status update */}
      <div className="flex flex-col gap-3 rounded-2xl border border-cloud-line bg-cloud-card p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-ink">Update status</span>
          <StatusBadge status={order.status} />
        </div>
        <OrderDetailStatusPanel orderId={order.id} currentStatus={order.status} />
      </div>
    </div>
  );
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReceiptIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 3h12v18l-2.5-1.5L13 21l-2.5-1.5L8 21l-2-1.5V3Z"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 21s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <circle cx={12} cy={9} r={2.3} stroke="currentColor" strokeWidth={1.6} />
    </svg>
  );
}

function NoteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x={4} y={3} width={16} height={18} rx={2} stroke="currentColor" strokeWidth={1.6} />
      <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}


// import OrderDetailStatusPanel from "@/components/admin/OrderDetailStatusPanel";
// import StatusBadge from "@/components/admin/StatusBadge";
// import { formatBDT } from "@/lib/money";
// import { prisma } from "@/lib/prisma";
// import Link from "next/link";
// import { notFound } from "next/navigation";

// export const dynamic = "force-dynamic";

// interface OrderDetailPageProps {
//   params: Promise<{ id: string }>;
// }

// export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
//   const { id } = await params;
//   const order = await prisma.order.findUnique({
//     where: { id },
//     include: { product: { select: { name: true } } },
//   });

//   if (!order) notFound();

//   const rows: Array<[string, string]> = [
//     ["Product", order.product.name],
//     ["Quantity", String(order.quantity)],
//     ["Unit price", formatBDT(order.unitPriceCents)],
//     ["Total", formatBDT(order.totalCents)],
//     ["Phone", order.phone],
//     ["District", order.district ?? "—"],
//     [
//       "Placed",
//       new Date(order.createdAt).toLocaleString("en-BD", {
//         dateStyle: "medium",
//         timeStyle: "short",
//       }),
//     ],
//     ["Order ID", order.id],
//   ];

//   return (
//     <div className="flex max-w-2xl flex-col gap-6">
//       <div>
//         <Link href="/admin/orders" className="text-sm text-steel hover:text-indigo">
//           ← Back to orders
//         </Link>
//         <div className="mt-2 flex flex-wrap items-center gap-3">
//           <h1 className="font-display text-2xl font-medium text-ink">{order.customerName}</h1>
//           <StatusBadge status={order.status} />
//         </div>
//       </div>

//       <div className="rounded-2xl border border-cloud-line bg-cloud-card p-6">
//         <dl className="divide-y divide-cloud-line">
//           {rows.map(([label, value]) => (
//             <div key={label} className="flex items-center justify-between py-3 text-sm">
//               <dt className="text-steel">{label}</dt>
//               <dd className="font-medium text-ink">{value}</dd>
//             </div>
//           ))}
//         </dl>
//       </div>

//       <div className="rounded-2xl border border-cloud-line bg-cloud-card p-6">
//         <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-steel">
//           Delivery address
//         </h2>
//         <p className="mt-2 whitespace-pre-line text-sm text-ink">{order.address}</p>
//       </div>

//       {order.note ? (
//         <div className="rounded-2xl border border-cloud-line bg-cloud-card p-6">
//           <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-steel">
//             Customer note
//           </h2>
//           <p className="mt-2 whitespace-pre-line text-sm text-ink">{order.note}</p>
//         </div>
//       ) : null}

//       <div className="flex items-center gap-3 rounded-2xl border border-cloud-line bg-cloud-card p-6">
//         <span className="text-sm font-medium text-ink">Update status:</span>
//         <OrderDetailStatusPanel orderId={order.id} currentStatus={order.status} />
//       </div>
//     </div>
//   );
// }
