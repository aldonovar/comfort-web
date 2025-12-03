"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Trigger animation on route change
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onStart: () => setIsAnimating(true),
        onComplete: () => setIsAnimating(false)
      });

      // Curtain Wipe Effect
      // The overlay is initially hidden (scaleY: 0).

      // Reset
      gsap.set(overlayRef.current, { scaleY: 1, transformOrigin: "bottom" });

      // Slide Up (Reveal new content)
      tl.to(overlayRef.current, {
        scaleY: 0,
        duration: 0.8,
        ease: "power4.inOut",
        transformOrigin: "top"
      });

    });

    // Safety: Force reveal after 1.5s in case GSAP fails
    const safetyTimer = setTimeout(() => {
      if (overlayRef.current) {
        overlayRef.current.style.transform = "scaleY(0)";
        overlayRef.current.style.pointerEvents = "none";
      }
    }, 1500);

    return () => {
      ctx.revert();
      clearTimeout(safetyTimer);
    };
  }, [pathname]);

  return (
    <div className="relative">
      {/* Transition Curtain */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9998] bg-madera pointer-events-none"
        style={{ transformOrigin: "bottom" }}
      />

      {/* Content */}
      <div className={`${isAnimating ? "pointer-events-none" : ""}`}>
        {children}
      </div>
    </div>
  );
}
