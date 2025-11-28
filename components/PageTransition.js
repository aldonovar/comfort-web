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

      // Reset states
      gsap.set(overlayRef.current, { scaleY: 1, transformOrigin: "bottom" });
      gsap.set(contentRef.current, { opacity: 0, y: 20 });

      // Sequence: Overlay wipes away -> Content fades in
      tl.to(overlayRef.current, {
        scaleY: 0,
        duration: 0.8,
        ease: "power4.inOut",
        transformOrigin: "top",
      }).to(
        contentRef.current,
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
      <div ref={contentRef} className="opacity-0">
        {children}
      </div>
    </div>
  );
}
