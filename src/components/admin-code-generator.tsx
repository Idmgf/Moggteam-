"use client";

import { useState } from "react";
import { useI18n } from "@/components/locale-provider";

export function AdminCodeGenerator({ campaigns }: { campaigns: { id: string; name: string }[] }) {
  const { t } = useI18n(); const [count,setCount]=useState(100); const [campaignId,setCampaignId]=useState(campaigns[0]?.id ?? ""); const [message,setMessage]=useState<string|null>(null); const [loading,setLoading]=useState(false);
  async function generate(event: React.FormEvent) { event.preventDefault(); setLoading(true); setMessage(null); try { const response=await fetch("/api/admin/codes",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({count,campaignId})}); const result=await response.json(); if(!result.ok){ setMessage((t.errors as Record<string,string>)[result.code]??t.common.error); return; } const file=new Blob([result.data.codes.join("\r\n")],{type:"text/csv;charset=utf-8"}); const url=URL.createObjectURL(file); const link=document.createElement("a"); link.href=url; link.download="tamyr-pop-codes.csv"; link.click(); URL.revokeObjectURL(url); setMessage(t.admin.generated); } catch { setMessage(t.errors.connection); } finally { setLoading(false); } }
  return <form className="form-card form-grid" onSubmit={generate}><h2>{t.admin.generate}</h2><label className="field">{t.admin.campaign}<select value={campaignId} onChange={(event)=>setCampaignId(event.target.value)} required>{campaigns.map((campaign)=><option key={campaign.id} value={campaign.id}>{campaign.name}</option>)}</select></label><label className="field">{t.admin.count}<input type="number" min="1" max="100000" value={count} onChange={(event)=>setCount(Number(event.target.value))} required /></label>{message&&<p className="notice">{message}</p>}<button className="button button-primary" disabled={loading||!campaignId}>{loading?t.common.loading:t.admin.export}</button></form>;
}
