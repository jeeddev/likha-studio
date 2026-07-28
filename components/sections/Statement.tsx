"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Statement() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(".stmt-bg", {
        yPercent: -12,
        scrollTrigger: {
          trigger: ref.current,
          scrub: 0.5,
          start: "top bottom",
          end: "bottom top",
        },
      });
      gsap.to(".stmt-1", {
        xPercent: -3,
        scrollTrigger: {
          trigger: ref.current,
          scrub: 0.5,
          start: "top bottom",
          end: "bottom top",
        },
      });
      gsap.to(".stmt-2", {
        xPercent: 3,
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
    <section
      ref={ref}
      className="relative flex min-h-[70vh] items-center overflow-hidden py-32"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/statement.jpg"
          alt=""
          className="stmt-bg h-[130%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
      </div>

      <h2 className="relative z-10 w-full px-6 font-display text-[9vw] font-black uppercase leading-[0.9] tracking-tighter text-white md:px-10 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
        <span className="stmt-1 block">Stand Out</span>
        <span className="stmt-2 block text-right text-accent drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">Not Blend In</span>
      </h2>
    </section>
  );
}