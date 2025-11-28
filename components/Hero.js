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
          ".hero-footer-text",
          {
            opacity: 0,
            duration: 1,
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
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          src="https://cdn.coverr.co/videos/coverr-walking-by-a-wooden-wall-4608/1080p.mp4"
        />
        {/* Overlay oscuro para legibilidad */}
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-4 pt-24 pb-12 md:px-8 lg:pt-0">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-2 lg:items-center">
          {/* Bloque Izquierdo: Texto */}
          <div className="space-y-10">
            <div className="space-y-6">
              <p className="hero-eyebrow text-xs font-medium uppercase tracking-[0.25em] text-crema/60">
                Arquitectura Exterior · Lima, Perú
              </p>
              <h1 className="hero-heading font-serif text-5xl leading-[1.1] md:text-6xl lg:text-7xl">
                Terrazas que se sienten <br />
                <span className="italic text-terracota">hogar</span> desde la primera noche.
              </h1>
              <p className="hero-copy max-w-xl text-lg leading-relaxed text-crema/80">
                Comfort Studio diseña y ejecuta terrazas, azoteas y patios habitables para familias y empresas que valoran la luz cálida, los materiales honestos y los detalles bien resueltos.
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
                href="https://calendly.com/"
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

            <div className="hero-footer-text pt-8 max-w-md">
              <p className="text-[0.7rem] leading-relaxed text-crema/50">
                Durante la presentación, esta portada funciona como una sala de recepción digital: mensaje claro, navegación precisa y un llamado a cotizar o agendar sin fricción.
              </p>
            </div>
          </div>

          {/* Bloque Derecho: Card Flotante / Visual */}
          <div className="relative hidden lg:block">
            <div className="hero-card relative ml-auto max-w-lg overflow-hidden rounded-[2rem] bg-[#1a1a1a]/80 p-10 backdrop-blur-md border border-white/10 shadow-2xl">
              <div className="space-y-8">

                <div className="space-y-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-crema/50">
                    Portafolio Vivo
                  </p>
                  <h3 className="font-serif text-2xl leading-snug text-crema">
                    De la idea al espacio real: terrazas que venden confianza.
                  </h3>
                  <p className="text-xs leading-relaxed text-crema/70">
                    Cada proyecto que aparece en esta web existe para mostrarle al cliente, en vivo, cómo se ve el nivel de Comfort Studio: luz, estructura y detalles listos para ser vividos.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-6">
                  <div className="space-y-1">
                    <p className="text-[0.65rem] uppercase tracking-[0.15em] text-crema/50">Confianza</p>
                    <p className="text-2xl font-medium text-crema">+38%</p>
                    <p className="text-[0.6rem] leading-tight text-crema/40">Probabilidad estimada de contacto cuando el portafolio se ve estructurado.</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[0.65rem] uppercase tracking-[0.15em] text-crema/50">Proyectos</p>
                    <p className="text-2xl font-medium text-crema">80+</p>
                    <p className="text-[0.6rem] leading-tight text-crema/40">Entre residenciales, rooftops y terrazas corporativas.</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[0.65rem] uppercase tracking-[0.15em] text-crema/50">Satisfacción</p>
                    <p className="text-2xl font-medium text-crema">4.9 ★</p>
                    <p className="text-[0.6rem] leading-tight text-crema/40">Valoración promedio en encuestas internas posteriores a obra.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
                  <div className="space-y-1">
                    <p className="text-[0.65rem] uppercase tracking-[0.15em] text-crema/50">Modalidad</p>
                    <p className="text-xs font-medium text-crema">Diseño, obra o diseño + obra</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[0.65rem] uppercase tracking-[0.15em] text-crema/50">Tipo de Cliente</p>
                    <p className="text-xs font-medium text-crema">Vivienda y proyectos corporativos</p>
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <p className="text-[0.6rem] uppercase tracking-[0.2em] text-crema/40">
                    Desplázate para ver cómo trabajamos ↓
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
