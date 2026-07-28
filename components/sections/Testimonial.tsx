"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const QUOTE =
  "They didn't just build a website. They built how our business runs online. Every detail matched the vision.";

export default function Testimonial() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>(".tst-word");
      gsap.from(words, {
        opacity: 0.1,
        y: 10,
        stagger: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          end: "bottom 65%",
          scrub: true,
        },
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="px-6 py-28 md:px-10">
      <div className="mx-auto max-w-4xl text-center">
        <span className="font-display text-7xl font-black text-accent">&ldquo;</span>
        <p className="font-display text-2xl font-black uppercase leading-snug tracking-tight md:text-4xl">
          {QUOTE.split(" ").map((w, i) => (
            <span key={i} className="tst-word mr-[0.25em] inline-block">
              {w}
            </span>
          ))}
        </p>
        <p className="mt-8 text-sm uppercase tracking-widest text-muted">
          Client Testimonial · 2026
        </p>
      </div>
    </section>
  );
}