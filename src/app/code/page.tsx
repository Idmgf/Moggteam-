import { CodeForm } from "@/components/code-form";
import { getServerMessages } from "@/i18n/server";

export default async function CodePage() { const { t } = await getServerMessages(); return <section className="page"><div className="shell"><div className="page-heading"><p className="eyebrow">{t.code.eyebrow}</p><h1>{t.code.title}</h1><p>{t.code.lead}</p></div><CodeForm /></div></section>; }
