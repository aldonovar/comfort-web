"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Reset states for overlay
      gsap.set(overlayRef.current, { scaleY: 1, transformOrigin: "bottom" });

      // Sequence: Overlay wipes away -> Content fades in
      // We use fromTo to ensure we control the start state explicitly
      tl.to(overlayRef.current, {
        scaleY: 0,
        duration: 0.8,
        ease: "power4.inOut",
        transformOrigin: "top",
      }).fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          clearProps: "all",
        },
        "-=0.4"
      );
    });

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div className="relative">
      {/* Curtain Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 bg-madera pointer-events-none"
        style={{ transformOrigin: "bottom" }}
      />

      {/* Content Wrapper */}
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
