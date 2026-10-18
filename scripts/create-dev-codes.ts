import { PrismaClient } from "@prisma/client";
import { generateUniquePromoCodes, hashPromoCode } from "../src/lib/codes";

process.loadEnvFile?.(".env");
if (process.env.NODE_ENV === "production") throw new Error("Dev test-code generation is disabled in production.");
if (process.env.DEMO_MODE !== "true") throw new Error("Set DEMO_MODE=true to generate TEST campaign codes.");

const count = Number(process.argv[2] ?? 5);
const prisma = new PrismaClient();
async function main() {
  if (!Number.isInteger(count) || count < 1 || count > 1000) throw new Error("Count must be an integer from 1 to 1000.");
  const campaign = await prisma.campaign.findFirstOrThrow({ where: { isTest: true, name: { startsWith: "TAMYR POP" } } });
  const codes = generateUniquePromoCodes(count);
  await prisma.promoCode.createMany({ data: codes.map((code) => ({ codeHash: hashPromoCode(code), campaignId: campaign.id })) });
  // This is the sole dev-only point at which plaintext test codes are emitted.
  console.info(codes.join("\n"));
}
main().then(() => prisma.$disconnect()).catch(async (error) => { console.error(error.message); await prisma.$disconnect(); process.exit(1); });
