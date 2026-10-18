import { Prisma } from "@prisma/client";
import { apiError, apiSuccess, isKnownError } from "@/lib/api";
import { generateUniquePromoCodes, hashPromoCode } from "@/lib/codes";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { generateCodesSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();
    const parsed = generateCodesSchema.safeParse(await request.json());
    if (!parsed.success) return apiError("connection");
    const campaign = await prisma.campaign.findUnique({ where: { id: parsed.data.campaignId }, select: { id: true } });
    if (!campaign) return apiError("connection");

    const createdCodes: string[] = [];
    for (let attempts = 0; createdCodes.length < parsed.data.count && attempts < 5; attempts += 1) {
      const batch = generateUniquePromoCodes(parsed.data.count - createdCodes.length);
      const result = await prisma.promoCode.createMany({
        data: batch.map((code) => ({ codeHash: hashPromoCode(code), campaignId: campaign.id })),
        skipDuplicates: true,
      });
      createdCodes.push(...batch.slice(0, result.count));
    }
    if (createdCodes.length !== parsed.data.count) throw new Error("code_generation_failed");
    await prisma.auditLog.create({ data: { actorUserId: admin.id, action: "PROMO_CODES_GENERATED", entityType: "Campaign", entityId: campaign.id, metadata: { count: createdCodes.length } } });
    // Plaintext values are sent only in this one response; they are never persisted.
    return apiSuccess({ codes: createdCodes });
  } catch (error) {
    if (isKnownError(error, "unauthorized")) return apiError("unauthorized", 401);
    if (isKnownError(error, "forbidden")) return apiError("forbidden", 403);
    if (error instanceof Prisma.PrismaClientKnownRequestError) return apiError("connection", 500);
    return apiError("connection", 500);
  }
}
