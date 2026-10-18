"use client";

import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/components/locale-provider";

const ageValues = ["14_17", "18_24", "25_34", "35_44", "45_PLUS"];

export function RegisterForm() {
  const { t } = useI18n();
  const [status, setStatus] = useState<{ type: "error" | "success"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const errorText = (code?: string) => (t.errors as Record<string, string>)[code ?? ""] ?? t.common.error;

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setStatus(null);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.get("name"), phone: form.get("phone"), city: form.get("city"), ageGroup: form.get("ageGroup"), promoCode: form.get("promoCode"), consent: form.get("consent") === "on", notificationsConsent: form.get("notificationsConsent") === "on" }) });
      const result = await response.json();
      if (!result.ok) setStatus({ type: "error", message: errorText(result.code) });
      else setStatus({ type: "success", message: t.register.doneLead });
    } catch { setStatus({ type: "error", message: t.errors.connection }); }
    finally { setLoading(false); }
  }
  if (status?.type === "success") return <div className="success-card"><h2>{t.register.doneTitle}</h2><p>{status.message}</p><p>{t.register.codeLater}</p><div className="hero-actions"><Link className="button button-primary" href="/dashboard">{t.nav.dashboard}</Link><Link className="button" href="/code">{t.home.secondary}</Link></div></div>;
  return <form className="form-card form-grid" onSubmit={submit} noValidate>
    <div className="form-grid two"><label className="field">{t.register.name}<input name="name" autoComplete="name" required /></label><label className="field">{t.register.phone}<input name="phone" inputMode="tel" autoComplete="tel" placeholder="+7 7XX XXX XX XX" required /></label></div>
    <div className="form-grid two"><label className="field">{t.register.city}<input name="city" autoComplete="address-level2" required /></label><label className="field">{t.register.age}<select name="ageGroup" defaultValue="" required><option value="" disabled>—</option>{t.register.ageOptions.map((label, index) => <option value={ageValues[index]} key={ageValues[index]}>{label}</option>)}</select></label></div>
    <label className="field">{t.register.promoCode}<input name="promoCode" autoCapitalize="characters" placeholder={t.register.codeHint} /><p className="hint">{t.register.codeHint}</p></label>
    <label className="check"><input type="checkbox" name="consent" required /><span>{t.register.consent}</span></label>
    <label className="check"><input type="checkbox" name="notificationsConsent" /><span>{t.register.notify}</span></label>
    <p className="hint">{t.register.policyBefore} <Link href="/privacy">{t.register.policyLink}</Link> {t.register.policyAnd} <Link href="/rules">{t.register.rulesLink}</Link>{t.register.policyAfter}</p>
    {status && <p className={`form-status ${status.type}`}>{status.message}</p>}
    <button className="button button-primary" disabled={loading} type="submit">{loading ? t.common.loading : t.register.submit}</button>
  </form>;
}
