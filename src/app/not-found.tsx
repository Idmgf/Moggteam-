import Link from "next/link";
import { getServerMessages } from "@/i18n/server";

export default async function NotFound() {
  const { t } = await getServerMessages();
  return <section className="page"><div className="shell"><div className="success-card"><h1>404</h1><p>{t.common.noData}</p><Link className="button button-primary" href="/">{t.nav.home}</Link></div></div></section>;
}
