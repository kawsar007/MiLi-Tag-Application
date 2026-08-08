"use client";

import { defaultDeliveryArea, DeliveryArea, deliveryOptions } from "@/constants/product";
import { useEffect, useState, type FormEvent } from "react";


interface FieldErrors {
  customerName?: string[];
  phone?: string[];
  address?: string[];
  district?: string[];
  quantity?: string[];
  note?: string[];
  deliveryArea?: string[];
}

interface OrderFormProps {
  /** Optional: lets a parent mirror the live quantity (e.g. for an order summary). */
  onQuantityChange?: (quantity: number) => void;
  /** Optional: lets a parent mirror the live delivery area selection. */
  onDeliveryAreaChange?: (area: DeliveryArea) => void;
  /** Optional: lets a parent mirror submitting state (e.g. to disable an external submit button). */
  onSubmittingChange?: (isSubmitting: boolean) => void;
  /** Optional: lets a parent know once the order is confirmed (id, or null if not yet confirmed). */
  onOrderConfirmedChange?: (orderId: string | null) => void;
}

export default function OrderForm({
  onQuantityChange,
  onDeliveryAreaChange,
  onSubmittingChange,
  onOrderConfirmedChange,
}: OrderFormProps = {}) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [deliveryArea, setDeliveryArea] = useState<DeliveryArea>(defaultDeliveryArea);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  // Mirror live values up to a parent (e.g. an order summary card), if it's listening.
  // Purely additive — submission logic below is unaffected either way.
  useEffect(() => {
    onQuantityChange?.(quantity);
  }, [quantity, onQuantityChange]);

  useEffect(() => {
    onDeliveryAreaChange?.(deliveryArea);
  }, [deliveryArea, onDeliveryAreaChange]);

  useEffect(() => {
    onSubmittingChange?.(isSubmitting);
  }, [isSubmitting, onSubmittingChange]);

  useEffect(() => {
    onOrderConfirmedChange?.(confirmedOrderId);
  }, [confirmedOrderId, onOrderConfirmedChange]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});
    setFormError(null);

    try {
      const res = await fetch("/mili-tag/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          phone,
          address,
          district,
          quantity,
          note,
          deliveryArea,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.issues) setFieldErrors(data.issues);
        setFormError(data.error ?? "Couldn't place your order. Please try again.");
        return;
      }

      setConfirmedOrderId(data.order.id);
    } catch {
      setFormError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (confirmedOrderId) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
          <CheckIcon className="h-6 w-6 text-emerald-600" />
        </div>
        <p className="mt-4 font-display text-xl font-medium text-ink">Order received!</p>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-steel">
          Reference{" "}
          <span className="rounded-md bg-white px-1.5 py-0.5 font-mono text-ink">
            {confirmedOrderId.slice(-8).toUpperCase()}
          </span>{" "}
          — we&apos;ll call {phone} to confirm delivery details shortly.
        </p>
      </div>
    );
  }

  return (
    // id lets the submit button in OrderSummaryCard target this form via form="order-form",
    // even though it renders in a different part of the tree.
    <form id="order-form" onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
      <Field label="ডেলিভারি এলাকা" htmlFor="deliveryArea-inside_dhaka" required error={fieldErrors.deliveryArea}>
        <div role="radiogroup" aria-label="Delivery area" className="flex flex-col gap-3">
          {deliveryOptions.map((option) => {
            const isSelected = deliveryArea === option.value;
            return (
              <label
                key={option.value}
                htmlFor={`deliveryArea-${option.value}`}
                className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border p-4 transition-colors duration-150 focus-within:ring-2 focus-within:ring-indigo/30 focus-within:ring-offset-1 ${isSelected
                  ? "border-indigo bg-indigo/5"
                  : "border-cloud-line bg-white hover:border-steel/40"
                  }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-150 ${isSelected ? "border-indigo" : "border-cloud-line"
                      }`}
                    aria-hidden="true"
                  >
                    {isSelected ? <span className="h-2.5 w-2.5 rounded-full bg-indigo" /> : null}
                  </span>
                  <span className="text-sm font-medium text-ink sm:text-base">{option.label}</span>
                </span>

                <span className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-ink sm:text-base">৳{option.charge}</span>
                  <input
                    type="radio"
                    id={`deliveryArea-${option.value}`}
                    name="deliveryArea"
                    value={option.value}
                    checked={isSelected}
                    onChange={() => setDeliveryArea(option.value)}
                    className="sr-only"
                  />
                </span>
              </label>
            );
          })}
        </div>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="আপনার নাম লিখুন" htmlFor="customerName" required error={fieldErrors.customerName}>
          <input
            id="customerName"
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            aria-invalid={!!fieldErrors.customerName}
            aria-describedby={fieldErrors.customerName ? "customerName-error" : undefined}
            className={inputClasses}
            placeholder="Enter your full name"
          />
        </Field>

        <Field label="আপনার ফোন নাম্বারটি লিখুন" htmlFor="phone" required error={fieldErrors.phone}>
          <input
            id="phone"
            required
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={!!fieldErrors.phone}
            aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
            className={inputClasses}
            placeholder="01XXXXXXXXX"
          />
        </Field>
      </div>

      <Field label="আপনার সম্পূর্ণ এড্রেস টি লিখুন" htmlFor="address" required error={fieldErrors.address}>
        <textarea
          id="address"
          required
          rows={2}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          aria-invalid={!!fieldErrors.address}
          aria-describedby={fieldErrors.address ? "address-error" : undefined}
          className={`${inputClasses} resize-none`}
          placeholder="Enter your full address"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="জেলা (optional)" htmlFor="district" error={fieldErrors.district}>
          <input
            id="district"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            aria-invalid={!!fieldErrors.district}
            aria-describedby={fieldErrors.district ? "district-error" : undefined}
            className={inputClasses}
            placeholder="e.g. Dhaka"
          />
        </Field>

        <Field label="পরিমাণ" htmlFor="quantity" error={fieldErrors.quantity}>
          <div className="flex items-stretch overflow-hidden rounded-lg border border-indigo bg-white transition-colors focus-within:border-indigo focus-within:ring-2 focus-within:ring-indigo/20">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(100, Math.max(1, q - 1)))}
              aria-label="Decrease quantity"
              className="flex w-10 shrink-0 items-center justify-center text-ink transition-colors hover:bg-indigo/90 hover:text-white"
            >
              <MinusIcon className="h-3.5 w-3.5" />
            </button>
            <input
              id="quantity"
              type="number"
              min={1}
              max={100}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              aria-invalid={!!fieldErrors.quantity}
              aria-describedby={fieldErrors.quantity ? "quantity-error" : undefined}
              className="w-full border-x border-indigo bg-transparent px-2 py-2.5 text-center text-sm text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(100, Math.max(1, q + 1)))}
              aria-label="Increase quantity"
              className="flex w-10 shrink-0 items-center justify-center text-ink transition-colors hover:bg-indigo/90 hover:text-white"
            >
              <PlusIcon className="h-3.5 w-3.5" />
            </button>
          </div>
          {quantity >= 100 && (
            <p className="mt-2 text-xs text-red-600">
              Maximum order quantity is 100.
            </p>
          )}
        </Field>

      </div>

      <Field label="Note for the rider (optional)" htmlFor="note" error={fieldErrors.note}>
        <input
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          aria-invalid={!!fieldErrors.note}
          aria-describedby={fieldErrors.note ? "note-error" : undefined}
          className={inputClasses}
          placeholder="e.g. call before arriving"
        />
      </Field>

      {formError ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm text-rose-600"
        >
          <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{formError}</span>
        </p>
      ) : null}

      <p className="text-xs leading-relaxed text-steel">
        Your personal data will be used to process your order, support your experience throughout this website.
      </p>

      {/* Submit button intentionally lives in OrderSummaryCard (form="order-form" targets this form) */}
    </form>
  );
}

const inputClasses =
  "w-full rounded-lg border border-cloud-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-steel/70 transition-colors duration-150 outline-none hover:border-steel/40 focus:border-indigo focus:ring-2 focus:ring-indigo/20";

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string[];
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-xs font-bold uppercase tracking-wide text-ink/80">
        {label}
        {required ? <span className="ml-0.5 text-rose-500">*</span> : null}
      </label>
      {children}
      {error?.[0] ? (
        <span id={`${htmlFor}-error`} role="alert" className="flex items-center gap-1 text-xs text-rose-600">
          <AlertIcon className="h-3 w-3 shrink-0" />
          {error[0]}
        </span>
      ) : null}
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx={12} cy={12} r={9} stroke="currentColor" strokeWidth={1.75} />
      <path d="M12 8v5" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" />
      <circle cx={12} cy={16} r={0.9} fill="currentColor" />
    </svg>
  );
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12h14" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}