"use client";

import { useI18n } from "@/components/locale-provider";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { t } = useI18n();
  return <section className="page"><div className="shell"><div className="success-card"><h1>{t.common.error}</h1><button className="button button-primary" type="button" onClick={reset}>{t.common.back}</button></div></div></section>;
}
