"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TEXT =
  "We don't just ship projects. We craft digital products that look stunning, load fast, and grow your business.";

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>(".manifesto-word");
      gsap.from(words, {
        opacity: 0.12,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          end: "bottom 60%",
          scrub: true,
        },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="flex min-h-screen items-center px-6 py-32 md:px-10"
    >
      <h2 className="max-w-5xl font-display text-4xl font-black uppercase leading-[1.05] tracking-tight md:text-7xl">
        {TEXT.split(" ").map((w, i) => (
          <span key={i} className="manifesto-word mr-[0.25em] inline-block">
            {w}
          </span>
        ))}
      </h2>
    </section>
  );
}