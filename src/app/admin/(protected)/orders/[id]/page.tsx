import OrderDetailStatusPanel from "@/components/admin/OrderDetailStatusPanel";
import StatusBadge from "@/components/admin/StatusBadge";
import { deliveryOptions } from "@/constants/product";
import { formatBDT } from "@/lib/money";
import { prisma } from "@/lib/prisma";
import {
  ArrowLeft,
  Calendar,
  Hash,
  MapPin,
  Package,
  Phone,
  Settings2,
  StickyNote,
  Truck,
  User,
  Wallet,
} from "lucide-react";
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

  // const placedLabel = new Date(order.createdAt).toLocaleString("en-BD", {
  //   dateStyle: "medium",
  //   timeStyle: "short",
  // });

  function placedLabel(date: Date | string | number): string {
    return new Date(date).toLocaleString("en-BD", {
      timeZone: "Asia/Dhaka",
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  return (
    <div className="mx-auto flex w-full max-w-full flex-col gap-6">
      <Link
        href="/admin/orders"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-steel transition-colors duration-150 hover:text-indigo"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to orders
      </Link>

      {/* Slim header: identity + quick status */}
      <div className="flex flex-col gap-3 rounded-2xl border border-cloud-line bg-cloud-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-2xl font-semibold text-ink">{order.customerName}</h1>
          <StatusBadge status={order.status} />
        </div>
        <p className="font-mono text-xs text-steel">
          #{order.id.slice(-8).toUpperCase()} · {placedLabel(order.createdAt)}
        </p>
      </div>

      {/* Two-column layout: stacks on mobile & tablet, side-by-side on desktop */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6">
          {/* Order information */}
          <section className="rounded-2xl border border-cloud-line bg-cloud-card p-6 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-7">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
                <Hash className="h-4.5 w-4.5" />
              </span>
              <h2 className="font-display text-base font-semibold text-ink">Order information</h2>
            </div>

            <dl className="flex flex-col divide-y divide-cloud-line">
              <InfoRow icon={Hash} label="Order ID" value={order.id} mono />
              <InfoRow icon={Calendar} label="Date & time" value={placedLabel(order.createdAt)} />
              <InfoRow
                icon={Settings2}
                label="Order status"
                value={<StatusBadge status={order.status} />}
              />
              <InfoRow icon={Wallet} label="Payment method" value="Cash on Delivery" />
            </dl>
          </section>

          {/* Product & pricing */}
          <section className="rounded-2xl border border-cloud-line bg-cloud-card p-6 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-7">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Package className="h-4.5 w-4.5" />
              </span>
              <h2 className="font-display text-base font-semibold text-ink">Product &amp; pricing</h2>
            </div>

            <dl className="flex flex-col divide-y divide-cloud-line">
              <InfoRow icon={Package} label="Product" value={order.product.name} />
              <InfoRow icon={Hash} label="Quantity" value={String(order.quantity)} mono />
              <InfoRow icon={Wallet} label="Unit price" value={formatBDT(order.unitPriceCents)} mono />
              <InfoRow icon={Truck} label="Delivery area" value={deliveryAreaLabel} />
              <InfoRow
                icon={Truck}
                label="Delivery charge"
                value={formatBDT(order.deliveryChargeCents)}
                mono
              />
            </dl>

            {/* Highlighted grand total */}
            <div className="mt-5 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3.5">
              <span className="text-sm font-medium text-emerald-800">Grand total</span>
              <span className="font-display text-xl font-bold tabular-nums text-emerald-700">
                {formatBDT(order.grandTotalCents)}
              </span>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6">
          {/* Delivery address */}
          <section className="rounded-2xl border border-cloud-line bg-cloud-card p-6 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-7">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <MapPin className="h-4.5 w-4.5" />
              </span>
              <h2 className="font-display text-base font-semibold text-ink">Delivery address</h2>
            </div>
            <p className="whitespace-pre-line text-sm leading-relaxed text-ink">{order.address}</p>
          </section>

          {/* Customer information */}
          <section className="rounded-2xl border border-cloud-line bg-cloud-card p-6 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-7">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <User className="h-4.5 w-4.5" />
              </span>
              <h2 className="font-display text-base font-semibold text-ink">Customer information</h2>
            </div>

            <dl className="flex flex-col divide-y divide-cloud-line">
              <InfoRow icon={User} label="Name" value={order.customerName} />
              <InfoRow icon={Phone} label="Phone" value={order.phone} mono />
              <InfoRow icon={MapPin} label="District" value={order.district ?? "—"} />
            </dl>
          </section>

          {/* Customer note */}
          {order.note ? (
            <section className="rounded-2xl border border-cloud-line bg-cloud-card p-6 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <StickyNote className="h-4.5 w-4.5" />
                </span>
                <h2 className="font-display text-base font-semibold text-ink">Customer note</h2>
              </div>
              <p className="whitespace-pre-line text-sm leading-relaxed text-ink">{order.note}</p>
            </section>
          ) : null}

          {/* Update status — visually prominent */}
          <section className="overflow-hidden rounded-2xl border border-indigo/20 bg-indigo/5 shadow-sm">
            <div className="border-l-4 border-indigo p-6 sm:p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo text-white">
                  <Settings2 className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h2 className="font-display text-base font-semibold text-ink">Update status</h2>
                  <p className="text-xs text-steel">Current: reflected in the badge above</p>
                </div>
              </div>
              <OrderDetailStatusPanel orderId={order.id} currentStatus={order.status} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  mono = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 text-sm first:pt-0 last:pb-0">
      <dt className="flex items-center gap-2 text-steel">
        <Icon className="h-3.5 w-3.5 shrink-0 text-steel/70" />
        {label}
      </dt>
      <dd className={`text-right font-medium text-ink ${mono ? "font-mono tabular-nums" : ""}`}>
        {value}
      </dd>
    </div>
  );
}




// import OrderDetailStatusPanel from "@/components/admin/OrderDetailStatusPanel";
// import StatusBadge from "@/components/admin/StatusBadge";
// import { deliveryOptions } from "@/constants/product";
// import { formatBDT } from "@/lib/money";
// import { prisma } from "@/lib/prisma";
// import {
//   ArrowLeft,
//   Calendar,
//   Hash,
//   MapPin,
//   Package,
//   Phone,
//   Settings2,
//   StickyNote,
//   Truck,
//   User,
//   Wallet,
// } from "lucide-react";
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

//   const deliveryAreaLabel =
//     deliveryOptions.find((o) => o.value === order.deliveryArea)?.label ?? order.deliveryArea;

//   const placedLabel = new Date(order.createdAt).toLocaleString("en-BD", {
//     dateStyle: "medium",
//     timeStyle: "short",
//   });

//   return (
//     <div className="mx-auto flex w-full max-w-full flex-col gap-6">
//       <Link
//         href="/admin/orders"
//         className="inline-flex w-fit items-center gap-1.5 text-sm text-steel transition-colors duration-150 hover:text-indigo"
//       >
//         <ArrowLeft className="h-4 w-4" />
//         Back to orders
//       </Link>

//       {/* Slim header: identity + quick status */}
//       <div className="flex flex-col gap-3 rounded-2xl border border-cloud-line bg-cloud-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
//         <div className="flex flex-wrap items-center gap-3">
//           <h1 className="font-display text-2xl font-semibold text-ink">{order.customerName}</h1>
//           <StatusBadge status={order.status} />
//         </div>
//         <p className="font-mono text-xs text-steel">
//           #{order.id.slice(-8).toUpperCase()} · {placedLabel}
//         </p>
//       </div>

//       {/* Two-column layout: stacks on mobile & tablet, side-by-side on desktop */}
//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
//         {/* LEFT COLUMN */}
//         <div className="flex flex-col gap-6">
//           {/* Order information */}
//           <section className="rounded-2xl border border-cloud-line bg-cloud-card p-6 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-7">
//             <div className="mb-5 flex items-center gap-2.5">
//               <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
//                 <Hash className="h-4.5 w-4.5" />
//               </span>
//               <h2 className="font-display text-base font-semibold text-ink">Order information</h2>
//             </div>

//             <dl className="flex flex-col divide-y divide-cloud-line">
//               <InfoRow icon={Hash} label="Order ID" value={order.id} mono />
//               <InfoRow icon={Calendar} label="Date & time" value={placedLabel} />
//               <InfoRow
//                 icon={Settings2}
//                 label="Order status"
//                 value={<StatusBadge status={order.status} />}
//               />
//               <InfoRow icon={Wallet} label="Payment method" value="Cash on Delivery" />
//             </dl>
//           </section>

//           {/* Product & pricing */}
//           <section className="rounded-2xl border border-cloud-line bg-cloud-card p-6 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-7">
//             <div className="mb-5 flex items-center gap-2.5">
//               <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
//                 <Package className="h-4.5 w-4.5" />
//               </span>
//               <h2 className="font-display text-base font-semibold text-ink">Product &amp; pricing</h2>
//             </div>

//             <dl className="flex flex-col divide-y divide-cloud-line">
//               <InfoRow icon={Package} label="Product" value={order.product.name} />
//               <InfoRow icon={Hash} label="Quantity" value={String(order.quantity)} mono />
//               <InfoRow icon={Wallet} label="Unit price" value={formatBDT(order.unitPriceCents)} mono />
//               <InfoRow icon={Truck} label="Delivery area" value={deliveryAreaLabel} />
//               <InfoRow
//                 icon={Truck}
//                 label="Delivery charge"
//                 value={formatBDT(order.deliveryChargeCents)}
//                 mono
//               />
//             </dl>

//             {/* Highlighted grand total */}
//             <div className="mt-5 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3.5">
//               <span className="text-sm font-medium text-emerald-800">Grand total</span>
//               <span className="font-display text-xl font-bold tabular-nums text-emerald-700">
//                 {formatBDT(order.grandTotalCents)}
//               </span>
//             </div>
//           </section>
//         </div>

//         {/* RIGHT COLUMN */}
//         <div className="flex flex-col gap-6">
//           {/* Delivery address */}
//           <section className="rounded-2xl border border-cloud-line bg-cloud-card p-6 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-7">
//             <div className="mb-4 flex items-center gap-2.5">
//               <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
//                 <MapPin className="h-4.5 w-4.5" />
//               </span>
//               <h2 className="font-display text-base font-semibold text-ink">Delivery address</h2>
//             </div>
//             <p className="whitespace-pre-line text-sm leading-relaxed text-ink">{order.address}</p>
//           </section>

//           {/* Customer information */}
//           <section className="rounded-2xl border border-cloud-line bg-cloud-card p-6 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-7">
//             <div className="mb-5 flex items-center gap-2.5">
//               <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
//                 <User className="h-4.5 w-4.5" />
//               </span>
//               <h2 className="font-display text-base font-semibold text-ink">Customer information</h2>
//             </div>

//             <dl className="flex flex-col divide-y divide-cloud-line">
//               <InfoRow icon={User} label="Name" value={order.customerName} />
//               <InfoRow icon={Phone} label="Phone" value={order.phone} mono />
//               <InfoRow icon={MapPin} label="District" value={order.district ?? "—"} />
//             </dl>
//           </section>

//           {/* Customer note */}
//           {order.note ? (
//             <section className="rounded-2xl border border-cloud-line bg-cloud-card p-6 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-7">
//               <div className="mb-4 flex items-center gap-2.5">
//                 <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
//                   <StickyNote className="h-4.5 w-4.5" />
//                 </span>
//                 <h2 className="font-display text-base font-semibold text-ink">Customer note</h2>
//               </div>
//               <p className="whitespace-pre-line text-sm leading-relaxed text-ink">{order.note}</p>
//             </section>
//           ) : null}

//           {/* Update status — visually prominent */}
//           <section className="overflow-hidden rounded-2xl border border-indigo/20 bg-indigo/5 shadow-sm">
//             <div className="border-l-4 border-indigo p-6 sm:p-7">
//               <div className="mb-4 flex items-center gap-2.5">
//                 <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo text-white">
//                   <Settings2 className="h-4.5 w-4.5" />
//                 </span>
//                 <div>
//                   <h2 className="font-display text-base font-semibold text-ink">Update status</h2>
//                   <p className="text-xs text-steel">Current: reflected in the badge above</p>
//                 </div>
//               </div>
//               <OrderDetailStatusPanel orderId={order.id} currentStatus={order.status} />
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }

// function InfoRow({
//   icon: Icon,
//   label,
//   value,
//   mono = false,
// }: {
//   icon: React.ComponentType<{ className?: string }>;
//   label: string;
//   value: React.ReactNode;
//   mono?: boolean;
// }) {
//   return (
//     <div className="flex items-center justify-between gap-4 py-3 text-sm first:pt-0 last:pb-0">
//       <dt className="flex items-center gap-2 text-steel">
//         <Icon className="h-3.5 w-3.5 shrink-0 text-steel/70" />
//         {label}
//       </dt>
//       <dd className={`text-right font-medium text-ink ${mono ? "font-mono tabular-nums" : ""}`}>
//         {value}
//       </dd>
//     </div>
//   );
// }

