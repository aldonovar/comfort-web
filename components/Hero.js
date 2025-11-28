"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const containerRef = useRef(null);
  const videoContainerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.from(".hero-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          ".hero-heading",
          {
            y: 40,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.25"
        )
        .from(
          ".hero-copy",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.45"
        )
        .from(
          ".hero-card",
          {
            y: 40,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.6"
        )
        .from(
          ".hero-meta",
          {
            y: 18,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4"
        );

      // Parallax del video container
      gsap.to(videoContainerRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-madera text-crema"
    >
      {/* Background Video (HTML5 Standard) */}
      <div
        ref={videoContainerRef}
        className="absolute inset-0 z-0 h-[120%] w-full"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          src="https://cdn.coverr.co/videos/coverr-walking-by-a-wooden-wall-4608/1080p.mp4"
        />
        {/* Overlay oscuro para legibilidad */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-4 pt-20 md:px-8 lg:pt-0">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          {/* Bloque Izquierdo: Texto */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="hero-eyebrow text-xs font-medium uppercase tracking-[0.25em] text-crema/70">
                Arquitectura Exterior
              </p>
              <h1 className="hero-heading font-serif text-5xl leading-[1.1] md:text-6xl lg:text-7xl">
                Diseñamos el <br />
                <span className="italic text-terracota">confort</span> que tu
                terraza merece.
              </h1>
              <p className="hero-copy max-w-md text-lg leading-relaxed text-crema/80">
                Especialistas en transformar azoteas y patios en espacios de
                vida premium. Diseño, ejecución y paisajismo en un solo lugar.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 relative z-20">
              <a
                href="#cotiza"
                className="hero-cta group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-crema px-8 py-4 text-sm font-bold uppercase tracking-widest text-madera transition-all duration-300 hover:scale-105 hover:bg-white"
              >
                <span className="relative z-10">Cotizar Proyecto</span>
                <div className="absolute inset-0 -translate-x-full bg-terracota transition-transform duration-300 group-hover:translate-x-0" />
              </a>
              <a
                href="https://calendly.com/" // Placeholder, user can update
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta group inline-flex items-center gap-2 rounded-full border border-crema/30 px-8 py-4 text-sm font-bold uppercase tracking-widest text-crema backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-crema/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>Agendar Reunión Virtual</span>
              </a>
            </div>

            <div className="hero-meta flex items-center gap-8 pt-4 text-xs uppercase tracking-[0.2em] text-crema/50">
              <span>Lima, Perú</span>
              <span className="h-1 w-1 rounded-full bg-crema/50" />
              <span>Est. 2024</span>
            </div>
          </div>

          {/* Bloque Derecho: Card Flotante / Visual */}
          <div className="relative hidden lg:block">
            <div className="hero-card relative ml-auto max-w-md overflow-hidden rounded-3xl bg-white/5 p-8 backdrop-blur-md border border-white/10 shadow-2xl">
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-crema/60">
                      Experiencia
                    </p>
                    <h3 className="mt-2 font-serif text-3xl text-crema">
                      Comfort Studio
                    </h3>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-terracota text-white text-xl">
                    ★
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-3xl font-light text-crema">4.9/5</p>
                    <p className="text-xs uppercase tracking-wider text-crema/60">Puntuación</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-light text-crema">+45</p>
                    <p className="text-xs uppercase tracking-wider text-crema/60">Proyectos</p>
                  </div>
                  <div className="space-y-1 col-span-2">
                    <p className="text-3xl font-light text-crema">+1,200m²</p>
                    <p className="text-xs uppercase tracking-wider text-crema/60">Metraje Total Cubierto</p>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-sm leading-relaxed text-crema/70 italic">
                    "Transformamos espacios fríos en experiencias de vida cálidas y funcionales."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
