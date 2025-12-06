"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [isMounted, setIsMounted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Check Session Storage
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
          // Trigger a custom event to signal the app is ready (optional, good for syncing other anims)
          window.dispatchEvent(new Event("preloaderComplete"));
        }
      });

      // --- ANIMATION SEQUENCE ---

      // A. Counter 0 -> 100
      tl.to({}, {
        duration: 1.5,
        onUpdate: function () {
          if (counterRef.current) {
            const val = Math.round(this.progress() * 100);
            counterRef.current.innerText = val < 10 ? `0${val}` : `${val}`;
          }
        },
        ease: "power3.inOut"
      });

      // B. Reveal Quote (Simultaneous with counter)
      tl.from(quoteRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out"
      }, "<0.2");

      // C. Fade Out Elements
      tl.to([counterRef.current, quoteRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.5,
        delay: 0.2,
        ease: "power2.in"
      });

      // D. Curtain Up (The Big Reveal)
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut"
      }, "+=0.1");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white"
    >
      {/* Cinematic Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.07] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />

      {/* Counter */}
      <div className="absolute bottom-12 right-12 overflow-hidden">
        <span
          ref={counterRef}
          className="block font-sans text-[12vw] md:text-[8vw] leading-none font-bold text-terracota/20 tracking-tighter"
        >
          00
        </span>
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <div ref={quoteRef} className="space-y-4">
          <p className="text-xs uppercase tracking-[0.5em] text-white/40">
            Comfort Studio
          </p>
          <h1 className="font-serif text-3xl md:text-5xl italic text-white/90">
            "El silencio se diseña."
          </h1>
        </div>
      </div>
    </div>
  );
}
