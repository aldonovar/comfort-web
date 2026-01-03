"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";
import dynamic from "next/dynamic";

const ProjectDistortion = dynamic(() => import("../canvas/ProjectDistortion"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "terraza-el-polo",
    title: "Terraza El Polo",
    location: "El Polo, Lima",
    surface: "65 m²",
    tags: ["Residencial", "Luxury", "Outdoor"],
    description: "Un espacio diseñado para la elegancia y el confort, donde cada detalle respira exclusividad.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop",
    color: "#1a1a1a"
  },
  {
    id: "techo-luz-led",
    title: "Techo con Luz LED",
    location: "Miraflores, Lima",
    surface: "40 m²",
    tags: ["Tecnología", "Ambiente", "Diseño"],
    description: "Iluminación integrada que transforma la atmósfera al caer la noche. Funcionalidad y estética en armonía.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2700&auto=format&fit=crop",
    color: "#1f1f1f"
  },
  {
    id: "proyecto-luminaria-calida",
    title: "Luminaria Cálida",
    location: "San Isidro, Lima",
    surface: "55 m²",
    tags: ["Calidez", "Hogar", "Estilo"],
    description: "La luz como protagonista. Creando espacios acogedores que invitan a quedarse.",
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=2700&auto=format&fit=crop",
    color: "#1a1a1a"
  },
  {
    id: "damero-blanco-sol-sombra",
    title: "Damero Sol y Sombra",
    location: "La Molina, Lima",
    surface: "120 m²",
    tags: ["Arquitectura", "Sombra", "Patrones"],
    description: "Juegos de luces y sombras a través de un diseño de damero blanco. Estética pura y funcional.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2700&auto=format&fit=crop",
    color: "#1f1f1f"
  }
];

export default function Proyectos() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Mobile Detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile(); // Check on mount
    window.addEventListener("resize", checkMobile);

    const ctx = gsap.context(() => {
      // Header Reveal
      gsap.from(".projects-header-reveal", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // Mobile Parallax / Cinematic Zoom - conditional on state
      // Note: Since we are inside the effect, we use the current value of isMobile from the render scope 
      // BUT strictly speaking, if isMobile changes, we want to re-run this context.
      if (window.innerWidth < 768) { // Use direct check or ref for initial load
        gsap.utils.toArray<HTMLElement>(".project-image-mobile").forEach((img) => {
          gsap.fromTo(img,
            { scale: 1 },
            {
              scale: 1.15,
              ease: "none",
              scrollTrigger: {
                trigger: img.closest("article"),
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            }
          );
        });
      }
    }, sectionRef);

    return () => {
      window.removeEventListener("resize", checkMobile);
      ctx.revert();
    };
  }, [isMobile]); // Re-run if isMobile changes to attach/detach correct animations

  return (
    <section
      ref={sectionRef}
      id="proyectos"
      className="relative bg-primary text-primary py-16 md:py-32 transition-colors duration-500"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="projects-header-reveal mb-12 md:mb-24 max-w-2xl">
          <span className="block text-terracota text-xs tracking-[0.3em] uppercase font-bold mb-4">
            Portafolio Selecto
          </span>
          <h2 className="font-serif text-3xl md:text-6xl leading-[1.1] mb-6">
            Espacios que cuentan <br />
            <span className="text-primary/40 italic transition-colors duration-500">historias.</span>
          </h2>
          <p className="text-primary/60 text-sm md:text-lg font-light leading-relaxed max-w-lg transition-colors duration-500">
            Cada proyecto es un diálogo entre la arquitectura y el estilo de vida. Aquí, una muestra de lo que es posible.
          </p>
        </div>

        {/* Sticky Stack Container */}
        <div className="flex flex-col gap-12 md:gap-0">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className="relative md:sticky top-0 md:top-32 w-full aspect-[4/5] md:aspect-auto md:min-h-[45vh] md:h-[80vh] mb-8 md:mb-0"
              style={{ zIndex: index + 1 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <article className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.3)] ring-1 ring-white/10 bg-transparent group transition-all duration-500">

                {/* WebGL Image Background - Desktop Only */}
                {/* CSS-based visibility: hidden on mobile regardless of JS state */}
                <div className="absolute inset-0 w-full h-full hidden md:block z-10">
                  <View className="w-full h-full absolute inset-0">
                    <ProjectDistortion
                      image={project.image}
                      hovered={hoveredProject === project.id}
                    />
                  </View>
                </div>

                {/* Fallback/Mobile Image - Always rendered as base layer */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />

                {/* Gradient Overlay - Needs to be on top of canvas */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent pointer-events-none transition-colors duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end md:justify-between pointer-events-none">

                  {/* Top Tags (Desktop) */}
                  <div className="hidden md:flex justify-between items-start">
                    <div className="flex gap-2 pointer-events-auto">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-xs uppercase tracking-wider text-white transition-colors duration-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-4xl font-serif text-white/20 font-bold transition-colors duration-500">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Main Info */}
                  <div className="max-w-3xl pointer-events-auto">
                    <div className="flex items-center gap-4 mb-4 text-terracota text-xs font-bold tracking-[0.2em] uppercase">
                      <span>{project.location}</span>
                      <span className="w-1 h-1 rounded-full bg-terracota" />
                      <span>{project.surface}</span>
                    </div>

                    <h3 className="font-serif text-3xl md:text-7xl mb-4 md:mb-6 text-white leading-none transition-colors duration-500">
                      {project.title}
                    </h3>

                    <p className="text-white/80 text-sm md:text-xl font-light leading-relaxed max-w-xl mb-6 md:mb-8 transition-colors duration-500">
                      {project.description}
                    </p>

                    <button className="group/btn inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 rounded-full bg-white text-black hover:bg-terracota hover:text-white transition-all duration-300 pointer-events-auto">
                      <span className="uppercase tracking-widest text-xs font-bold">Ver Proyecto</span>
                      <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>

                </div>
              </article>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-32 text-center">
          <p className="text-primary/40 text-sm uppercase tracking-widest mb-8 transition-colors duration-500">
            ¿Listo para transformar tu espacio?
          </p>
          <Link
            href="#contacto"
            className="inline-block border-b border-primary/30 pb-1 text-2xl md:text-4xl font-serif hover:text-terracota hover:border-terracota transition-colors duration-300"
          >
            Hablemos de tu proyecto
          </Link>
        </div>

      </div>
    </section >
  );
}
