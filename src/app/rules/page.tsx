import { getServerMessages } from "@/i18n/server";

export default async function RulesPage() { const { t }=await getServerMessages(); return <section className="page"><div className="shell"><div className="legal-alert"><h2>{t.legal.devTitle}</h2><p>{t.legal.devLead}</p></div><div className="page-heading"><p className="eyebrow">{t.footer.legal}</p><h1>{t.legal.rulesTitle}</h1></div><article className="panel"><ol className="legal-list">{t.legal.sections.map((item)=><li key={item}>{item}</li>)}</ol></article></div></section>; }
