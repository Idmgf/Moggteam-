import { apiError, apiSuccess, isKnownError } from "@/lib/api";
import { claimReward } from "@/lib/promo";
import { requireUser } from "@/lib/session";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const parsed = z.object({ rewardId: z.string().cuid() }).safeParse(await request.json());
    if (!parsed.success) return apiError("reward_unavailable");
    await claimReward(user.id, parsed.data.rewardId);
    return apiSuccess({ status: "claimed" });
  } catch (error) {
    if (isKnownError(error, "unauthorized")) return apiError("unauthorized", 401);
    if (error instanceof Error && ["reward_unavailable", "not_enough_points", "reward_limit_reached"].includes(error.message)) return apiError(error.message);
    return apiError("connection", 500);
  }
}
