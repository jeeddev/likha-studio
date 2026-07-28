"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function EditorialBreak() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(".edb-bg", {
        yPercent: -14,
        scrollTrigger: {
          trigger: ref.current,
          scrub: 0.5,
          start: "top bottom",
          end: "bottom top",
        },
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative flex min-h-[60vh] items-center overflow-hidden py-28">
      <div className="absolute inset-0 -z-10">
        {/* ilagay sa public/images/editorial.jpg */}
        <img src="/images/editorial.jpg" alt="" className="edb-bg h-[130%] w-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <h2 className="relative z-10 w-full px-6 text-center font-display text-3xl font-black uppercase leading-tight tracking-tight text-white md:px-10 md:text-6xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
        Every Likha build is
        <br />
        <span className="text-accent">documented, polished,</span>
        <br />
        and handed off — yours to keep.
      </h2>
    </section>
  );
}