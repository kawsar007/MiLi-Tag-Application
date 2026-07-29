export const ORDER_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface OrderRecord {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  district: string | null;
  quantity: number;
  unitPriceCents: number;
  totalCents: number;
  note: string | null;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  product?: { name: string };
}

export interface OrdersResponse {
  orders: OrderRecord[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface AdminSession {
  id: string;
  email: string;
  name: string;
}
