import { apiSuccess } from "@/lib/api";
import { destroyCurrentSession } from "@/lib/session";

export async function POST() {
  await destroyCurrentSession();
  return apiSuccess({ status: "logged_out" });
}
