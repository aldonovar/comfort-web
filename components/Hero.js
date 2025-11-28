"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // Parallax Video
      gsap.to(videoRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Cinematic Entrance
      tl.from(".hero-eyebrow", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      })
        .from(
          ".hero-heading",
          {
            y: 50,
            opacity: 0,
            duration: 1.4,
            ease: "power4.out",
          },
          "-=1.0"
        )
        .from(
          ".hero-copy",
          {
            y: 30,
            opacity: 0,
            duration: 1.2,
          },
          "-=1.1"
        )
        .from(
          ".hero-cta",
          {
            y: 20,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
          },
          "-=0.9"
        )
        .from(
          ".hero-card",
          {
            y: 60,
            opacity: 0,
            duration: 1.4,
            ease: "power4.out",
          },
          "-=1.0"
        )
        .from(
          ".hero-meta",
          {
            y: 20,
            opacity: 0,
            duration: 1,
          },
          "-=1.0"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-madera text-crema overflow-hidden"
    >
      {/* Video de fondo con Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          className="hero-video absolute inset-0 w-full h-[120%] object-cover opacity-60 -top-[10%]"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://videos.pexels.com/video-files/3195284/3195284-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Capa de gradiente para lectura */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/85 pointer-events-none" />

      {/* Contenido principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
        {/* Columna izquierda: texto + CTAs */}
        <div className="space-y-6">
          <p className="hero-eyebrow text-xs tracking-[0.32em] uppercase text-crema/70">
            Arquitectura exterior · Lima, Perú
          </p>

          <h1 className="hero-heading font-serif text-4xl md:text-5xl lg:text-6xl leading-tight">
            Terrazas que se sienten{" "}
            <span className="italic text-terracota">hogar</span> desde la
            primera noche.
          </h1>

          <p className="hero-copy text-sm md:text-base text-crema/80 max-w-xl">
            Comfort Studio diseña y ejecuta terrazas, azoteas y patios
            habitables para familias y empresas que valoran la luz cálida,
            los materiales honestos y los detalles bien resueltos.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            {/* CTA 1: Cotizar */}
            <a
              href="#cotiza"
              className="hero-cta hero-cta-primary inline-flex items-center justify-center px-7 py-3 rounded-full bg-crema text-madera text-xs font-semibold tracking-[0.22em] uppercase shadow-[0_16px_40px_rgba(0,0,0,0.45)] hover:bg-white hover:scale-105 transition-all duration-300"
            >
              Cotizar mi proyecto
            </a>

            {/* CTA 2: Agendar reunión (con ícono + microanimación) */}
            <a
              href="#contacto"
              className="hero-cta group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-crema/35 bg-black/30 text-crema text-[0.72rem] font-semibold tracking-[0.22em] uppercase backdrop-blur-sm hover:bg-black/60 hover:border-crema/70 hover:scale-105 transition-all duration-300"
            >
              <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-crema/12 border border-crema/35 overflow-hidden">
                {/* Icono calendar/meeting */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-crema/10" />
                <svg
                  className="w-3.5 h-3.5 translate-y-[0.5px] transition-transform duration-200 group-hover:-translate-y-[1px]"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M7 2.75a.75.75 0 0 1 .75.75V5h8.5V3.5a.75.75 0 0 1 1.5 0V5h.5A2.75 2.75 0 0 1 21 7.75v9.5A2.75 2.75 0 0 1 18.25 20H5.75A2.75 2.75 0 0 1 3 17.25v-9.5A2.75 2.75 0 0 1 5.75 5h.5V3.5A.75.75 0 0 1 7 2.75Zm11 8.5H6v6a1.25 1.25 0 0 0 1.25 1.25h9.5A1.25 1.25 0 0 0 18 17.25v-6Zm-9.25 1.5h2.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0V14H8.5a.75.75 0 0 1 0-1.5Z"
                  />
                </svg>
              </span>
              <span className="relative inline-flex items-center gap-1">
                Agendar reunión virtual
                <span className="text-xs transition-transform duration-200 group-hover:translate-x-[2px]">
                  ↗
                </span>
              </span>
            </a>
          </div>

          {/* Meta breve debajo del hero */}
          <p className="hero-meta text-[0.72rem] text-crema/70 max-w-md pt-2">
            Durante la presentación, esta portada funciona como una sala de
            recepción digital: mensaje claro, navegación precisa y un llamado a
            cotizar o agendar sin fricción.
          </p>
        </div>

        {/* Columna derecha: “card” con stats del estudio */}
        <div className="hero-card bg-black/40 border border-crema/15 rounded-3xl p-6 space-y-4 shadow-2xl backdrop-blur-md">
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-crema/60">
            Portafolio vivo
          </p>
          <h2 className="font-serif text-xl md:text-2xl">
            De la idea al espacio real: terrazas que venden confianza.
          </h2>
          <p className="text-sm text-crema/80">
            Cada proyecto que aparece en esta web existe para mostrarle al
            cliente, en vivo, cómo se ve el nivel de Comfort Studio: luz,
            estructura y detalles listos para ser vividos.
          </p>

          <div className="grid grid-cols-3 gap-3 text-[0.78rem]">
            <div>
              <p className="uppercase tracking-[0.22em] text-crema/60">
                Confianza
              </p>
              <p className="text-xl font-semibold">+38%</p>
              <p className="text-[0.7rem] text-crema/70">
                Probabilidad estimada de contacto cuando el portafolio se ve
                estructurado.
              </p>
            </div>
            <div>
              <p className="uppercase tracking-[0.22em] text-crema/60">
                Proyectos
              </p>
              <p className="text-xl font-semibold">80+</p>
              <p className="text-[0.7rem] text-crema/70">
                Entre residenciales, rooftops y terrazas corporativas.
              </p>
            </div>
            <div>
              <p className="uppercase tracking-[0.22em] text-crema/60">
                Satisfacción
              </p>
              <p className="text-xl font-semibold">4.9 ★</p>
              <p className="text-[0.7rem] text-crema/70">
                Valoración promedio en encuestas internas posteriores a obra.
              </p>
            </div>
          </div>

          <dl className="mt-2 grid grid-cols-2 gap-3 text-[0.78rem] border-t border-crema/15 pt-3">
            <div>
              <dt className="uppercase tracking-[0.2em] text-crema/60">
                Modalidad
              </dt>
              <dd>Diseño, obra o diseño + obra</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.2em] text-crema/60">
                Tipo de cliente
              </dt>
              <dd>Vivienda y proyectos corporativos</dd>
            </div>
          </dl>

          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-crema/60 pt-2">
            Desplázate para ver cómo trabajamos ↓
          </p>
        </div>
      </div>
    </section>
  );
}
