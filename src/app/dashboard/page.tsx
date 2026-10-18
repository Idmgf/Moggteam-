import Link from "next/link";
import { redirect } from "next/navigation";
import { getParticipantDashboard } from "@/lib/dashboard";
import { getCurrentUser } from "@/lib/session";
import { getServerMessages } from "@/i18n/server";
import { fill } from "@/i18n/format";
import { LogoutButton } from "@/components/logout-button";
import { ClaimButton } from "@/components/claim-button";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getCurrentUser(); if (!user) redirect("/login?next=/dashboard");
  const [{ t, locale }, data] = await Promise.all([getServerMessages(), getParticipantDashboard(user.id)]);
  const progress = data.nextReward ? Math.min(100, Math.round((data.points / data.nextReward.pointsRequired) * 100)) : 100;
  return <section className="page"><div className="shell"><div className="page-heading"><p className="eyebrow">{t.dashboard.title}</p><h1>{fill(t.dashboard.greeting,{name:data.user.name})}</h1></div><div className="dashboard-layout"><div className="form-grid"><div className="stat-grid"><article className="stat-card"><b>{data.points}</b><span>{t.dashboard.balance}</span></article><article className="stat-card"><b>{data.redemptions.length}</b><span>{t.dashboard.codes}</span></article></div><article className="panel"><h2>{t.dashboard.nextReward}</h2>{data.nextReward ? <><b>{locale==="kz"?data.nextReward.nameKz:data.nextReward.nameRu}</b><div className="progress-track"><span style={{width:`${progress}%`}} /></div><p>{data.points} / {data.nextReward.pointsRequired} {t.common.points}</p></> : <p>{t.dashboard.ready}</p>}</article><article className="panel"><h2>{t.dashboard.history}</h2>{data.redemptions.length ? <ul className="list">{data.redemptions.map((item)=><li className="list-item" key={item.id}><span>{t.common.code}<small>{new Intl.DateTimeFormat(locale === "kz" ? "kk-KZ" : "ru-RU",{dateStyle:"medium"}).format(item.redeemedAt)}</small></span><b>{fill(t.dashboard.earned,{points:item.pointsAwarded})}</b></li>)}</ul> : <p className="empty">{t.dashboard.emptyCodes}</p>}</article></div><aside className="form-grid"><Link className="button button-primary" href="/code">{t.dashboard.addCode}</Link><article className="panel"><h2>{t.dashboard.available}</h2><div className="reward-live">{data.rewards.length?data.rewards.map((reward)=><article className="reward-card" key={reward.id}><span className="reward-count">{reward.pointsRequired} {t.common.points}</span><h3>{locale==="kz"?reward.nameKz:reward.nameRu}</h3><p>{locale==="kz"?reward.descriptionKz:reward.descriptionRu}</p>{reward.isConfirmed?<ClaimButton rewardId={reward.id}/>:<span className="pill">{t.rewards.unavailable}</span>}</article>):<p className="empty">{t.rewards.noRewards}</p>}</div></article><LogoutButton /></aside></div></div></section>;
}
