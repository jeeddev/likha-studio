"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(ref.current, {
        y: -120,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out",
      });
    },
    { scope: ref },
  );

  return (
    <nav ref={ref} className="fixed left-1/2 top-6 z-50 flex w-[92%] max-w-3xl -translate-x-1/2 items-center justify-between rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-xl md:px-8">
      <a href="#hero" className="font-display text-lg font-black tracking-tight text-white">LIKHA</a>
      <div className="hidden gap-7 text-sm font-medium text-white/80 md:flex">
        <a href="#services" data-cursor="hover" className="transition hover:text-white">Services</a>
        <a href="#tech" data-cursor="hover" className="transition hover:text-white">Tech</a>
        <a href="#work" data-cursor="hover" className="transition hover:text-white">Work</a>
        <a href="#about" data-cursor="hover" className="transition hover:text-white">About</a>
      </div>
      <a href="#contact" data-cursor="hover" className="rounded-full bg-white px-5 py-2 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-white/85">Get Quote</a>
    </nav>
  );
}