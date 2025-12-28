"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Preloader() {
  const [isMounted, setIsMounted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
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

      // --- ANIMATION: Cinematic Curtain Reveal ---

      // A. Initial State
      gsap.set(containerRef.current, { yPercent: 0 }); // Ensure it covers screen
      gsap.set(textRef.current, { opacity: 0, scale: 0.9 });

      // B. Reveal Logo (Elegant Fade + Scale)
      tl.to(textRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out"
      });

      // C. Hold briefly to admire logo
      tl.to({}, { duration: 0.5 });

      // D. Curtain Reveal (Slide Up)
      // The background slides up, revealing the content underneath
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut", // Cinematic ease
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] text-white will-change-opacity"
    >
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div ref={textRef} className="opacity-0 scale-90">
          <Image
            src="/comfort-logo-light.png"
            alt="Comfort Studio"
            width={120}
            height={120}
            className="w-24 md:w-32 h-auto object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
