"use client";

import { useEffect } from "react";

export default function SmoothScroller() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a[href^='#']");
      if (!target) return;
      const id = target.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return null;
}
