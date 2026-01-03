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
    image: "/services/service-1.jpg",
    video: "https://cdn.coverr.co/videos/coverr-sunlight-through-trees-in-forest-4467/1080p.mp4"
  },
  {
    id: "diseno-ejecucion-terraza",
    slug: "diseno-ejecucion-terrazas",
    title: "Diseño Integral",
    subtitle: "Proyecto de Terraza",
    description: "Desde el primer trazo hasta la última luz. Un solo equipo, una visión unificada.",
    image: "/services/service-2.jpg",
    video: "https://cdn.coverr.co/videos/coverr-modern-architecture-with-pool-5686/1080p.mp4"
  },
  {
    id: "estacion-parrilla",
    slug: "estacion-parrilla",
    title: "Outdoor Kitchen",
    subtitle: "Estación de Parrilla",
    description: "El corazón de la reunión. Fuego, sabor y diseño para el chef anfitrión.",
    image: "/services/service-3.jpg",
    video: "https://cdn.coverr.co/videos/coverr-grilling-meat-on-barbecue-4462/1080p.mp4"
  },
  {
    id: "otros-proyectos",
    slug: "otros-proyectos",
    title: "A Medida",
    subtitle: "Proyectos Especiales",
    description: "Fogateros, lounges, decks. Soluciones únicas para espacios que desafían lo estándar.",
    image: "/services/service-4.jpg",
    video: "https://cdn.coverr.co/videos/coverr-fire-pit-in-the-evening-4465/1080p.mp4"
  },
];

export default function Servicios() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeMobile, setActiveMobile] = useState<number>(0);

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

    }, sectionRef);

    // Force refresh to ensure start/end positions are correct
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    // Backup refresh for fast connections where load might have already fired
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      ctx.revert();
      window.removeEventListener("load", handleLoad);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative py-16 md:py-24 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[#333333] via-[#0a0a0a] to-black text-primary overflow-hidden transition-colors duration-500"
    >
      {/* Background Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="services-header-reveal mb-8 md:mb-10 max-w-2xl">
          <span className="block text-terracota text-xs tracking-[0.3em] uppercase font-bold mb-4">
            Nuestros Servicios
          </span>
          <h2 className="font-serif text-3xl md:text-6xl leading-[1.1] mb-6 text-primary">
            Arquitectura para <br />
            <span className="text-terracota italic transition-colors duration-500">vivir el exterior.</span>
          </h2>
          <p className="text-primary/80 text-lg font-light leading-relaxed max-w-lg transition-colors duration-500">
            No vendemos productos, creamos atmósferas. Un sistema integral de diseño y ejecución para transformar tu terraza.
          </p>
        </div>

        {/* Desktop Accordion / Mobile Vertical Accordion */}
        {/* Compact Layout: Mobile needs height for vertical stacking */}
        <div className="services-container flex flex-col md:flex-row gap-2 h-[85vh] min-h-[600px] md:h-[550px] md:min-h-0 max-h-[900px] md:max-h-[700px]">
          {services.map((service, index) => (
            <Link
              key={service.id}
              href={`/servicios/${service.slug}`}
              onClick={(e) => {
                // Determine if we are on mobile (simple check)
                if (window.innerWidth < 768) {
                  e.preventDefault();
                  setActiveMobile(index);
                }
              }}
              className={`
                service-card-reveal group relative overflow-hidden 
                first:rounded-t-2xl last:rounded-b-2xl md:rounded-none md:first:rounded-l-2xl md:last:rounded-r-2xl
                transition-[flex-grow,filter] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                ${activeMobile === index ? 'flex-[12] md:flex-[3]' : 'flex-1 md:flex-1'} // Optimized Mobile Ratio
                ${hoveredIndex === index ? 'md:flex-[3]' : ''} // Desktop Hover
                shadow-2xl md:shadow-[0_30px_60px_rgba(0,0,0,0.3)] 
                ring-1 ring-white/10 ${activeMobile === index ? 'ring-white/20' : ''} md:hover:ring-white/20
                will-change-[flex-grow] transform-gpu
              `}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={service.id === 'estacion-parrilla' ? "https://images.unsplash.com/photo-1529310399831-ed472b81d589?q=80&w=2574&auto=format&fit=crop" : service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 opacity-80 group-hover:opacity-60"
                />
              </div>

              {/* Background Video (Desktop Only - Reveals on Hover) */}
              <div className={`absolute inset-0 hidden md:block transition-opacity duration-800 ease-out ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                <video
                  src={service.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-60"
                />
              </div>

              {/* Mobile Video/Image Fallback */}
              <div className="absolute inset-0 md:hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover opacity-60"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent transition-colors duration-500" />

              {/* Content */}
              <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-end">
                <div className={`
                    transform transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                    ${activeMobile === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-70'} md:translate-y-8 md:opacity-100 md:group-hover:translate-y-0
                  `}>

                  {/* Tag */}
                  <div className={`mb-2 md:mb-4 overflow-hidden transition-opacity duration-500 ${activeMobile === index ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
                    <span className="inline-block px-2 py-1 md:px-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-white">
                      {service.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`
                      font-serif text-xl md:text-3xl lg:text-4xl mb-2 md:mb-3 text-white 
                      ${activeMobile === index ? 'text-terracota' : ''} 
                      md:group-hover:text-terracota transition-colors duration-500
                    `}>
                    {service.title}
                  </h3>

                  {/* Description (Reveals on active state) */}
                  <div className={`
                    overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                    ${activeMobile === index ? 'max-h-[200px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'} 
                    md:max-h-0 md:opacity-0
                    ${hoveredIndex === index ? 'md:max-h-[200px] md:opacity-100' : ''}
                  `}>
                    <p className="text-white/80 text-xs md:text-sm leading-relaxed max-w-md mb-4 md:mb-6">
                      {service.description}
                    </p>

                    <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-widest uppercase text-white">
                      <span>Explorar</span>
                      <span className="transform md:group-hover:translate-x-1 transition-transform duration-500">→</span>
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
