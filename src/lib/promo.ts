import { Prisma, PromoCodeStatus, RewardClaimStatus } from "@prisma/client";
import { hashPromoCode, isPromoCodeFormatValid } from "@/lib/codes";
import { prisma } from "@/lib/prisma";
import { scheduleAfterRedemption } from "@/lib/notifications";

export type RedeemResult =
  | { status: "success"; pointsAwarded: number; balance: number }
  | { status: "not_found" | "inactive" | "already_used" };

function pointsFromConfiguration(configuration: Prisma.JsonValue) {
  if (typeof configuration === "object" && configuration && !Array.isArray(configuration)) {
    const value = configuration.pointsPerCode;
    if (typeof value === "number" && Number.isInteger(value) && value > 0 && value <= 1000) return value;
  }
  return 1;
}

export async function redeemPromoCode(userId: string, code: string, locale?: string): Promise<RedeemResult> {
  if (!isPromoCodeFormatValid(code)) return { status: "not_found" };
  const codeHash = hashPromoCode(code);
  try {
    return await prisma.$transaction(
      async (tx) => {
        const promoCode = await tx.promoCode.findUnique({
          where: { codeHash },
          include: { campaign: true },
        });
        if (!promoCode) return { status: "not_found" } as const;
        if (promoCode.status === PromoCodeStatus.INACTIVE || promoCode.campaign.status !== "ACTIVE") return { status: "inactive" } as const;
        if (promoCode.status !== PromoCodeStatus.ACTIVE) return { status: "already_used" } as const;

        // The conditional update is the concurrency gate: precisely one request can own a code.
        const claimed = await tx.promoCode.updateMany({
          where: { id: promoCode.id, status: PromoCodeStatus.ACTIVE },
          data: { status: PromoCodeStatus.REDEEMED, activatedAt: new Date(), activatedByUserId: userId },
        });
        if (claimed.count !== 1) return { status: "already_used" } as const;

        const pointsAwarded = pointsFromConfiguration(promoCode.campaign.configuration);
        const redemption = await tx.codeRedemption.create({
          data: { userId, promoCodeId: promoCode.id, pointsAwarded },
        });
        await tx.pointLedger.create({
          data: { userId, delta: pointsAwarded, reason: "PROMO_CODE", redemptionId: redemption.id },
        });
        const user = await tx.user.findUniqueOrThrow({ where: { id: userId }, select: { notificationsConsent: true } });
        await scheduleAfterRedemption(tx, { userId, notificationsConsent: user.notificationsConsent, locale });
        const balance = await tx.pointLedger.aggregate({ where: { userId }, _sum: { delta: true } });
        return { status: "success", pointsAwarded, balance: balance._sum.delta ?? 0 } as const;
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") return { status: "already_used" };
    throw error;
  }
}

export async function claimReward(userId: string, rewardId: string) {
  return prisma.$transaction(
    async (tx) => {
      const reward = await tx.reward.findFirst({ where: { id: rewardId, isActive: true, isConfirmed: true } });
      if (!reward) throw new Error("reward_unavailable");
      const balance = await tx.pointLedger.aggregate({ where: { userId }, _sum: { delta: true } });
      if ((balance._sum.delta ?? 0) < reward.pointsRequired) throw new Error("not_enough_points");
      if (reward.quantityLimit !== null) {
        const issued = await tx.rewardClaim.count({ where: { rewardId, status: { not: RewardClaimStatus.REJECTED } } });
        if (issued >= reward.quantityLimit) throw new Error("reward_limit_reached");
      }
      return tx.rewardClaim.create({ data: { userId, rewardId } });
    },
    { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
  );
}
