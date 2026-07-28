"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function SpotlightBg({ image }: { image?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const smokeLayer = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const g = glow.current;
      const layer = smokeLayer.current;
      if (!el || !g || !layer) return;

      const gx = gsap.quickTo(g, "x", { duration: 1.6, ease: "power3.out" });
      const gy = gsap.quickTo(g, "y", { duration: 1.6, ease: "power3.out" });

      let last = 0;
      let count = 0;
      const MAX = 26; // limit para hindi mag-lag

      const puff = (x: number, y: number) => {
        if (count >= MAX) return;
        count++;

        const p = document.createElement("div");
        const size = gsap.utils.random(220, 400);
        Object.assign(p.style, {
          position: "absolute",
          left: `${x}px`,
          top: `${y}px`,
          width: `${size}px`,
          height: `${size}px`,
          marginLeft: `${-size / 2}px`,
          marginTop: `${-size / 2}px`,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(100,125,255,0.4) 0%, rgba(61,90,254,0.16) 45%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(36px)",
          willChange: "transform, opacity",
        });
        layer.appendChild(p);

        const angle = gsap.utils.random(0, Math.PI * 2);
        const dist = gsap.utils.random(30, 90);

        gsap.fromTo(
          p,
          { scale: 0.6, opacity: 1 },
          {
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist - 35,
            scale: gsap.utils.random(1.5, 2.4),
            opacity: 0,
            duration: gsap.utils.random(2.2, 3.6),
            ease: "sine.out",
            onComplete: () => {
              p.remove();
              count--;
            },
          },
        );
      };

      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        gx(x);
        gy(y);
        const now = Date.now();
        if (now - last > 32) {
          last = now;
          puff(x, y);
        }
      };

      window.addEventListener("mousemove", move);
      return () => window.removeEventListener("mousemove", move);
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-[#050506]">
      <div
        className="absolute right-[-10%] top-1/2 h-[900px] w-[900px] -translate-y-1/2 animate-pulse rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(61,90,254,0.35) 0%, rgba(61,90,254,0.12) 40%, transparent 70%)",
          animationDuration: "5s",
        }}
      />

      {image && (
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover object-right opacity-90" />
      )}

      <div ref={smokeLayer} className="pointer-events-none absolute inset-0" />

      <div
        ref={glow}
        className="pointer-events-none absolute left-0 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(90,115,255,0.25) 0%, transparent 65%)",
        }}
      />

      <div className="pointer-events-none absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-black/70 to-transparent" />
    </div>
  );
}