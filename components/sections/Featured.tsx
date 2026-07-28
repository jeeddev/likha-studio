"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "@/components/ui/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const scenes = [
  { img: "/images/feature-1.jpg", tag: "Websites", title: "Fast. Sharp. Yours.", desc: "Sites built to convert, engineered to last.", color: "#3d5afe" },
  { img: "/images/feature-2.jpg", tag: "Mobile Apps", title: "In Every Pocket", desc: "Apps that feel right on real devices.", color: "#d8613c" },
  { img: "/images/feature-3.jpg", tag: "Systems", title: "Built Around You", desc: "Platforms that run how your team works.", color: "#1a1a2e" },
];

export default function Featured() {
  const wrap = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // zoom-out ng bawat picture habang nag-scroll
      gsap.utils.toArray<HTMLElement>(".ft-img").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.35 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });
    },
    { scope: wrap },
  );

  return (
    <section ref={wrap} className="px-6 py-28 md:px-10">
      <div className="mb-14">
        <p className="mb-3 text-sm uppercase tracking-widest text-accent">Featured</p>
        <AnimatedTitle
          text="Our Work in Motion"
          className="font-display text-4xl font-black uppercase tracking-tight md:text-6xl"
        />
      </div>

      <div className="flex flex-col gap-6">
        {scenes.map((s, i) => (
          <div
            key={i}
            data-cursor="hover"
            className="group relative h-[55vh] w-full overflow-hidden rounded-3xl md:h-[70vh]"
            style={{ backgroundColor: s.color }}
          >
            {/* picture - may zoom-out sa scroll + blur sa hover */}
            <img
              src={s.img}
              alt={s.title}
              onError={(e) => (e.currentTarget.style.display = "none")}
              className="ft-img h-full w-full object-cover transition-all duration-700 ease-out group-hover:blur-[3px] group-hover:brightness-[0.55]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

            {/* default: tag + title */}
            <div className="absolute bottom-0 left-0 p-8 transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:opacity-0 md:p-14">
              <p className="text-sm uppercase tracking-widest text-accent">{s.tag}</p>
              <h3 className="mt-2 font-display text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white md:text-7xl">{s.title}</h3>
            </div>

            {/* hover: title + description */}
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-center p-8 opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 md:p-14">
              <p className="text-sm uppercase tracking-widest text-accent">{s.tag}</p>
              <h3 className="mt-2 font-display text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white md:text-7xl">{s.title}</h3>
              <p className="mt-4 max-w-md translate-y-3 text-white/80 transition-transform duration-500 ease-out group-hover:translate-y-0 md:text-lg">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}