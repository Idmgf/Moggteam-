"use client";

import { useI18n } from "@/components/locale-provider";

export function LogoutButton() { const { t } = useI18n(); return <button type="button" className="button" onClick={async()=>{ await fetch("/api/auth/logout",{method:"POST"}); window.location.assign("/"); }}>{t.nav.logout}</button>; }
