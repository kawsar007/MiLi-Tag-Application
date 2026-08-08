"use client";

import { useCallback, useEffect, useState } from "react";

export interface ProductData {
  id: string;
  slug: string;
  name: string;
  title: string | null;
  subtitle: string | null;
  priceCents: number;
  originalPriceCents: number | null;
  discountPriceCents: number | null;
  isActive: boolean;
  updatedAt: string;
}

interface UseProductResult {
  product: ProductData | null;
  isLoading: boolean;
  error: string | null;
  /** Re-fetches on demand — e.g. after an admin saves a product edit. */
  refetch: () => void;
}

/**
 * Fetches the primary product from GET /api/product. Deliberately the only
 * place in the codebase that calls that endpoint — any component that
 * needs live product data (checkout summary, hero pricing, admin product
 * editor, etc.) should use this hook rather than fetching directly, so
 * there's one shared loading/error/refetch contract.
 */
export function useProduct(): UseProductResult {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/mili-tag/api/product");
      if (!res.ok) throw new Error("Failed to load product");
      const data = await res.json();
      setProduct(data.product);
    } catch {
      setError("Couldn't load product details.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Standard fetch-on-mount effect — fetchProduct() updates state
    // internally once the request resolves, not synchronously here (same
    // pattern used in the admin analytics dashboard).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProduct();
  }, [fetchProduct]);

  return { product, isLoading, error, refetch: fetchProduct };
}