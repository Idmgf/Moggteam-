"use client";

import { useState } from "react";
import { useI18n } from "@/components/locale-provider";

export function ClaimButton({ rewardId }: { rewardId: string }) {
  const { t } = useI18n(); const [state,setState]=useState<"idle"|"loading"|"done"|"error">("idle");
  async function claim() { setState("loading"); try { const response=await fetch("/api/rewards/claim",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({rewardId})}); const data=await response.json(); setState(data.ok?"done":"error"); } catch { setState("error"); } }
  if(state==="done") return <span className="pill">{t.rewards.claimed}</span>;
  return <button type="button" className="button button-primary" disabled={state==="loading"} onClick={claim}>{state==="loading"?t.common.loading:state==="error"?t.common.error:t.rewards.claim}</button>;
}
