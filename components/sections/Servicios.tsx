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
      className="relative py-16 md:py-24 bg-primary text-primary overflow-hidden transition-colors duration-500"
    >
      {/* Background Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="services-header-reveal mb-8 md:mb-10 max-w-2xl">
          <span className="block text-terracota text-xs tracking-[0.3em] uppercase font-bold mb-4">
            Nuestros Servicios
          </span>
          <h2 className="font-serif text-3xl md:text-6xl leading-[1.1] mb-6 text-white">
            Arquitectura para <br />
            <span className="text-terracota italic transition-colors duration-500">vivir el exterior.</span>
          </h2>
        </div>
      </Link>
          ))}
    </div>

      </div >
    </section >
  );
}
