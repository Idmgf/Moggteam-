import type { Metadata } from "next";
import { headers } from "next/headers";
import { Manrope } from "next/font/google";
import "@/app/globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LocaleProvider } from "@/components/locale-provider";
import { getLocale } from "@/i18n/server";
import { readIntroAssets } from "@/lib/intro-products";

const manrope = Manrope({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "600", "700", "800"], display: "swap", variable: "--font-manrope" });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = (requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host"))?.split(",")[0].trim();
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto")?.split(",")[0].trim();
  const protocol = forwardedProtocol ?? (host?.startsWith("localhost") ? "http" : "https");

  return {
    metadataBase: host ? new URL(`${protocol}://${host}`) : undefined,
    title: "ГОРМОЛЗАВОД | КОКШЕТАУ",
    description: "ГОРМОЛЗАВОД — официальный сайт и промо-страница",
    icons: { icon: "/brand/gormolzavod-mark-trimmed.webp" },
    robots: { index: true, follow: true },
    openGraph: { title: "ГОРМОЛЗАВОД | КОКШЕТАУ", description: "ГОРМОЛЗАВОД — официальный сайт и промо-страница", type: "website", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "QURT от ГОРМОЛЗАВОД" }] },
    twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const introAvailable = readIntroAssets().enabled;
  const introBootstrap = `(function(){try{if(location.pathname!=="/"||!${JSON.stringify(introAvailable)}||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;var forced=new URLSearchParams(location.search).get("intro")==="1";var seen=false;try{seen=window.sessionStorage.getItem("gormolzavod:qurt-intro:v1")==="1";}catch(_storageError){}if(forced||!seen)document.documentElement.classList.add("intro-pending");}catch(_error){}})();`;
  return (
    <html lang={locale === "kz" ? "kk" : "ru"} translate="no">
      <head>
        <meta name="google" content="notranslate" />
        <script id="qurt-intro-bootstrap" dangerouslySetInnerHTML={{ __html: introBootstrap }} />
      </head>
      <body className={manrope.variable}>
        <LocaleProvider initialLocale={locale}>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </LocaleProvider>
      </body>
    </html>
  );
}
