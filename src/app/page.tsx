import { QurtLanding } from "@/components/qurt-landing";
import { readIntroAssets } from "@/lib/intro-products";

export default function HomePage() {
  const introAssets = readIntroAssets();
  return <QurtLanding introEnabled={introAssets.enabled} introItems={introAssets.introItems} heroPackSrc={introAssets.heroPackSrc} />;
}
