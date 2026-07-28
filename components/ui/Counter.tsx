"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Counter({
  to,
  suffix = "",
  duration = 2,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: to,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        },
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = Math.floor(obj.val).toString() + suffix;
          }
        },
      });
    },
    { scope: ref },
  );

  return <span ref={ref}>0{suffix}</span>;
}