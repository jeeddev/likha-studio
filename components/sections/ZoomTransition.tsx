"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ZoomTransition() {
  const wrap = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: "+=180%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // maliit -> lalaki hanggang punuin ang screen -> maglaho
      tl.fromTo(
        ".zt-img",
        { scale: 0.35, borderRadius: "40px", filter: "brightness(0.6)" },
        { scale: 1, borderRadius: "0px", filter: "brightness(1)", ease: "power2.inOut" },
      )
        .to(".zt-caption", { opacity: 0, y: -40, ease: "power2.in" }, 0.15)
        .to(".zt-img", { scale: 2.4, opacity: 0, filter: "brightness(0.2) blur(6px)", ease: "power2.in" }, ">-0.1")
        .fromTo(".zt-next", { opacity: 0, y: 60, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, ease: "power3.out" }, "<0.2");
    },
    { scope: wrap },
  );

  return (
    <section ref={wrap} className="relative h-screen overflow-hidden">
      {/* zoom image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="zt-img relative h-full w-full overflow-hidden will-change-transform">
          {/* ilagay sa public/images/zoom.jpg */}
          <img src="/images/zoom.jpg" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </div>

      {/* caption sa ibabaw ng image */}
      <div className="zt-caption pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
        <p className="mb-3 text-sm uppercase tracking-widest text-accent">Our Craft</p>
        <h2 className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tighter text-white md:text-8xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
          Every Detail
          <br />
          <span className="text-accent">Matters</span>
        </h2>
      </div>

      {/* susunod na content - lumalabas pagtapos ng zoom */}
      <div className="zt-next pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center opacity-0">
        <h2 className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tighter md:text-8xl">
          Built to
          <br />
          <span className="text-accent">Perform</span>
        </h2>
        <p className="mt-6 max-w-md text-white/70">
          From first pixel to final launch — crafted with intent, engineered to last.
        </p>
      </div>
    </section>
  );
}