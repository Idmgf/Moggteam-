import { afterAll, beforeEach, describe, expect, it } from "vitest";

const runIntegration = Boolean(process.env.TEST_DATABASE_URL);
const integration = runIntegration ? describe : describe.skip;

integration("promo redemption on PostgreSQL", async () => {
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
  process.env.CODE_HMAC_SECRET = "integration-code-secret-which-is-long-enough";
  process.env.OTP_HMAC_SECRET = "integration-otp-secret-which-is-long-enough";
  const [{ prisma }, { hashPromoCode }, { redeemPromoCode }] = await Promise.all([import("@/lib/prisma"), import("@/lib/codes"), import("@/lib/promo")]);
  const promo = "ABCD-EFGH-JKNP-QRST";
  beforeEach(async () => {
    await prisma.notificationLog.deleteMany(); await prisma.notificationSchedule.deleteMany(); await prisma.pointLedger.deleteMany(); await prisma.codeRedemption.deleteMany(); await prisma.promoCode.deleteMany(); await prisma.user.deleteMany(); await prisma.campaign.deleteMany();
  });
  afterAll(async () => { await prisma.$disconnect(); });
  it("awards a code exactly once under concurrent redemption", async () => {
    const campaign = await prisma.campaign.create({ data: { name:"test", status:"ACTIVE", isTest:true, configuration:{pointsPerCode:1} } });
    const [first,second] = await Promise.all([1,2].map((n)=>prisma.user.create({data:{name:`U${n}`,phone:`+7700000000${n}`,city:"A",ageGroup:"18_24",consentVersion:"test",consentedAt:new Date()}})));
    await prisma.promoCode.create({data:{codeHash:hashPromoCode(promo),campaignId:campaign.id}});
    const results = await Promise.all([redeemPromoCode(first.id,promo),redeemPromoCode(second.id,promo)]);
    expect(results.filter((result)=>result.status==="success")).toHaveLength(1);
    expect(await prisma.codeRedemption.count()).toBe(1);
    expect(await prisma.pointLedger.count()).toBe(1);
  });
});
