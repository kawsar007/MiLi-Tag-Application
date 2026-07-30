
import { DeliveryArea, deliveryCharges, deliveryOptions } from "@/constants/product";
import Image from "next/image";

interface OrderSummaryCardProps {
  productName: string;
  productImage: string;
  unitPrice: string;
  originalPrice?: string;
  quantity: number;
  deliveryArea: DeliveryArea;
}

/** Best-effort numeric parse of a formatted currency string, for display math only. */
function parseAmount(value: string): number | null {
  const numeric = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) ? numeric : null;
}

/** Re-applies whatever currency symbol/suffix the source string used. */
function formatLikeSource(amount: number, source: string): string {
  const prefixMatch = source.match(/^[^\d]+/);
  const suffixMatch = source.match(/[^\d.,]+$/);
  const prefix = prefixMatch ? prefixMatch[0] : "";
  const suffix = !prefixMatch && suffixMatch ? suffixMatch[0] : "";
  return `${prefix}${amount.toFixed(2)}${suffix}`;
}

export default function OrderSummaryCard({
  productName,
  productImage,
  unitPrice,
  originalPrice,
  quantity,
  deliveryArea,
}: OrderSummaryCardProps) {
  const parsedUnit = parseAmount(unitPrice);
  const deliveryChargeNumeric = deliveryCharges[deliveryArea];
  const deliveryLabel = deliveryOptions.find((option) => option.value === deliveryArea)?.label ?? "";

  const subtotalNumeric = parsedUnit !== null ? parsedUnit * quantity : null;
  const subtotalDisplay =
    subtotalNumeric !== null ? formatLikeSource(subtotalNumeric, unitPrice) : unitPrice;

  const deliveryDisplay = formatLikeSource(deliveryChargeNumeric, unitPrice);

  const totalNumeric = subtotalNumeric !== null ? subtotalNumeric + deliveryChargeNumeric : null;
  const totalDisplay = totalNumeric !== null ? formatLikeSource(totalNumeric, unitPrice) : subtotalDisplay;

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-cloud-line bg-white p-6 shadow-sm sm:p-8">
      <h3 className="font-display text-lg font-semibold text-ink">Your order</h3>

      <div className="flex items-center gap-4 rounded-xl border border-cloud-line p-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-cloud-card">
          <Image src={productImage} alt={productName} fill className="object-contain p-2" sizes="64px" />
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <span className="font-display text-sm font-medium leading-snug text-ink sm:text-base">
            {productName}
          </span>
          {originalPrice ? (
            <span className="text-xs text-steel line-through">{originalPrice}</span>
          ) : null}
        </div>

        <div className="text-right">
          <span className="block font-display text-sm font-semibold text-ink sm:text-base">
            {unitPrice}
          </span>
          <span className="block text-xs text-steel">Qty {quantity}</span>
        </div>
      </div>

      <dl className="flex flex-col gap-3 border-t border-cloud-line pt-4 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-steel">Subtotal</dt>
          <dd className="text-ink transition-all duration-150">{subtotalDisplay}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-steel">Delivery charge ({deliveryLabel})</dt>
          <dd className="text-ink transition-all duration-150">{deliveryDisplay}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-cloud-line pt-3 text-base font-semibold">
          <dt className="text-ink">Total</dt>
          <dd className="text-ink transition-all duration-150">{totalDisplay}</dd>
        </div>
      </dl>

      <div className="flex items-center gap-3 rounded-xl border border-cloud-line p-4">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-indigo">
          <span className="h-2.5 w-2.5 rounded-full bg-indigo" />
        </span>
        <div>
          <p className="text-sm font-medium text-ink">Cash on delivery</p>
          <p className="text-xs text-steel">Pay with cash when your order arrives.</p>
        </div>
      </div>
    </div>
  );
}