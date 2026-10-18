import { Prisma } from "@prisma/client";

export async function scheduleAfterRedemption(
  tx: Prisma.TransactionClient,
  input: { userId: string; notificationsConsent: boolean; locale?: string },
) {
  if (!input.notificationsConsent) return;
  const now = new Date();
  const later = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  // The records form a provider-agnostic outbox. Delivery is intentionally not simulated.
  await tx.notificationSchedule.createMany({
    data: [
      { userId: input.userId, event: "PROMO_REDEEMED", channel: "SMS", locale: input.locale ?? "kz", templateKey: "code-confirmation", scheduledFor: now },
      { userId: input.userId, event: "PROGRESS_REMINDER", channel: "SMS", locale: input.locale ?? "kz", templateKey: "progress-reminder", scheduledFor: later },
    ],
  });
}

export interface NotificationProvider {
  send(input: { to: string; body: string }): Promise<{ providerRef: string }>;
}

// Implement a real provider adapter and worker before enabling delivery in production.
export class UnconfiguredNotificationProvider implements NotificationProvider {
  async send(_input: { to: string; body: string }): Promise<{ providerRef: string }> {
    throw new Error("notification_provider_unconfigured");
  }
}
