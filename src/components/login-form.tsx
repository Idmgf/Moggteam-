"use client";

import { useState } from "react";
import { useI18n } from "@/components/locale-provider";

export function LoginForm({ nextPath }: { nextPath: string }) {
  const { t } = useI18n();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const errorText = (code?: string) => (t.errors as Record<string, string>)[code ?? ""] ?? t.common.error;

  async function requestCode(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const response = await fetch("/api/auth/request-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ phone }) });
      const result = await response.json();
      if (!result.ok) setStatus(errorText(result.code));
      else {
        setSent(true);
        setStatus(t.login.sent);
      }
    } catch {
      setStatus(t.errors.connection);
    } finally {
      setLoading(false);
    }
  }

  async function verifyCode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const response = await fetch("/api/auth/verify-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ phone, code }) });
      const result = await response.json();
      if (!result.ok) setStatus(errorText(result.code));
      else window.location.assign(nextPath);
    } catch {
      setStatus(t.errors.connection);
    } finally {
      setLoading(false);
    }
  }

  return <div className="form-card">{!sent ? <form className="form-grid" onSubmit={requestCode}><label className="field">{t.login.phone}<input value={phone} onChange={(event) => setPhone(event.target.value)} inputMode="tel" autoComplete="tel" placeholder="+7 7XX XXX XX XX" required /></label>{status && <p className="form-status error">{status}</p>}<button className="button button-primary" disabled={loading}>{loading ? t.common.loading : t.login.request}</button><p className="hint">{t.login.devHint}</p></form> : <form className="form-grid" onSubmit={verifyCode}><label className="field">{t.login.otp}<input value={code} onChange={(event) => setCode(event.target.value)} inputMode="numeric" autoComplete="one-time-code" maxLength={6} required /></label>{status && <p className={status === t.login.sent ? "form-status success" : "form-status error"}>{status}</p>}<button className="button button-primary" disabled={loading}>{loading ? t.common.loading : t.login.verify}</button></form>}</div>;
}
