"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.from(ref.current, {
      y: 50,
      opacity: 0,
      filter: "blur(12px)",
      rotateX: 8,
      duration: 1.2,
      delay,
      ease: "power4.out",
      scrollTrigger: { trigger: ref.current, start: "top 90%", toggleActions: "restart none none reverse" },
    });
  }, { scope: ref });
  return <div ref={ref} className={className} style={{ perspective: "1000px" }}>{children}</div>;
}