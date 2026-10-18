import { createHmac } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { requireSecret } from "@/lib/env";

export async function enforceRateLimit(scope: string, identifier: string, maxHits: number, windowMs: number) {
  const keyHash = createHmac("sha256", requireSecret("OTP_HMAC_SECRET"))
    .update(`${scope}:${identifier}`)
    .digest("hex");
  const now = new Date();
  const resetBefore = new Date(now.getTime() - windowMs);

  const bucket = await prisma.requestThrottle.findUnique({ where: { keyHash } });
  if (!bucket) {
    await prisma.requestThrottle.create({ data: { keyHash, windowStart: now } });
    return;
  }
  if (bucket.windowStart < resetBefore) {
    await prisma.requestThrottle.update({ where: { keyHash }, data: { windowStart: now, hits: 1 } });
    return;
  }
  if (bucket.hits >= maxHits) throw new Error("rate_limited");
  await prisma.requestThrottle.update({ where: { keyHash }, data: { hits: { increment: 1 } } });
}

export function requestIdentifier(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}
