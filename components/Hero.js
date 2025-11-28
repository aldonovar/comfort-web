"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Initial state
      gsap.set(".hero-element", { y: 40, opacity: 0 });

      tl.to(".hero-element", {
        y: 0,
        opacity: 1,
        duration: 1.4,
        stagger: 0.12,
        delay: 0.2
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen min-h-[700px] overflow-hidden bg-madera text-crema flex items-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
          src="https://cdn.coverr.co/videos/coverr-walking-by-a-wooden-wall-4608/1080p.mp4"
        />
        {/* Gradient Overlays for Depth & Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-madera/90 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col justify-center h-full">

        {/* Branding Tag */}
        <div className="hero-element mb-10">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-crema/10 bg-white/5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracota opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-terracota"></span>
            </span>
            <span className="text-[0.7rem] uppercase tracking-[0.3em] text-crema/90 font-medium">
              Comfort Studio · Outdoor Living
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="hero-element font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] max-w-5xl mb-8 tracking-tight">
          Diseñamos terrazas <br />
          que <span className="italic text-terracota font-light">elevan</span> tu vida.
        </h1>

        {/* Subtitle */}
        <p className="hero-element text-lg md:text-xl text-crema/70 max-w-xl leading-relaxed mb-12 font-light border-l border-terracota/50 pl-6">
          Transformamos azoteas y patios en espacios habitables con estética arquitectónica.
          Donde el diseño se encuentra con el confort.
        </p>

        {/* CTAs */}
        <div className="hero-element flex flex-wrap gap-6 items-center">
          {/* Primary CTA: Cotizar */}
          <a
            href="#cotiza"
            className="group relative px-9 py-4 bg-terracota overflow-hidden rounded-full transition-all hover:shadow-[0_0_40px_rgba(176,115,87,0.3)]"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />
            <span className="relative z-10 text-sm font-bold uppercase tracking-[0.2em] text-white group-hover:tracking-[0.25em] transition-all duration-500">
              Cotizar Proyecto
            </span>
          </a>

          {/* Secondary CTA: Agendar */}
          <a
            href="https://calendly.com/"
            target="_blank"
            className="group flex items-center gap-4 px-6 py-4 rounded-full border border-crema/20 hover:border-crema/40 hover:bg-white/5 transition-all duration-300"
          >
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-crema/90">Agendar Reunión</span>
            <div className="relative w-8 h-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
              <svg
                className="w-4 h-4 text-crema transition-all duration-300 group-hover:translate-x-full group-hover:opacity-0"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
              <svg
                className="absolute w-4 h-4 text-crema -translate-x-full opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </div>
          </a>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 right-12 hero-element hidden md:flex items-center gap-4">
        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-crema/40">Scroll</span>
        <div className="w-16 h-[1px] bg-crema/20" />
      </div>
    </section>
  );
}
