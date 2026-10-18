"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/components/locale-provider";

export function SiteHeader() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useI18n();
  return (
    <header className={`site-header ${pathname === "/" ? "site-header-home" : "site-header-inner"}`}>
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label={`${t.common.brand}, ${t.header.tagline}`}>
          <Image className="brand-logo-mark" src="/brand/gormolzavod-mark-trimmed.webp" alt={t.header.logoAlt} width={344} height={262} />
          <span className="brand-copy">
            <span className="brand-wordmark">{t.common.brand}</span>
            <span className="brand-location">{t.header.tagline}</span>
          </span>
        </Link>
        <nav className="main-nav" aria-label={t.nav.home}>
          <Link href="/rewards">{t.nav.rewards}</Link>
          <Link href="/dashboard">{t.nav.dashboard}</Link>
          <Link className="login-link" href="/login">{t.nav.login}</Link>
        </nav>
        <div className="header-tools">
          <div className="locale-switch" aria-label={t.header.language}>
            <button type="button" onClick={() => setLocale("kz")} className={locale === "kz" ? "active" : ""} aria-pressed={locale === "kz"}>KZ</button>
            <button type="button" onClick={() => setLocale("ru")} className={locale === "ru" ? "active" : ""} aria-pressed={locale === "ru"}>RU</button>
          </div>
        </div>
      </div>
    </header>
  );
}
