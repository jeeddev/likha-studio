"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const links = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { name: "Facebook", slug: "facebook", url: "https://facebook.com/yourpage" },
  { name: "GitHub", slug: "github", url: "https://github.com/yourusername" },
  { name: "Instagram", slug: "instagram", url: "https://instagram.com/yourpage" },
  { name: "TikTok", slug: "tiktok", url: "https://tiktok.com/@yourpage" },
];

function SocialIcon({ s }: { s: { name: string; slug: string; url: string } }) {
  const wrap = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const el = wrap.current;
      if (!el) return;
      const icon = el.querySelector(".si-icon");
      const bits = gsap.utils.toArray<HTMLElement>(".si-bit", el);

      const enter = () => {
        gsap.to(icon, { opacity: 0, duration: 0.2 });
        bits.forEach((b) => {
          gsap.to(b, { x: gsap.utils.random(-22, 22), y: gsap.utils.random(-22, 22), opacity: 0, scale: gsap.utils.random(0.3, 0.9), duration: gsap.utils.random(0.4, 0.7), ease: "power2.out" });
        });
      };
      const leave = () => {
        gsap.to(icon, { opacity: 1, duration: 0.3, delay: 0.1 });
        bits.forEach((b) => {
          gsap.to(b, { x: 0, y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" });
        });
      };

      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      };
    },
    { scope: wrap },
  );

  const iconUrl = `https://cdn.simpleicons.org/${s.slug}/ffffff`;

  return (
    <a ref={wrap} href={s.url} target="_blank" rel="noopener noreferrer" data-cursor="hover" aria-label={s.name} className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl transition-colors duration-300 hover:border-accent">
      <img src={iconUrl} alt={s.name} width={16} height={16} className="si-icon" />
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} className="si-bit pointer-events-none absolute h-4 w-4 bg-white" style={{ WebkitMaskImage: `url(${iconUrl})`, maskImage: `url(${iconUrl})`, WebkitMaskSize: "16px 16px", maskSize: "16px 16px", clipPath: `inset(${Math.floor(i / 3) * 50}% ${(2 - (i % 3)) * 33}% ${(1 - Math.floor(i / 3)) * 50}% ${(i % 3) * 33}%)` }} />
      ))}
    </a>
  );
}

export default function MenuOverlay() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      gsap.set(".menu-overlay", { autoAlpha: 0 });
      tl.current = gsap
        .timeline({ paused: true })
        .from(".nav-social", { x: 56, opacity: 0, scale: 0.4, stagger: { each: 0.07, from: "end" }, duration: 0.55, ease: "back.out(1.8)" }, 0)
        .to(".menu-overlay", { autoAlpha: 1, duration: 0.5, ease: "power2.out" }, 0.1)
        .from(".menu-link", { yPercent: 120, stagger: 0.07, duration: 0.8, ease: "power4.out" }, "-=0.2")
        .from(".menu-social", { y: 20, opacity: 0, stagger: 0.06, duration: 0.5, ease: "power3.out" }, "-=0.4");
    },
    { scope: root },
  );

  const toggle = () => {
    if (!tl.current) return;
    if (open) {
      tl.current.reverse();
      document.body.classList.remove("menu-open");
    } else {
      tl.current.play();
      document.body.classList.add("menu-open");
    }
    setOpen(!open);
  };
  const close = () => {
    tl.current?.reverse();
    document.body.classList.remove("menu-open");
    setOpen(false);
  };

  return (
    <div ref={root}>
      <div className="fixed right-6 top-7 z-[70] flex items-center gap-3 md:right-10">
        <div className="flex items-center gap-2">
          {socials.map((s) => (
            <span key={s.slug} className="nav-social"><SocialIcon s={s} /></span>
          ))}
        </div>

        <button onClick={toggle} data-cursor="hover" aria-label="Menu" className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl transition hover:bg-white/10">
          <span className={`h-0.5 w-5 bg-white transition-all duration-300 ${open ? "translate-y-1 rotate-45" : ""}`} />
          <span className={`h-0.5 w-5 bg-white transition-all duration-300 ${open ? "-translate-y-1 -rotate-45" : ""}`} />
        </button>
      </div>

      <div className="menu-overlay fixed inset-0 z-[60] flex flex-col justify-between bg-black/60 p-8 backdrop-blur-2xl md:p-14">
        <span className="font-display text-lg font-black text-white">LIKHA</span>

        <nav className="flex flex-col gap-2">
          {links.map((l, i) => (
            <span key={l.href} className="block overflow-hidden">
              <a href={l.href} onClick={close} data-cursor="hover" className="menu-link group flex items-baseline gap-4 font-display text-5xl font-black uppercase leading-[1.05] tracking-tighter text-white/80 transition-colors duration-300 hover:text-accent md:text-7xl">
                <span className="text-sm font-black text-accent">0{i + 1}</span>
                <span className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-4">{l.label}</span>
              </a>
            </span>
          ))}
        </nav>

        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            {socials.map((s) => (
              <span key={s.slug} className="menu-social"><SocialIcon s={s} /></span>
            ))}
          </div>
          <p className="menu-social text-sm text-white/50">hello@likha.studio</p>
        </div>
      </div>
    </div>
  );
}