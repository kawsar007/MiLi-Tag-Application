import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { orderCreateSchema, orderStatusValues } from "@/lib/validations";
import { getAdminFromRequest } from "@/lib/require-admin";
import { PRIMARY_PRODUCT_SLUG } from "@/lib/constants";

// Orders touch the database on every request — never statically cache this route.
export const dynamic = "force-dynamic";

/**
 * POST /api/orders
 * Public endpoint. Anyone can place a Cash on Delivery order without an account.
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = orderCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const product = await prisma.product.findUnique({
    where: { slug: PRIMARY_PRODUCT_SLUG },
  });

  if (!product || !product.isActive) {
    return NextResponse.json(
      { error: "This product is not currently available for order." },
      { status: 409 }
    );
  }

  const { customerName, phone, address, district, quantity, note } = parsed.data;
  const totalCents = product.priceCents * quantity;

  const order = await prisma.order.create({
    data: {
      customerName,
      phone,
      address,
      district: district || null,
      quantity,
      unitPriceCents: product.priceCents,
      totalCents,
      note: note || null,
      productId: product.id,
    },
    select: { id: true, status: true, totalCents: true, createdAt: true },
  });

  return NextResponse.json({ order }, { status: 201 });
}

/**
 * GET /api/orders
 * Admin only. Lists orders, newest first, with optional ?status= filter and ?q= search on name/phone.
 */
export async function GET(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const statusParam = searchParams.get("status");
  const isValidStatus = (
    value: string | null
  ): value is (typeof orderStatusValues)[number] =>
    !!value && (orderStatusValues as readonly string[]).includes(value);
  const q = searchParams.get("q")?.trim();
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const pageSize = 20;

  const where: Prisma.OrderWhereInput = {
    ...(isValidStatus(statusParam) ? { status: statusParam } : {}),
    ...(q
      ? {
          OR: [
            { customerName: { contains: q } },
            { phone: { contains: q } },
          ],
        }
      : {}),
  };

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { product: { select: { name: true } } },
    }),
    prisma.order.count({ where }),
  ]);

  return NextResponse.json({
    orders,
    pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
  });
}
