"use client";

import { useProduct } from "@/hooks/useProduct";
import {
  AlertCircle,
  AlignLeft,
  CheckCircle,
  DollarSign,
  Edit3,
  Loader2,
  Package,
  Percent,
  Save,
  Type
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

interface FieldErrors {
  name?: string[];
  title?: string[];
  subtitle?: string[];
  originalPrice?: string[];
  discountPrice?: string[];
}

function centsToTakaString(cents: number | null): string {
  return cents === null ? "" : String(cents / 100);
}

export default function ProductForm() {
  const { product, isLoading, error: loadError, refetch } = useProduct();

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");

  const hasSeededForm = useRef(false);
  useEffect(() => {
    if (!product || hasSeededForm.current) return;
    hasSeededForm.current = true;
    setName(product.name);
    setTitle(product.title ?? "");
    setSubtitle(product.subtitle ?? "");
    setOriginalPrice(centsToTakaString(product.originalPriceCents));
    setDiscountPrice(centsToTakaString(product.discountPriceCents));
  }, [product]);

  const [isSaving, setIsSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setFieldErrors({});
    setFormError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/mili-tag/api/product", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          title: title || undefined,
          subtitle: subtitle || undefined,
          originalPrice: originalPrice ? Number(originalPrice) : undefined,
          discountPrice: discountPrice ? Number(discountPrice) : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.issues) setFieldErrors(data.issues);
        setFormError(data.error ?? "Couldn't save product changes.");
        return;
      }

      setSuccessMessage("Product updated successfully!");
      refetch();
    } catch {
      setFormError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setIsSaving(false);
    }
  }

  // Calculate savings percentage
  const calculateSavings = () => {
    if (originalPrice && discountPrice) {
      const original = parseFloat(originalPrice);
      const discount = parseFloat(discountPrice);
      if (original > 0 && discount > 0 && discount < original) {
        return Math.round(((original - discount) / original) * 100);
      }
    }
    return null;
  };

  const savingsPercentage = calculateSavings();

  if (isLoading && !product) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm">
        <div className="relative">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
          <Package className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-indigo-600" />
        </div>
        <p className="mt-4 text-sm font-medium text-slate-600">Loading product information...</p>
      </div>
    );
  }

  if (loadError && !product) {
    return (
      <div className="rounded-2xl border border-red-200/60 bg-red-50/50 p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <AlertCircle className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="mt-3 text-sm font-semibold text-red-800">Unable to load product</h3>
        <p className="mt-1 text-sm text-red-600">{loadError}</p>
        <button
          onClick={() => refetch()}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center w-full max-w-full mx-auto gap-6 rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm sm:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 p-2.5 shadow-lg shadow-indigo-500/20">
            <Edit3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Update Product</h2>
            <p className="text-sm text-slate-500">Update your product information and pricing</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Product Information Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm transition-shadow hover:shadow-md">
          <div className="border-b border-slate-200/60 bg-gradient-to-r from-slate-50/80 to-white px-6 py-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-indigo-600" />
              <h3 className="text-sm font-semibold text-slate-900">Product Details</h3>
            </div>
          </div>
          <div className="space-y-5 p-6">
            {/* Product Name */}
            <div className="space-y-1.5">
              <label htmlFor="product-name" className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                Product Name
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Type className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  id="product-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full rounded-lg border ${fieldErrors.name ? "border-red-300" : "border-slate-200"
                    } bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 hover:border-slate-300`}
                  placeholder="Enter product name"
                />
              </div>
              {fieldErrors.name?.[0] && (
                <p className="flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {fieldErrors.name[0]}
                </p>
              )}
            </div>

            {/* Title */}
            <div className="space-y-1.5">
              <label htmlFor="product-title" className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                Title
                <span className="text-xs font-normal text-slate-400">(optional)</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Type className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  id="product-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full rounded-lg border ${fieldErrors.title ? "border-red-300" : "border-slate-200"
                    } bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 hover:border-slate-300`}
                  placeholder="Enter product title"
                />
              </div>
              {fieldErrors.title?.[0] && (
                <p className="flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {fieldErrors.title[0]}
                </p>
              )}
            </div>

            {/* Subtitle */}
            <div className="space-y-1.5">
              <label htmlFor="product-subtitle" className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                Subtitle
                <span className="text-xs font-normal text-slate-400">(optional)</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-3 top-3">
                  <AlignLeft className="h-4 w-4 text-slate-400" />
                </div>
                <textarea
                  id="product-subtitle"
                  rows={2}
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className={`w-full rounded-lg border ${fieldErrors.subtitle ? "border-red-300" : "border-slate-200"
                    } bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 hover:border-slate-300 resize-none`}
                  placeholder="Enter product subtitle"
                />
              </div>
              {fieldErrors.subtitle?.[0] && (
                <p className="flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {fieldErrors.subtitle[0]}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm transition-shadow hover:shadow-md">
          <div className="border-b border-slate-200/60 bg-gradient-to-r from-slate-50/80 to-white px-6 py-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-indigo-600" />
              <h3 className="text-sm font-semibold text-slate-900">Pricing</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Original Price */}
              <div className="space-y-1.5">
                <label htmlFor="product-original-price" className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                  Original Price
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-sm font-medium text-slate-400">৳</span>
                  </div>
                  <input
                    id="product-original-price"
                    type="number"
                    min={0}
                    step="0.01"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    className={`w-full rounded-lg border ${fieldErrors.originalPrice ? "border-red-300" : "border-slate-200"
                      } bg-white pl-8 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 hover:border-slate-300`}
                    placeholder="0.00"
                  />
                </div>
                {fieldErrors.originalPrice?.[0] && (
                  <p className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {fieldErrors.originalPrice[0]}
                  </p>
                )}
              </div>

              {/* Discount Price */}
              <div className="space-y-1.5">
                <label htmlFor="product-discount-price" className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                  Discount Price
                  <span className="text-xs font-normal text-slate-400">(optional)</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-sm font-medium text-slate-400">৳</span>
                  </div>
                  <input
                    id="product-discount-price"
                    type="number"
                    min={0}
                    step="0.01"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                    className={`w-full rounded-lg border ${fieldErrors.discountPrice ? "border-red-300" : "border-slate-200"
                      } bg-white pl-8 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 hover:border-slate-300`}
                    placeholder="0.00"
                  />
                </div>
                {fieldErrors.discountPrice?.[0] && (
                  <p className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {fieldErrors.discountPrice[0]}
                  </p>
                )}
              </div>
            </div>

            {/* Savings Preview */}
            {savingsPercentage !== null && savingsPercentage > 0 && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3">
                <Percent className="h-4 w-4 text-emerald-600" />
                <p className="text-sm text-emerald-700">
                  <span className="font-semibold">{savingsPercentage}%</span> savings for customers
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Status Messages */}
        {(formError || successMessage) && (
          <div
            className={`flex items-start gap-3 rounded-xl border p-4 ${formError
              ? "border-red-200/60 bg-red-50/80 text-red-700"
              : "border-emerald-200/60 bg-emerald-50/80 text-emerald-700"
              }`}
          >
            {formError ? (
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
            ) : (
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
            )}
            <div>
              <p className="text-sm font-medium">{formError || successMessage}</p>
              {formError && (
                <p className="mt-0.5 text-xs opacity-75">
                  Please check your inputs and try again.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-indigo-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>

        {/* Help Text */}
        <p className="text-center text-xs text-slate-400">
          All changes will be reflected immediately on the website
        </p>
      </form>
    </div>
  );
}