"use client";

import { useState, useEffect } from "react";

const themes = [
  { name: "AUROFLUX", accent: "#3d5afe", bg: "#0a0a0f", label: "Electric Blue" },
  { name: "LUMIUX", accent: "#a855f7", bg: "#0f0a14", label: "Violet Night" },
  { name: "GRATIFUX", accent: "#f43f5e", bg: "#140a0d", label: "Rose Dark" },
  { name: "VERDEUX", accent: "#10b981", bg: "#0a1410", label: "Emerald" },
  { name: "SOLARUX", accent: "#f59e0b", bg: "#140f0a", label: "Amber Warm" },
  { name: "CYANUX", accent: "#06b6d4", bg: "#0a1214", label: "Deep Cyan" },
  { name: "MONOFLUX", accent: "#e5e7eb", bg: "#0d0d0f", label: "Pure Mono" },
  { name: "GRAPHUX", accent: "#9ca3af", bg: "#141416", label: "Graphite Gray" },
  { name: "SLATEUX", accent: "#94a3b8", bg: "#0f1216", label: "Cool Slate" },
  { name: "CARBONUX", accent: "#71717a", bg: "#18181b", label: "Carbon Gray" },
];

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = themes[active];
    document.documentElement.style.setProperty("--accent", t.accent);
    document.documentElement.style.setProperty("--bg", t.bg);
  }, [active]);

  const pick = (i: number) => {
    setActive(i);
    setOpen(false);
  };

  return (
    <div className="fixed left-6 top-7 z-[75] md:left-10">
      {/* button - naka-label ang kulay */}
      <button
        onClick={() => setOpen(!open)}
        data-cursor="hover"
        aria-label="Change theme"
        className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl transition hover:bg-white/10"
      >
        <span className="h-4 w-4 flex-shrink-0 rounded-full ring-2 ring-white/25" style={{ backgroundColor: themes[active].accent }} />
        <span className="font-display text-sm font-black uppercase tracking-wide text-white">{themes[active].name}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70" />
        </svg>
      </button>

      {/* dropdown */}
      <div className={`absolute left-0 mt-3 w-56 origin-top-left rounded-2xl border border-white/10 bg-black/70 p-2 backdrop-blur-xl transition-all duration-300 ${open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}>
        {themes.map((t, i) => (
          <button
            key={t.name}
            onClick={() => pick(i)}
            data-cursor="hover"
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition ${active === i ? "bg-white/10" : "hover:bg-white/5"}`}
          >
            <span className="h-5 w-5 flex-shrink-0 rounded-full ring-2 ring-white/20" style={{ backgroundColor: t.accent }} />
            <span className="flex flex-col">
              <span className="font-display text-sm font-black uppercase tracking-wide text-white">{t.name}</span>
              <span className="text-[10px] uppercase tracking-widest text-white/40">{t.label}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}