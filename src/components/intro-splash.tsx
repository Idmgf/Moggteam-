"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { IntroProduct } from "@/lib/intro-products";

type IntroSplashProps = {
  enabled: boolean;
  items: IntroProduct[];
  heroPackSrc: string;
  brandLabel: string;
  dialogLabel: string;
  skipLabel: string;
};

type TimelineControl = {
  progress: (value: number) => TimelineControl;
  kill: () => void;
  time: () => number;
  duration: () => number;
};

export function IntroSplash({ enabled, items, heroPackSrc, brandLabel, dialogLabel, skipLabel }: IntroSplashProps) {
  const splashRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<TimelineControl | null>(null);
  const finishRef = useRef<() => void>(() => {});
  const finishedRef = useRef(false);
  const [mounted, setMounted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [radius, setRadius] = useState(360);
  const [skipVisible, setSkipVisible] = useState(false);
  const visibleItems = items.slice(0, isMobile ? 6 : 9);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const updateGeometry = () => {
      const mobile = media.matches;
      setIsMobile(mobile);
      const width = window.innerWidth;
      setRadius(Math.max(mobile ? 105 : 190, Math.min(width * (mobile ? 0.31 : 0.34), mobile ? 185 : 460)));
    };
    updateGeometry();
    media.addEventListener("change", updateGeometry);
    window.addEventListener("resize", updateGeometry);
    return () => {
      media.removeEventListener("change", updateGeometry);
      window.removeEventListener("resize", updateGeometry);
    };
  }, []);

  useEffect(() => {
    const splash = splashRef.current;
    const root = document.documentElement;
    if (!enabled || !splash || !root.classList.contains("intro-pending")) {
      setMounted(false);
      return;
    }

    let cancelled = false;
    let skipTimer = 0;
    let decodeTimer = 0;
    let gsap: typeof import("gsap").default | undefined;
    let productBob: { kill: () => unknown } | null = null;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const timeout = mobile ? 3.5 : 4.5;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setSkipVisible(false);
    finishedRef.current = false;

    const cleanupAnimationStyles = () => {
      splash.querySelectorAll<HTMLElement>("*").forEach((element) => {
        element.style.removeProperty("will-change");
      });
    };

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      productBob?.kill();
      productBob = null;
      if (timelineRef.current && timelineRef.current.time() < timelineRef.current.duration()) {
        timelineRef.current.progress(1);
      }
      try {
        window.sessionStorage.setItem("gormolzavod:qurt-intro:v1", "1");
      } catch {
        // The intro still completes when storage is unavailable.
      }
      document.body.style.overflow = previousOverflow;
      root.classList.remove("intro-pending");
      window.dispatchEvent(new Event("qurt:intro:complete"));
      cleanupAnimationStyles();
      setMounted(false);
    };
    finishRef.current = finish;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKeyDown);
    skipTimer = window.setTimeout(() => setSkipVisible(true), 500);

    const start = async () => {
      const images = Array.from(splash.querySelectorAll<HTMLImageElement>("img"));
      const targetImage = document.querySelector<HTMLImageElement>("#hero-pack");
      if (targetImage) images.push(targetImage);

      const decoded = await Promise.race([
        Promise.all(images.map((image) => image.decode())).then(() => true).catch(() => false),
        new Promise<boolean>((resolve) => {
          decodeTimer = window.setTimeout(() => resolve(false), 3000);
        }),
      ]);
      window.clearTimeout(decodeTimer);
      if (cancelled) return;
      if (!decoded || !targetImage) {
        finish();
        return;
      }

      const gsapModule = await import("gsap").then((module) => module.default).catch(() => null);
      if (cancelled) return;
      if (!gsapModule) {
        finish();
        return;
      }
      gsap = gsapModule;

      const ring = splash.querySelector<HTMLElement>(".intro-ring");
      const cover = splash.querySelector<HTMLElement>(".intro-cover");
      const flightPack = splash.querySelector<HTMLImageElement>(".intro-flight-pack");
      const selectedCard = splash.querySelector<HTMLElement>(".intro-card-qurt");
      if (!ring || !cover || !flightPack || !selectedCard) {
        finish();
        return;
      }

      const targetRect = targetImage.getBoundingClientRect();
      const flightRect = flightPack.getBoundingClientRect();
      const targetX = targetRect.left + targetRect.width / 2 - (flightRect.left + flightRect.width / 2);
      const targetY = targetRect.top + targetRect.height / 2 - (flightRect.top + flightRect.height / 2);
      const targetScale = targetRect.width / flightRect.width;
      const centerX = ((targetRect.left + targetRect.width / 2) / window.innerWidth) * 100;
      const centerY = ((targetRect.top + targetRect.height / 2) / window.innerHeight) * 100;
      const fastSpin = mobile ? 1.05 : 1.45;
      const slowSpin = mobile ? 0.62 : 0.82;
      const stopAt = 0.68 + fastSpin + slowSpin;
      const fadeOthersAt = stopAt - 0.08;
      const flightAt = mobile ? 2.62 : 3.42;
      const flightDuration = timeout - flightAt;
      const rotation = { value: 0 };
      const spinUpdate = () => gsap?.set(ring, { rotationY: rotation.value });
      const otherCards = gsap.utils.toArray<HTMLElement>(splash.querySelectorAll(".intro-card:not(.intro-card-qurt)"));

      splash.querySelectorAll<HTMLElement>(".intro-card, .intro-ring, .intro-flight-pack").forEach((element) => {
        element.style.willChange = "transform, opacity";
      });
      cover.style.willChange = "clip-path";
      gsap.set(ring, { rotationY: 0 });
      gsap.set(flightPack, { autoAlpha: 0, scale: 0.92 });

      const timeline = gsap.timeline({ onComplete: finish });
      timelineRef.current = timeline;
      timeline
        .fromTo(".intro-progress-fill", { scaleX: 0 }, { scaleX: 1, duration: 0.58, ease: "none" }, 0)
        .fromTo(".intro-brand", { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.48, ease: "power2.out" }, 0.05)
        .to(".intro-brand", { y: -36, autoAlpha: 0, duration: 0.34, ease: "power2.in" }, 0.58)
        .fromTo(ring, { autoAlpha: 0, scale: 0.84 }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power2.out" }, 0.62)
        .to(rotation, { value: 1080, duration: fastSpin, ease: "power1.in", onUpdate: spinUpdate }, 0.68)
        .to(rotation, { value: 1440, duration: slowSpin, ease: "power3.out", onUpdate: spinUpdate }, 0.68 + fastSpin)
        .to(otherCards, {
          x: (index) => index % 2 === 0 ? -120 : 120,
          scale: 0.7,
          autoAlpha: 0,
          ...(mobile ? {} : { filter: "blur(8px)" }),
          duration: 0.42,
          stagger: 0.025,
          ease: "power2.in",
        }, fadeOthersAt)
        .to(selectedCard, { scale: 1.12, duration: 0.38, ease: "back.out(1.4)" }, stopAt - 0.02)
        .to(selectedCard, { autoAlpha: 0, duration: 0.12, ease: "none" }, flightAt - 0.03)
        .fromTo(flightPack, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.12, ease: "none" }, flightAt - 0.03)
        .to(flightPack, { x: targetX, y: targetY, scale: targetScale, rotate: 0, duration: flightDuration, ease: "power3.inOut" }, flightAt)
        .to(cover, { clipPath: `circle(0% at ${centerX}% ${centerY}%)`, duration: 0.7, ease: "power2.inOut" }, flightAt + flightDuration * 0.28);

      productBob = gsap.to(".intro-card-image", {
        rotate: 2,
        duration: 0.62,
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.05, from: "random" },
        ease: "sine.inOut",
      });
    };

    void start();
    return () => {
      cancelled = true;
      window.clearTimeout(skipTimer);
      window.clearTimeout(decodeTimer);
      window.removeEventListener("keydown", onKeyDown);
      productBob?.kill();
      productBob = null;
      timelineRef.current?.kill();
      if (!finishedRef.current) document.body.style.overflow = previousOverflow;
      timelineRef.current = null;
    };
  }, [enabled, items]);

  if (!enabled || !mounted) return null;

  return (
    <div className={`intro-splash${skipVisible ? " is-skip-visible" : ""}`} ref={splashRef} role="dialog" aria-modal="true" aria-label={dialogLabel}>
      <div className="intro-cover" />
      <div className="intro-brand">
        <Image src="/brand/gormolzavod-mark-trimmed.webp" alt="" width={172} height={131} />
        <span>{brandLabel}</span>
        <div className="intro-progress"><i className="intro-progress-fill" /></div>
      </div>
      <div className="intro-ring-stage">
        <div className="intro-ring">
          {visibleItems.map((item, index) => {
            const angle = (index * 360) / visibleItems.length;
            return <div
              className={`intro-card${item.isQurt ? " intro-card-qurt" : ""}`}
              data-index={index}
              key={`${item.fileName}-${index}`}
              style={{ transform: `rotateY(${angle}deg) translateZ(${radius}px)` }}
            >
              <img className="intro-card-image" src={item.src} alt="" decoding="async" loading="eager" />
            </div>;
          })}
        </div>
      </div>
      <img className="intro-flight-pack" src={heroPackSrc} alt="" decoding="async" loading="eager" />
      <button className="intro-skip" type="button" onClick={() => finishRef.current()}>{skipLabel}</button>
    </div>
  );
}