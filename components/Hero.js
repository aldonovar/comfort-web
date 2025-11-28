"use client";

import { useEffect, useRef, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

// Dynamically import HeroBackground
const HeroBackground = dynamic(
  () => import("../components/canvas/HeroBackground"),
  { ssr: false }
);

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
          ".hero-cta",
          {
            y: 18,
            opacity: 0,
            duration: 0.65,
            stagger: 0.08,
          },
          "-=0.4"
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

      // Parallax del video container (ahora contiene el Canvas View)
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
      {/* Background Video (WebGL) */}
      <div
        ref={videoContainerRef}
        className="absolute inset-0 z-0 h-[120%] w-full" // 120% height for parallax
      >
        <div className="relative h-full w-full">
          <Suspense fallback={<div className="absolute inset-0 bg-madera" />}>
            <HeroBackground
              videoUrl="https://videos.pexels.com/video-files/3205633/3205633-hd_1920_1080_25fps.mp4"
              className="absolute inset-0 h-full w-full"
            />
          </Suspense>
          {/* Overlay oscuro para legibilidad */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </div>
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
                <span className="relative z-10">Iniciar Proyecto</span>
                <div className="absolute inset-0 -translate-x-full bg-terracota transition-transform duration-300 group-hover:translate-x-0" />
              </a>
              <a
                href="#proyectos"
                className="hero-cta group inline-flex items-center gap-2 rounded-full border border-crema/30 px-8 py-4 text-sm font-bold uppercase tracking-widest text-crema backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-crema/10"
              >
                <span>Ver Portafolio</span>
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
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-crema/60">
                      Proyecto Destacado
                    </p>
                    <h3 className="mt-2 font-serif text-2xl text-crema">
                      Rooftop Miraflores
                    </h3>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-crema/20 bg-crema/5 text-xl">
                    ↗
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-crema/70">
                  Una propuesta integral que combina zona de parrilla, estar
                  semitechado y vegetación nativa para un penthouse con vista al
                  mar.
                </p>
                <div className="flex gap-2">
                  <span className="rounded-full bg-crema/10 px-3 py-1 text-[10px] uppercase tracking-wider">
                    Residencial
                  </span>
                  <span className="rounded-full bg-crema/10 px-3 py-1 text-[10px] uppercase tracking-wider">
                    120m²
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
