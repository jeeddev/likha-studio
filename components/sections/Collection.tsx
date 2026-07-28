"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import TransitionLink from "@/components/ui/TransitionLink";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const services = [
  { n: "01", slug: "website-development", name: "Website Development", tag: "Web", price: "From ₱15,000", color: "#3d5afe", img: "/images/service-1.jpg", desc: "Fast, sharp sites built to convert visitors into customers." },
  { n: "02", slug: "mobile-app-development", name: "Mobile App Development", tag: "iOS & Android", price: "From ₱80,000", color: "#d8613c", img: "/images/service-2.jpg", desc: "Apps that feel right and work right on real devices." },
  { n: "03", slug: "system-development", name: "System Development", tag: "Platforms", price: "From ₱50,000", color: "#c7c7bf", img: "/images/service-3.jpg", desc: "Portals, dashboards, and workflows built around your team." },
  { n: "04", slug: "video-editing", name: "Video Editing", tag: "Content", price: "From ₱5,000", color: "#17171a", img: "/images/service-4.jpg", desc: "Cinematic edits and motion content for your brand." },
];

function Row({ s, i }: { s: (typeof services)[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // layer reveal: clip-path na bumubukas mula sa baba + 3D tilt
    gsap.fromTo(
      ref.current,
      { clipPath: "inset(100% 0% 0% 0%)", y: 60, rotateX: 12 },
      {
        clipPath: "inset(0% 0% 0% 0%)", y: 0, rotateX: 0,
        duration: 1.2, ease: "power4.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      },
    );
  }, { scope: ref });

  return (
    <div style={{ perspective: "1400px" }}>
      <div
        ref={ref}
        data-cursor="hover"
        className="group relative flex h-[52vh] w-full items-end overflow-hidden rounded-3xl border border-white/10 md:h-[60vh]"
        style={{ backgroundColor: s.color, transformStyle: "preserve-3d", willChange: "transform, clip-path" }}
      >
        {/* picture - nagba-blur sa hover */}
        <img src={s.img} alt={s.name} className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:blur-[6px] group-hover:brightness-[0.5]" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        {/* number + price sa taas */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-7 md:p-10">
          <span className="font-display text-sm font-black text-white">{s.n} / 04</span>
          <span className="rounded-full border border-white/25 bg-black/30 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">{s.price}</span>
        </div>

        {/* DEFAULT: tag + name (mawawala sa hover) */}
        <div className="relative z-10 p-7 transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:opacity-0 md:p-10">
          <p className="text-xs uppercase tracking-widest text-white/80">{s.tag}</p>
          <h3 className="mt-1 font-display text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white md:text-7xl">{s.name}</h3>
        </div>

        {/* HOVER: description + button (lumalabas) */}
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-center p-7 opacity-0 transition-all duration-500 ease-out group-hover:pointer-events-auto group-hover:opacity-100 md:p-10">
          <p className="text-xs uppercase tracking-widest text-accent">{s.tag}</p>
          <h3 className="mt-1 font-display text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white md:text-6xl">{s.name}</h3>
          <p className="mt-4 max-w-md translate-y-4 text-white/80 transition-transform delay-100 duration-500 ease-out group-hover:translate-y-0 md:text-lg">{s.desc}</p>
          <div className="mt-6 translate-y-4 transition-transform delay-150 duration-500 ease-out group-hover:translate-y-0">
            <TransitionLink href={`/product/${s.slug}`} color={s.color} className="rounded-full bg-white px-7 py-3 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-white/85">
              Learn More
            </TransitionLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Collection() {
  return (
    <section id="services" className="px-6 py-28 md:px-10">
      <div className="mb-14">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-accent">What We Offer</p>
        <AnimatedTitle text="What We Do" className="font-display text-4xl font-black uppercase tracking-tight md:text-6xl" />
      </div>

      <div className="flex flex-col gap-6">
        {services.map((s, i) => (
          <Row key={s.n} s={s} i={i} />
        ))}
      </div>
    </section>
  );
}