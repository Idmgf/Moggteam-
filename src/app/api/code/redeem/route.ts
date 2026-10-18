import { apiError, apiSuccess, isKnownError } from "@/lib/api";
import { redeemPromoCode } from "@/lib/promo";
import { enforceRateLimit, requestIdentifier } from "@/lib/rate-limit";
import { requireUser } from "@/lib/session";
import { redeemCodeSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const parsed = redeemCodeSchema.safeParse(await request.json());
    if (!parsed.success) return apiError(parsed.error.issues[0]?.message ?? "code_invalid");
    await enforceRateLimit("code", `${requestIdentifier(request)}:${user.id}`, 10, 10 * 60 * 1000);
    const locale = request.headers.get("x-tamyr-locale") === "ru" ? "ru" : "kz";
    return apiSuccess(await redeemPromoCode(user.id, parsed.data.code, locale));
  } catch (error) {
    if (isKnownError(error, "unauthorized")) return apiError("unauthorized", 401);
    if (isKnownError(error, "rate_limited")) return apiError("rate_limited", 429);
    return apiError("connection", 500);
  }
}
