import { PrismaClient } from "@prisma/client";
import { normalizeKzPhone } from "../src/lib/phone";

process.loadEnvFile?.(".env");
const prisma = new PrismaClient();

async function main() {
  const campaign = await prisma.campaign.upsert({
    where: { id: "cm-tamyr-pop-demo" },
    update: { status: "ACTIVE", configuration: { pointsPerCode: 1, note: "DEMO: preliminary mechanics; not approved campaign terms" } },
    create: { id: "cm-tamyr-pop-demo", name: "TAMYR POP · DEMO", status: "ACTIVE", isTest: true, configuration: { pointsPerCode: 1, note: "DEMO: preliminary mechanics; not approved campaign terms" } },
  });
  const phone = normalizeKzPhone(process.env.ADMIN_PHONE ?? "+77000000000");
  if (!phone) throw new Error("ADMIN_PHONE must be a valid Kazakhstan phone number.");
  await prisma.user.upsert({
    where: { phone },
    update: { role: "ADMIN", name: process.env.ADMIN_NAME ?? "Admin TAMYR POP" },
    create: { name: process.env.ADMIN_NAME ?? "Admin TAMYR POP", phone, city: "Kokshetau", ageGroup: "ADMIN", role: "ADMIN", consentStatus: "GRANTED", consentVersion: "system", consentedAt: new Date() },
  });
  if (process.env.DEMO_MODE === "true") {
    await prisma.reward.upsert({
      where: { id: "rw-demo-three" },
      update: {},
      create: { id: "rw-demo-three", campaignId: campaign.id, nameKz: "Кепілді сыйлық", nameRu: "Гарантированная награда", descriptionKz: "Алдын ала тұжырымдама. Шартты әкімші бекітеді.", descriptionRu: "Предварительная концепция. Условия подтверждает администратор.", pointsRequired: 3, rewardType: "GUARANTEED", isActive: true, isConfirmed: false },
    });
    await prisma.reward.upsert({
      where: { id: "rw-demo-five" },
      update: {},
      create: { id: "rw-demo-five", campaignId: campaign.id, nameKz: "Ұтыс ойынына қатысу", nameRu: "Участие в розыгрыше", descriptionKz: "Алдын ала тұжырымдама. Ресми ереже қажет.", descriptionRu: "Предварительная концепция. Требуются официальные правила.", pointsRequired: 5, rewardType: "DRAW_ENTRY", isActive: true, isConfirmed: false },
    });
  }
}

main().then(() => prisma.$disconnect()).catch(async (error) => { console.error(error.message); await prisma.$disconnect(); process.exit(1); });
