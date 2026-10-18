import { redirect } from "next/navigation";
import { AdminCodeGenerator } from "@/components/admin-code-generator";
import { getAdminMetrics } from "@/lib/dashboard";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { getServerMessages } from "@/i18n/server";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await getCurrentUser(); if (!user) redirect("/login?next=/admin");
  const { t } = await getServerMessages();
  if (user.role !== "ADMIN") return <section className="page"><div className="shell"><div className="legal-alert"><h1>{t.admin.forbidden}</h1></div></div></section>;
  const [metrics,campaigns,audit] = await Promise.all([getAdminMetrics(),prisma.campaign.findMany({select:{id:true,name:true},orderBy:{createdAt:"desc"}}),prisma.auditLog.findMany({take:10,orderBy:{createdAt:"desc"},select:{id:true,action:true,entityType:true,createdAt:true}})]);
  const cards=[[metrics.participants,t.admin.participants],[metrics.redeemedCodes,t.admin.activated],[metrics.repeatBuyers,t.admin.repeats],[`${metrics.repeatRate}%`,t.admin.repeatRate],[`${metrics.conversion}%`,t.admin.conversion],[metrics.issuedRewards,t.admin.issued]];
  return <section className="page"><div className="shell"><div className="page-heading"><p className="eyebrow">{t.common.brand}</p><h1>{t.admin.title}</h1><p>{t.admin.activeDefinition}</p></div><div className="admin-grid">{cards.map(([value,label])=><article className="stat-card" key={String(label)}><b>{value}</b><span>{label}</span></article>)}</div><div className="admin-actions"><AdminCodeGenerator campaigns={campaigns}/><article className="panel"><h2>{t.admin.audit}</h2>{audit.length?<div className="table-wrap"><table className="data-table"><thead><tr><th>{t.admin.audit}</th><th>{t.admin.campaign}</th><th>UTC</th></tr></thead><tbody>{audit.map((item)=><tr key={item.id}><td>{item.action}</td><td>{item.entityType}</td><td>{item.createdAt.toISOString().slice(0,16).replace("T"," ")}</td></tr>)}</tbody></table></div>:<p className="empty">{t.admin.noAudit}</p>}</article></div></div></section>;
}
