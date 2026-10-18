import { apiError, apiSuccess, isKnownError } from "@/lib/api";
import { verifyLoginOtp } from "@/lib/otp";
import { enforceRateLimit, requestIdentifier } from "@/lib/rate-limit";
import { createSession } from "@/lib/session";
import { verifyOtpSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const parsed = verifyOtpSchema.safeParse(await request.json());
    if (!parsed.success) return apiError(parsed.error.issues[0]?.message ?? "otp_invalid");
    await enforceRateLimit("otp-verify", `${requestIdentifier(request)}:${parsed.data.phone}`, 5, 10 * 60 * 1000);
    const user = await verifyLoginOtp(parsed.data.phone, parsed.data.code);
    await createSession(user.id, user.role);
    return apiSuccess({ status: "authenticated" });
  } catch (error) {
    if (isKnownError(error, "rate_limited")) return apiError("rate_limited", 429);
    if (isKnownError(error, "otp_invalid")) return apiError("otp_invalid", 400);
    return apiError("connection", 500);
  }
}
