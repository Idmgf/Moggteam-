import { z } from "zod";
import { normalizeKzPhone } from "@/lib/phone";

const phoneSchema = z
  .string()
  .trim()
  .refine((value) => normalizeKzPhone(value) !== null, { message: "phone_invalid" })
  .transform((value) => normalizeKzPhone(value)!);

export const registrationSchema = z.object({
  name: z.string().trim().min(2, "name_invalid").max(120, "name_invalid"),
  phone: phoneSchema,
  city: z.string().trim().min(2, "city_invalid").max(100, "city_invalid"),
  ageGroup: z.enum(["14_17", "18_24", "25_34", "35_44", "45_PLUS"], { message: "age_invalid" }),
  promoCode: z.string().trim().max(24, "code_invalid").optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "consent_required" }) }),
  notificationsConsent: z.boolean().optional().default(false),
});

export const requestOtpSchema = z.object({ phone: phoneSchema });
export const verifyOtpSchema = z.object({
  phone: phoneSchema,
  code: z.string().regex(/^\d{6}$/, "otp_invalid"),
});
export const redeemCodeSchema = z.object({ code: z.string().trim().min(1, "code_invalid").max(24, "code_invalid") });
export const generateCodesSchema = z.object({
  count: z.number().int().min(1).max(100_000),
  campaignId: z.string().cuid(),
});
