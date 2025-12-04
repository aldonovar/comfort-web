"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [isUnmounted, setIsUnmounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setIsUnmounted(true)
      });

      // 1. Initial State (No animation, just present)
      gsap.set(brandRef.current, { opacity: 1, scale: 1, filter: "blur(0px)" });

      // 2. Wait (Very short)
      tl.to({}, { duration: 0.5 });

      // 3. Exit (Smooth Curtain Up)
      tl.to(brandRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in"
      });

      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power3.inOut"
      }, "-=0.3");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (isUnmounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-[#0a0a0a]"
    >
      {/* Texture */}
      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />

      {/* Brand Content */}
      <div
        ref={brandRef}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        <div className="w-16 h-16 border border-crema/20 rounded-full flex items-center justify-center">
          <span className="font-serif text-2xl text-crema italic">C</span>
        </div>
        <div className="text-center space-y-2">
          <h1 className="font-serif text-3xl md:text-4xl text-crema tracking-wide">
            COMFORT STUDIO
          </h1>
          <p className="text-[0.6rem] uppercase tracking-[0.4em] text-terracota">
            Arquitectura Sensorial
          </p>
        </div>
      </div>
    </div>
  );
}
