"use client";

import { useState, type FormEvent } from "react";

interface FieldErrors {
  customerName?: string[];
  phone?: string[];
  address?: string[];
  district?: string[];
  quantity?: string[];
  note?: string[];
}

export default function OrderForm() {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});
    setFormError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerName, phone, address, district, quantity, note }),
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
      <div className="rounded-2xl border border-white/20 bg-white/10 p-8 text-center text-white">
        <p className="font-display text-xl font-medium">Order received!</p>
        <p className="mt-2 text-sm text-white/85">
          Reference <span className="font-mono">{confirmedOrderId.slice(-8).toUpperCase()}</span> —
          we&apos;ll call {phone} to confirm delivery details shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-white/20 bg-white/10 p-6 text-left sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" htmlFor="customerName" error={fieldErrors.customerName}>
          <input
            id="customerName"
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full rounded-lg border border-white/30 bg-white/95 px-4 py-2.5 text-sm text-ink placeholder:text-steel"
            placeholder="Your name"
          />
        </Field>

        <Field label="Phone number" htmlFor="phone" error={fieldErrors.phone}>
          <input
            id="phone"
            required
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-white/30 bg-white/95 px-4 py-2.5 text-sm text-ink placeholder:text-steel"
            placeholder="01XXXXXXXXX"
          />
        </Field>
      </div>

      <Field label="Delivery address" htmlFor="address" error={fieldErrors.address}>
        <textarea
          id="address"
          required
          rows={2}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full rounded-lg border border-white/30 bg-white/95 px-4 py-2.5 text-sm text-ink placeholder:text-steel"
          placeholder="House, road, area, city"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="District (optional)" htmlFor="district" error={fieldErrors.district}>
          <input
            id="district"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full rounded-lg border border-white/30 bg-white/95 px-4 py-2.5 text-sm text-ink placeholder:text-steel"
            placeholder="e.g. Dhaka"
          />
        </Field>

        <Field label="Quantity" htmlFor="quantity" error={fieldErrors.quantity}>
          <input
            id="quantity"
            type="number"
            min={1}
            max={10}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full rounded-lg border border-white/30 bg-white/95 px-4 py-2.5 text-sm text-ink"
          />
        </Field>
      </div>

      <Field label="Note for the rider (optional)" htmlFor="note" error={fieldErrors.note}>
        <input
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full rounded-lg border border-white/30 bg-white/95 px-4 py-2.5 text-sm text-ink placeholder:text-steel"
          placeholder="e.g. call before arriving"
        />
      </Field>

      {formError ? <p className="text-sm text-amber-200">{formError}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-deep transition-all hover:-translate-y-0.5 disabled:opacity-60"
      >
        {isSubmitting ? "Placing order…" : "Confirm order — pay on delivery"}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-xs font-medium uppercase tracking-wide text-white/80">
        {label}
      </label>
      {children}
      {error?.[0] ? <span className="text-xs text-amber-200">{error[0]}</span> : null}
    </div>
  );
}
