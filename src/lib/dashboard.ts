import { prisma } from "@/lib/prisma";

export async function getParticipantDashboard(userId: string) {
  const [user, balance, redemptions, claims, rewards] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: userId }, select: { name: true } }),
    prisma.pointLedger.aggregate({ where: { userId }, _sum: { delta: true } }),
    prisma.codeRedemption.findMany({ where: { userId }, orderBy: { redeemedAt: "desc" }, select: { id: true, pointsAwarded: true, redeemedAt: true } }),
    prisma.rewardClaim.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, include: { reward: true } }),
    prisma.reward.findMany({ where: { isActive: true }, orderBy: { pointsRequired: "asc" } }),
  ]);
  const points = balance._sum.delta ?? 0;
  const nextReward = rewards.find((reward) => reward.pointsRequired > points) ?? null;
  return { user, points, redemptions, claims, rewards, nextReward };
}

export async function getAdminMetrics() {
  const [participants, redeemedCodes, repeatRows, activatedUsers, issuedRewards] = await Promise.all([
    prisma.user.count({ where: { role: "PARTICIPANT" } }),
    prisma.codeRedemption.count(),
    prisma.codeRedemption.groupBy({ by: ["userId"], _count: { userId: true }, having: { userId: { _count: { gte: 2 } } } }),
    prisma.codeRedemption.groupBy({ by: ["userId"] }),
    prisma.rewardClaim.count({ where: { status: "FULFILLED" } }),
  ]);
  const repeatBuyers = repeatRows.length;
  const withCode = activatedUsers.length;
  return {
    participants,
    redeemedCodes,
    repeatBuyers,
    repeatRate: withCode ? Math.round((repeatBuyers / withCode) * 10_000) / 100 : 0,
    conversion: participants ? Math.round((withCode / participants) * 10_000) / 100 : 0,
    issuedRewards,
  };
}
