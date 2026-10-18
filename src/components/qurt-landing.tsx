"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChartNoAxesColumnIncreasing, Check, Keyboard, Package, QrCode, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/locale-provider";
import { IntroSplash } from "@/components/intro-splash";
import type { IntroProduct } from "@/lib/intro-products";

const heroBalls = ["ball-1.webp", "ball-2.webp", "ball-3.webp", "ball-4.webp", "ball-5.webp", "ball-6.webp", "ball-2.webp", "ball-5.webp"];
const ctaBalls = ["ball-1.webp", "ball-3.webp", "ball-4.webp", "ball-6.webp", "ball-2.webp", "ball-5.webp"];
const stepIcons = [Package, QrCode, Keyboard, ChartNoAxesColumnIncreasing];

type QurtLandingProps = {
  introEnabled: boolean;
  introItems: IntroProduct[];
  heroPackSrc: string;
};

export function QurtLanding({ introEnabled, introItems, heroPackSrc }: QurtLandingProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [packageSide, setPackageSide] = useState<"front" | "back">("front");
  const [demoStep, setDemoStep] = useState(0);
  const [heroVisible, setHeroVisible] = useState(true);
  const [footerVisible, setFooterVisible] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => setDemoStep((step) => (step + 1) % 4), 2400);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const hero = rootRef.current?.querySelector(".home-hero");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const footer = document.querySelector(".site-footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let active = true;
    let cleanup: (() => void) | undefined;
    const initializeAnimations = async () => {
      const moduleImports = Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      let modules: Awaited<typeof moduleImports>;
      try {
        modules = await moduleImports;
      } catch {
        return;
      }
      if (!active) return;

      const [gsapModule, scrollTriggerModule, lenisModule] = modules;

      const gsap = gsapModule.default;
      const { ScrollTrigger } = scrollTriggerModule;
      const Lenis = lenisModule.default;
      let lenis: InstanceType<typeof Lenis> | undefined;
      let tickerCallback: ((time: number) => void) | undefined;
      let removeMagneticListeners = () => {};

      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {

      lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      tickerCallback = (time) => lenis?.raf(time * 1000);
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      gsap.from(".hero-line-inner", { yPercent: 105, duration: 0.8, stagger: 0.09, ease: "power4.out", delay: 0.1 });
      gsap.from(".hero-enter", { y: 22, autoAlpha: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", delay: 0.28 });

      gsap.to(".home-pack-float", { y: -18, rotate: 2, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.utils.toArray<HTMLElement>(".hero-ball").forEach((ball, index) => {
        const depth = index < 3 ? 1 : 0.65;
        gsap.to(ball, {
          x: gsap.utils.random(-13, 13) * depth,
          y: gsap.utils.random(-22, 22) * depth,
          rotation: gsap.utils.random(-18, 18),
          duration: gsap.utils.random(3.5, 6.5) + index * 0.15,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.13,
        });
      });

      if (window.matchMedia("(min-width: 768px)").matches) {
        const quickPackX = gsap.quickTo(".home-pack-wrap", "x", { duration: 0.6, ease: "power2.out" });
        const quickPackY = gsap.quickTo(".home-pack-wrap", "y", { duration: 0.6, ease: "power2.out" });
        const quickPackRotateX = gsap.quickTo(".home-pack-float", "rotateX", { duration: 0.55, ease: "power2.out" });
        const quickPackRotateY = gsap.quickTo(".home-pack-float", "rotateY", { duration: 0.55, ease: "power2.out" });
        const quickBallX = gsap.utils.toArray<HTMLElement>(".hero-ball-layer.near").map((ball) => gsap.quickTo(ball, "x", { duration: 0.7, ease: "power2.out" }));
        const quickBallY = gsap.utils.toArray<HTMLElement>(".hero-ball-layer.near").map((ball) => gsap.quickTo(ball, "y", { duration: 0.7, ease: "power2.out" }));
        const quickFarX = gsap.utils.toArray<HTMLElement>(".hero-ball-layer.far").map((ball) => gsap.quickTo(ball, "x", { duration: 1, ease: "power2.out" }));
        const quickFarY = gsap.utils.toArray<HTMLElement>(".hero-ball-layer.far").map((ball) => gsap.quickTo(ball, "y", { duration: 1, ease: "power2.out" }));
        const onPointerMove = (event: PointerEvent) => {
          const bounds = root.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          quickPackX(x * 12);
          quickPackY(y * 12);
          quickBallX.forEach((move) => move(x * 30));
          quickBallY.forEach((move) => move(y * 30));
          quickFarX.forEach((move) => move(x * 8));
          quickFarY.forEach((move) => move(y * 8));
          const pack = root.querySelector<HTMLElement>(".home-pack-float");
          if (pack) {
            const bounds = pack.getBoundingClientRect();
            const localX = (event.clientX - bounds.left) / bounds.width;
            const localY = (event.clientY - bounds.top) / bounds.height;
            quickPackRotateX((0.5 - localY) * 12);
            quickPackRotateY((localX - 0.5) * 14);
            pack.style.setProperty("--shine-x", `${gsap.utils.clamp(0, 100, localX * 100)}%`);
            pack.style.setProperty("--shine-y", `${gsap.utils.clamp(0, 100, localY * 100)}%`);
            pack.style.setProperty("--shine-opacity", localX >= 0 && localX <= 1 && localY >= 0 && localY <= 1 ? "1" : "0");
          }
        };
        const onPointerLeave = () => {
          quickPackX(0);
          quickPackY(0);
          quickPackRotateX(0);
          quickPackRotateY(0);
          root.querySelector<HTMLElement>(".home-pack-float")?.style.setProperty("--shine-opacity", "0");
        };
        root.addEventListener("pointermove", onPointerMove, { passive: true });
        root.addEventListener("pointerleave", onPointerLeave);
        removeMagneticListeners = () => {
          root.removeEventListener("pointermove", onPointerMove);
          root.removeEventListener("pointerleave", onPointerLeave);
        };
      }

      gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
        gsap.from(section.querySelectorAll(".reveal-item"), {
          y: 40,
          autoAlpha: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        });
      });

      const stepsLine = root.querySelector<HTMLElement>(".steps-line");
      if (stepsLine) {
        gsap.fromTo(stepsLine, { scaleY: 0 }, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".home-steps", start: "top 75%", end: "bottom 60%", scrub: true },
        });
      }

      const heroPack = root.querySelector<HTMLElement>(".home-pack-wrap");
      const productPack = root.querySelector<HTMLElement>(".why-pack");
      if (heroPack && productPack) {
        const heroBounds = heroPack.getBoundingClientRect();
        const productBounds = productPack.getBoundingClientRect();
        const startX = heroBounds.left + heroBounds.width / 2 - productBounds.left - productBounds.width / 2;
        const startY = heroBounds.top + heroBounds.height / 2 - productBounds.top - productBounds.height / 2;
        const startScale = Math.min(heroBounds.width / productBounds.width, 1.25);
        gsap.fromTo(productPack, {
          x: startX,
          y: startY,
          scale: startScale,
          rotate: -4,
          autoAlpha: 0.2,
        }, {
          x: 0,
          y: 0,
          scale: 0.9,
          rotate: 1,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: { trigger: ".why-section", start: "top bottom", end: "center center", scrub: 0.8 },
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((counter) => {
        const value = Number(counter.dataset.count ?? 0);
        const state = { value: 0 };
        gsap.to(state, {
          value,
          duration: 1.25,
          ease: "power2.out",
          scrollTrigger: { trigger: counter, start: "top 85%", once: true },
          onUpdate: () => { counter.textContent = String(Math.round(state.value)); },
        });
      });

      gsap.utils.toArray<HTMLElement>(".reward-card").forEach((card) => {
        const enter = () => gsap.to(card, { y: -6, duration: 0.22, overwrite: true });
        const leave = () => gsap.to(card, { y: 0, duration: 0.3, overwrite: true });
        card.addEventListener("pointerenter", enter);
        card.addEventListener("pointerleave", leave);
        card.addEventListener("focusin", enter);
        card.addEventListener("focusout", leave);
        const originalCleanup = removeMagneticListeners;
        removeMagneticListeners = () => {
          originalCleanup();
          card.removeEventListener("pointerenter", enter);
          card.removeEventListener("pointerleave", leave);
          card.removeEventListener("focusin", enter);
          card.removeEventListener("focusout", leave);
        };
      });

      const magneticLinks = gsap.utils.toArray<HTMLElement>(".magnetic-link");
      magneticLinks.forEach((link) => {
        const xTo = gsap.quickTo(link, "x", { duration: 0.35, ease: "power3.out" });
        const yTo = gsap.quickTo(link, "y", { duration: 0.35, ease: "power3.out" });
        const move = (event: PointerEvent) => {
          const rect = link.getBoundingClientRect();
          xTo(gsap.utils.clamp(-8, 8, (event.clientX - rect.left - rect.width / 2) * 0.12));
          yTo(gsap.utils.clamp(-8, 8, (event.clientY - rect.top - rect.height / 2) * 0.12));
        };
        const reset = () => { xTo(0); yTo(0); };
        link.addEventListener("pointermove", move);
        link.addEventListener("pointerleave", reset);
        link.addEventListener("focusout", reset);
        const originalCleanup = removeMagneticListeners;
        removeMagneticListeners = () => {
          originalCleanup();
          link.removeEventListener("pointermove", move);
          link.removeEventListener("pointerleave", reset);
          link.removeEventListener("focusout", reset);
        };
      });
      }, root);

      cleanup = () => {
        removeMagneticListeners();
        if (tickerCallback) gsap.ticker.remove(tickerCallback);
        lenis?.destroy();
        gsap.ticker.lagSmoothing(500, 33);
        context.revert();
      };
    };

    const startAnimations = () => {
      if (active) void initializeAnimations();
    };
    const introPending = document.documentElement.classList.contains("intro-pending");
    if (introPending) window.addEventListener("qurt:intro:complete", startAnimations, { once: true });
    else startAnimations();

    return () => {
      active = false;
      window.removeEventListener("qurt:intro:complete", startAnimations);
      cleanup?.();
    };
  }, []);

  return (
    <>
    <IntroSplash enabled={introEnabled} items={introItems} heroPackSrc={heroPackSrc} brandLabel={`${t.common.brand} · ${t.header.tagline}`} dialogLabel={t.home.introLabel} skipLabel={t.home.introSkip} />
    <div className="qurt-home" ref={rootRef}>

      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-wash" aria-hidden="true" />
        <span className="home-watermark" aria-hidden="true">QURT</span>
        <div className="home-pattern" aria-hidden="true" />
        <div className="home-shell hero-layout">
          <div className="hero-copy">
            <p className="section-index hero-enter">01 / QURT</p>
            <h1 id="home-title">
              {t.home.titleLines.map((line) => <span className="hero-line" key={line}><span className="hero-line-inner">{line}</span></span>)}
            </h1>
            <p className="hero-lead hero-enter">{t.home.lead}</p>
            <div className="hero-actions hero-enter">
              <Link className="home-button button-white magnetic-link" href="/register">{t.home.primary}<span aria-hidden="true">↗</span></Link>
              <Link className="home-button button-outline magnetic-link" href="/code">{t.home.secondary}<span aria-hidden="true">↗</span></Link>
            </div>
            <p className="hero-note hero-enter"><span aria-hidden="true">↳</span>{t.home.fact}</p>
          </div>

          <div className="hero-art" aria-label={t.home.productAlt}>
            <div className="hero-orbit" aria-hidden="true" />
            <span className="hero-product-name" aria-hidden="true">QURT</span>
            {heroBalls.map((ball, index) => (
              <div className={`hero-ball-layer ${index < 3 ? "near" : "far"} ball-position-${index + 1} ball-layer-${index + 1}`}
                key={`${ball}-${index}`}
              >
                <Image className="hero-ball" src={`/qurt/${ball}`} alt="" aria-hidden="true" width={150} height={150} sizes="(max-width: 767px) 54px, 104px" />
              </div>
            ))}
            <div className="home-pack-wrap">
              <div className="home-pack-float">
                <img id="hero-pack" className="home-pack-image" src={heroPackSrc} alt={t.home.productAlt} decoding="async" loading="eager" fetchPriority="high" />
              </div>
            </div>
            <span className="hero-art-caption" aria-hidden="true">{t.home.product[0]}</span>
          </div>
        </div>
        <div className="home-shell hero-bottom"><span>{t.home.eyebrow}</span><a href="#rewards" aria-label={t.home.rewardTitle}>↓</a></div>
        <div className="hero-wave" aria-hidden="true" />
      </section>

      <section className="home-rewards reveal-section" id="rewards" aria-labelledby="rewards-title">
        <div className="home-shell">
          <div className="section-heading reveal-item">
            <p className="section-index">02 / QURT</p>
            <h2 id="rewards-title">{t.home.rewardTitle}</h2>
          </div>
          <ol className="reward-ladder">
            {t.home.rewards.map((reward, index) => (
              <li className="reward-level reveal-item" key={reward.count}>
                <div className="reward-level-marker"><Image src={`/qurt/ball-${index + 1}.webp`} alt="" aria-hidden="true" width={72} height={72} /><span>{reward.count}</span></div>
                <span className="reward-index">0{index + 1} / QURT</span>
                <h3>{reward.title}</h3>
                <p>{reward.text}</p>
              </li>
            ))}
          </ol>
          <Link href="/rewards" className="reward-ladder-link">{t.home.rewardAction}<ArrowUpRight size={17} aria-hidden="true" /></Link>
          <p className="reward-disclaimer reveal-item">{t.home.rewardLead}</p>
        </div>
      </section>

      <div className="brand-marquee" aria-hidden="true"><div className="brand-marquee-track">{[0, 1].map((copy) => <span key={copy}>{t.home.ticker}</span>)}</div></div>

      <section className="why-section reveal-section" id="product" aria-labelledby="why-title">
        <div className="home-shell why-layout">
          <div className="why-side why-side-left">
            <p className="section-index reveal-item">03 / QURT</p>
            <h2 id="why-title" className="reveal-item">{t.home.whyTitle}</h2>
            <p className="why-fact reveal-item"><span>01</span>{t.home.whyPoints[0]}</p>
            <p className="why-fact reveal-item"><span>02</span>{t.home.whyPoints[1]}</p>
          </div>
          <div className="why-product reveal-item">
            <div className="why-product-orbit" aria-hidden="true" />
            <div className="package-side-switch" role="group" aria-label={t.home.packageSideLabel}>
              <button type="button" className="package-side-tab" aria-pressed={packageSide === "front"} onClick={() => setPackageSide("front")}>{t.home.packageFront}</button>
              <button type="button" className="package-side-tab" aria-pressed={packageSide === "back"} onClick={() => setPackageSide("back")}>{t.home.packageBack}</button>
            </div>
            <Image className={`why-pack${packageSide === "back" ? " is-back" : ""}`} src={packageSide === "front" ? "/qurt/pack-front.png" : "/qurt/pack-back.png"} alt={packageSide === "front" ? t.home.packageFront : t.home.packageBack} width={packageSide === "front" ? 500 : 1024} height={packageSide === "front" ? 500 : 1536} sizes="(max-width: 767px) 56vw, 330px" />
            <div className="package-callouts" aria-hidden="true">
              <span className="package-callout package-callout-lean">{t.home.packageCallouts[0]}</span>
              <span className="package-callout package-callout-composition">{t.home.packageCallouts[1]}</span>
              <span className="package-callout package-callout-smoked">{t.home.packageCallouts[2]}</span>
            </div>
            <span className="why-product-label">{t.home.packageSection}</span>
          </div>
          <div className="why-side why-side-right">
            <p className="section-index reveal-item">{t.home.productLabel}</p>
            <p className="why-fact reveal-item"><span>03</span>{t.home.whyPoints[2]}</p>
            <p className="why-fact reveal-item"><span>04</span>{t.home.whyPoints[3]}</p>
            <div className="nutrition-counts reveal-item">
              <div><strong><span data-count="100">100</span><small>{t.home.weightUnit}</small></strong><span>{t.home.productTitle}</span></div>
              <div><strong><span data-count="60">60</span><small>{t.home.weightUnit}</small></strong><span>{t.home.proteinLabel}</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-steps reveal-section" id="how-it-works" aria-labelledby="steps-title">
        <div className="home-shell">
          <div className="section-heading reveal-item">
            <p className="section-index">{t.home.stepsLabel}</p>
            <h2 id="steps-title">{t.home.stepsTitle}</h2>
          </div>
          <div className="steps-showcase">
            <div className="steps-list-wrap">
              <span className="steps-line" aria-hidden="true" />
              <ol className="steps-list">
              {t.home.steps.map((step, index) => {
                const StepIcon = stepIcons[index] ?? Package;
                return <li className="step-card reveal-item" key={step.n}>
                  <div className="step-card-top"><span className="step-number">{step.n}</span><StepIcon className="step-icon" size={22} strokeWidth={1.8} aria-hidden="true" /></div>
                  <h3 className="reveal-item">{step.title}</h3>
                  <p className="reveal-item">{step.text}</p>
                </li>;
              })}
              </ol>
            </div>
            <div className="phone-demo reveal-item" aria-hidden="true">
              <div className="phone-device">
                <span className="phone-speaker" />
                <div className="phone-screen" data-step={demoStep}>
                  <div className="phone-screen-header"><span>{t.common.brand}</span><span>0{demoStep + 1} / 04</span></div>
                  <strong className="phone-step-title">{demoStep === 2 ? t.common.success : t.home.steps[demoStep + 1]?.title}</strong>
                  <div className="phone-step-visual">
                    {demoStep === 0 && <div className="phone-qr-visual"><QrCode size={84} strokeWidth={1.5} /><span className="phone-scan-line" /></div>}
                    {demoStep === 1 && <div className="phone-code-visual"><Keyboard size={26} /><span>{t.register.codeHint}</span></div>}
                    {demoStep === 2 && <div className="phone-success-visual"><span><Check size={34} /></span><strong>+{t.home.rewards[0].title}</strong><Sparkles className="phone-sparkle" size={23} /></div>}
                    {demoStep === 3 && <div className="phone-progress-visual"><ChartNoAxesColumnIncreasing size={30} /><span>{t.dashboard.nextReward}</span><div className="phone-progress-track"><i /></div><b>1 / {t.home.rewards[1].count}</b></div>}
                  </div>
                  <p className="phone-step-copy">{demoStep === 2 ? t.home.phoneSuccess : t.home.steps[demoStep + 1]?.text}</p>
                  <div className="phone-step-dots">{t.home.steps.map((step, index) => <span className={index === demoStep ? "active" : ""} key={step.n} />)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-cta reveal-section" aria-labelledby="cta-title">
        <div className="home-shell">
          <div className="cta-panel reveal-item">
            <span className="cta-index">05 / QURT</span>
            <h2 id="cta-title">{t.home.ctaTitle}</h2>
            <Link className="home-button button-white magnetic-link" href="/code">{t.home.ctaButton}<span aria-hidden="true">↗</span></Link>
            {ctaBalls.map((ball, index) => (
              <Image className={`cta-ball cta-ball-${index + 1}`} key={`${ball}-${index}`} src={`/qurt/${ball}`} alt="" aria-hidden="true" width={120} height={120} sizes="120px" />
            ))}
          </div>
        </div>
      </section>

      <section className="home-faq reveal-section" aria-labelledby="faq-title">
        <div className="home-shell faq-layout">
          <div className="section-heading reveal-item">
            <p className="section-index">{t.home.faqLabel}</p>
            <h2 id="faq-title">{t.home.faqTitle}</h2>
          </div>
          <div className="faq-list reveal-item">
            {t.home.faq.map((item, index) => (
              <details className="faq-item" key={item.q} open={index === 0}>
                <summary><span className="faq-number">0{index + 1}</span><span>{item.q}</span><b aria-hidden="true">+</b></summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <Link href="/code" className={`home-sticky-cta${heroVisible || footerVisible ? " is-hidden" : ""}`}><span>{t.home.ctaButton}</span><ArrowUpRight size={19} aria-hidden="true" /></Link>
    </div>
    </>
  );
}