"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AnimatedTitle({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      gsap.from(".at-char", {
        yPercent: 120,
        rotateZ: 8,
        opacity: 0,
        stagger: { each: 0.02, from: "random" },
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          toggleActions: "restart none none reverse",
        },
      });
    },
    { scope: ref },
  );

  return (
    <h2 ref={ref} className={className}>
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="mr-[0.25em] inline-block">
          {word.split("").map((ch, ci) => (
            <span key={ci} className="inline-block overflow-hidden align-top">
              <span className="at-char inline-block will-change-transform">{ch}</span>
            </span>
          ))}
        </span>
      ))}
    </h2>
  );
}