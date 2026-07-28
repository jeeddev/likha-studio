"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function HeroShoe() {
  const wrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      // marahang paglutang - taas baba, walang katapusan
      gsap.to(img.current, {
        y: -26,
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // intro entrance
      gsap.from(img.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1.4,
        delay: 0.4,
        ease: "power3.out",
      });

      const el = wrap.current;
      const image = img.current;
      if (!el || !image) return;

      let rotY = -12;
      let dragging = false;
      let lastX = 0;

      const setTilt = gsap.quickTo(image, "rotationX", { duration: 0.6, ease: "power2.out" });
      const setRot = gsap.quickTo(image, "rotationY", { duration: 0.5, ease: "power2.out" });
      setRot(rotY);

      // tilt na sumusunod sa mouse (pag hindi naka-drag)
      const onMove = (e: PointerEvent) => {
        if (dragging) {
          rotY += (e.clientX - lastX) * 0.4;
          lastX = e.clientX;
          setRot(rotY);
          return;
        }
        const r = el.getBoundingClientRect();
        const py = (e.clientY - r.top) / r.height - 0.5;
        setTilt(py * -14);
      };

      const onDown = (e: PointerEvent) => {
        dragging = true;
        lastX = e.clientX;
      };
      const onUp = () => {
        dragging = false;
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerdown", onDown);
      window.addEventListener("pointerup", onUp);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointerup", onUp);
      };
    },
    { scope: wrap },
  );

  return (
    <div
      ref={wrap}
      className="absolute inset-y-0 right-0 z-[5] flex w-full items-center justify-end md:w-[62%]"
      style={{ perspective: "1200px" }}
    >
      <img
        ref={img}
        src="/images/shoe.png"
        alt="Shoe"
        draggable={false}
        className="w-[88%] max-w-[820px] cursor-grab select-none object-contain drop-shadow-[0_50px_60px_rgba(0,0,0,0.55)] active:cursor-grabbing md:w-[92%]"
        style={{ transformStyle: "preserve-3d" }}
      />
    </div>
  );
}