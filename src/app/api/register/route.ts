import { Prisma } from "@prisma/client";
import { apiError, apiSuccess, isKnownError } from "@/lib/api";
import { requestIdentifier, enforceRateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";
import { redeemPromoCode } from "@/lib/promo";
import { createSession } from "@/lib/session";
import { registrationSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const parsed = registrationSchema.safeParse(await request.json());
    if (!parsed.success) return apiError(parsed.error.issues[0]?.message ?? "connection");
    const data = parsed.data;
    await enforceRateLimit("register", `${requestIdentifier(request)}:${data.phone}`, 5, 10 * 60 * 1000);
    const user = await prisma.$transaction(async (tx) => {
      const created = await tx.user.create({
        data: {
          name: data.name, phone: data.phone, city: data.city, ageGroup: data.ageGroup,
          consentStatus: "GRANTED", consentVersion: "v1-draft", consentedAt: new Date(), notificationsConsent: data.notificationsConsent,
        },
      });
      await tx.consentRecord.create({ data: { userId: created.id, status: "GRANTED", version: "v1-draft", purpose: "Participation in TAMYR POP and participant progress" } });
      await tx.auditLog.create({ data: { actorUserId: created.id, action: "USER_REGISTERED", entityType: "User", entityId: created.id } });
      return created;
    });
    const redemption = data.promoCode ? await redeemPromoCode(user.id, data.promoCode) : null;
    await createSession(user.id, user.role);
    return apiSuccess({ redemption: redemption?.status ?? null });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") return apiError("phone_taken", 409);
    if (isKnownError(error, "rate_limited")) return apiError("rate_limited", 429);
    return apiError("connection", 500);
  }
}
