"use client";

import { useState, useEffect } from "react";

const themes = [
  { name: "NOVA", accent: "#6d5cff", bg: "#05050a", label: "Indigo" },
  { name: "AUROFLUX", accent: "#3d5afe", bg: "#0a0a0f", label: "Electric Blue" },
  { name: "GRATIFUX", accent: "#f43f5e", bg: "#140a0d", label: "Rose" },
  { name: "VERDEUX", accent: "#10b981", bg: "#0a1410", label: "Emerald" },
  { name: "SOLARUX", accent: "#f59e0b", bg: "#140f0a", label: "Amber" },
  { name: "MONOFLUX", accent: "#e5e7eb", bg: "#0d0d0f", label: "Pure Mono" },
];

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", themes[active].accent);
    document.documentElement.style.setProperty("--bg", themes[active].bg);
  }, [active]);

  const pick = (i: number) => {
    setActive(i);
    setOpen(false);
  };

  return (
    <div className="theme-switcher fixed left-4 top-5 z-[75] md:left-10 md:top-6">
      <button onClick={() => setOpen(!open)} data-cursor="hover" aria-label="Change theme" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-2.5 backdrop-blur-xl transition hover:bg-white/10 md:px-3">
        <span className="h-3 w-3 rounded-full ring-1 ring-white/25" style={{ backgroundColor: themes[active].accent }} />
        <span className="hidden font-display text-xs font-black uppercase tracking-wide text-white sm:inline">{themes[active].name}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className={`hidden text-white/70 transition-transform duration-300 sm:block ${open ? "rotate-180" : ""}`}>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className={`absolute left-0 mt-3 w-48 origin-top-left rounded-2xl border border-white/10 bg-black/70 p-2 backdrop-blur-xl transition-all duration-300 md:w-56 ${open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}>
        {themes.map((t, i) => (
          <button key={t.name} onClick={() => pick(i)} data-cursor="hover" className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition ${active === i ? "bg-white/10" : "hover:bg-white/5"}`}>
            <span className="h-5 w-5 rounded-full ring-2 ring-white/20" style={{ backgroundColor: t.accent }} />
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