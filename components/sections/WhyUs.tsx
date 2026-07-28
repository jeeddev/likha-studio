"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "@/components/ui/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const rows = [
  { title: "We Learn Your Business First", desc: "Before we write a line of code, we sit with you. We ask the questions most agencies skip — what actually matters to your operations, not just what looks good on a homepage.", video: "/videos/why-1.mp4", poster: "/images/why-1.jpg" },
  { title: "One Team. One Conversation.", desc: "No account managers relaying messages. No ticket systems. No waiting three days for a reply. You talk directly to the people building your project — every time.", video: "/videos/why-2.mp4", poster: "/images/why-2.jpg" },
  { title: "Honest Scoping. Not Upselling.", desc: "Sometimes the answer is a simple website. Sometimes it's a full system. We'll tell you honestly which one — even when the simple answer means a smaller invoice for us.", video: "/videos/why-3.mp4", poster: "/images/why-3.jpg" },
  { title: "It Works After We Leave", desc: "We don't build things that fall apart when the project ends. You own everything, you understand everything — and if you need us later, we're here.", video: "/videos/why-4.mp4", poster: "/images/why-4.jpg" },
];

export default function WhyUs() {
  const ref = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const blocks = gsap.utils.toArray<HTMLElement>(".why-block");
      blocks.forEach((block, i) => {
        ScrollTrigger.create({
          trigger: block,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });
      });

      // HIGGSFIELD-style cinematic push: slow zoom-in habang nag-scroll
      gsap.utils.toArray<HTMLElement>(".why-layer").forEach((layer) => {
        gsap.fromTo(
          layer,
          { scale: 1.35, yPercent: -6 },
          {
            scale: 1.1,
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section id="why" ref={ref} className="px-6 py-28 md:px-10">
      <div className="mb-4">
        <p className="mb-3 text-sm uppercase tracking-widest text-accent">The Likha Difference</p>
        <AnimatedTitle
          text="Why It Matters"
          className="font-display text-4xl font-black uppercase tracking-tight md:text-6xl"
        />
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        {/* STICKY CINEMATIC MEDIA */}
        <div className="hidden md:block">
          <div ref={media} className="sticky top-24 aspect-[4/3] overflow-hidden rounded-3xl bg-white/5">
            {rows.map((r, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-[900ms] ease-out"
                style={{ opacity: active === i ? 1 : 0 }}
              >
                {/* cinematic push layer */}
                <div className="why-layer absolute inset-0 will-change-transform">
                  <img src={r.poster} alt={r.title} className="h-full w-full object-cover" />
                  <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline poster={r.poster}>
                    <source src={r.video} type="video/mp4" />
                  </video>
                </div>
                {/* vignette para cinematic */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
              </div>
            ))}

            <div className="absolute bottom-5 left-6 z-10 font-display text-7xl font-black text-white mix-blend-difference">
              0{active + 1}
            </div>
            <div className="absolute right-6 top-6 z-10 text-xs uppercase tracking-widest text-white/70 mix-blend-difference">
              0{active + 1} / 04
            </div>
          </div>
        </div>

        {/* SCROLLING TEXT */}
        <div>
          {rows.map((r, i) => (
            <div key={i} className="why-block flex min-h-[75vh] flex-col justify-center">
              <div className="mb-6 aspect-video overflow-hidden rounded-3xl bg-white/5 md:hidden">
                <div className="why-layer h-full w-full will-change-transform">
                  <video className="h-full w-full object-cover" autoPlay muted loop playsInline poster={r.poster}>
                    <source src={r.video} type="video/mp4" />
                  </video>
                </div>
              </div>

              <span className="font-display text-sm font-black text-accent">0{i + 1}</span>
              <h3
                className={`mt-2 font-display text-3xl font-black uppercase leading-tight tracking-tight transition-colors duration-500 md:text-5xl ${
                  active === i ? "text-white" : "text-white/25"
                }`}
              >
                {r.title}
              </h3>
              <p
                className={`mt-4 max-w-md text-white/70 transition-all duration-500 ${
                  active === i ? "translate-y-0 opacity-100" : "translate-y-3 opacity-40"
                }`}
              >
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}