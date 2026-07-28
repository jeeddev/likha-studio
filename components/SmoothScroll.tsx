"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const lenis = lenisRef.current?.lenis;
    lenis?.on("scroll", ScrollTrigger.update);

    // velocity skew
    const skewTo = gsap.quickTo(content.current, "skewY", { duration: 0.5, ease: "power3.out" });
    lenis?.on("scroll", (e: { velocity: number }) => {
      const v = gsap.utils.clamp(-4, 4, e.velocity * 0.25);
      skewTo(v);
    });

    // smooth anchor scroll
    const onClick = (ev: MouseEvent) => {
      const target = ev.target as HTMLElement;
      const link = target.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      ev.preventDefault();
      lenisRef.current?.lenis?.scrollTo(el as HTMLElement, {
        offset: -40,
        duration: 1.6,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
    };
    document.addEventListener("click", onClick);

    return () => {
      gsap.ticker.remove(update);
      lenis?.off("scroll", ScrollTrigger.update);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <ReactLenis root options={{ autoRaf: false, lerp: 0.1, smoothWheel: true }} ref={lenisRef}>
      <div ref={content} className="will-change-transform">
        {children}
      </div>
    </ReactLenis>
  );
}