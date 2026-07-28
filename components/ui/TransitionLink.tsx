"use client";

import { useRouter } from "next/navigation";
import { gsap } from "gsap";

export default function TransitionLink({
  href,
  color = "#3d5afe",
  children,
  className = "",
}: {
  href: string;
  color?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const size = Math.max(window.innerWidth, window.innerHeight) * 2.2;
    const circle = document.createElement("div");
    Object.assign(circle.style, {
      position: "fixed",
      left: `${e.clientX - size / 2}px`,
      top: `${e.clientY - size / 2}px`,
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      background: color,
      zIndex: "9999",
      transform: "scale(0)",
      pointerEvents: "none",
      willChange: "transform",
    });
    document.body.appendChild(circle);

    gsap.to(circle, {
      scale: 1,
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        router.push(href);
        gsap.to(circle, {
          opacity: 0,
          duration: 0.9,
          delay: 0.5,
          ease: "power2.out",
          onComplete: () => circle.remove(),
        });
      },
    });
  };

  return (
    <button onClick={onClick} className={className} data-cursor="hover">
      {children}
    </button>
  );
}