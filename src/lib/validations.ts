import { z } from "zod";

const bdPhoneRegex = /^(?:\+?880|0)1[3-9]\d{8}$/;

export const orderCreateSchema = z.object({
  customerName: z.string().trim().min(2, "Enter your full name").max(120),
  phone: z
    .string()
    .trim()
    .regex(bdPhoneRegex, "Enter a valid Bangladeshi mobile number, e.g. 01XXXXXXXXX"),
  address: z.string().trim().min(10, "Add a complete delivery address").max(500),
  district: z.string().trim().max(80).optional().or(z.literal("")),
  quantity: z.coerce.number().int().min(1).max(100).default(1),
  note: z.string().trim().max(300).optional().or(z.literal("")),
});

export type OrderCreateInput = z.infer<typeof orderCreateSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const orderStatusValues = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
] as const;

export const orderStatusUpdateSchema = z.object({
  status: z.enum(orderStatusValues),
});

export type OrderStatusUpdateInput = z.infer<typeof orderStatusUpdateSchema>;
