"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "techo-sol-sombra",
    slug: "techo-sol-y-sombra",
    title: "Techo Sol y Sombra",
    subtitle: "Control de Luz y Clima",
    description: "Estructuras que doman el sol y la lluvia sin perder la conexión con el cielo.",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop",
    video: "https://cdn.coverr.co/videos/coverr-sunlight-through-trees-in-forest-4467/1080p.mp4" // Placeholder nature video
  },
  {
    id: "diseno-ejecucion-terraza",
    slug: "diseno-ejecucion-terrazas",
    title: "Diseño Integral",
    subtitle: "Proyecto de Terraza",
    description: "Desde el primer trazo hasta la última luz. Un solo equipo, una visión unificada.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop",
    video: "https://cdn.coverr.co/videos/coverr-modern-architecture-with-pool-5686/1080p.mp4" // Placeholder architecture video
  },
  {
    id: "estacion-parrilla",
    slug: "estacion-parrilla",
    title: "Outdoor Kitchen",
    subtitle: "Estación de Parrilla",
    description: "El corazón de la reunión. Fuego, sabor y diseño para el chef anfitrión.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2670&auto=format&fit=crop",
    video: "https://cdn.coverr.co/videos/coverr-grilling-meat-on-barbecue-4462/1080p.mp4" // Placeholder BBQ video
  },
  {
    id: "otros-proyectos",
    slug: "otros-proyectos",
    title: "A Medida",
    subtitle: "Proyectos Especiales",
    description: "Fogateros, lounges, decks. Soluciones únicas para espacios que desafían lo estándar.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2670&auto=format&fit=crop",
    video: "https://cdn.coverr.co/videos/coverr-fire-pit-in-the-evening-4465/1080p.mp4" // Placeholder firepit video
  },
];

export default function Servicios() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple fade-in for the header
      gsap.from(".services-header-reveal", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // Stagger for cards on mobile/initial load
      gsap.from(".service-card-reveal", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".services-container",
          start: "top 85%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative py-20 md:py-24 bg-[#0a0a0a] text-white overflow-hidden"
    >
      {/* Background Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="services-header-reveal mb-10 md:mb-14 max-w-2xl">
          <span className="block text-terracota text-xs tracking-[0.3em] uppercase font-bold mb-4">
            Nuestros Servicios
          </span>
          <h2 className="font-serif text-4xl md:text-6xl leading-[1.1] mb-6">
            Arquitectura para <br />
            <span className="text-white/40 italic">vivir el exterior.</span>
          </h2>
          <p className="text-white/60 text-lg font-light leading-relaxed max-w-lg">
            No vendemos productos, creamos atmósferas. Un sistema integral de diseño y ejecución para transformar tu terraza.
          </p>
        </div>

        {/* Desktop Accordion / Mobile Carousel */}
        <div className="services-container flex flex-col md:flex-row gap-6 md:gap-2 h-auto md:h-[70vh] min-h-[500px] max-h-[800px]">
          {services.map((service, index) => (
            <Link
              key={service.id}
              href={`/servicios/${service.slug}`}
              className={`
                service-card-reveal group relative flex-1 overflow-hidden rounded-2xl md:rounded-none md:first:rounded-l-2xl md:last:rounded-r-2xl
                transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                h-[450px] md:h-full
                ${hoveredIndex === index ? 'md:flex-[3]' : 'md:flex-1'}
                border border-white/10 hover:border-white/30
              `}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                />
              </div>

              {/* Background Video (Desktop Only - Reveals on Hover) */}
              <div className={`absolute inset-0 hidden md:block transition-opacity duration-700 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                <video
                  src={service.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-60"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform transition-transform duration-500 group-hover:translate-y-0 translate-y-4 md:translate-y-8">

                  {/* Tag */}
                  <div className="mb-4 overflow-hidden">
                    <span className="inline-block px-3 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-[10px] tracking-[0.2em] uppercase text-white/80">
                      {service.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-3xl md:text-4xl mb-3 text-white group-hover:text-terracota transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description (Reveals on hover in desktop) */}
                  <div className={`
                    overflow-hidden transition-all duration-500 ease-out
                    max-h-[100px] opacity-100
                    md:max-h-0 md:opacity-0
                    ${hoveredIndex === index ? 'md:max-h-[100px] md:opacity-100' : ''}
                  `}>
                    <p className="text-white/70 text-sm leading-relaxed max-w-md mb-6">
                      {service.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white">
                      <span>Explorar</span>
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                  </div>

                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
