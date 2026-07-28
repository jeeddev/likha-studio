"use client";

import { useState } from "react";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import TransitionLink from "@/components/ui/TransitionLink";

const services = [
  { n: "01", slug: "website-development", name: "Website Development", tag: "Web", price: "From ₱15,000", color: "#3d5afe", img: "/images/service-1.jpg", desc: "Fast, sharp sites built to convert visitors into customers." },
  { n: "02", slug: "mobile-app-development", name: "Mobile App Development", tag: "iOS & Android", price: "From ₱80,000", color: "#d8613c", img: "/images/service-2.jpg", desc: "Apps that feel right and work right on real devices." },
  { n: "03", slug: "system-development", name: "System Development", tag: "Platforms", price: "From ₱50,000", color: "#c7c7bf", img: "/images/service-3.jpg", desc: "Portals, dashboards, and workflows built around your team." },
  { n: "04", slug: "video-editing", name: "Video Editing", tag: "Content", price: "From ₱5,000", color: "#17171a", img: "/images/service-4.jpg", desc: "Cinematic edits and motion content for your brand." },
];

export default function Collection() {
  const [active, setActive] = useState(0);
  const total = services.length;

  const go = (dir: number) => {
    setActive((prev) => (prev + dir + total) % total);
  };

  return (
    <section id="services" className="overflow-hidden py-28">
      <div className="mb-10 px-6 md:px-10">
        <AnimatedTitle
          text="What We Do"
          className="font-display text-4xl font-black uppercase tracking-tight md:text-6xl"
        />
      </div>

      <div className="relative">
        {/* 3D COVERFLOW */}
        <div className="relative h-[380px] w-full md:h-[440px]" style={{ perspective: "1600px" }}>
          <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
            {services.map((p, i) => {
              let offset = i - active;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              const abs = Math.abs(offset);
              const isActive = offset === 0;

              const style: React.CSSProperties = {
                transform: `translateX(${offset * 52}%) translateZ(${-abs * 300}px) rotateY(${offset * -38}deg)`,
                opacity: abs > 2 ? 0 : 1,
                zIndex: total - abs,
                transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease",
                pointerEvents: isActive ? "auto" : "none",
                backgroundColor: p.color,
              };

              return (
                <article
                  key={p.n}
                  data-cursor="hover"
                  onClick={() => !isActive && setActive(i)}
                  className="group absolute aspect-[16/10] w-[74%] overflow-hidden rounded-3xl shadow-2xl md:w-[44%]"
                  style={style}
                >
                  <img src={p.img} alt={p.name} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

                  <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-black text-white">{p.n} / 04</span>
                      <span className="rounded-full border border-white/25 bg-black/30 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">{p.price}</span>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/80">{p.tag}</p>
                      <h3 className="mt-1 font-display text-2xl font-black uppercase leading-tight text-white md:text-4xl">{p.name}</h3>

                      {/* description - lumalabas smoothly pag active na */}
                      <div
                        className="grid transition-all duration-700 ease-out"
                        style={{
                          gridTemplateRows: isActive ? "1fr" : "0fr",
                          opacity: isActive ? 1 : 0,
                        }}
                      >
                        <div className="overflow-hidden">
                          <p className="mt-3 max-w-md text-sm text-white/70">{p.desc}</p>
                          <div className="mt-5">
                            <TransitionLink
                              href={`/product/${p.slug}`}
                              color={p.color}
                              className="rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-white/85"
                            >
                              Learn More
                            </TransitionLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ARROWS sa gilid */}
        <button onClick={() => go(-1)} data-cursor="hover" aria-label="Previous" className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-sm transition hover:border-accent hover:bg-white/10 md:left-10">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button onClick={() => go(1)} data-cursor="hover" aria-label="Next" className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-sm transition hover:border-accent hover:bg-white/10 md:right-10">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>

      {/* dots */}
      <div className="mt-8 flex justify-center gap-2">
        {services.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            data-cursor="hover"
            aria-label={`Go to ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-accent" : "w-2 bg-white/25"}`}
          />
        ))}
      </div>
    </section>
  );
}