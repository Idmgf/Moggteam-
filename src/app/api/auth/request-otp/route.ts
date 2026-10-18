import { apiError, apiSuccess, isKnownError } from "@/lib/api";
import { getDevOtpCode, isDevBypassEnabled, requestLoginOtp } from "@/lib/otp";
import { enforceRateLimit, requestIdentifier } from "@/lib/rate-limit";
import { requestOtpSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const parsed = requestOtpSchema.safeParse(await request.json());
    if (!parsed.success) return apiError(parsed.error.issues[0]?.message ?? "phone_invalid");
    await enforceRateLimit("otp-request", `${requestIdentifier(request)}:${parsed.data.phone}`, 5, 10 * 60 * 1000);
    if (isDevBypassEnabled()) {
      const code = getDevOtpCode();
      if (code) {
        console.info(`[TAMYR POP DEV OTP] ${code} — используйте этот код для локальной проверки без SMS.`);
      }
    }
    await requestLoginOtp(parsed.data.phone);
    return apiSuccess({ status: "otp_requested" });
  } catch (error) {
    if (isKnownError(error, "rate_limited")) return apiError("rate_limited", 429);
    if (isKnownError(error, "otp_provider_unconfigured")) return apiError("otp_provider_unconfigured", 503);
    return apiError("connection", 500);
  }
}
