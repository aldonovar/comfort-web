"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [isMounted, setIsMounted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Session Check
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (hasVisited) {
      setIsMounted(false);
      return;
    }

    // 2. Lock Scroll
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsMounted(false);
          sessionStorage.setItem("hasVisited", "true");
          document.body.style.overflow = "";
        }
      });

      // --- ANIMATION: Minimalist & Fast ---

      // A. Initial State
      gsap.set(containerRef.current, { opacity: 1 });
      gsap.set(textRef.current, { opacity: 0, y: 10 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });

      // B. Reveal Brand (Fast)
      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      // C. Progress Line (The "Loading" feel)
      tl.to(lineRef.current, {
        scaleX: 1,
        duration: 1.2,
        ease: "expo.inOut"
      }, "<");

      // D. Elegant Exit (Simple Fade)
      // No movement, just dissolve. Matches "Design not pretension"
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut"
      }, "+=0.1");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] text-white will-change-opacity"
    >
      <div className="relative w-full max-w-xs flex flex-col items-center gap-6 p-6">

        {/* Brand */}
        <div ref={textRef} className="text-center opacity-0">
          <h1 className="font-serif text-3xl md:text-4xl tracking-widest text-white/90">
            COMFORT
          </h1>
          <p className="text-[10px] uppercase tracking-[0.6em] text-terracota mt-2">
            STUDIO
          </p>
        </div>

        {/* Progress Line */}
        <div className="w-full h-[1px] bg-white/10 overflow-hidden mt-4">
          <div
            ref={lineRef}
            className="w-full h-full bg-white/80"
          />
        </div>

      </div>
    </div>
  );
}
