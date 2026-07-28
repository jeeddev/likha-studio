"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function MagneticButton({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });

      const move = (e: MouseEvent) => {
        const { left, top, width, height } = el.getBoundingClientRect();
        xTo((e.clientX - (left + width / 2)) * 0.4);
        yTo((e.clientY - (top + height / 2)) * 0.4);
      };
      const reset = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", reset);
      return () => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", reset);
      };
    },
    { scope: ref },
  );

  return (
    <button ref={ref} className={className} data-cursor="hover">
      {children}
    </button>
  );
}