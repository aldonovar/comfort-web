"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: "01",
    title: "Techo Sol y Sombra",
    subtitle: "Control de Luz y Clima",
    desc: "Estructuras que doman el sol y la lluvia sin perder la conexión con el cielo. Madera, aluminio y tecnología.",
    image: "/services/service-1.jpg",
    video: "https://cdn.coverr.co/videos/coverr-sunlight-through-trees-in-forest-4467/1080p.mp4",
    slug: "techo-sol-y-sombra",
    stats: ["Madera", "Aluminio", "Retráctil"]
  },
  {
    id: "02",
    title: "Diseño de Terrazas",
    subtitle: "Proyecto Integral",
    desc: "Desde el primer trazo hasta la última luz. Un solo equipo, una visión unificada para tu espacio exterior.",
    image: "/services/service-2.jpg",
    video: "https://cdn.coverr.co/videos/coverr-modern-architecture-with-pool-5686/1080p.mp4",
    slug: "diseno-ejecucion-terrazas",
    stats: ["Diseño", "Planos", "Ejecución"]
  },
  {
    id: "03",
    title: "Estación de Parrilla",
    subtitle: "Outdoor Kitchen",
    desc: "El corazón de la reunión. Fuego, sabor y diseño para el chef anfitrión. Acabados premium y funcionalidad.",
    image: "/services/service-3.png",
    video: "https://cdn.coverr.co/videos/coverr-grilling-meat-on-barbecue-4462/1080p.mp4",
    slug: "estacion-parrilla",
    stats: ["Acero", "Granito", "Equipamiento"]
  },
  {
    id: "04",
    title: "Otros Proyectos",
    subtitle: "A Medida",
    desc: "Fogateros, lounges, decks. Soluciones únicas para espacios que desafían lo estándar.",
    image: "/services/service-4.jpg",
    video: "https://cdn.coverr.co/videos/coverr-fire-pit-in-the-evening-4465/1080p.mp4",
    slug: "otros-proyectos",
    stats: ["Fogateros", "Decks", "Lounges"]
  }
];

export default function ServicesFluidPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const sections = gsap.utils.toArray<HTMLElement>(".service-section");

      sections.forEach((section, i) => {
        const bg = section.querySelector(".service-bg");
        const content = section.querySelector(".service-content-inner");

        // Parallax Background
        gsap.fromTo(bg,
          { yPercent: -20 },
          {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );

        // Content Reveal (Fade Up)
        gsap.fromTo(content,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, containerRef);

    // Force refresh for sticky positioning
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    return (
    <main ref={containerRef} className="bg-[var(--bg-primary)] min-h-screen">

      {/* Header Section */}
      <section className="h-[50vh] flex items-center justify-center relative overflow-hidden">
        <div className="text-center z-10 px-6">
          <span className="block text-terracota text-xs tracking-[0.5em] uppercase font-bold mb-4">
            Nuestra Esencia
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-[var(--text-primary)] mb-6">
            Servicios
          </h1>
          <p className="text-[var(--text-primary)]/60 max-w-md mx-auto font-light">
            Explora nuestras especialidades. Cada proyecto es una obra maestra de diseño y funcionalidad.
          </p>
        </div>
        {/* Abstract Background */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-terracota/30 via-[var(--bg-primary)] to-[var(--bg-primary)]" />
      </section>

      {/* Services Stack */}
      <div className="relative">
        {SERVICES.map((service, i) => (
          <section
            key={service.id}
            className="service-section sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center border-t border-[var(--text-primary)]/10 bg-[var(--bg-primary)]"
            style={{ zIndex: i + 1 }}
          >

            {/* Parallax Background */}
            <div className="service-bg absolute inset-0 w-full h-[120%] -top-[10%]">
              {/* Image Fallback/Poster */}
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40 dark:opacity-40 opacity-20"
              />
              <video
                src={service.video}
                autoPlay
                muted
                loop
                playsInline
                poster={service.image}
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay dark:opacity-40 dark:mix-blend-overlay opacity-20 mix-blend-multiply"
              />
              <div className="absolute inset-0 bg-linear-to-b from-[var(--bg-primary)]/90 via-[var(--bg-primary)]/20 to-[var(--bg-primary)]/90" />
            </div>

            {/* Content */}
            <div className="service-content-inner relative z-10 container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

              {/* Text */}
              <div className="md:text-left text-center">
                <span className="inline-block text-terracota text-xs font-bold tracking-[0.3em] uppercase mb-4 border-b border-terracota/30 pb-2">
                  {service.id} — {service.subtitle}
                </span>
                <h2 className="font-serif text-5xl md:text-7xl text-[var(--text-primary)] mb-8 leading-tight">
                  {service.title}
                </h2>
                <p className="text-[var(--text-primary)]/70 text-lg font-light leading-relaxed mb-10 max-w-lg mx-auto md:mx-0">
                  {service.desc}
                </p>

                <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-10">
                  {service.stats.map((stat, s) => (
                    <span key={s} className="px-4 py-2 rounded-full border border-[var(--text-primary)]/10 bg-[var(--bg-primary)]/50 text-xs text-[var(--text-primary)]/60 uppercase tracking-wider backdrop-blur-sm">
                      {stat}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/servicios/${service.slug}`}
                  className="group inline-flex items-center gap-3 text-[var(--text-primary)] font-medium hover:text-terracota transition-colors duration-300"
                >
                  <span className="uppercase tracking-widest text-sm">Ver Proyecto</span>
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                </Link>
              </div>

              {/* Visual/Abstract (Optional right side element) */}
              <div className="hidden md:block relative h-[60vh] w-full">
                {/* Could be a 3D model or just empty space to let the background shine */}
              </div>

            </div>

          </section>
        ))}
      </div>

      {/* CTA Section (Replacing Spacer) */}
      <section className="relative py-32 px-6 flex flex-col items-center justify-center bg-[var(--bg-secondary)] text-[var(--text-primary)] text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-terracota text-sm tracking-[0.3em] uppercase font-bold mb-8 animate-pulse">
            ¿Listo para empezar?
          </p>
          <h2 className="font-serif text-5xl md:text-7xl mb-12 leading-tight">
            Tu espacio exterior <br />
            <span className="text-[var(--text-primary)]/50 italic">merece ser vivido.</span>
          </h2>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link
              href="/cotiza"
              className="px-10 py-5 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full text-sm uppercase tracking-widest font-bold hover:scale-105 hover:bg-terracota hover:text-white transition-all duration-300 shadow-xl"
            >
              Iniciar Proyecto
            </Link>
            <Link
              href="/contacto"
              className="px-10 py-5 border border-[var(--text-primary)]/20 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-[var(--text-primary)]/5 transition-all duration-300"
            >
              Contactar Estudio
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
