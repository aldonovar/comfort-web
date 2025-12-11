"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    // Trigger animation on route change
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onStart: () => setIsAnimating(true),
        onComplete: () => {
          if (!isMounted.current) return;
          setIsAnimating(false);
          // Defer refresh to ensure DOM is ready and avoid layout thrashing
          requestAnimationFrame(() => ScrollTrigger.refresh());
        }
      });

      // Curtain Wipe Effect
      // The overlay is initially hidden (scaleY: 0).

      // Reset
      gsap.set(overlayRef.current, { scaleY: 1, transformOrigin: "bottom" });

      // Slide Up (Reveal new content)
      tl.to(overlayRef.current, {
        scaleY: 0,
        duration: 1.2, // Slower, more elegant
        ease: "expo.inOut", // Smoother "luxury" feel
        transformOrigin: "top"
      });

    });

    // Safety: Force reveal after 2s (give animation time to finish)
    const safetyTimer = setTimeout(() => {
      if (overlayRef.current) {
        // Only force if it hasn't finished (though GSAP usually handles this)
        // We use a simple style set to ensure it's gone
        overlayRef.current.style.transform = "scaleY(0)";
        overlayRef.current.style.pointerEvents = "none";
      }
      if (isMounted.current) setIsAnimating(false);
    }, 2000);

    return () => {
      isMounted.current = false;
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
