import { createHmac, randomInt, timingSafeEqual } from "node:crypto";
import { OtpPurpose } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { isProduction, requireSecret } from "@/lib/env";

const OTP_TTL_MINUTES = 10;
const MAX_OTP_ATTEMPTS = 5;
const DEV_OTP_CODE = "000000";

function otpHash(phone: string, code: string) {
  return createHmac("sha256", requireSecret("OTP_HMAC_SECRET")).update(`${phone}:${code}`).digest("hex");
}

export function getDevOtpCode() {
  if (!isProduction() && process.env.ALLOW_DEV_OTP === "true") return DEV_OTP_CODE;
  return null;
}

function createOtp() {
  const devCode = getDevOtpCode();
  if (devCode) return devCode;
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

interface OtpProvider {
  send(input: { code: string }): Promise<void>;
}

class DevConsoleOtpProvider implements OtpProvider {
  async send({ code }: { code: string }) {
    // Deliberately excludes the recipient phone number from logs.
    console.info(`[TAMYR POP DEV OTP] ${code} — используйте этот код для локальной проверки без SMS.`);
  }
}

class UnconfiguredOtpProvider implements OtpProvider {
  async send() {
    throw new Error("otp_provider_unconfigured");
  }
}

function getProvider(): OtpProvider {
  if (isDevBypassEnabled()) return new DevConsoleOtpProvider();
  return new UnconfiguredOtpProvider();
}

export async function requestLoginOtp(phone: string) {
  const devBypass = isDevBypassEnabled();
  if (!devBypass) {
    const user = await prisma.user.findUnique({ where: { phone }, select: { id: true } });
    if (!user) return; // Neutral response: never disclose whether the phone is registered.
  }

  const code = createOtp();
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

  if (devBypass) {
    await prisma.user.upsert({
      where: { phone },
      update: {},
      create: {
        name: "Dev User",
        phone,
        city: "Local Test",
        ageGroup: "18_24",
        consentStatus: "GRANTED",
        consentVersion: "dev-local",
        consentedAt: new Date(),
      },
    });
  }

  await prisma.otpChallenge.create({
    data: { phone, codeHash: otpHash(phone, code), purpose: OtpPurpose.LOGIN, expiresAt },
  });
  await getProvider().send({ code });
}

export function isDevBypassEnabled() {
  return !isProduction() && process.env.ALLOW_DEV_OTP === "true";
}

export async function verifyLoginOtp(phone: string, code: string) {
  const challenge = await prisma.otpChallenge.findFirst({
    where: { phone, purpose: OtpPurpose.LOGIN, consumedAt: null, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: "desc" },
  });
  if (!challenge || challenge.attempts >= MAX_OTP_ATTEMPTS) throw new Error("otp_invalid");

  const expected = Buffer.from(challenge.codeHash, "hex");
  const received = Buffer.from(otpHash(phone, code), "hex");
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
    await prisma.otpChallenge.update({ where: { id: challenge.id }, data: { attempts: { increment: 1 } } });
    throw new Error("otp_invalid");
  }
  await prisma.otpChallenge.update({ where: { id: challenge.id }, data: { consumedAt: new Date() } });

  let user = await prisma.user.findUnique({ where: { phone } });
  if (!user && isDevBypassEnabled()) {
    user = await prisma.user.create({
      data: {
        name: "Dev User",
        phone,
        city: "Local Test",
        ageGroup: "18_24",
        consentStatus: "GRANTED",
        consentVersion: "dev-local",
        consentedAt: new Date(),
      },
    });
  }

  if (!user) throw new Error("otp_invalid");
  return user;
}
