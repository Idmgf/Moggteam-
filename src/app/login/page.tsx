import { LoginForm } from "@/components/login-form";
import { getServerMessages } from "@/i18n/server";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) { const { t } = await getServerMessages(); const params = await searchParams; const nextPath = params.next?.startsWith("/") ? params.next : "/dashboard"; return <section className="page"><div className="shell"><div className="page-heading"><p className="eyebrow">{t.login.eyebrow}</p><h1>{t.login.title}</h1><p>{t.login.lead}</p></div><LoginForm nextPath={nextPath} /></div></section>; }
