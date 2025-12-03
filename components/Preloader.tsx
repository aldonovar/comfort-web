"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [isExiting, setIsExiting] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Entrance Animation (GSAP - Visuals Only)
    if (brandRef.current) {
      gsap.fromTo(brandRef.current,
        { opacity: 0, scale: 0.9, filter: "blur(10px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }
      );
    }

    // 2. Schedule Exit (Hard Timer)
    // This triggers the CSS transition class
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2500);

    // 3. Schedule Unmount (Hard Timer)
    // This removes the component from the DOM entirely
    const unmountTimer = setTimeout(() => {
      setIsUnmounted(true);
    }, 3500);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (isUnmounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] transition-all duration-1000 ease-in-out ${isExiting ? "opacity-0 pointer-events-none -translate-y-full" : "opacity-100"
        }`}
    >
      {/* Texture */}
      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />

      {/* Brand Content */}
      <div
        ref={brandRef}
        className={`relative z-10 flex flex-col items-center gap-6 transition-all duration-500 ${isExiting ? "scale-90 opacity-0" : "scale-100 opacity-100"
          }`}
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
