"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useGSAP(() => {
    const counter = { val: 0 };
    const tl = gsap.timeline();

    tl.to(counter, {
      val: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(counter.val)),
    })
      .to(".loader-bar", { scaleX: 1, duration: 2, ease: "power2.inOut" }, 0)
      .to(".loader-num, .loader-label", { y: -40, opacity: 0, duration: 0.6, ease: "power3.in" }, "+=0.2")
      .to(root.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      }, "-=0.2")
      .set(root.current, { display: "none" });
  });

  return (
    <div ref={root} className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050506]">
      <div className="loader-label mb-6 text-sm uppercase tracking-[0.3em] text-white/50">
        LIKHA Studio
      </div>
      <div className="loader-num font-display text-[22vw] font-black leading-none text-white md:text-[16vw]">
        {count}
      </div>
      <div className="mt-8 h-[2px] w-56 overflow-hidden bg-white/10">
        <div className="loader-bar h-full w-full origin-left scale-x-0 bg-accent" />
      </div>
    </div>
  );
}