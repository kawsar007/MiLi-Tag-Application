import { PRIMARY_PRODUCT_SLUG } from "@/lib/constants";
import { toCents } from "@/lib/money";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/require-admin";
import { productUpdateSchema } from "@/lib/validations";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const PRODUCT_SELECT = {
  id: true,
  slug: true,
  name: true,
  title: true,
  subtitle: true,
  priceCents: true,
  originalPriceCents: true,
  discountPriceCents: true,
  isActive: true,
  updatedAt: true,
} as const;

/**
 * GET /api/product
 * Public. Returns the primary product's current marketing copy + pricing —
 * consumed by the checkout form's live order summary and (via useProduct())
 * any other component that needs up-to-date product details.
 */
export async function GET() {
  const product = await prisma.product.findUnique({
    where: { slug: PRIMARY_PRODUCT_SLUG },
    select: PRODUCT_SELECT,
  });

  if (!product || !product.isActive) {
    return NextResponse.json({ error: "Product not available" }, { status: 404 });
  }

  return NextResponse.json({ product });
}

/**
 * PATCH /api/product
 * Admin only. Updates the single primary product identified by
 * PRIMARY_PRODUCT_SLUG (the same constant the seed script and order API
 * use) — creates it if it somehow doesn't exist yet, otherwise updates it
 * in place. Never creates a second/duplicate product.
 *
 * `priceCents` (the price actually charged at checkout — see /api/orders)
 * is derived automatically as discountPriceCents ?? originalPriceCents
 * whenever either price field changes, so this endpoint is the only place
 * that needs to know about that relationship.
 */
export async function PATCH(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = productUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }
  const { name, title, subtitle, originalPrice, discountPrice } = parsed.data;

  const existing = await prisma.product.findUnique({ where: { slug: PRIMARY_PRODUCT_SLUG } });

  // Resolve the full next-state for both price fields so we can validate
  // their relationship even on a partial update (e.g. only discountPrice
  // sent, but an originalPrice already exists from a previous update).
  const nextOriginalPriceCents =
    originalPrice !== undefined ? toCents(originalPrice) : existing?.originalPriceCents ?? null;
  const nextDiscountPriceCents =
    discountPrice !== undefined ? toCents(discountPrice) : existing?.discountPriceCents ?? null;

  if (
    nextOriginalPriceCents !== null &&
    nextDiscountPriceCents !== null &&
    nextDiscountPriceCents > nextOriginalPriceCents
  ) {
    return NextResponse.json(
      {
        error: "Validation failed",
        issues: { discountPrice: ["Discount price cannot be higher than the original price"] },
      },
      { status: 422 }
    );
  }

  const effectivePriceCents =
    nextDiscountPriceCents ?? nextOriginalPriceCents ?? existing?.priceCents ?? null;

  if (!existing && (!name || effectivePriceCents === null)) {
    return NextResponse.json(
      {
        error: "Validation failed",
        issues: {
          name: !name ? ["Product doesn't exist yet — name is required to create it"] : undefined,
          originalPrice:
            effectivePriceCents === null
              ? ["Product doesn't exist yet — originalPrice is required to create it"]
              : undefined,
        },
      },
      { status: 422 }
    );
  }

  const product = await prisma.product.upsert({
    where: { slug: PRIMARY_PRODUCT_SLUG },
    create: {
      slug: PRIMARY_PRODUCT_SLUG,
      name: name!,
      title,
      subtitle,
      priceCents: effectivePriceCents!,
      originalPriceCents: nextOriginalPriceCents,
      discountPriceCents: nextDiscountPriceCents,
    },
    update: {
      ...(name !== undefined ? { name } : {}),
      ...(title !== undefined ? { title } : {}),
      ...(subtitle !== undefined ? { subtitle } : {}),
      ...(nextOriginalPriceCents !== existing?.originalPriceCents
        ? { originalPriceCents: nextOriginalPriceCents }
        : {}),
      ...(nextDiscountPriceCents !== existing?.discountPriceCents
        ? { discountPriceCents: nextDiscountPriceCents }
        : {}),
      ...(effectivePriceCents !== null && effectivePriceCents !== existing?.priceCents
        ? { priceCents: effectivePriceCents }
        : {}),
    },
    select: PRODUCT_SELECT,
  });

  return NextResponse.json({ product });
}