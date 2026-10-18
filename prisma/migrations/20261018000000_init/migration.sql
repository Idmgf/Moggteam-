-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

CREATE TYPE "UserRole" AS ENUM ('PARTICIPANT', 'ADMIN');
CREATE TYPE "ConsentStatus" AS ENUM ('GRANTED', 'WITHDRAWN');
CREATE TYPE "CampaignStatus" AS ENUM ('DRAFT', 'ACTIVE', 'PAUSED', 'ENDED');
CREATE TYPE "PromoCodeStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'REDEEMED');
CREATE TYPE "RewardType" AS ENUM ('GUARANTEED', 'DRAW_ENTRY', 'OTHER');
CREATE TYPE "RewardClaimStatus" AS ENUM ('PENDING', 'APPROVED', 'FULFILLED', 'REJECTED');
CREATE TYPE "OtpPurpose" AS ENUM ('LOGIN');
CREATE TYPE "NotificationStatus" AS ENUM ('SCHEDULED', 'SENT', 'FAILED', 'CANCELLED');

CREATE TABLE "User" (
  "id" TEXT NOT NULL, "name" VARCHAR(120) NOT NULL, "phone" VARCHAR(16) NOT NULL, "city" VARCHAR(100) NOT NULL, "ageGroup" VARCHAR(32) NOT NULL,
  "consentStatus" "ConsentStatus" NOT NULL DEFAULT 'GRANTED', "consentVersion" VARCHAR(32) NOT NULL, "consentedAt" TIMESTAMP(3) NOT NULL,
  "notificationsConsent" BOOLEAN NOT NULL DEFAULT false, "role" "UserRole" NOT NULL DEFAULT 'PARTICIPANT', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Campaign" (
  "id" TEXT NOT NULL, "name" VARCHAR(120) NOT NULL, "startAt" TIMESTAMP(3), "endAt" TIMESTAMP(3), "status" "CampaignStatus" NOT NULL DEFAULT 'DRAFT', "configuration" JSONB NOT NULL, "isTest" BOOLEAN NOT NULL DEFAULT false, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "PromoCode" (
  "id" TEXT NOT NULL, "codeHash" VARCHAR(128) NOT NULL, "status" "PromoCodeStatus" NOT NULL DEFAULT 'ACTIVE', "campaignId" TEXT NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "activatedAt" TIMESTAMP(3), "activatedByUserId" TEXT,
  CONSTRAINT "PromoCode_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "CodeRedemption" (
  "id" TEXT NOT NULL, "userId" TEXT NOT NULL, "promoCodeId" TEXT NOT NULL, "pointsAwarded" INTEGER NOT NULL, "redeemedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "CodeRedemption_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "PointLedger" (
  "id" TEXT NOT NULL, "userId" TEXT NOT NULL, "delta" INTEGER NOT NULL, "reason" VARCHAR(80) NOT NULL, "redemptionId" TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PointLedger_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Reward" (
  "id" TEXT NOT NULL, "campaignId" TEXT NOT NULL, "nameKz" VARCHAR(160) NOT NULL, "nameRu" VARCHAR(160) NOT NULL, "descriptionKz" TEXT NOT NULL, "descriptionRu" TEXT NOT NULL, "pointsRequired" INTEGER NOT NULL, "rewardType" "RewardType" NOT NULL, "quantityLimit" INTEGER, "isActive" BOOLEAN NOT NULL DEFAULT false, "isConfirmed" BOOLEAN NOT NULL DEFAULT false, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Reward_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "RewardClaim" (
  "id" TEXT NOT NULL, "userId" TEXT NOT NULL, "rewardId" TEXT NOT NULL, "status" "RewardClaimStatus" NOT NULL DEFAULT 'PENDING', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "fulfilledAt" TIMESTAMP(3),
  CONSTRAINT "RewardClaim_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "ConsentRecord" (
  "id" TEXT NOT NULL, "userId" TEXT NOT NULL, "status" "ConsentStatus" NOT NULL, "version" VARCHAR(32) NOT NULL, "purpose" VARCHAR(240) NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ConsentRecord_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Session" (
  "id" TEXT NOT NULL, "userId" TEXT NOT NULL, "expiresAt" TIMESTAMP(3) NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "OtpChallenge" (
  "id" TEXT NOT NULL, "phone" VARCHAR(16) NOT NULL, "codeHash" VARCHAR(128) NOT NULL, "purpose" "OtpPurpose" NOT NULL, "expiresAt" TIMESTAMP(3) NOT NULL, "attempts" INTEGER NOT NULL DEFAULT 0, "consumedAt" TIMESTAMP(3), "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "OtpChallenge_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "RequestThrottle" (
  "id" TEXT NOT NULL, "keyHash" VARCHAR(128) NOT NULL, "windowStart" TIMESTAMP(3) NOT NULL, "hits" INTEGER NOT NULL DEFAULT 1, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "RequestThrottle_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "AuditLog" (
  "id" TEXT NOT NULL, "actorUserId" TEXT, "action" VARCHAR(120) NOT NULL, "entityType" VARCHAR(80) NOT NULL, "entityId" VARCHAR(120), "metadata" JSONB, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "NotificationSchedule" (
  "id" TEXT NOT NULL, "userId" TEXT NOT NULL, "event" VARCHAR(80) NOT NULL, "channel" VARCHAR(32) NOT NULL, "locale" VARCHAR(8) NOT NULL, "templateKey" VARCHAR(80) NOT NULL, "scheduledFor" TIMESTAMP(3) NOT NULL, "status" "NotificationStatus" NOT NULL DEFAULT 'SCHEDULED', "providerMessage" VARCHAR(160), "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "NotificationSchedule_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "NotificationLog" (
  "id" TEXT NOT NULL, "scheduleId" TEXT NOT NULL, "status" "NotificationStatus" NOT NULL, "providerRef" VARCHAR(160), "errorCode" VARCHAR(80), "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "NotificationLog_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");
CREATE INDEX "Campaign_status_idx" ON "Campaign"("status");
CREATE UNIQUE INDEX "PromoCode_codeHash_key" ON "PromoCode"("codeHash");
CREATE INDEX "PromoCode_campaignId_status_idx" ON "PromoCode"("campaignId", "status");
CREATE INDEX "PromoCode_activatedByUserId_idx" ON "PromoCode"("activatedByUserId");
CREATE UNIQUE INDEX "CodeRedemption_promoCodeId_key" ON "CodeRedemption"("promoCodeId");
CREATE INDEX "CodeRedemption_userId_redeemedAt_idx" ON "CodeRedemption"("userId", "redeemedAt");
CREATE UNIQUE INDEX "PointLedger_redemptionId_key" ON "PointLedger"("redemptionId");
CREATE INDEX "PointLedger_userId_createdAt_idx" ON "PointLedger"("userId", "createdAt");
CREATE INDEX "Reward_campaignId_isActive_idx" ON "Reward"("campaignId", "isActive");
CREATE UNIQUE INDEX "RewardClaim_userId_rewardId_key" ON "RewardClaim"("userId", "rewardId");
CREATE INDEX "RewardClaim_rewardId_status_idx" ON "RewardClaim"("rewardId", "status");
CREATE INDEX "ConsentRecord_userId_createdAt_idx" ON "ConsentRecord"("userId", "createdAt");
CREATE INDEX "Session_userId_expiresAt_idx" ON "Session"("userId", "expiresAt");
CREATE INDEX "OtpChallenge_phone_purpose_expiresAt_idx" ON "OtpChallenge"("phone", "purpose", "expiresAt");
CREATE UNIQUE INDEX "RequestThrottle_keyHash_key" ON "RequestThrottle"("keyHash");
CREATE INDEX "AuditLog_entityType_entityId_idx" ON "AuditLog"("entityType", "entityId");
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");
CREATE INDEX "NotificationSchedule_status_scheduledFor_idx" ON "NotificationSchedule"("status", "scheduledFor");
CREATE INDEX "NotificationLog_scheduleId_createdAt_idx" ON "NotificationLog"("scheduleId", "createdAt");

ALTER TABLE "PromoCode" ADD CONSTRAINT "PromoCode_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "CodeRedemption" ADD CONSTRAINT "CodeRedemption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "CodeRedemption" ADD CONSTRAINT "CodeRedemption_promoCodeId_fkey" FOREIGN KEY ("promoCodeId") REFERENCES "PromoCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "PointLedger" ADD CONSTRAINT "PointLedger_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Reward" ADD CONSTRAINT "Reward_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "RewardClaim" ADD CONSTRAINT "RewardClaim_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "RewardClaim" ADD CONSTRAINT "RewardClaim_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "Reward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ConsentRecord" ADD CONSTRAINT "ConsentRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "NotificationSchedule" ADD CONSTRAINT "NotificationSchedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "NotificationLog" ADD CONSTRAINT "NotificationLog_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "NotificationSchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
