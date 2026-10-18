import { prisma } from "@/lib/prisma";
import { getServerMessages } from "@/i18n/server";
import { getCurrentUser } from "@/lib/session";
import { ClaimButton } from "@/components/claim-button";
import { fill } from "@/i18n/format";
import { Cpu, Plane, Shirt } from "lucide-react";

const prizeIcons = [Plane, Cpu, Shirt] as const;

export const dynamic = "force-dynamic";

export default async function RewardsPage() {
  const [{ t, locale }, user, rewards] = await Promise.all([getServerMessages(), getCurrentUser(), prisma.reward.findMany({ where: { isActive: true }, orderBy: { pointsRequired: "asc" } })]);
  const balance = user ? (await prisma.pointLedger.aggregate({where:{userId:user.id},_sum:{delta:true}}))._sum.delta ?? 0 : 0;
  return <section className="page"><div className="shell"><div className="page-heading"><p className="eyebrow">{t.rewards.eyebrow}</p><h1>{t.rewards.title}</h1><p>{t.rewards.lead}</p></div><section className="prize-plan" aria-label={t.rewards.prizeCategoriesLabel}><div className="prize-plan-total"><p>{t.rewards.prizePlan}</p><strong>{t.rewards.prizeAmount}</strong></div><ul className="prize-plan-categories">{t.rewards.prizeCategories.map((category,index)=>{const PrizeIcon=prizeIcons[index]??Shirt;return <li key={category}><PrizeIcon size={24} strokeWidth={1.8} aria-hidden="true"/><span>{category}</span></li>;})}</ul></section><div className="reward-grid">{rewards.length?rewards.map((reward)=>{ const remaining=Math.max(0,reward.pointsRequired-balance); return <article className="reward-card" key={reward.id}><span className="reward-count">{reward.pointsRequired} {t.common.points}</span><h3>{locale==="kz"?reward.nameKz:reward.nameRu}</h3><p>{locale==="kz"?reward.descriptionKz:reward.descriptionRu}</p><p><span className="pill">{remaining?fill(t.rewards.need,{points:remaining}):t.rewards.reached}</span></p>{user&&reward.isConfirmed&&remaining===0?<ClaimButton rewardId={reward.id}/>:<span className="pill">{t.rewards.unavailable}</span>}</article>; }):<p className="empty">{t.rewards.noRewards}</p>}</div></div></section>;
}
