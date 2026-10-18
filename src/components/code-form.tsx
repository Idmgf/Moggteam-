"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { fill, useI18n } from "@/components/locale-provider";

const confettiBalls = ["ball-1.webp", "ball-2.webp", "ball-3.webp", "ball-4.webp", "ball-5.webp", "ball-6.webp", "ball-2.webp", "ball-5.webp"];

export function CodeForm() {
  const { locale, t } = useI18n(); const [code, setCode] = useState(""); const [loading, setLoading] = useState(false); const [status, setStatus] = useState<{ kind:"error"|"success"; text:string } | null>(null);
  const errorText = (value?: string) => (t.errors as Record<string,string>)[value ?? ""] ?? t.common.error;
  async function submit(event: React.FormEvent) { event.preventDefault(); setLoading(true); setStatus(null); try { const response=await fetch("/api/code/redeem",{method:"POST",headers:{"Content-Type":"application/json","x-tamyr-locale":locale},body:JSON.stringify({code})}); const result=await response.json(); if(!result.ok) { setStatus({kind:"error",text:errorText(result.code)}); } else if(result.data.status==="success") { setStatus({kind:"success",text:fill(t.code.successLead,{points:result.data.pointsAwarded,balance:result.data.balance})}); setCode(""); } else { const text=result.data.status==="not_found"?t.code.notFound:result.data.status==="inactive"?t.code.inactive:t.code.used; setStatus({kind:"error",text}); } } catch { setStatus({kind:"error",text:t.errors.connection}); } finally { setLoading(false); } }
  return <div className="form-card"><form className="form-grid" onSubmit={submit}><label className="field">{t.code.label}<input value={code} onChange={(event)=>setCode(event.target.value.toUpperCase())} autoCapitalize="characters" autoComplete="off" placeholder="ABCD-EFGH-JKNP-QRST" required /></label>{status&&<p className={`form-status ${status.kind}`}>{status.text}</p>}<button className="button button-primary" disabled={loading}>{loading?t.common.loading:t.code.submit}</button></form>{status?.kind==="success"&&<div className="success-confetti" aria-hidden="true">{confettiBalls.map((ball,index)=><Image key={`${ball}-${index}`} src={`/qurt/${ball}`} alt="" width={48} height={48} />)}</div>}{status?.kind==="success"&&<div className="hero-actions"><Link className="button" href="/dashboard">{t.code.dashboard}</Link><button className="button button-coral" type="button" onClick={()=>setStatus(null)}>{t.code.next}</button></div>}</div>;
}
