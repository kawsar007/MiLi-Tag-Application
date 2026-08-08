import { deliveryOptions } from "@/constants/product";
import { z } from "zod";

const bdPhoneRegex = /^(?:\+?880|0)1[3-9]\d{8}$/;

const deliveryAreaValues = deliveryOptions.map((o) => o.value) as [string, ...string[]];

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
  deliveryArea: z.enum(deliveryAreaValues).default(deliveryAreaValues[0]).refine(
    (value) => deliveryAreaValues.includes(value),
    { message: "Please select a delivery area." }
  ),
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


// No password-strength policy existed anywhere in the project before this
// (the login schema's min(6) is just a minimum length for the *login*
// field, not a creation/change policy) — this is a new policy, applied
// only to password changes. Login itself is untouched.
export const passwordPolicySchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Za-z]/, "Password must include at least one letter")
  .regex(/\d/, "Password must include at least one number");

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password"),
    newPassword: passwordPolicySchema,
    confirmNewPassword: z.string().min(1, "Confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New password and confirmation do not match",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "New password must be different from your current password",
    path: ["newPassword"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;


export const productUpdateSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(200).optional(),
    title: z.string().trim().min(2, "Title must be at least 2 characters").max(200).optional(),
    subtitle: z.string().trim().max(300).optional(),
    originalPrice: z.coerce.number().positive("Original price must be greater than 0").optional(),
    discountPrice: z.coerce.number().positive("Discount price must be greater than 0").optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Provide at least one field to update",
  });

export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;