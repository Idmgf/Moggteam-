"use client";

import Link from "next/link";
import Image from "next/image";
import { Camera } from "lucide-react";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { useI18n } from "@/components/locale-provider";

export function SiteFooter() {
  const { t } = useI18n();
  const [qrImage, setQrImage] = useState("");

  useEffect(() => {
    let active = true;
    void QRCode.toDataURL(`${window.location.origin}/`, {
      errorCorrectionLevel: "M",
      margin: 2,
      width: 96,
      color: { dark: "#0b1b4d", light: "#ffffff" },
    }).then((dataUrl) => {
      if (active) setQrImage(dataUrl);
    });
    return () => { active = false; };
  }, []);

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand-block">
          <Link href="/" className="footer-brand-link" aria-label={`${t.common.brand}, ${t.header.tagline}`}>
            <Image className="footer-logo" src="/brand/gormolzavod-mark-trimmed.webp" alt={t.header.logoAlt} width={172} height={131} />
            <span>{t.common.brand}<small>{t.header.tagline}</small></span>
          </Link>
          <div className="footer-qr">
            {qrImage && <Image src={qrImage} alt={t.footer.qr} width={96} height={96} unoptimized />}
            <span>{t.footer.qr}</span>
          </div>
        </div>
        <div><p className="footer-title">{t.footer.legal}</p><Link href="/rules">{t.footer.rules}</Link><Link href="/privacy">{t.footer.privacy}</Link></div>
        <address><p className="footer-title">{t.footer.contacts}</p><p>ТОО «Гормолзавод»</p><p>{t.footer.address}</p><a href="tel:+77473771529">+7 747 377 15 29</a><a href="tel:+77162771529">+7 7162 77 15 29</a><a href="tel:+77162926600">+7 7162 92 66 00</a><a href="mailto:ok@gormolzavod.kz">ok@gormolzavod.kz</a><p className="footer-instagram"><Camera size={17} aria-hidden="true" />{t.footer.instagram}</p></address>
      </div>
    </footer>
  );
}
