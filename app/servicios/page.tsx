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
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop",
    video: "https://cdn.coverr.co/videos/coverr-sunlight-through-trees-in-forest-4467/1080p.mp4",
    slug: "techo-sol-y-sombra",
    stats: ["Madera", "Aluminio", "Retráctil"]
  },
  {
    id: "02",
    title: "Diseño de Terrazas",
    subtitle: "Proyecto Integral",
    desc: "Desde el primer trazo hasta la última luz. Un solo equipo, una visión unificada para tu espacio exterior.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop",
    video: "https://cdn.coverr.co/videos/coverr-modern-architecture-with-pool-5686/1080p.mp4",
    slug: "diseno-ejecucion-terrazas",
    stats: ["Diseño", "Planos", "Ejecución"]
  },
  {
    id: "03",
    title: "Estación de Parrilla",
    subtitle: "Outdoor Kitchen",
    desc: "El corazón de la reunión. Fuego, sabor y diseño para el chef anfitrión. Acabados premium y funcionalidad.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2670&auto=format&fit=crop",
    video: "https://cdn.coverr.co/videos/coverr-grilling-meat-on-barbecue-4462/1080p.mp4",
    slug: "estacion-parrilla",
    stats: ["Acero", "Granito", "Equipamiento"]
  },
  {
    id: "04",
    title: "Otros Proyectos",
    subtitle: "A Medida",
    desc: "Fogateros, lounges, decks. Soluciones únicas para espacios que desafían lo estándar.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2670&auto=format&fit=crop",
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
    <main ref={containerRef} className="bg-black">

      {/* Header Section */}
      <section className="h-[50vh] flex items-center justify-center relative overflow-hidden">
        <div className="text-center z-10 px-6">
          <span className="block text-terracota text-xs tracking-[0.5em] uppercase font-bold mb-4">
            Nuestra Esencia
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">
            Servicios
          </h1>
          <p className="text-white/60 max-w-md mx-auto font-light">
            Explora nuestras especialidades. Cada proyecto es una obra maestra de diseño y funcionalidad.
          </p>
        </div>
        {/* Abstract Background */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-terracota/30 via-black to-black" />
      </section>

      {/* Services Stack */}
      <div className="relative">
        {SERVICES.map((service, i) => (
          <section
            key={service.id}
            className="service-section sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center border-t border-white/10 bg-black"
            style={{ zIndex: i + 1 }}
          >

            {/* Parallax Background */}
            <div className="service-bg absolute inset-0 w-full h-[120%] -top-[10%]">
              {/* Image Fallback/Poster */}
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              <video
                src={service.video}
                autoPlay
                muted
                loop
                playsInline
                poster={service.image}
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80" />
            </div>

            {/* Content */}
            <div className="service-content-inner relative z-10 container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

              {/* Text */}
              <div className="md:text-left text-center">
                <span className="inline-block text-terracota text-xs font-bold tracking-[0.3em] uppercase mb-4 border-b border-terracota/30 pb-2">
                  {service.id} — {service.subtitle}
                </span>
                <h2 className="font-serif text-5xl md:text-7xl text-white mb-8 leading-tight">
                  {service.title}
                </h2>
                <p className="text-white/70 text-lg font-light leading-relaxed mb-10 max-w-lg mx-auto md:mx-0">
                  {service.desc}
                </p>

                <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-10">
                  {service.stats.map((stat, s) => (
                    <span key={s} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-white/60 uppercase tracking-wider">
                      {stat}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/servicios/${service.slug}`}
                  className="group inline-flex items-center gap-3 text-white font-medium hover:text-terracota transition-colors duration-300"
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

      {/* Spacer for footer reveal */}
      <div className="h-[50vh] bg-black" />

    </main>
  );
}
