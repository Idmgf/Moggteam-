import { RegisterForm } from "@/components/register-form";
import { getServerMessages } from "@/i18n/server";

export default async function RegisterPage() { const { t } = await getServerMessages(); return <section className="page"><div className="shell"><div className="page-heading"><p className="eyebrow">{t.register.eyebrow}</p><h1>{t.register.title}</h1><p>{t.register.lead}</p></div><RegisterForm /></div></section>; }
